import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const applicationsRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        id: z.string().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const application = await ctx.prisma.application.findFirst({
        where: { userId: ctx.session.user.id, id: input.id }
      })

      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Application not found'
        })
      }

      return application
    }),

  list: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.application.findMany({
      where: { userId: ctx.session.user.id }
    })
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), version: z.string() }))
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
        data: {
          userId: ctx.session.user.id,
          name: input.name,
          latestVersion: input.version
        }
      })
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string()
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.application.delete({
        where: { userId: ctx.session.user.id, id: input.id }
      })
    }),

  refeshAppToken: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.prisma.application.findFirst({
        where: { userId: ctx.session.user.id, id: input.id }
      })

      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Application not found'
        })
      }

      return ctx.prisma.application.update({
        where: { userId: ctx.session.user.id, id: input.id },
        data: { appToken: crypto.randomUUID() }
      })
    })
})
