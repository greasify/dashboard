import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

export const LoginPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  async function signIn() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/api/auth/callback`
      }
    })

    console.log({ data, error })
  }

  return (
    <>
      {user ? (
        <>
          <button onClick={() => supabaseClient.auth.signOut()}>
            Sign out
          </button>
          <p>user:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </>
  )
}
