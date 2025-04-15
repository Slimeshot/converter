<template>
  <div class="input">
    <input
      :type="inputType"
      class="input__field"
      :placeholder="placeholder"
      :value="modelValue || ''"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'

defineProps({
  modelValue: {
    type: [String, Number, null] as PropType<string | number | null>,
    default: null,
  },
  inputType: {
    type: String as PropType<'text' | 'number'>,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: 'Введите число',
  },
})
</script>

<style lang="scss" scoped>
.input {
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  &__field {
    width: 100%;
    height: 100%;
    outline: none;
    border-radius: 12px;
    border: none;
    color: #101010;
    font-size: 18px;
    padding: 0 10px;
  }
}
</style>
