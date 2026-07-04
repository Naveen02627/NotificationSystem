/**
 * Maps an HTTP status code to display copy for notifications.
 * This is purely presentational — it does not affect what is
 * sent to the backend or how responses are parsed.
 */

const SUCCESS_CODES = {
  200: { title: "Request completed", friendly: "The server processed your request successfully." },
  201: { title: "Created", friendly: "The resource was created successfully." },
  202: { title: "Accepted", friendly: "The request was accepted and is being processed." },
  204: { title: "Done", friendly: "The request succeeded with no additional content returned." },
};

const ERROR_CODES = {
  400: { title: "Bad request", friendly: "The server couldn't understand this request. Check the form fields and try again." },
  401: { title: "Not authenticated", friendly: "You're not authenticated for this action. Please sign in and try again." },
  403: { title: "Forbidden", friendly: "You don't have permission to perform this action." },
  404: { title: "Not found", friendly: "The requested endpoint or resource doesn't exist." },
  409: { title: "Conflict", friendly: "This request conflicts with the current state of the resource." },
  422: { title: "Invalid data", friendly: "Some of the submitted data couldn't be validated." },
  429: { title: "Too many requests", friendly: "You're sending requests too quickly. Please wait a moment and try again." },
  500: { title: "Server error", friendly: "Something went wrong on the server. Please try again shortly." },
  502: { title: "Bad gateway", friendly: "The server received an invalid response from an upstream service." },
  503: { title: "Service unavailable", friendly: "The service is temporarily unavailable. Please try again shortly." },
};

export function getSuccessInfo(status) {
  return (
    SUCCESS_CODES[status] || {
      title: "Success",
      friendly: "The request completed successfully.",
    }
  );
}

export function getErrorInfo(status) {
  return (
    ERROR_CODES[status] || {
      title: status ? `Request failed` : "Network error",
      friendly: status
        ? "The request failed and returned an unexpected status code."
        : "Couldn't reach the server. Check your connection and try again.",
    }
  );
}

export function isSuccessStatus(status) {
  return status in SUCCESS_CODES || (status >= 200 && status < 300);
}
