import { Box } from '@mantine/core'
import { DashboardLayout } from '~/features/dashboard/layout'
import type { NextPageWithLayout } from '~/pages/_app'

const Home: NextPageWithLayout = () => {
  return <Box></Box>
}

Home.getLayout = (page) => {
  return <DashboardLayout title="Home">{page}</DashboardLayout>
}

export default Home
