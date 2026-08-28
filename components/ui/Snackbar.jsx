"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// SnackbarData shape:
// { id, key?, icon, message, duration?, actionLabel?, onAction?,
//   secondActionLabel?, onSecondAction?, onDismiss? }
// `key`: when set, a new snackbar sharing this key replaces any existing one
// with the same key synchronously, instead of stacking (used for persistent
// nudges that could otherwise be triggered by more than one mounted
// instance of the same component at once).
// `secondActionLabel`/`onSecondAction`: when set alongside actionLabel,
// renders both actions on their own row below the message instead of
// inline (e.g. "Allow" / "Decline").

const listeners = [];
const dismissHandlers = new Map();

export function snackbar({
  key,
  icon,
  message,
  duration,
  actionLabel,
  onAction,
  secondActionLabel,
  onSecondAction,
  onDismiss,
}) {
  const id = Math.random().toString(36).slice(2);
  listeners.forEach((fn) =>
    fn({
      id,
      key,
      icon,
      message,
      duration,
      actionLabel,
      onAction,
      secondActionLabel,
      onSecondAction,
      onDismiss,
    }),
  );
  return id;
}

export function dismissSnackbar(id) {
  dismissHandlers.get(id)?.();
}

export function dismissAllSnackbars() {
  for (const dismiss of dismissHandlers.values()) dismiss();
}

function SnackbarItem({ data, onRemove }) {
  const [exiting, setExiting] = useState(false);
  const displayMessage =
    typeof data.message === "string" ? data.message.slice(0, 48) : data.message;

  useEffect(() => {
    if (data.duration === 0) return;
    const dur = data.duration ?? 5000;
    const t1 = setTimeout(() => setExiting(true), dur);
    const t2 = setTimeout(() => {
      data.onDismiss?.();
      onRemove();
    }, dur + 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [data.duration, onRemove]);

  useEffect(() => {
    dismissHandlers.set(data.id, () => {
      setExiting(true);
      setTimeout(onRemove, 200);
    });
    return () => {
      dismissHandlers.delete(data.id);
    };
  }, [data.id, onRemove]);

  function handleAction() {
    data.onAction?.();
    setExiting(true);
    setTimeout(onRemove, 200);
  }

  function handleSecondAction() {
    data.onSecondAction?.();
    setExiting(true);
    setTimeout(onRemove, 200);
  }

  const hasTwoActions = !!data.actionLabel && !!data.secondActionLabel;

  return (
    <div
      data-cursor="white"
      style={{
        animation: `${exiting ? "snackbar-out 200ms ease" : "snackbar-in 400ms cubic-bezier(0.21,1.02,0.73,1)"} forwards`,
      }}
      className={`pointer-events-auto w-full max-w-sm bg-[#212121] rounded-xl px-5 py-3.5 shadow-[0px_2px_4px_0px_rgba(64,64,64,0.14)] ${
        hasTwoActions ? "flex flex-col gap-3" : "flex items-center gap-3"
      }`}
    >
      <div className="flex items-center gap-3">
        {data.icon && (
          <span className="size-6 shrink-0 text-cream flex items-center justify-center">
            {data.icon}
          </span>
        )}
        <p className="text-body-sm text-cream flex-1">{displayMessage}</p>
        {data.actionLabel && !hasTwoActions && (
          <button
            onClick={handleAction}
            className="text-body-xs text-gray-100 shrink-0 cursor-pointer"
          >
            {data.actionLabel}
          </button>
        )}
      </div>
      {hasTwoActions && (
        <div className="flex items-center justify-end gap-6">
          <button
            onClick={handleAction}
            className="text-body-xs font-semibold text-cream shrink-0 cursor-pointer"
          >
            {data.actionLabel}
          </button>
          <button
            onClick={handleSecondAction}
            className="text-body-xs font-semibold text-gray-100 shrink-0 cursor-pointer"
          >
            {data.secondActionLabel}
          </button>
        </div>
      )}
    </div>
  );
}

export function Snackbar() {
  const [snackbars, setSnackbars] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const listener = (s) =>
      setSnackbars((prev) => [
        ...prev.filter((x) => !(s.key && x.key === s.key)).slice(-2),
        s,
      ]);
    listeners.push(listener);
    return () => {
      listeners.splice(listeners.indexOf(listener), 1);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-x-0 bottom-0 z-[70] flex flex-col gap-2 items-center px-[var(--side-spacing)] pb-[var(--side-spacing)] pointer-events-none">
      {snackbars.map((s) => (
        <SnackbarItem
          key={s.id}
          data={s}
          onRemove={() =>
            setSnackbars((prev) => prev.filter((x) => x.id !== s.id))
          }
        />
      ))}
    </div>,
    document.body,
  );
}
