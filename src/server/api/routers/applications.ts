import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '~/server/api/trpc'

export const applicationsRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      const application = await ctx.prisma.application.findFirst({
        where: { userId: ctx.session.user.id, id: input }
      })

      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Application not found'
        })
      }

      return application
    }),

  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.application.findMany()
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.prisma.application.findFirst({
        where: { userId: ctx.session.user.id, name: input.name }
      })

      if (application) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Application already exists'
        })
      }

      return ctx.prisma.application.create({
        data: { userId: ctx.session.user.id, name: input.name }
      })
    }),

  delete: protectedProcedure
    .input(
      z.object({
        name: z.string()
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.application.delete({
        where: { userId: ctx.session.user.id, name: input.name }
      })
    })
})
