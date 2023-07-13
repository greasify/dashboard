import { NextRouter, withRouter } from 'next/router'
import { Box, Title } from '@mantine/core'
import { api } from '~/utils/api'

type Props = {
  router: NextRouter
}

function ApplicationSettings(props: Props) {
  const application = api.applications.get.useQuery(
    props.router.query.applicationId as string
  )

  if (application.isError) {
    return <Title>Error</Title>
  }

  if (application.isLoading) {
    return <Title>Loading...</Title>
  }

  return (
    <Box>
      <pre>{JSON.stringify(application.data, null, 2)}</pre>
    </Box>
  )
}

export default withRouter(ApplicationSettings)
