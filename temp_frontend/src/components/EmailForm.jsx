import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { sendRequest } from "../services/SendRequestService";
import { getSuccessInfo, getErrorInfo, isSuccessStatus } from "../utils/httpStatus";
import FormField from "./ui/FormField";
import Button from "./ui/Button";
import RequestConsole from "./ui/RequestConsole";
import ResultToast from "./ui/ResultToast";
import { MailIcon, TagIcon, MessageIcon, SendIcon } from "./ui/Icons";

const apiUrl = import.meta.env.VITE_API_URL;

const showResultToast = (props) =>
  toast.custom((t) => <ResultToast visible={t.visible} {...props} />, { duration: 5500 });

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [requestState, setRequestState] = useState("idle"); // idle | sending | success | error
  const [lastStatus, setLastStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (subject.trim() == "" || content.trim() == "") {
      toast.error("Enter details");
      return;
    }

    setIsSending(true);
    setRequestState("sending");
    setLastStatus(null);

    const result = await sendRequest({
      email: email,
      message: content,
      subject: "Test Notification",
      type: "EMAIL",
    });

    setIsSending(false);

    const success = result?.ok && isSuccessStatus(result.status);

    if (success) {
      setRequestState("success");
      setLastStatus(result.status);
      const info = getSuccessInfo(result.status);
      showResultToast({
        tone: "success",
        title: info.title,
        status: result.status,
        message: result?.data?.message,
        friendly: info.friendly,
      });
    } else {
      setRequestState("error");
      setLastStatus(result?.status ?? null);
      const info = getErrorInfo(result?.status);
      showResultToast({
        tone: "error",
        title: info.title,
        status: result?.status ?? "—",
        message: result?.data?.message || result?.message,
        friendly: info.friendly,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card view-enter"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.4rem",
        padding: "1.75rem",
        width: "100%",
        maxWidth: "30rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>Send an email</h1>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-soft)" }}>
          Fill in the details below and dispatch a notification email.
        </p>
      </div>

      <RequestConsole endpoint={apiUrl} state={requestState} status={lastStatus} />

      <FormField label="Recipient email" icon={<MailIcon />} htmlFor="email-field">
        <input
          id="email-field"
          className="field-input"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="jane@example.com"
          maxLength={30}
        />
      </FormField>

      <FormField label="Subject" icon={<TagIcon />} htmlFor="subject-field">
        <input
          id="subject-field"
          className="field-input"
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          placeholder="A short, clear subject line"
          maxLength={40}
        />
      </FormField>

      <FormField label="Content" icon={<MessageIcon />} htmlFor="content-field">
        <textarea
          id="content-field"
          className="field-textarea"
          onChange={(e) => setContent(e.target.value)}
          rows={9}
          placeholder="Write your message…"
        ></textarea>
      </FormField>

      <Button type="submit" loading={isSending} icon={<SendIcon />}>
        {isSending ? "Sending…" : "Send"}
      </Button>
    </form>
  );
};

export default EmailForm;
