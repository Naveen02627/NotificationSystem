import React from "react";

/**
 * Small, purpose-built icon set rendered as inline SVG.
 * Kept local (no icon library dependency) to avoid adding
 * unnecessary packages to the project.
 */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2.2" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
);

export const TagIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
    <path d="M12.6 3.4 20 10.8a2 2 0 0 1 0 2.8l-6.4 6.4a2 2 0 0 1-2.8 0L3.4 12.6a2 2 0 0 1-.58-1.5L3 4.6A1.6 1.6 0 0 1 4.6 3l6.5-.18a2 2 0 0 1 1.5.58Z" />
    <circle cx="8.6" cy="8.6" r="1.4" />
  </svg>
);

export const MessageIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
    <path d="M4 5h16v11H8.5L4 19.5Z" />
  </svg>
);

export const SendIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
    <path d="M21 3 3 10.5l7 2.7L21 3Zm0 0-7.7 18-2.7-7.2" />
  </svg>
);

export const CheckCircleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.2 12.4 2.6 2.6 5-5.4" />
  </svg>
);

export const AlertIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
    <path d="M10.3 4.1 2.6 18a1.8 1.8 0 0 0 1.55 2.7h15.7A1.8 1.8 0 0 0 21.4 18L13.7 4.1a1.8 1.8 0 0 0-3.4 0Z" />
    <path d="M12 9.6v4.3" />
    <path d="M12 17v.01" />
  </svg>
);

export const LayersIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
    <path d="m12 3 8.5 4.6L12 12.2 3.5 7.6Z" />
    <path d="m3.5 12 8.5 4.6 8.5-4.6" />
    <path d="m3.5 16.4 8.5 4.6 8.5-4.6" />
  </svg>
);

export const MenuIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
    <path d="M4 6.5h16M4 12h16M4 17.5h16" />
  </svg>
);

export const ExternalLinkIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
    <path d="M14 4h6v6" />
    <path d="M10 14 20 4" />
    <path d="M18 13.5V19a1.6 1.6 0 0 1-1.6 1.6H5A1.6 1.6 0 0 1 3.4 19V7.6A1.6 1.6 0 0 1 5 6h5.5" />
  </svg>
);

export const BoltIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6Z" />
  </svg>
);
