import React from "react";

const Spinner = () => (
  <svg
    className="spinner"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const Button = ({ children, loading, icon, className = "", ...rest }) => (
  <button className={`btn-primary ${className}`} disabled={loading || rest.disabled} {...rest}>
    {loading ? <Spinner /> : icon}
    <span>{children}</span>
  </button>
);

export default Button;
