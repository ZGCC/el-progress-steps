import elProgressSteps from './src/el-progress-steps.vue'

elProgressSteps.install = function (Vue) {
  Vue.component(elProgressSteps.name, elProgressSteps)
}

export default elProgressSteps
