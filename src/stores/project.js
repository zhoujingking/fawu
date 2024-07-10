import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', () => {
  const projectList = ref([])

  return { projectList }
})
