import { AppShell } from '@mantine/core'
import { DashboardNavbar } from './navbar'

export function DashboardLayout(props: React.PropsWithChildren) {
  return <AppShell navbar={<DashboardNavbar />}>{props.children}</AppShell>
}
