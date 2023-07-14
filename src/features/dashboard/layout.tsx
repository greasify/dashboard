import Head from 'next/head'
import { AppShell, Container, Title } from '@mantine/core'
import { DashboardNavbar } from './navbar'

type Props = {
  title?: string
  children: React.ReactNode
}

export function DashboardLayout({ title = '', children }: Props) {
  return (
    <AppShell navbar={<DashboardNavbar />}>
      <Head>
        <title>Greasify :: {title}</title>
      </Head>
      <Container size="lg">
        <Title mb="lg">{title}</Title>
        {children}
      </Container>
    </AppShell>
  )
}
