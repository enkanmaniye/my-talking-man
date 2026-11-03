export default function Loading() {
  return (
    <div role="status" className="animate-pulse space-y-4">
      <div className="h-9 w-48 rounded-xl bg-sand" />
      <div className="h-64 rounded-2xl bg-sand" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
