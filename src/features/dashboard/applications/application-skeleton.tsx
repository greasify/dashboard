import { Grid } from '@mantine/core'
import { ApplicationCard } from './application-card'
import type { Application } from '@prisma/client'

type Props = {
  length: number
}

export function ApplicationSkeleton(props: Props) {
  const skeletons = Array.from(
    { length: props.length },
    (_, key) =>
      ({
        id: '',
        userId: `${key}`,
        name: `${key}`
      } as Application)
  ).map((application, index) => (
    <Grid.Col
      key={index}
      md={6}
      lg={3}
    >
      <ApplicationCard application={application} />
    </Grid.Col>
  ))

  return skeletons
}
