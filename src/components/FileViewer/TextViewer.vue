<template>
  <div v-html="dataString"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  }
});

const dataString = ref('');

const getHtmlData = async url => {
  return fetch(url).then(response => response.text())
}

onMounted(() => {
  getHtmlData(props.src).then(data => dataString.value = data);
})

</script>

<style lang="scss" scoped>
.viewer {
  width: 100%;
  height: 100%
}
</style>