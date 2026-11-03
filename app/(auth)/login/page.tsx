import type { Metadata } from "next";
import Link from "next/link";
import { Notice, UnavailableButton } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <main id="content" className="mx-auto max-w-md px-5 py-16">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight">Log in</h1>
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
        </fieldset>
        <UnavailableButton>Log in</UnavailableButton>
      </form>
      <p className="mt-6 text-sm text-muted">
        New here? <Link href="/register" className="font-semibold text-berry underline">Create an account</Link>
      </p>
    </main>
  );
}
