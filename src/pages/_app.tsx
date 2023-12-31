import { SessionProvider } from 'next-auth/react'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { api } from '~/utils/api'
import type { NextPage } from 'next'
import type { Session } from 'next-auth'
import type { AppProps } from 'next/app'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  session: Session | null
}

const App = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: 'dark' }}
    >
      <SessionProvider session={session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
      <Notifications />
    </MantineProvider>
  )
}

export default api.withTRPC(App)
