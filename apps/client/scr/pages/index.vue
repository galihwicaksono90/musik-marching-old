<script setup>
import { Button } from "@/components/ui/"
const { $client } = useNuxtApp()

const users = $client.users.useQuery({}, {
  initialData: []
})
</script>
<template>
  <Button variant="outline">
    hello
  </Button>

  <pre>
    {{ JSON.stringify(users.data.value.map(u => u.name), null, 4) }}
  </pre>
  <button @click="refetch">
    refetch
  </button>
</template>
