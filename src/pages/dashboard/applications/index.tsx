import { useMemo, useState } from 'react'
import { Box, Button, Flex, Grid, Input } from '@mantine/core'
import { ApplicationCard } from '~/features/dashboard/applications/application-card'
import { ApplicationSkeleton } from '~/features/dashboard/applications/application-skeleton'
import { DashboardLayout } from '~/features/dashboard/layout'
import { api } from '~/utils/api'
import {
  errorNotification,
  loadingNotification,
  successNotification
} from '~/utils/notifications'
import type { NextPageWithLayout } from '~/pages/_app'

const Applications: NextPageWithLayout = () => {
  const utils = api.useContext()
  const applications = api.applications.list.useQuery()

  const createApplication = api.applications.create.useMutation({
    async onMutate(application) {
      loadingNotification({
        id: `create-application-${application.name}`,
        message: 'Creating application...'
      })

      await utils.applications.list.cancel()
      const prevData = utils.applications.list.getData()
      utils.applications.list.setData(undefined, (old) => [
        // @ts-ignore
        ...old,
        application
      ])

      return { prevData }
    },
    onSuccess(application) {
      successNotification({
        id: `create-application-${application.name}`,
        message: `Application ${application.name} created.`
      })
    },
    onError(err, application, ctx) {
      errorNotification({
        id: `create-application-${application.name}`,
        message: err.message
      })
      utils.applications.list.setData(undefined, ctx!.prevData)
    },
    onSettled() {
      // Update the cache
      utils.applications.list.invalidate()
    }
  })

  const [search, setSearch] = useState('')
  const cards = useMemo(() => {
    return (applications.data ?? [])
      .filter((application) =>
        application.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((application, index) => (
        <Grid.Col
          key={index}
          md={6}
          lg={3}
        >
          <ApplicationCard application={application} />
        </Grid.Col>
      ))
  }, [applications, search])

  return (
    <Box>
      <Flex justify="space-between">
        <Input
          w="100%"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button
          ml="lg"
          disabled={applications.isInitialLoading}
          onClick={() => {
            createApplication.mutate({
              name: Math.random().toString(16).slice(2)
            })
          }}
        >
          Create
        </Button>
      </Flex>
      <Grid
        mt="lg"
        grow
      >
        {applications.isInitialLoading ? (
          <ApplicationSkeleton length={10} />
        ) : (
          cards
        )}
      </Grid>
    </Box>
  )
}

Applications.getLayout = (page) => {
  return <DashboardLayout title="Applications">{page}</DashboardLayout>
}

export default Applications
