import React from "react";
import { CheckCircleIcon, AlertIcon } from "./Icons";

/**
 * Presentational notification card. Rendered inside toast.custom()
 * from EmailForm — does not perform any network or business logic.
 */
const ResultToast = ({ visible, tone, title, status, message, friendly }) => {
  const isSuccess = tone === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className="view-enter"
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "flex-start",
        width: "min(23rem, 90vw)",
        background: "var(--surface)",
        border: `1px solid ${isSuccess ? "var(--success-border)" : "var(--error-border)"}`,
        borderLeft: `4px solid ${isSuccess ? "var(--success)" : "var(--error)"}`,
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-lg)",
        padding: "0.9rem 1rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s ease",
      }}
    >
      <div
        style={{
          color: isSuccess ? "var(--success)" : "var(--error)",
          flexShrink: 0,
          marginTop: "0.1rem",
        }}
      >
        {isSuccess ? <CheckCircleIcon /> : <AlertIcon />}
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--ink)" }}>
            {title}
          </span>
          {status ? (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                fontWeight: 600,
                padding: "0.1rem 0.4rem",
                borderRadius: "999px",
                background: isSuccess ? "var(--success-bg)" : "var(--error-bg)",
                color: isSuccess ? "var(--success)" : "var(--error)",
              }}
            >
              {status}
            </span>
          ) : null}
        </div>

        {message ? (
          <p
            style={{
              margin: "0.3rem 0 0",
              fontSize: "0.82rem",
              color: "var(--ink-soft)",
              wordBreak: "break-word",
            }}
          >
            {message}
          </p>
        ) : null}

        {friendly ? (
          <p
            style={{
              margin: "0.25rem 0 0",
              fontSize: "0.78rem",
              color: "var(--ink-faint)",
            }}
          >
            {friendly}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ResultToast;
