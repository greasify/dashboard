import { notifications } from '@mantine/notifications'
import { IconCheck, IconCross } from '@tabler/icons-react'

type NotificationParams = {
  id: string
  title?: string
  message: string
}

export function loadingNotification({
  id,
  title = 'Loading...',
  message
}: NotificationParams): void {
  notifications.show({
    id,
    title,
    message,
    loading: true,
    autoClose: false,
    withCloseButton: false
  })
}

export function successNotification({
  id,
  title = 'Success.',
  message
}: NotificationParams): void {
  notifications.update({
    id,
    title,
    message,
    color: 'teal',
    icon: <IconCheck size="1rem" />,
    autoClose: 1000
  })
}

export function errorNotification({
  id,
  title = 'Something went wrong.',
  message
}: NotificationParams): void {
  notifications.update({
    id,
    title,
    message,
    color: 'red',
    icon: <IconCross size="1rem" />
  })
}

export function globalErrorNotification(error: any): void {
  notifications.show({
    color: 'red',
    title: 'Something went wrong',
    message: (error as Error).message,
    icon: <IconCross size="1rem" />
  })
}
