<template>
  <v-chart class="chart" v-loading="isLoading" autoresize :option="option" />
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
import { computed, onMounted, ref } from "vue";
import graph from './graph.json'
import { sendPostRequest } from '@/utils';

use([
  CanvasRenderer,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

const props = defineProps({
  fileId: {
    type: String,
    required: true
  }
});

const graphData = ref({});
const isLoading = ref(false);

const option = computed(() => ({
  tooltip: {
    formatter: (param) => {
      if (param.dataType === 'node') {
        return param.data.name;
      }
      return param.data.relationshipType;
    }
  },
  legend: [
    {
      data: (graphData.value.categories || []).map(function (a) {
        return a.name;
      })
    }
  ],
  animationDuration: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      name: '',
      type: 'graph',
      legendHoverLink: false,
      layout: 'force',
      data: graphData.value.nodes || [],
      links: graphData.value.links || [],
      categories: graphData.value.categories || [],
      symbolSize: 50,
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      roam: true,
      force: {
        initLayout: 'circle',
        repulsion: 1000,
        edgeLength: [10, 40],
      },
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}'
      },
      labelLayout: {
        hideOverlap: true
      },
      lineStyle: {
        color: 'source',
        curveness: 0
      },
      edgeLabel: {
        formatter: a  => {
          console.log(a)
        }       
      },
      emphasis: {
        focus: 'adjacency',
        lineStyle: {
          width: 5
        },
      }
    }
  ]
}));



const getGraphData = async fileId => {
  try {
    const data = await sendPostRequest('/file/getFileKnowledgeGraph', {
      fileId,
    });
    return data;
  } catch {
    return graph;
  }

}

onMounted(() => {
  isLoading.value = true;
  getGraphData(props.fileId).then(data => {
    isLoading.value = false;
    graphData.value = data || {};
  });
})

</script>

<style lang="scss" scoped>
.chart {
  overflow: hidden !important;
  width: 100%;
  height: 100%;
}
</style>