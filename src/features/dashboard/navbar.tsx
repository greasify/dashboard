import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  Center,
  createStyles,
  Navbar,
  rem,
  Stack,
  Tooltip,
  UnstyledButton
} from '@mantine/core'
import {
  IconHome,
  IconLogout,
  IconPuzzleFilled,
  IconSettings
} from '@tabler/icons-react'
import { IconApps } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background!,
        0.1
      )
    }
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background!,
        0.15
      )
    }
  }
}))

interface NavbarLinkProps {
  icon: React.FC<any>
  label: string
  active?: boolean
  disabled?: boolean
  onClick?(): void
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles()
  return (
    <Tooltip
      label={label}
      position="right"
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon
          size="1.2rem"
          stroke={1.5}
        />
      </UnstyledButton>
    </Tooltip>
  )
}

const mockdata = [
  { icon: IconHome, label: 'Home', path: '/dashboard' },
  { icon: IconApps, label: 'Applications', path: '/dashboard/applications' },
  { icon: IconSettings, label: 'Settings', path: '/dashboard/settings' }
]

export function DashboardNavbar() {
  const router = useRouter()

  const links = mockdata.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={router.pathname === link.path}
      onClick={() => {
        router.push(link.path)
      }}
    />
  ))

  return (
    <Navbar
      p="md"
      width={{ base: 80 }}
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({
          variant: 'filled',
          color: theme.primaryColor
        }).background
      })}
    >
      <Center>
        <IconPuzzleFilled size={30} />
      </Center>
      <Navbar.Section
        grow
        mt={50}
      >
        <Stack
          justify="center"
          spacing="xs"
        >
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack
          justify="center"
          spacing={0}
        >
          <NavbarLink
            onClick={() => {
              signOut({
                redirect: true,
                callbackUrl: '/'
              })
            }}
            icon={IconLogout}
            label="Logout"
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  )
}
