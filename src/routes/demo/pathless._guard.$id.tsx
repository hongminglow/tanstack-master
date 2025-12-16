import { Link, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const ParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

const SearchSchema = z.object({
  highlight: z.coerce.boolean().optional(),
})

// ** Route defined with "_" prefix are pathless routes, not reflected in the url
export const Route = createFileRoute('/demo/pathless/_guard/$id')({
  // Validates + types Route.useParams()
  parseParams: (params) => ParamsSchema.parse(params),
  stringifyParams: (params) => ({ id: String(params.id) }),

  // Validates + types Route.useSearch()
  validateSearch: (search) => SearchSchema.parse(search),

  loader: ({ params }) => {
    // params.id is a number here (after parseParams)
    return {
      squared: params.id * params.id,
    }
  },

  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const search = Route.useSearch()
  const data = Route.useLoaderData()

  return (
    <div className="mt-6 rounded-lg border border-white/15 bg-white/5 p-5">
      <h2 className="text-xl mb-2">Dynamic Segment + Typed Params</h2>

      <div className="space-y-1 text-white/80">
        <div>
          <span className="font-medium text-white">URL</span> (note: _guard is
          hidden):
          <div className="mt-1 font-mono text-white/70">
            /demo/pathless/{id}
          </div>
        </div>

        <div>
          <span className="font-medium text-white">params.id</span> (number):{' '}
          {id}
        </div>
        <div>
          <span className="font-medium text-white">search.highlight</span>{' '}
          (boolean | undefined): {String(search.highlight)}
        </div>
        <div>
          <span className="font-medium text-white">loader.squared</span>:{' '}
          {data.squared}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to="/demo/pathless/$id"
          // ** Preload props allows preloading the split chunk based on values (viewport/render)
          preload="viewport"
          params={{ id: id + 1 }}
          search={{ highlight: search.highlight }}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
        >
          Next id ({id + 1})
        </Link>

        <Link
          to="/demo/pathless/$id"
          params={{ id }}
          search={{ highlight: !search.highlight }}
          className="bg-white/10 hover:bg-white/15 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
        >
          Toggle highlight
        </Link>
      </div>

      <p className="mt-4 text-sm text-white/60">
        Try:{' '}
        <span className="font-mono">/demo/pathless/123?highlight=true</span>
      </p>
    </div>
  )
}
