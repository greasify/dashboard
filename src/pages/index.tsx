import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { LoginPage } from '~/components/login-form'
import type { Database } from '~/libs/database.types'

export default function Login() {
  return <LoginPage />
}
