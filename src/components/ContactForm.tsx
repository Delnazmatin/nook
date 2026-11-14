"use client";

import { useState, type FormEvent } from "react";

const fieldClassName =
  "focus:border-gold w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition-colors placeholder:text-zinc-400 focus:outline-none";

const labelClassName = "text-sm font-medium text-zinc-950";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setIsSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={labelClassName}>
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jane Doe"
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClassName}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@example.com"
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className={labelClassName}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="How can we help?"
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell us a little more about your question."
          className={`${fieldClassName} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="bg-gold hover:bg-gold/90 focus-visible:outline-gold inline-flex items-center justify-center self-start rounded-lg px-10 py-3 text-sm font-medium tracking-wide text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Submit
      </button>

      {isSubmitted ? (
        <p
          role="status"
          className="border-gold/30 bg-sand rounded-lg border px-4 py-3 text-sm leading-6 text-zinc-800"
        >
          Thanks for reaching out — we&apos;ll get back to you within one
          business day.
        </p>
      ) : null}
    </form>
  );
}
