import { Box } from '@mantine/core'
import { DashboardLayout } from '~/features/dashboard/layout'
import type { NextPageWithLayout } from '~/pages/_app'

const Admin: NextPageWithLayout = () => {
  return <Box></Box>
}

Admin.getLayout = (page) => {
  return <DashboardLayout title="Admin">{page}</DashboardLayout>
}

export default Admin
