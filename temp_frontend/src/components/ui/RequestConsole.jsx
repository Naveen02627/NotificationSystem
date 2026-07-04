import React, { useMemo } from "react";

/**
 * A small "live console" strip that shows the request this form
 * will make, and its current state (idle / sending / result).
 * Purely presentational — reads only from props passed by EmailForm.
 */
const RequestConsole = ({ endpoint, state, status }) => {
  const host = useMemo(() => {
    if (!endpoint) return "not configured";
    try {
      const u = new URL(endpoint);
      return u.host + (u.pathname !== "/" ? u.pathname : "");
    } catch {
      return endpoint;
    }
  }, [endpoint]);

  let dotColor = "var(--ink-faint)";
  let label = "Idle";
  let labelColor = "var(--ink-soft)";
  let pulsing = false;

  if (state === "sending") {
    dotColor = "var(--accent-blue)";
    labelColor = "var(--accent-blue)";
    label = "Sending…";
    pulsing = true;
  } else if (state === "success") {
    dotColor = "var(--success)";
    labelColor = "var(--success)";
    label = status ? `${status} OK` : "Success";
  } else if (state === "error") {
    dotColor = "var(--error)";
    labelColor = "var(--error)";
    label = status ? `${status} Error` : "Error";
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        background: "var(--ink)",
        color: "#d7d2ea",
        borderRadius: "var(--radius-sm)",
        padding: "0.55rem 0.8rem",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0 }}>
        <span
          style={{
            background: "var(--accent)",
            color: "#fff",
            borderRadius: "4px",
            padding: "0.1rem 0.35rem",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          POST
        </span>
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "#a49dc2",
          }}
          title={endpoint}
        >
          {host}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
        <span
          className={pulsing ? "pulse-dot" : ""}
          style={{
            width: 7,
            height: 7,
            borderRadius: "999px",
            background: dotColor,
            color: dotColor,
            display: "inline-block",
          }}
        />
        <span style={{ color: labelColor, fontWeight: 600 }}>{label}</span>
      </div>
    </div>
  );
};

export default RequestConsole;
