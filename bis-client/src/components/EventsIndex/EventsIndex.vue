<template>
  <section class="events-list">
    <events-filter
        @send-request="events = sendFilteredRequest($event)"></events-filter>
    <events-list
        :events="events"
        :is-pdf-downloadable="lastRequestInfo !== null"
        class="mt-4"
        @pdf-request="sendGetPdfRequest(preparePdfRequestParams)"
    ></events-list>
  </section>
</template>

<script src="./EventsIndex.js"></script>
<style lang="sass" scoped src="./EventsIndex.sass"></style>

