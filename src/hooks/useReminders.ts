"use client";

import { useCallback, useEffect, useState } from "react";

export type ReminderSettings = {
  enabled: boolean;
  times: string[]; // "HH:MM"
  permission: NotificationPermission | "unsupported";
};

const KEY = "iaffirm_reminders_v1";

const defaultSettings = (): ReminderSettings => ({
  enabled: false,
  times: ["09:00", "21:00"],
  permission: typeof Notification === "undefined" ? "unsupported" : Notification.permission,
});

export function useReminders() {
  const [settings, setSettings] = useState<ReminderSettings>(defaultSettings);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setSettings({
          ...defaultSettings(),
          ...parsed,
          permission:
            typeof Notification === "undefined" ? "unsupported" : Notification.permission,
        });
      }
    } catch { /* */ }
    setReady(true);
  }, []);

  const persist = useCallback((next: ReminderSettings) => {
    setSettings(next);
    localStorage.setItem(
      KEY,
      JSON.stringify({ enabled: next.enabled, times: next.times })
    );
  }, []);

  const registerSw = useCallback(async () => {
    if (!("serviceWorker" in navigator)) return null;
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
      return reg;
    } catch (e) {
      console.warn("SW register failed", e);
      return null;
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof Notification === "undefined") {
      persist({ ...settings, permission: "unsupported" });
      return "unsupported" as const;
    }
    await registerSw();
    const perm = await Notification.requestPermission();
    const next = { ...settings, permission: perm, enabled: perm === "granted" ? true : settings.enabled };
    persist(next);
    return perm;
  }, [settings, persist, registerSw]);

  const setEnabled = useCallback(
    async (enabled: boolean) => {
      if (enabled && settings.permission !== "granted") {
        const perm = await requestPermission();
        if (perm !== "granted") return;
      }
      persist({ ...settings, enabled });
    },
    [settings, persist, requestPermission]
  );

  const setTimes = useCallback(
    (times: string[]) => {
      persist({ ...settings, times });
    },
    [settings, persist]
  );

  /** Local schedule check while the app is open (and SW can show when messaged) */
  useEffect(() => {
    if (!settings.enabled || settings.permission !== "granted") return;

    const tick = () => {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      const key = `${hh}:${mm}`;
      const firedKey = `iaffirm_fired_${now.toDateString()}_${key}`;
      if (!settings.times.includes(key)) return;
      if (sessionStorage.getItem(firedKey)) return;
      sessionStorage.setItem(firedKey, "1");

      const title = "iAffirm";
      const body = "A quiet moment for kinder self-talk. Open and practice when you can.";

      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "SHOW_NOTIFICATION",
          title,
          body,
          url: "/app",
        });
      } else if (typeof Notification !== "undefined") {
        new Notification(title, { body, icon: "/icons/icon-192.png" });
      }
    };

    tick();
    const id = window.setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [settings.enabled, settings.permission, settings.times]);

  const testNotification = useCallback(async () => {
    await registerSw();
    if (Notification.permission !== "granted") {
      const p = await Notification.requestPermission();
      if (p !== "granted") return false;
    }
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "SHOW_NOTIFICATION",
        title: "iAffirm",
        body: "Test reminder — your practice is one tap away.",
        url: "/app",
      });
    } else {
      new Notification("iAffirm", {
        body: "Test reminder — your practice is one tap away.",
        icon: "/icons/icon-192.png",
      });
    }
    return true;
  }, [registerSw]);

  return {
    ready,
    settings,
    requestPermission,
    setEnabled,
    setTimes,
    testNotification,
    registerSw,
  };
}
