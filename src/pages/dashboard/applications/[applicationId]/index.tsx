import { withRouter } from 'next/router'
import { DashboardLayout } from '~/features/dashboard/layout'
import { api } from '~/utils/api'
import type { NextRouter } from 'next/router'

type Props = {
  router: NextRouter
}

function Application(props: Props) {
  const application = api.applications.get.useQuery({
    id: props.router.query.applicationId as string
  })

  return (
    <DashboardLayout title={'Application: ' + application.data?.name}>
      <pre>{JSON.stringify(application.data, null, 2)}</pre>
    </DashboardLayout>
  )
}

export default withRouter(Application)
