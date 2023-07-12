import { signIn } from 'next-auth/react'
import { Button, Container, Paper, Title } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'

export function LoginPage() {
  return (
    <Container
      size={420}
      my={40}
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
        <Button
          onClick={() => {
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
      </Paper>
    </Container>
  )
}
