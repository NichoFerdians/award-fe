<script setup>
import Home from "../components/Home.vue";
</script>

<template>
  <main>
    <Home />
  </main>

  <v-app-bar elevation="0">
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
      scroll-behavior="hide"
    ></v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <v-toolbar-title>Award</v-toolbar-title>

    <v-spacer></v-spacer>

    <RouterLink to="/filter">
      <v-btn variant="text" icon="mdi-filter-variant"></v-btn
    ></RouterLink>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-row class="row-drawer px-10">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col cols="12">
        <h1 class="text-center font-weight-black">Awards Menu</h1>
      </v-col>
      <v-col class="pt-0">
        <v-list>
          <v-list-item @click.stop="drawer = !drawer">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Cards</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <RouterLink style="color: inherit; text-decoration: none;" to="/">
            <v-list-item>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </RouterLink>
        </v-list>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>


<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style>
.v-navigation-drawer {
  z-index: 9999 !important;
  height: 100vh !important;
  top: 0 !important;
}

.v-navigation-drawer__scrim {
  z-index: 9998 !important;
}

.row-drawer {
  top: 100px;
  position: relative;
}
</style>