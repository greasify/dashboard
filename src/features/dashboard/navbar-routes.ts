import {
  IconApps,
  IconBrandTabler,
  IconHome,
  IconSettings
} from '@tabler/icons-react'
import type { TablerIconsProps } from '@tabler/icons-react'

interface NavbarRoute {
  icon: (props: TablerIconsProps) => JSX.Element
  label: string
  path: string
  isAdminOnly?: boolean
}

export const navbarRoutes: NavbarRoute[] = [
  { icon: IconHome, label: 'Home', path: '/dashboard' },
  {
    icon: IconBrandTabler,
    label: 'Admin',
    path: '/dashboard/admin',
    isAdminOnly: true
  },
  { icon: IconApps, label: 'Applications', path: '/dashboard/applications' },
  { icon: IconSettings, label: 'Settings', path: '/dashboard/settings' }
]
