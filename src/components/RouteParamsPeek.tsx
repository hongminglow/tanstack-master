import { getRouteApi, useParams, useSearch } from '@tanstack/react-router'

const guardedIdRouteApi = getRouteApi('/demo/pathless/_guard/$id')

export function RouteParamsPeek() {
  // Type-safe access to a specific route's params/search (without importing the Route object)
  const strictParams = guardedIdRouteApi.useParams()
  const strictSearch = guardedIdRouteApi.useSearch()

  // "From anywhere" access to whatever params/search are currently active
  // (types are looser and values may be missing)
  const looseParams = useParams({ strict: false })
  const looseSearch = useSearch({ strict: false })

  return (
    <div className="mt-6 rounded-lg border border-white/15 bg-white/5 p-5">
      <h3 className="text-lg mb-2">Reading Params Outside the Route File</h3>

      <div className="space-y-3 text-white/80">
        <div>
          <div className="font-medium text-white">
            1) getRouteApi('/demo/pathless/_guard/$id')
          </div>
          <div className="mt-1 font-mono text-white/70">
            params: {JSON.stringify(strictParams)}
          </div>
          <div className="mt-1 font-mono text-white/70">
            search: {JSON.stringify(strictSearch)}
          </div>
        </div>

        <div>
          <div className="font-medium text-white">
            2) useParams/useSearch strict: false
          </div>
          <div className="mt-1 font-mono text-white/70">
            params: {JSON.stringify(looseParams)}
          </div>
          <div className="mt-1 font-mono text-white/70">
            search: {JSON.stringify(looseSearch)}
          </div>
        </div>
      </div>
    </div>
  )
}
