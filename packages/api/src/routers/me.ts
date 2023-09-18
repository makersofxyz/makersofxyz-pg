import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { z } from 'zod'


export const meRouter = createTRPCRouter({
  // =========== Example of supabase query mutation ===========
  // could be used in `app/features/profile/edit-screen.tsx`



  // update: protectedProcedure.input(z.object({
  //   name: z.string().optional(),
  //   about: z.string().optional(),
  // })).mutation(async ({ ctx: { supabase, session }, input }) => {

  //   const { data, error } = await supabase
  //     .from('profiles')
  //     .update({ name: input?.name, about: input?.about })
  //     .eq('id', session.user.id).single()

  //   if (error) {
  //     throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
  //   }

  //   return data
  // }),
  // ==========================================================
})
