<template>
  <section class="events-list">
    <h1>events-index Component</h1>
    <router-link to="/events/create">Go to Crea</router-link>
    <events-filter></events-filter>
    <events-list></events-list>
  </section>
</template>

<script>
import EventsList from "@/components/EventsList/EventsList.vue";
import EventsFilter from "@/components/EventsFilter/EventsFilter.vue";

export default {
  name: 'events-index',
  components: {
    EventsFilter,
    EventsList
  },
  props: [],
  data() {
    return {}
  },
  computed: {},
  mounted() {

  },
  methods: {}
}
</script>
<style lang="sass" scoped src="./EventsIndex.sass"></style>

