import Link from 'next/link'
import { Button, Flex, Skeleton } from '@mantine/core'
import { Card, Group, Text } from '@mantine/core'
import { api } from '~/utils/api'
import {
  errorNotification,
  loadingNotification,
  successNotification
} from '~/utils/notifications'
import type { Application } from '@prisma/client'

interface Props {
  application: Application
}

export function ApplicationCard({ application }: Props) {
  const utils = api.useContext()

  const deleteApplication = api.applications.delete.useMutation({
    async onMutate(application) {
      loadingNotification({
        id: `delete-application-${application.name}`,
        message: `Deleting ${application.name}...`
      })

      await utils.applications.list.cancel()
      const prevData = utils.applications.list.getData()
      utils.applications.list.setData(undefined, (old) =>
        old?.filter((oldApplication) => {
          return oldApplication.id !== application.id
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

      utils.applications.list.setData(undefined, ctx!.prevData)
    }
  })

  return (
    <Skeleton visible={!application.id}>
      <Card
        shadow="sm"
        withBorder
      >
        <Group position="apart">
          <Text weight={500}>{application.name}</Text>
        </Group>
        <Flex
          mt="md"
          gap="xs"
        >
          <Button
            onClick={() => deleteApplication.mutate(application)}
            color="red"
            variant="light"
            radius="md"
            fullWidth
          >
            Remove
          </Button>
          <Button
            component={Link}
            href={`/dashboard/applications/${application.id}`}
            variant="light"
            color="blue"
            fullWidth
            radius="md"
          >
            Open
          </Button>
        </Flex>
      </Card>
    </Skeleton>
  )
}
