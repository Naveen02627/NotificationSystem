import React from "react";
import arch from "../images/img.jpeg";
import { LayersIcon, ExternalLinkIcon } from "./ui/Icons";

const Architecture = () => {
  return (
    <div
      className="card view-enter"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem",
        padding: "1.5rem",
        width: "100%",
        maxWidth: "48rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--accent)" }}>
              <LayersIcon />
            </span>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
              System architecture
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-soft)", maxWidth: "34rem" }}>
            A reference diagram of how a request submitted from this app travels through
            the backend to final delivery.
          </p>
        </div>

        <a
          href={arch}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--accent)",
            textDecoration: "none",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--radius-sm)",
            padding: "0.45rem 0.75rem",
            flexShrink: 0,
            transition: "background 0.15s ease, border-color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-soft)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Open full size <ExternalLinkIcon />
        </a>
      </div>

      <div
        style={{
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border)",
          background: "var(--neutral-bg)",
          overflow: "hidden",
        }}
      >
        <img
          src={arch}
          alt="Diagram of the notification delivery architecture"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
};

export default Architecture;
