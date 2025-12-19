import { createFileRoute, useRouteContext } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/router-context')({
  loader: ({ context }) => {
    return {
      appName: context.appName,
      mode: context.mode,
      demoFlag: context.featureFlags.routerContextDemo,
      queryCacheCount: context.queryClient.getQueryCache().getAll().length,
    }
  },
  component: RouterContextDemo,
})

function RouterContextDemo() {
  const data = Route.useLoaderData()

  // Accessing the same DI values in a component via the route context hook.
  // (In practice, you can also access route context in loaders/beforeLoad via `({ context }) => ...`.)
  const ctx = useRouteContext({ from: '/demo/router-context' })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white">
      <div className="w-full max-w-3xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
        <h1 className="text-2xl mb-2">
          createRootRouteWithContext (Dependency Injection)
        </h1>

        <p className="text-white/80">
          This app's root route defines the{' '}
          <span className="font-mono">MyRouterContext</span> type via{' '}
          <span className="font-mono">createRootRouteWithContext</span>. The
          router instance then supplies runtime values via{' '}
          <span className="font-mono">
            createRouter({'{'} context {'}'})
          </span>
          .
        </p>

        <div className="mt-5 grid gap-3">
          <div className="rounded-lg border border-white/15 bg-white/5 p-4">
            <div className="font-semibold">1) Read context in a loader</div>
            <div className="mt-2 space-y-1 font-mono text-sm text-white/70">
              <div>appName: {JSON.stringify(data.appName)}</div>
              <div>mode: {JSON.stringify(data.mode)}</div>
              <div>
                featureFlags.routerContextDemo: {JSON.stringify(data.demoFlag)}
              </div>
              <div>queryCacheCount: {JSON.stringify(data.queryCacheCount)}</div>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/5 p-4">
            <div className="font-semibold">2) Read context in a component</div>
            <div className="mt-2 space-y-1 font-mono text-sm text-white/70">
              <div>appName: {JSON.stringify(ctx.appName)}</div>
              <div>mode: {JSON.stringify(ctx.mode)}</div>
              <div>
                featureFlags.routerContextDemo:{' '}
                {JSON.stringify(ctx.featureFlags.routerContextDemo)}
              </div>
              <div>queryClient: {ctx.queryClient ? 'present' : 'missing'}</div>
            </div>
          </div>
        </div>

        <div className="mt-5 text-sm text-white/60">
          Where it comes from:
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              Root type:{' '}
              <span className="font-mono">src/routes/__root.tsx</span>
            </li>
            <li>
              Runtime values: <span className="font-mono">src/router.tsx</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
