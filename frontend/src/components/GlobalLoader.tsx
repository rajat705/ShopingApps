export default function GlobalLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div className="rounded bg-white px-6 py-3 text-sm">
        Loading...
      </div>
    </div>
  )
}
