<template>
  <v-chart class="chart" autoresize :option="option" />
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GraphChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart from "vue-echarts";
import { onMounted, ref } from "vue";
import graph from './graph.json'
import { sendPostRequest } from '@/utils';
import { ElMessage } from 'element-plus';

use([
  CanvasRenderer,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

const option = ref({
  title: {
    text: 'Les Miserables',
    subtext: 'Default layout',
    top: 'bottom',
    left: 'right'
  },
  tooltip: {},
  legend: [
    {
      // selectedMode: 'single',
      data: graph.categories.map(function (a) {
        return a.name;
      })
    }
  ],
  animationDuration: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      name: 'Les Miserables',
      type: 'graph',
      legendHoverLink: false,
      layout: 'none',
      data: graph.nodes,
      links: graph.links,
      categories: graph.categories,
      roam: true,
      label: {
        position: 'right',
        formatter: '{b}'
      },
      lineStyle: {
        color: 'source',
        curveness: 0.3
      },
      emphasis: {
        focus: 'adjacency',
        lineStyle: {
          width: 10
        }
      }
    }
  ]
})

const props = defineProps({
  fileId: {
    type: String,
    required: true
  }
});

const getGraphData = async fileId => {
  const data = await sendPostRequest('/file/getFileKnowledgeGraph', {
    fileId,
  });

}

onMounted(() => {
  ElMessage({
    message: '接口没有调试',
    type: 'error'
  })
  getGraphData(props.fileId)
})

</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>