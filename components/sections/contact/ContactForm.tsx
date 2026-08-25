"use client";

import {
  useId,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { contactInfo } from "@/data/contact";

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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    const subject = encodeURIComponent(
      `Portfolio inquiry from ${form.name.trim()}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`,
    );

    // Opens the visitor's mail client — no backend required.
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      setStatus("sent");
      setForm(initial);
    }, 400);
  };

  const onFieldChange =
    (key: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
      if (status !== "idle") setStatus("idle");
    };

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
          <span>{status === "sending" ? "Opening mail…" : "Send message"}</span>
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
          className="font-sketch text-[1.15rem] text-teal-700/80"
          aria-live="polite"
        >
          {status === "sent"
            ? "Your mail client should open with the message ready."
            : status === "error"
              ? "Check the fields above and try again."
              : "Opens your email app to send."}
        </p>
      </div>
    </form>
  );
}
