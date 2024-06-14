<script setup lang="ts">
import { ref } from "vue"
const { $client } = useNuxtApp()
import type { RouterInput } from "server"

const userCreate = $client.users.create.useMutation()

const createUser = async (input: RouterInput["users"]["create"]) => {
  const newUser = await userCreate.mutateAsync(input)

  if (newUser) {
    alert(`user created ${newUser.name}`)
    return
  }
}
const input: Ref<RouterInput["users"]["create"]> = ref({
  name: "",
  password: "",
  email: "",
})

const onSubmit = async () => {
  await createUser(input.value)
}

</script>

<template>
  <div class="form">
    <label for="name">
      Name
    </label>
    <input v-model="input.name" name="name" />
    <label for="name">
      Password
    </label>
    <input v-model="input.password" name="password" type="password" />
    <label for="email">
      Email
    </label>
    <input v-model="input.email" name="email" />
    <button @click="onSubmit">{{ userCreate.isPending.value ? "error" : "create" }}</button>
  </div>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  width: 400px;
}
</style>
