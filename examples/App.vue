<template>
  <div id="app">
    <el-button @click="btnClicked(1)">active +1</el-button>
    <el-button @click="btnClicked(0)">perc +10</el-button>
    <div class="mt20">
      <p>Normal</p>
      <el-progress-steps :active="active" :steps="steps"></el-progress-steps>
    </div>
    <div class="mt20">
      <p>Process</p>
      <el-progress-steps :active="active" :percent="perc" :steps="steps"></el-progress-steps>
    </div>
    <div class="mt20">
      <p>Custom</p>
      <el-progress-steps
        :active="active"
        :finish-color="finishColor"
        :percent="perc"
        :process-color="processColor"
        :steps="iconSteps"
        tooltip="十万火急"
      ></el-progress-steps>
    </div>
  </div>
</template>

<script>
import { Button } from 'element-ui'

export default {
  name: 'App',
  components: {
    [Button.name]: Button
  },
  data () {
    return {
      active: 0,
      perc: 10,
      steps: [
        { title: 't1', description: 'd1', icon: '' },
        { title: 't2', description: 'd2', icon: '' },
        { title: 't3', description: 'd3', icon: '' }
      ],
      iconSteps: [
        { title: 't1', description: 'd1', icon: 'el-icon-edit' },
        { title: 't2', description: 'd2', icon: 'el-icon-upload' },
        { title: 't3', description: 'd3', icon: 'el-icon-picture' }
      ],
      finishColor: '#e6a23c',
      processColor: '#f56c6c'
    }
  },
  methods: {
    btnClicked (isActive) {
      if (isActive) {
        this.active++
        if (this.active > this.steps.length) this.active = 0
        return
      }
      this.perc += 10
      if (this.perc > 100) this.perc = 0
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.mt20 {
  margin-top: 20px;
}
</style>
