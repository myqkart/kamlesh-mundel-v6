"use client";

import emailjs from "@emailjs/browser";
import {
  useId,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { emailJsConfig } from "@/data/contact";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = "idle" | "sending" | "sent" | "error";

const initial: FormState = { name: "", email: "", message: "" };

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const formId = useId();
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!isValidEmail(form.email.trim()))
      next.email = "Please enter a valid email.";
    if (!form.message.trim()) next.message = "Please write a short message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        },
        { publicKey: emailJsConfig.publicKey },
      );

      setStatus("sent");
      setForm(initial);
    } catch {
      setStatus("error");
      setSubmitError("Couldn't send just now — try again in a moment.");
    }
  };

  const onFieldChange =
    (key: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
      if (status !== "idle") setStatus("idle");
      if (submitError) setSubmitError(null);
    };

  const statusMessage =
    status === "sent"
      ? "Message sent — I'll get back to you soon."
      : status === "sending"
        ? "Sending…"
        : submitError
          ? submitError
          : status === "error"
            ? "Check the fields above and try again."
            : "I'll reply by email.";

  return (
    <form
      className="contact-form cred-write"
      style={{ animationDelay: "420ms" }}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="contact-field">
        <label htmlFor={`${formId}-name`} className="contact-label">
          Name
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={form.name}
          aria-invalid={Boolean(errors.name) || undefined}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          className={`contact-input ${errors.name ? "is-invalid" : ""}`}
          onChange={onFieldChange("name")}
          disabled={status === "sending"}
        />
        {errors.name ? (
          <p id={`${formId}-name-error`} className="contact-error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="contact-field">
        <label htmlFor={`${formId}-email`} className="contact-label">
          Email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          aria-invalid={Boolean(errors.email) || undefined}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          className={`contact-input ${errors.email ? "is-invalid" : ""}`}
          onChange={onFieldChange("email")}
          disabled={status === "sending"}
        />
        {errors.email ? (
          <p id={`${formId}-email-error`} className="contact-error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="contact-field">
        <label htmlFor={`${formId}-message`} className="contact-label">
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          required
          value={form.message}
          aria-invalid={Boolean(errors.message) || undefined}
          aria-describedby={
            errors.message ? `${formId}-message-error` : undefined
          }
          className={`contact-input ${errors.message ? "is-invalid" : ""}`}
          onChange={onFieldChange("message")}
          disabled={status === "sending"}
        />
        {errors.message ? (
          <p
            id={`${formId}-message-error`}
            className="contact-error"
            role="alert"
          >
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="contact-submit"
          disabled={status === "sending"}
        >
          <span>{status === "sending" ? "Sending…" : "Send message"}</span>
          <svg
            aria-hidden="true"
            className="cta-arrow h-3 w-5 overflow-visible"
            fill="none"
            viewBox="0 0 20 12"
          >
            <path
              d="M1 6h16M13 2l4 4-4 4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </button>

        <p
          className={`font-sketch text-[1.15rem] ${
            submitError || (status === "error" && !submitError && Object.keys(errors).length)
              ? "text-[rgb(140_45_45)]"
              : status === "sent"
                ? "text-teal-700"
                : "text-teal-700/80"
          }`}
          aria-live="polite"
        >
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
