import React from "react";

/**
 * Reusable labeled field wrapper. Purely presentational — the
 * actual <input>/<textarea> element and its value/onChange are
 * still fully controlled by the parent form.
 */
const FormField = ({ label, icon, htmlFor, hint, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
    <label
      htmlFor={htmlFor}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--ink-soft)",
      }}
    >
      {icon}
      {label}
    </label>
    {children}
    {hint ? (
      <span style={{ fontSize: "0.74rem", color: "var(--ink-faint)" }}>{hint}</span>
    ) : null}
  </div>
);

export default FormField;
