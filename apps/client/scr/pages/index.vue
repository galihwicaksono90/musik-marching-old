<script setup lang="ts">

const { $client } = useNuxtApp()

const me = $client.users.me.useQuery()

</script>

<template>
  <a href="http://localhost:4000/oauth2/google/callback">login google</a>

  <div class="form">
    {{ me.data.value }}
  </div>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: tomato;
}
</style>
