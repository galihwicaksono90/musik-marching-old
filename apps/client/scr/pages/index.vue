<script setup>
const { $client } = useNuxtApp()

const user = $client.user.useQuery({}, {
  initialData: "mantap"
})
const users = $client.users.useQuery({}, {
  initialData: []
})
</script>
<template>
  <pre>
    {{ JSON.stringify(user.data.value, null, 4) }}
  </pre>
  <pre>
    {{ JSON.stringify(users.data.value.map(u => u.name), null, 4) }}
  </pre>
  <button @click="refetch">
    refetch
  </button>
</template>
