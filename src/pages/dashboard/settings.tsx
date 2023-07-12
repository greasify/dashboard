import { DashboardLayout } from '~/components/dashboard/layout'
import { NextPageWithLayout } from '~/pages/_app'

const Settings: NextPageWithLayout = () => {
  return <h1>Dashboard Settings</h1>
}

Settings.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Settings
