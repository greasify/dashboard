import { DashboardLayout } from '~/components/dashboard/layout'
import { NextPageWithLayout } from '~/pages/_app'

const Dashboard: NextPageWithLayout = () => {
  return <h1>Dashboard</h1>
}

Dashboard.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Dashboard
