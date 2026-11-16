"use client";

import { useState, type FormEvent, type ReactElement } from "react";
import { useProfile } from "@/context/ProfileContext";

const fieldClassName =
  "focus:border-gold w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition-colors placeholder:text-zinc-400 focus:outline-none";

const labelClassName = "text-sm font-medium text-zinc-950";

export type ProfileFormMode = "register" | "sign-in";

type ProfileFormProps = {
  initialMode: ProfileFormMode;
};

type FieldName =
  "firstName" | "lastName" | "email" | "phone" | "password" | "confirmPassword";

type FieldErrors = Partial<Record<FieldName, string>>;

type FormValues = Record<FieldName, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS_PATTERN = /^[0-9+\-()\s]+$/;
const NAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 8;

const resultMessages = {
  exists: "An account already exists in this browser. Sign in instead.",
  "missing-account": "No account was found in this browser. Create one first.",
  "invalid-credentials": "That email and password combination is not correct.",
} as const;

function readValues(formData: FormData): FormValues {
  return {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  };
}

function addError(
  errors: FieldErrors,
  field: FieldName,
  message: string | undefined,
): void {
  if (message) {
    errors[field] = message;
  }
}

function validateName(value: string, label: string): string | undefined {
  if (!value) {
    return `${label} is required.`;
  }

  if (value.length > NAME_MAX_LENGTH) {
    return `${label} must be ${NAME_MAX_LENGTH} characters or fewer.`;
  }

  return undefined;
}

function validateEmail(email: string): string | undefined {
  if (!email) {
    return "Email is required.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address.";
  }

  return undefined;
}

function validatePhone(phone: string): string | undefined {
  if (!phone) {
    return "Phone number is required.";
  }

  if (!PHONE_CHARS_PATTERN.test(phone)) {
    return "Use only digits, spaces, +, -, or parentheses.";
  }

  const digitCount = phone.replace(/\D/g, "").length;

  if (digitCount < 7 || digitCount > 15) {
    return "Enter a phone number with 7 to 15 digits.";
  }

  return undefined;
}

function validateNewPassword(password: string): string | undefined {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Use at least ${PASSWORD_MIN_LENGTH} characters.`;
  }

  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "Include at least one letter and one number.";
  }

  return undefined;
}

function validateRegister(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  addError(errors, "firstName", validateName(values.firstName, "First name"));
  addError(errors, "lastName", validateName(values.lastName, "Last name"));
  addError(errors, "email", validateEmail(values.email));
  addError(errors, "phone", validatePhone(values.phone));
  addError(errors, "password", validateNewPassword(values.password));

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

function validateSignIn(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  addError(errors, "email", validateEmail(values.email));

  if (!values.password) {
    errors.password = "Password is required.";
  }

  return errors;
}

type FieldProps = {
  id: string;
  name: FieldName;
  label: string;
  autoComplete: string;
  placeholder: string;
  type?: "text" | "email" | "password" | "tel";
  error?: string;
};

function Field({
  id,
  name,
  label,
  autoComplete,
  placeholder,
  type = "text",
  error,
}: FieldProps): ReactElement {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClassName}
      />
      {error ? (
        <p id={errorId} className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ProfileForm({
  initialMode,
}: ProfileFormProps): ReactElement {
  const { register, signIn, isRegistered } = useProfile();
  const [mode, setMode] = useState<ProfileFormMode>(initialMode);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegister = mode === "register";
  const submitLabel = isRegister ? "Create account" : "Sign in";
  const pendingLabel = isRegister ? "Creating account…" : "Signing in…";

  function switchMode(nextMode: ProfileFormMode): void {
    setMode(nextMode);
    setErrors({});
    setFormError(null);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const values = readValues(new FormData(event.currentTarget));
    const nextErrors = isRegister
      ? validateRegister(values)
      : validateSignIn(values);

    setErrors(nextErrors);
    setFormError(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isRegister) {
        const result = await register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password,
        });

        if (!result.ok) {
          setFormError(resultMessages[result.reason]);
        }
      } else {
        const result = await signIn({
          email: values.email,
          password: values.password,
        });

        if (!result.ok) {
          setFormError(resultMessages[result.reason]);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
          {isRegister ? "Create your account" : "Sign in"}
        </h2>
        <p className="text-sm leading-6 text-zinc-600">
          {isRegister
            ? "Your account is saved in this browser only."
            : "Use the email and password you registered with."}
        </p>
      </div>

      {isRegister ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field
              id="profile-first-name"
              name="firstName"
              label="First name"
              autoComplete="given-name"
              placeholder="Jane"
              error={errors.firstName}
            />
            <Field
              id="profile-last-name"
              name="lastName"
              label="Last name"
              autoComplete="family-name"
              placeholder="Doe"
              error={errors.lastName}
            />
          </div>

          <Field
            id="profile-email"
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            error={errors.email}
          />

          <Field
            id="profile-phone"
            name="phone"
            label="Phone number"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 010 2030"
            error={errors.phone}
          />

          <Field
            id="profile-password"
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            error={errors.password}
          />

          <Field
            id="profile-confirm-password"
            name="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            error={errors.confirmPassword}
          />
        </>
      ) : (
        <>
          <Field
            id="profile-email"
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            error={errors.email}
          />

          <Field
            id="profile-password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            error={errors.password}
          />
        </>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gold hover:bg-gold/90 focus-visible:outline-gold inline-flex items-center justify-center self-start rounded-lg px-10 py-3 text-sm font-medium tracking-wide text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? pendingLabel : submitLabel}
      </button>

      {isRegistered ? (
        <button
          type="button"
          onClick={() => switchMode(isRegister ? "sign-in" : "register")}
          className="text-gold self-start text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 dark:focus-visible:outline-zinc-50"
        >
          {isRegister
            ? "Already have an account? Sign in"
            : "Create a new account"}
        </button>
      ) : null}

      {formError ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
        >
          {formError}
        </p>
      ) : null}
    </form>
  );
}
