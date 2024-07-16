<template>
  <iframe class="viewer" :src="url" frameborder="0" />
</template>

<script setup>
import {computed } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})
const url = computed(() => `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(props.src)}`);

</script>

<style lang="scss" scoped>
.viewer {
  width: 100%;
  height: 100%
}
</style>