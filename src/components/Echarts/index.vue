<template>
  <div ref="echart"></div>
</template>
<script>
import * as echarts from "echarts";

export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series,
        };
      },
    },
    isAxisChart: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
  },
  computed: {
    Options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
  methods: {
    initChart() {
      this.initChartData();
      //设置表格
      if (this.echart) {
        this.echart.setOption(this.Options);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.Options);
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
    },
  },
  data() {
    return {
      axisOption: {
        legend: {
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        //提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#ffffff",
        ],
        series: [],
      },
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#ffffff",
        ],
        series: [],
      },
      echart: null,
    };
  },
};
</script>
<style lang="scss" scoped></style>
