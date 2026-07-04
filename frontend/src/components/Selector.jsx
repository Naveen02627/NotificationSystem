import React from "react";
import { usePageStore } from "../stores/PageSelectorStore";
import { LayersIcon, MailIcon } from "./ui/Icons";

const NAV_ITEMS = [
  { key: "architecture", label: "Architecture", icon: LayersIcon },
  { key: "email", label: "Send email", icon: MailIcon },
];

/**
 * Navigation control. Same underlying store/onClick behaviour as
 * before — `variant` only changes how it's rendered so it can serve
 * as both the desktop sidebar nav and the mobile top tab bar.
 */
const Selector = ({ variant = "sidebar" }) => {
  const { page, setPage } = usePageStore();

  if (variant === "tabs") {
    return (
      <div style={{ display: "inline-flex", borderRadius: "999px", border: "1px solid var(--border-strong)", background: "var(--surface)", padding: "0.25rem" }}>
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const active = page === key;
          return (
            <button
              key={key}
              onClick={() => setPage(key)}
              aria-current={active ? "page" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                border: "none",
                background: active ? "var(--accent)" : "transparent",
                color: active ? "#fff" : "var(--ink-soft)",
                borderRadius: "999px",
                padding: "0.45rem 0.85rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              <Icon width={15} height={15} />
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <nav aria-label="Primary" style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
        const active = page === key;
        return (
          <button
            key={key}
            onClick={() => setPage(key)}
            aria-current={active ? "page" : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              border: "none",
              borderLeft: active ? "3px solid var(--accent)" : "3px solid transparent",
              background: active ? "var(--accent-soft)" : "transparent",
              color: active ? "var(--accent-dark)" : "#c9c5dc",
              borderRadius: "0 10px 10px 0",
              padding: "0.6rem 0.9rem",
              fontSize: "0.87rem",
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.15s ease, color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.background = "transparent";
            }}
          >
            <Icon />
            {label}
          </button>
        );
      })}
    </nav>
  );
};

export default Selector;
