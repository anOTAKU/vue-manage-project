<template>
  <div class="tabs">
    <el-tag
      v-for="(tag,index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$router.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      >{{ tag.label }}</el-tag
    >
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations({ close: "closeTag" }),
    changeMenu(tag) {
      this.$router.push({ name: tag.name });
      this.$store.commit("selectMenu", tag);
    },
    handleClose(tag, index) {
      let length = this.tags.length - 1;
      this.close(tag);
      // if (tag.name !== this.$router.name) {
      //   return;
      // }
      if (index === length) {
        //往左边跳转
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        //往右边跳转
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>
<style lang="scss">
.tabs {
  padding: 10px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
