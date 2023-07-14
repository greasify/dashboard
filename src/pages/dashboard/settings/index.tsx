import { Box } from '@mantine/core'
import { DashboardLayout } from '~/features/dashboard/layout'
import type { NextPageWithLayout } from '~/pages/_app'

const Settings: NextPageWithLayout = () => {
  return <Box></Box>
}

Settings.getLayout = (page) => {
  return <DashboardLayout title="Settings">{page}</DashboardLayout>
}

export default Settings
