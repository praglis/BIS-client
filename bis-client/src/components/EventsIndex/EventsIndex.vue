<template>
  <section class="events-list">
    <events-filter></events-filter>
    <events-list class="mt-4"></events-list>
  </section>
</template>

<script>
import EventsList from "@/components/EventsList/EventsList.vue";
import EventsFilter from "@/components/EventsFilter/EventsFilter.vue";

export default {
  name: 'events-index',
  components: {
    EventsList,
    EventsFilter
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

