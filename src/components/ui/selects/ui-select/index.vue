<template>
  <div v-click-outside="closeDropdown" class="ui-select">
    <div class="ui-select__box" :class="boxClasses" @click="toggleDropdown">
      <span class="ui-select__selected" v-text="modelValue?.name" />

      <span v-if="hidePlaceholder && !modelValue" class="ui-select__label" :class="labelClasses" v-text="selectLabel" />
    </div>

    <transition name="fade-up">
      <div v-if="isOpen" class="ui-select__dropdown">
        <p
          v-for="option in options"
          :key="option.id"
          class="ui-select__option"
          :class="optionClasses(option.name)"
          @click="selectOption(option)"
          v-text="option.name"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import type { IDynamicClasses } from '@/types/app'
import { ref, computed, defineProps } from 'vue'
import type { PropType } from 'vue'
import type { ISelectOption } from './types'

const props = defineProps({
  options: {
    type: Array as PropType<ISelectOption[]>,
    required: true,
  },
  modelValue: {
    type: Object as PropType<ISelectOption | null>,
    required: false,
  },
  hidePlaceholder: {
    type: Boolean,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
    defaul: '',
  },
  label: {
    type: String,
    required: false,
  },
  error: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue', 'clearError'])

const isOpen = ref(false)

const labelClasses = computed(
  (): IDynamicClasses => ({
    'ui-select__label_active': !!props.modelValue,
  })
)

const boxClasses = computed(
  (): IDynamicClasses => ({
    'ui-select__box_opened': isOpen.value,
    'ui-select__box_error': props.error,
  })
)

function optionClasses(optionName: string): IDynamicClasses {
  return {
    'ui-select__option_selected': optionName === props.modelValue?.name,
  }
}

const selectLabel = computed((): string => {
  if (props.label && props.modelValue) {
    return props.label
  }
  return props.placeholder
})

function toggleDropdown(): void {
  isOpen.value = !isOpen.value
}

function closeDropdown(): void {
  isOpen.value = false
}

function selectOption(option: ISelectOption): void {
  closeDropdown()
  emit('update:modelValue', option)
  emit('clearError')
}
</script>

<style lang="scss" scoped>
*::-webkit-scrollbar-thumb {
  background-color: var(--brown600);
  border-radius: 12px;
  border: 5px solid #fff;
}

*::-webkit-scrollbar {
  border-radius: 0 12px 12px 0;
  width: 16px;
  height: 24px;
  background-color: #fff;
}

.ui-select {
  position: relative;

  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;

  @media (max-width: 540px) {
    font-size: 14px;
  }

  &__box {
    height: 100%;
    width: 100%;
    height: 42px;
    background-color: #fff;
    padding: 0px 36px 0px 12px;
    display: flex;
    align-items: center;
    border-radius: 12px;
    border: 1px solid gray;
    cursor: pointer;
    transition: opacity 0.2s ease;
    user-select: none;

    &:after {
      position: absolute;
      content: '';
      top: 50%;
      transform: translateY(-50%);
      right: 12px;
      width: 12px;
      height: 12px;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('/src/assets/icons/triangle.svg');
      background-size: 24px;
      transition: transform 0.2s ease;
    }

    &_opened {
      opacity: 0.8;
      &::after {
        transform: translateY(-50%) rotate(180deg);
      }
    }

    &_error {
      border: 1px solid pink;
    }
  }

  &__label {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    transition: all 0.3s ease;

    font-family: 'Roboto';
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    border-radius: 4px;
    color: #101010;

    &_active {
      top: 0;
      font-size: 12px;
      line-height: 133%;
      background-color: #fff;
      padding: 2px 10px;
    }
  }

  &__selected {
    color: #101010;
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    border-radius: 12px;
    box-shadow:
      0 3px 1px 0 rgba(80, 33, 19, 0.04),
      0 3px 8px 0 rgba(80, 33, 19, 0.12);
    overflow: auto;
    z-index: 3;
    max-height: 452px;
  }

  &__option {
    position: relative;
    cursor: pointer;
    color: #101010;
    padding: 8px 12px;
    background-color: #fff;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgb(158, 164, 179);
    }

    &_selected {
      &::after {
        position: absolute;
        content: '';
        top: 50%;
        transform: translateY(-50%);
        right: 12px;
        width: 16px;
        height: 16px;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('/src/assets/icons/verify.svg');
        background-size: 16px;
      }
    }
  }
}
</style>
