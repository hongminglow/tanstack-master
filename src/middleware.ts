import { createMiddleware } from '@tanstack/react-start'

function auth() {
  return Math.random() > 0.5
}

export const authMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    if (!auth()) {
      throw new Error('Not authenticated!!')
    }
    return next()
  },
)
