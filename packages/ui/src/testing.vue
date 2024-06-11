<script setup lang="ts">
import { ref } from "vue"

type Person = {
  name: string
  age: number
}

const { age } = defineProps<Person>()

const counter = ref(0)
</script>

<template>
  <h1>{{ counter }}</h1>
  <button class="embuh" @click="counter = counter + age">{{ name }}</button>
</template>

<style>
.embuh {
  background-color: tomato;
}
</style>
