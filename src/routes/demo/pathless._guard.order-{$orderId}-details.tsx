import { Link, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const ParamsSchema = z.object({
  // "$orderId" is embedded between a prefix and suffix:
  // order-{ $orderId }-details
  orderId: z.coerce.number().int().positive(),
})

// ** Routes defined with prefix, in this case "order-" and suffix "-details" **
export const Route = createFileRoute(
  '/demo/pathless/_guard/order-{$orderId}-details',
)({
  parseParams: (params) => ParamsSchema.parse(params),
  stringifyParams: (params) => ({ orderId: String(params.orderId) }),
  component: RouteComponent,
})

function RouteComponent() {
  const { orderId } = Route.useParams()

  return (
    <div className="mt-6 rounded-lg border border-white/15 bg-white/5 p-5">
      <h2 className="text-xl mb-2">Prefix + Suffix Param Segment</h2>

      <p className="text-white/80">
        This route embeds a param inside a single URL segment using curly
        braces:
      </p>

      <div className="mt-2 font-mono text-white/70">
        /demo/pathless/order-{'{'}$orderId{'}'}-details
      </div>

      <div className="mt-3 text-white/80">
        <span className="font-medium text-white">params.orderId</span> (number):{' '}
        {orderId}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to="/demo/pathless/order-{$orderId}-details"
          params={{ orderId: orderId + 1 }}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
        >
          Next orderId ({orderId + 1})
        </Link>

        <Link
          to="/demo/pathless/$id"
          params={{ id: orderId }}
          className="bg-white/10 hover:bg-white/15 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
        >
          Back to /demo/pathless/$id
        </Link>
      </div>

      <p className="mt-4 text-sm text-white/60">
        Try URL:{' '}
        <span className="font-mono">/demo/pathless/order-123-details</span>
      </p>
    </div>
  )
}
