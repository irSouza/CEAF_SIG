<template>
  <v-card class="mb-6">
    <v-card-title>Status das RNCs</v-card-title>
    <v-card-text><VChart :option="chartOptions" autoresize style="height:300px"/></v-card-text>
  </v-card>
</template>

<script setup>
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
use([CanvasRenderer, BarChart, TitleComponent, GridComponent, TooltipComponent, LegendComponent])

import { useComplaintsStore } from '@/store/complaints'
import { ref, watchEffect } from 'vue'

const store = useComplaintsStore()
const chartOptions = ref({})
watchEffect(() => {
  const counts = store.complaints.reduce((a,c)=>{a[c.status]=(a[c.status]||0)+1;return a},{})
  chartOptions.value = {tooltip:{},xAxis:{type:'category',data:Object.keys(counts)},yAxis:{type:'value'},series:[{type:'bar',data:Object.values(counts)}]}
})
</script>
