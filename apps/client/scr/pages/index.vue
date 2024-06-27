<script setup lang="ts">
import type { RouterInput } from "server"
const { $client } = useNuxtApp()
import { ref, type Ref } from "vue"

const me = $client.auth.me.useQuery()
const scores = $client.score.all.useQuery()
const createScore = $client.score.create.useMutation()

const form: Ref<RouterInput["score"]["create"]> = ref({
  title: "",
  author: "",
  price: 0,
  description: "",
  isExclusive: false,
  tags: []
})

async function createScoreHandler() {
  console.log({ form })
  await createScore.mutateAsync(form.value)
  scores.refetch()
}

</script>

<template>
  <a href="http://localhost:4000/oauth2/google/callback">login google</a>
  <p>{{ me.data.value?.name }} {{ me.data.value?.role }}</p>
  <form class="form" @submit.prevent>
    <div class="form-item">
      <label>title</label>
      <input v-model="form.title"></input>
    </div>
    <div class="form-item">
      <label>author</label>
      <input v-model="form.author"></input>
    </div>
    <div class="form-item">
      <label>price</label>
      <input v-model="form.price" type="number"></input>
    </div>
    <div class="form-item">
      <label>author</label>
      <textarea v-model="form.description"></textarea>
    </div>
    <button @click="createScoreHandler">submit</button>
  </form>

  <pre>{{ JSON.stringify(scores.data.value, null, 4) }}</pre>

</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: tomato;
}
</style>
