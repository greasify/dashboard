import Head from 'next/head'
import { AppShell, Container, Title } from '@mantine/core'
import { DashboardNavbar } from './navbar'

type Props = {
  title?: string
  children: React.ReactNode
}

export function DashboardLayout({ title: subTitle = '', children }: Props) {
  const title = `Greasify :: ${subTitle}`

  return (
    <AppShell navbar={<DashboardNavbar />}>
      <Head>
        <title>{title}</title>
      </Head>
      <Container size="lg">
        <Title mb="lg">{title}</Title>
        {children}
      </Container>
    </AppShell>
  )
}
