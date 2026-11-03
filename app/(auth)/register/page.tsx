import type { Metadata } from "next";
import Link from "next/link";
import { Notice, UnavailableButton } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Create an account" };

export default function RegisterPage() {
  return (
    <main id="content" className="mx-auto max-w-md px-5 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight">Create an account</h1>
      <p className="mt-2 mb-6 text-muted">You must be 18 or over to use My Talking Man.</p>
      <Notice>Accounts are not available yet, so this form is disabled.</Notice>
      <form className="mt-6 space-y-4">
        <fieldset disabled className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold">Email</label>
            <input id="email" type="email" className="w-full rounded-xl border border-line bg-white px-3 py-2" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-semibold">Password</label>
            <input id="password" type="password" className="w-full rounded-xl border border-line bg-white px-3 py-2" />
          </div>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1" />
            I confirm that I am 18 or over.
          </label>
        </fieldset>
        <UnavailableButton>Create account</UnavailableButton>
      </form>
      <p className="mt-6 text-sm text-muted">
        Already have an account? <Link href="/login" className="font-semibold text-berry underline">Log in</Link>
      </p>
    </main>
  );
}
