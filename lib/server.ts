import { createServerClient } from '@supabase/ssr'
import { type GetServerSidePropsContext, type NextApiRequest, type NextApiResponse } from 'next'

type CookieContext =
  | GetServerSidePropsContext
  | { req: NextApiRequest; res: NextApiResponse }

export function createClient(context?: CookieContext) {
  const req = context?.req
  const res = context?.res

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(req?.cookies ?? {}).map(([name, value]) => ({
            name,
            value: value ?? '',
          }))
        },
        setAll(cookiesToSet) {
          if (!res) return
          cookiesToSet.forEach(({ name, value, options }) => {
            res.setHeader(
              'Set-Cookie',
              `${name}=${value}; Path=${options?.path ?? '/'}${
                options?.maxAge ? `; Max-Age=${options.maxAge}` : ''
              }${options?.httpOnly ? '; HttpOnly' : ''}${
                options?.secure ? '; Secure' : ''
              }${options?.sameSite ? `; SameSite=${options.sameSite}` : ''}`
            )
          })
        },
      },
    }
  )
}