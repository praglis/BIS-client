<template>
  <v-text-field
      v-model="value"
      :label="name"
      outlined
      :readonly="disabled"
      @change="$emit('change', value)"
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
    disabled: {
      type: Boolean,
      default: false
    },
    inValue: {
      type: String
    }
  },
  data() {
    return {
      value: this.inValue
    }
  },
  computed: {},
  mounted() {

  },
  methods: {}
}

</script>
