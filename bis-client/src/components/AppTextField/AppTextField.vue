<template>
  <v-text-field
      :disabled="disabled"
      :label="name"
      :value="value"
      outlined
  ></v-text-field>
</template>

<script>
export default {
  name: 'app-text-field',
  components: {},
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {

  },
  methods: {}
}

</script>
