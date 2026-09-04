"use client";

import { Bell } from "lucide-react";
import { useReminders } from "@/hooks/useReminders";

interface RemindersPanelProps {
  isPremium: boolean;
  onNeedPremium: () => void;
  accent?: string;
  muted?: string;
}

export function RemindersPanel({
  isPremium,
  onNeedPremium,
  accent = "#4a7c68",
  muted = "#6f6a63",
}: RemindersPanelProps) {
  const reminders = useReminders();

  if (!reminders.ready) return null;

  const { settings } = reminders;

  return (
    <div className="rounded-2xl border bg-white px-4 py-4 space-y-4" style={{ borderColor: `${accent}20` }}>
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: `${accent}18` }}
        >
          <Bell className="w-4 h-4" style={{ color: accent }} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Gentle reminders</p>
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: muted }}>
            Optional browser notifications at times you choose. Not a streak — just a soft nudge.
          </p>
        </div>
      </div>

      {settings.permission === "unsupported" && (
        <p className="text-xs" style={{ color: muted }}>
          Notifications are not supported in this browser.
        </p>
      )}

      {settings.permission !== "unsupported" && (
        <>
          <label className="flex items-center justify-between gap-3 text-sm">
            <span>Enable reminders</span>
            <input
              type="checkbox"
              checked={settings.enabled && settings.permission === "granted"}
              onChange={async (e) => {
                if (!isPremium) {
                  onNeedPremium();
                  return;
                }
                await reminders.setEnabled(e.target.checked);
              }}
              className="h-4 w-4 rounded border-border"
            />
          </label>

          {!isPremium && (
            <button
              onClick={onNeedPremium}
              className="text-xs font-medium"
              style={{ color: accent }}
            >
              Full practice unlocks scheduled reminders →
            </button>
          )}

          {isPremium && (
            <div className="space-y-2">
              <p className="text-xs" style={{ color: muted }}>
                Times (24h)
              </p>
              <div className="flex flex-wrap gap-2">
                {settings.times.map((t, i) => (
                  <input
                    key={i}
                    type="time"
                    value={t}
                    onChange={(e) => {
                      const next = [...settings.times];
                      next[i] = e.target.value;
                      reminders.setTimes(next);
                    }}
                    className="rounded-xl border border-border px-2 py-1.5 text-sm bg-background"
                  />
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => reminders.setTimes([...settings.times, "12:00"].slice(0, 4))}
                  className="text-xs font-medium"
                  style={{ color: accent }}
                  type="button"
                >
                  Add time
                </button>
                <button
                  onClick={() => reminders.testNotification()}
                  className="text-xs font-medium"
                  style={{ color: muted }}
                  type="button"
                >
                  Send test
                </button>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: muted }}>
                Reminders fire when this browser can show notifications. Keep the site permitted in
                your browser settings. For the most reliable delivery, leave a tab open or install
                as an app when available.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
