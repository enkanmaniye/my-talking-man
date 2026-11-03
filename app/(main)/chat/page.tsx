import type { Metadata } from "next";
import { EmptyState, Notice, PageHeader, SampleBadge } from "@/components/ui/primitives";
import { sampleMessages } from "@/lib/mock/sample-data";

export const metadata: Metadata = { title: "Chat" };

export default function ChatPage() {
  return (
    <>
      <PageHeader title="Chat" intro="Talk about anything. Chat will never depend on his game needs." />
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside aria-label="Conversations">
          <EmptyState title="No conversations yet">Past conversations will be listed here.</EmptyState>
        </aside>
        <section aria-label="Conversation" className="flex min-h-[28rem] flex-col rounded-2xl border border-line bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
            <span className="text-sm text-muted">Your daily message limit will show here.</span>
            <SampleBadge />
          </div>
          <ol className="flex flex-1 flex-col gap-3 p-4">
            {sampleMessages.map((message) => (
              <li
                key={message.id}
                className={
                  message.from === "user"
                    ? "ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-berry px-4 py-2 text-white"
                    : "mr-auto max-w-[80%] rounded-2xl rounded-bl-sm bg-sand px-4 py-2"
                }
              >
                {message.text}
              </li>
            ))}
          </ol>
          <form className="flex gap-2 border-t border-line p-3">
            <label htmlFor="message" className="sr-only">Message</label>
            <input
              id="message"
              disabled
              placeholder="Chat is not available yet"
              className="min-w-0 flex-1 cursor-not-allowed rounded-xl border border-line bg-cream px-3 py-2 text-sm"
            />
            <button type="submit" disabled className="cursor-not-allowed rounded-xl bg-sand px-4 py-2 text-sm font-semibold text-muted">
              Send
            </button>
          </form>
        </section>
      </div>
      <div className="mt-5 max-w-2xl">
        <Notice>
          You are always talking to AI. Before chat opens, you will see which
          provider handles messages and how it retains and uses them.
        </Notice>
      </div>
    </>
  );
}
