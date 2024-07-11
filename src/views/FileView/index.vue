<template>
  <el-tabs v-model="activeName" lazy @tab-click="handleClick">
    <el-tab-pane label="详情" name="detail">User</el-tab-pane>
    <el-tab-pane label="概览" name="abstract">Config</el-tab-pane>
    <el-tab-pane label="标签" name="tags">Role</el-tab-pane>
    <el-tab-pane label="相关性" name="relatives">Task</el-tab-pane>
    <el-tab-pane label="知识图谱" name="graph">Task</el-tab-pane>
  </el-tabs>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>