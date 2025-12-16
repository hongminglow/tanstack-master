import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

// Toggle this boolean to see the guard redirect behavior.
const ALLOW_GUARDED_DEMO =
  (import.meta.env.VITE_ALLOW_GUARDED_DEMO ?? 'true') === 'true'

export const Route = createFileRoute('/demo/pathless/_guard')({
  beforeLoad: () => {
    if (!ALLOW_GUARDED_DEMO) {
      throw redirect({ to: '/demo/start/server-funcs' })
    }
  },
  component: GuardLayout,
})

function GuardLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white">
      <div className="w-full max-w-3xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
        <h1 className="text-2xl mb-2">Pathless Route Wrapper (Guard)</h1>
        <p className="text-white/80">
          This route uses a <span className="font-mono">_guard</span> segment,
          which is removed from the URL. Toggle{' '}
          <span className="font-mono">ALLOW_GUARDED_DEMO</span> to see a
          redirect.
        </p>

        <Outlet />
      </div>
    </div>
  )
}
