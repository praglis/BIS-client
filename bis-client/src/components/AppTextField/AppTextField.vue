<template>
  <v-text-field
      v-model="computedActualValue"
      :label="name"
      outlined
      :readonly="disabled"
      @change="$emit('change', getStringValOrElse([actualValue]))"
  ></v-text-field>
</template>

<script src="./AppTextField.js"></script>

