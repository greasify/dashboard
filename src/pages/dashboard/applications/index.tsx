import { useRouter } from 'next/router'
import { useMemo } from 'react'
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Input,
  Stack,
  Table
} from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { DashboardLayout } from '~/components/dashboard/layout'
import { NextPageWithLayout } from '~/pages/_app'
import { api } from '~/utils/api'
import {
  errorNotification,
  loadingNotification,
  successNotification
} from '~/utils/notifications'

const Applications: NextPageWithLayout = () => {
  const router = useRouter()

  const utils = api.useContext()
  const applications = api.applications.list.useQuery()

  const createApplication = api.applications.create.useMutation({
    async onMutate(application) {
      loadingNotification({
        id: `create-application-${application.name}`,
        message: 'Creating application...'
      })

      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.applications.list.cancel()

      // Get the data from the queryCache
      const prevData = utils.applications.list.getData()

      // Optimistically update the data with our new post
      utils.applications.list.setData(undefined, (old) => [
        // @ts-ignore
        ...old,
        application
      ])

      // Return the previous data so we can revert if something goes wrong
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

      // Revert the optimistic update
      utils.applications.list.setData(undefined, ctx!.prevData)
    },
    onSettled() {
      // Update the cache
      utils.applications.list.invalidate()
    }
  })

  const deleteApplication = api.applications.delete.useMutation({
    async onMutate(application) {
      loadingNotification({
        id: `delete-application-${application.name}`,
        message: `Deleting ${application.name}...`
      })

      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.applications.list.cancel()

      // Get the data from the queryCache
      const prevData = utils.applications.list.getData()

      utils.applications.list.setData(undefined, (old) =>
        old?.filter((oldApplication) => {
          return oldApplication.name !== application.name
        })
      )

      return { prevData }
    },
    onSuccess(application) {
      successNotification({
        id: `delete-application-${application.name}`,
        message: `Project ${application.name} on deleted.`
      })
    },
    onError(err, application, ctx) {
      errorNotification({
        id: `delete-application-${application.name}`,
        message: err.message
      })

      // Revert the optimistic update
      utils.applications.list.setData(undefined, ctx!.prevData)
    }
  })

  const rows = useMemo(() => {
    return (applications.data ?? []).map((application, index) => (
      <tr key={index}>
        <td>{application.name}</td>
        <td>
          <Group>
            <ActionIcon
              color="red"
              variant="outline"
              onClick={() => {
                deleteApplication.mutate({ name: application.name })
              }}
            >
              <IconTrash size="1rem" />
            </ActionIcon>
            <ActionIcon
              color="blue"
              variant="outline"
              onClick={() =>
                router.push({
                  pathname: '/dashboard/applications/[applicationId]',
                  query: { applicationId: application.id }
                })
              }
            >
              <IconEdit size="1rem" />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ))
  }, [
    applications,
    deleteApplication,
    router
  ])

  return (
    <Box>
      <Stack>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (applications.isInitialLoading) return

            const formData = new FormData(event.currentTarget)
            const name = formData.get('name') as string
            if (!name) return

            createApplication.mutate({ name })
            event.currentTarget.reset()
          }}
        >
          <Input
            name="name"
            type="text"
            placeholder="Application name..."
          />
          <Button
            mt="md"
            fullWidth
            type="submit"
          >
            Create
          </Button>
        </form>
      </Stack>
      <Table mt="md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  )
}

Applications.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Applications
