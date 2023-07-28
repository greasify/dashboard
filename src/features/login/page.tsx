import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'
import { Button, Container, Flex, Paper, Stack, Title } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'

export function LoginPage() {
  const [loading, setLoading] = useState(false)

  return (
    <Container size={420}>
      <Head>
        <title>Greasify :: Login</title>
      </Head>
      <Flex
        h="100svh"
        justify="center"
        direction="column"
      >
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900
          })}
        >
          Greasify Registry
        </Title>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
        >
          <Stack>
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true)
                signIn('github', {
                  redirect: false,
                  callbackUrl: '/dashboard'
                })
              }}
              leftIcon={<IconBrandGithub />}
              fullWidth
            >
              Sign in with GitHub
            </Button>
          </Stack>
        </Paper>
      </Flex>
    </Container>
  )
}
