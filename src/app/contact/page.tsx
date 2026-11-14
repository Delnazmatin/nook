import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Cataloge",
  description:
    "Get in touch with the Cataloge team about products, orders, or design questions.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        Get in Touch With Us
      </h1>
      <p className="mt-4 text-base leading-7 text-zinc-600">
        Have a question about a product, an order, or styling your space? Send
        us a message and our team will reply within one business day.
      </p>

      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
