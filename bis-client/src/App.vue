<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
        clipped-left
    >
      <div class="d-flex align-center">
        <router-link to="/events">
          <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
          />
        </router-link>
      </div>

      <v-toolbar-title
          :style="{ cursor: 'pointer'}"
          class="d-flex align-center"
          @click="$router.replace('/events')"
      >
        {{ appTitle }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
          color="accent"
          @click="$router.replace('/events/create')"
      >
        New Event
      </v-btn>
    </v-app-bar>


    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import EventsIndex from './components/EventsIndex/EventsIndex.vue';
// import EventsShow from "@/components/EventsShow/EventsShow";
// import EventsCreate from "@/components/EventsCreate/EventsCreate";
// import EventsEdit from "@/components/EventsEdit/EventsEdit";
// import EventsFilter from "@/components/EventsFilter/EventsFilter.vue";

export default {
  name: 'App',

  components: {
    // EventsIndex,
    // EventsShow,
    // EventsCreate,
    // EventsEdit,
    // EventsFilter,
  },

  data: () => ({
    appTitle: 'Bialystok Info Service'
  }),
};
</script>
