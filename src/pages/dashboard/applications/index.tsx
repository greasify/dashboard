import { useMemo, useState } from 'react'
import { Box, Flex, Grid, Input } from '@mantine/core'
import { ApplicationCard } from '~/features/dashboard/applications/application-card'
import { ApplicationSkeleton } from '~/features/dashboard/applications/application-skeleton'
import { DashboardLayout } from '~/features/dashboard/layout'
import { api } from '~/utils/api'
import type { NextPageWithLayout } from '~/pages/_app'

const Applications: NextPageWithLayout = () => {
  const [search, setSearch] = useState('')

  const applications = api.applications.list.useQuery()

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
