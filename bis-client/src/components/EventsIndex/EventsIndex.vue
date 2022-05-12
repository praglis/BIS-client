<template>
  <section class="events-list">
    <events-filter
        @send-request="sendFilteredRequest($event)"></events-filter>
    <events-list
        :events="events"
        :is-pdf-downloadable="events.length > 0"
        class="mt-4"
        @pdf-request="sendGetPdfRequest(preparePdfRequestParams)"
    ></events-list>

    <v-snackbar
        v-model="showNoEventsMsg"
    >
      {{ noEventsFound }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="accent"
            text
            v-bind="attrs"
            @click="showNoEventsMsg = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script src="./EventsIndex.js"></script>
<style lang="sass" scoped src="./EventsIndex.sass"></style>

