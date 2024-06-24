import { httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from 'server'
import { defineNuxtPlugin } from '#app'
import { createTRPCVueQueryClient } from '@falcondev-oss/trpc-vue-query'
import { useQueryClient, VueQueryPlugin } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueQueryPlugin)
  const queryClient = useQueryClient()
  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const client = createTRPCVueQueryClient<AppRouter>({
    queryClient,
    trpc: {
      links: [
        httpBatchLink({
          url: 'http://localhost:4000/trpc/',
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
    }
  })

  return {
    provide: {
      client,
    },
  }
})
