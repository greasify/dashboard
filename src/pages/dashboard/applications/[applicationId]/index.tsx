import { withRouter } from 'next/router'
import { Button } from '@mantine/core'
import { DashboardLayout } from '~/features/dashboard/layout'
import { api } from '~/utils/api'
import type { NextRouter } from 'next/router'

type Props = {
  router: NextRouter
}

function Application(props: Props) {
  const utils = api.useContext()
  const application = api.applications.get.useQuery({
    id: props.router.query.applicationId as string
  })

  const refreshAppToken = api.applications.refeshAppToken.useMutation({
    onSettled() {
      utils.applications.get.invalidate()
    }
  })

  return (
    <DashboardLayout title={application.data?.name ?? 'Loading...'}>
      <pre>{JSON.stringify(application.data, null, 2)}</pre>
      <Button
        onClick={() => {
          refreshAppToken.mutate({ id: application.data!.id })
        }}
      >
        Refresh app token
      </Button>
    </DashboardLayout>
  )
}

export default withRouter(Application)
