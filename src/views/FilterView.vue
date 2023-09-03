<script setup>
import Filter from "../components/Filter.vue";
</script>

<template>

  <main>
    <Filter />
  </main>

  <v-app-bar elevation="0" class="pl-3 pr-3">
    <v-toolbar-title><h2>Filter</h2></v-toolbar-title>

    <v-spacer></v-spacer>

    <RouterLink to="/home">
      <v-btn variant="text" icon="mdi-close"></v-btn
    ></RouterLink>
  </v-app-bar>
</template>
