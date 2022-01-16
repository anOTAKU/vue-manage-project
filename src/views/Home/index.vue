<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-1-13</span></p>
          <p>上次登录地点：<span>湖北</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px" shadow="hover">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
          style="margin-top: 20px"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          >
          </i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" style="height: 250px">
        <echart :chartData="echartData.order" style="height: 280px"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover" style="height: 250px">
          <echart :chartData="echartData.user" style="height: 240px"></echart>
        </el-card>
        <el-card shadow="hover" style="height: 250px">
          <echart
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height: 240px"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getHome } from "../../api/data";
import * as echarts from "echarts";
import Echart from "@/components/Echarts";

export default {
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require("@/assets/images/user.jpg"),
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  methods: {
    getTableData() {
      getHome().then((res) => {
        console.log(res);
        this.tableData = res.data.tableData;

        this.countData = res.data.countData;

        //折线图数据！！！
        const order = res.data.orderData;
        let keyArray = Object.keys(order.data[0]);
        //传给组件的值
        this.echartData.order.xData = order.date;
        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        //用户柱状图数据
        const user = res.data.userData;
        //传给组件的值
        this.echartData.user.xData = user.map((item) => item.date);
        this.echartData.user.series.push({
          name: "新增用户",
          data: user.map((item) => item.new),
          type: "bar",
        });
        this.echartData.user.series.push({
          name: "活跃用户",
          data: user.map((item) => item.active),
          type: "bar",
        });

        //饼状图数据
        //传给组件的值
        this.echartData.video.series.push({
          name: "Access From",
          type: "pie",
          data: res.data.videoData,
          radius: "50%",
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        });
      });
    },
  },
  mounted() {
    // getMenu().then((res) => {
    //   console.log(res);
    // });
    this.getTableData();
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/home";
</style>
