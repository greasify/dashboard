import { useSession } from 'next-auth/react'
import { Box, Button, Image, Input, Stack, Textarea } from '@mantine/core'
import { DashboardLayout } from '~/features/dashboard/layout'
import type { NextPageWithLayout } from '~/pages/_app'

const Settings: NextPageWithLayout = () => {
  const session = useSession()

  if (session.status === 'loading' || !session.data) {
    return <>Loading...</>
  }

  return (
    <Box>
      <Stack>
        <Image
          maw={120}
          radius="md"
          src={session.data.user.image}
          alt={session.data.user.name!}
        />
        <Input.Wrapper label="Name">
          <Input value={session.data.user.name!} />
        </Input.Wrapper>
        <Input.Wrapper label="Username">
          <Input value={session.data.user.username} />
        </Input.Wrapper>
        <Input.Wrapper label="Email">
          <Input
            disabled
            value={session.data.user.email!}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Website">
          <Input value={session.data.user.website ?? ''} />
        </Input.Wrapper>
        <Textarea
          label="Bio"
          defaultValue={session.data.user.bio ?? ''}
          maxLength={300}
          minRows={3}
          autosize
        />
        <Button>Update</Button>
      </Stack>
    </Box>
  )
}

Settings.getLayout = (page) => {
  return <DashboardLayout title="Settings">{page}</DashboardLayout>
}

export default Settings
