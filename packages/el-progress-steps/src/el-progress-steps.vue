<template>
  <div :class="['el-progress-steps']" :style="cssVar">
    <el-steps :active="active" align-center finish-status="finish" process-status="process">
      <el-step
        :description="el.description"
        :icon="el.icon"
        :key="i"
        :title="el.title"
        v-for="(el, i) in steps"
      ></el-step>
    </el-steps>
    <template v-if="show">
      <div :style="tooltipStyle" class="tooltip">
        <span>{{ `${tooltip ? tooltip : (percent + '%')}` }}</span>
      </div>
      <div :style="processStyle" class="process"></div>
    </template>
  </div>
</template>

<script>
import { Steps, Step } from 'element-ui'

export default {
  name: 'ElProgressSteps',
  components: {
    [Steps.name]: Steps,
    [Step.name]: Step
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
    steps: {
      type: Array,
      default: () => []
    },
    percent: {
      type: Number,
      default: 0
    },
    tooltip: String,
    themeColor: {
      type: String,
      default: '#409eff'
    },
    finishColor: {
      type: String,
      default: ''
    },
    processColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    show () {
      return this.active < (this.steps.length - 1) && (this.percent > 0 || this.tooltip)
    },
    space () {
      return (100 / this.steps.length).toFixed(4)
    },
    process () {
      const process = parseFloat((this.percent * this.space / 100).toFixed(4))
      return process
    },
    left () {
      const xn = 0.5 * this.space + this.active * this.space
      const res = xn + this.process
      return res
    },
    tooltipStyle () {
      return {
        left: `calc(${this.left}%)`
      }
    },
    processStyle () {
      return {
        width: `${this.process}%`,
        left: `calc(${this.left}% - ${this.process}%)`
      }
    },
    cssVar () {
      return {
        '--finishColor': this.finishColor || this.themeColor,
        '--processColor': this.processColor || this.themeColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$finishColor: var(--finishColor);
$processColor: var(--processColor);
$iconSize: 24px;
@mixin pseudo($w, $h) {
  content: "";
  position: absolute;
  display: block;
  width: $w;
  height: $h;
}
.el-progress-steps {
  position: relative;
  height: 100%;
  .tooltip {
    position: absolute;
    top: -14px;
    transform: translate(-50%, -50%);
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    text-align: center;
    background-color: #666;
    color: #fff;
    border-radius: 2px;
    font-size: 16px;
    z-index: 2;
    &::before {
      @include pseudo(0, 0);
      left: 50%;
      bottom: -10px;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: #666;
    }
  }
  .process {
    position: absolute;
    top: $iconSize / 2;
    transform: translateY(-50%);
    height: 2px;
    background-color: $processColor;
    &::after {
      @include pseudo(6px, 6px);
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
      background-color: #fff;
      border: 2px solid $processColor;
      border-radius: 50%;
    }
  }
}
::v-deep .is-finish {
  .el-step__line {
    background-color: $finishColor !important;
  }
}
::v-deep .el-step__head.is-finish,
::v-deep .el-step__title.is-finish,
::v-deep .el-step__description.is-finish {
  color: $finishColor !important;
  border-color: $finishColor !important;
}
::v-deep .el-step__head.is-process,
::v-deep .el-step__title.is-process,
::v-deep .el-step__description.is-process {
  color: $processColor !important;
  border-color: $processColor !important;
}
</style>
