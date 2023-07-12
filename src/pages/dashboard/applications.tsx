import { DashboardLayout } from '~/components/dashboard/layout'
import { NextPageWithLayout } from '~/pages/_app'

const Applications: NextPageWithLayout = () => {
  return <h1>Dashboard Applications</h1>
}

Applications.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Applications
