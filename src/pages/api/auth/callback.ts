import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { env } from '~/env.mjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query

  if (code) {
    const supabase = createPagesServerClient(
      { req, res },
      {
        supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    )
    await supabase.auth.exchangeCodeForSession(String(code))
  }

  res.redirect('/')
}

export default handler
