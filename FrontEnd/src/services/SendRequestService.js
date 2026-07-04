const url = import.meta.env.VITE_API_URL;

/**
 * Sends the notification request.
 *
 * IMPORTANT: the endpoint, HTTP method, headers and request body are
 * unchanged from the original implementation. The only change here is
 * that this function now returns a structured result instead of only
 * logging to the console, so the UI can display the HTTP status code
 * and any backend message on both success and failure.
 */
export const sendRequest = async (data) => {
  console.log("sent data- ", data);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let body = null;
    try {
      body = await response.json();
    } catch {
      // Response had no JSON body — that's fine, keep body as null.
      body = null;
    }

    console.log(body);

    return {
      ok: response.ok,
      status: response.status,
      data: body,
    };
  } catch (error) {
    console.error("Error: ", error);
    return {
      ok: false,
      status: null,
      data: null,
      networkError: true,
      message: error?.message,
    };
  }
};
