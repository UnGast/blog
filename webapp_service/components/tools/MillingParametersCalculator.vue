<template>
  <section class="milling-parameters-calculator form">
    <div class="form-line">
      <div class="form-element">
        <label class="label">{{ $t('millingParametersCalculatorComponent.units') }}</label>
        <option-switch :options="unitSystemOptions" v-model="unitSystem"/>
      </div>
    </div>

    <section class="tool-section form-section">
      <label class="section-heading">{{ $t('millingParametersCalculatorComponent.tool') }}</label>

      <img class="image" :src="require('~/assets/images/endmill_from_top_annotated_2.png')"/>

      <div class="form-line">
        <div class="form-element">
          <label class="label">{{ $t('millingParametersCalculatorComponent.diameter') }} <katex>d</katex></label>
          <number-input :type="lengthNumberType" :unit="diameterUnit" min="0" v-model="diameter"/>
        </div>
        <div class="form-element">
          <label class="label">{{ $t('millingParametersCalculatorComponent.numberOfTeeth') }} <katex>z</katex></label>
          <number-input type="integer" min="0" v-model="teethCount"/>
        </div>
      </div>
    </section>

    <section class="operation-section form-section">
      <label class="section-heading">{{ $t('millingParametersCalculatorComponent.operation') }}</label>

      <img class="image" :src="require('~/assets/images/endmill_cutting_annotated.png')"/>

      <div class="form-elements">
        <div class="form-line">
          <div class="form-element">
            <label class="label">{{ $t('millingParametersCalculatorComponent.feedPerTooth') }} <katex>f_z</katex></label>
            <number-input type="decimal" min="0" v-model="feedPerTooth.value" :unit="feedPerToothUnit"/>
          </div>
          <div class="form-element">
            <label class="label">{{ $t('millingParametersCalculatorComponent.feedPerRotation') }} <katex>f</katex></label>
            <number-input type="decimal" min="0" v-model="feedPerRotation.value" :unit="feedPerRotationUnit"/>
          </div>
        </div>

        <div class="form-line">
          <div class="form-element">
            <label class="label">{{ $t('millingParametersCalculatorComponent.cuttingSpeed') }} <katex>v_c</katex></label>
            <number-input :type="lengthNumberType" min="0" v-model="cuttingSpeed.value" :unit="cuttingSpeedUnit"/>
          </div>
          <div class="form-element">
            <label class="label">{{ $t('millingParametersCalculatorComponent.spindleSpeed') }} <katex>n</katex></label>
            <number-input type="integer" min="0" v-model="spindleSpeed.value" :unit="spindleSpeedUnit"/>
          </div>
        </div>
        <div class="form-line">
          <div class="form-element">
            <label class="label">{{ $t('millingParametersCalculatorComponent.feedRate') }} <katex>v_f</katex></label>
            <number-input :type="lengthNumberType" min="0" v-model="feedRate.value" :unit="feedRateUnit"/>
          </div>
        </div>
      </div>
    </section>

    <div class="actions">
      <p class="note">{{ $t('millingParametersCalculatorComponent.calculationHappensAutomatically') }}</p>
    </div>
  </section>
</template>

<script>
import OptionSwitch from '@/components/OptionSwitch'
import NumberInput from '@/components/NumberInput'
import Katex from '@/components/Katex'

export default {
  components: { OptionSwitch, NumberInput, Katex },
  data: () => ({
    unitSystem: 'metric',
    diameter: 0,
    teethCount: 0,
    feedPerTooth: {
      value: 0,
      locked: false
    },
    feedPerRotation: {
      value: 0,
      locked: false
    },
    cuttingSpeed: {
      value: 0,
      locked: false,
      targetLock: false
    },
    spindleSpeed: {
      value: 0,
      locked: false,
      target: false,
      targetLock: false
    },
    feedRate: {
      value: 0,
      locked: false,
      target: false,
      targetLock: false
    }
  }),
  computed: {
    unitSystemOptions() {
      return [{ name: this.$t('millingParametersCalculatorComponent.metric'), value: 'metric' }, { name: this.$t('millingParametersCalculatorComponent.imperial'), value: 'imperial' }]
    },
    lengthNumberType() {
      if (this.unitSystem === 'metric') {
        return 'integer'
      } else {
        return 'decimal'
      }
    },
    diameterUnit() {
      return this.unitSystem === 'metric' ? 'mm' : 'in'
    },
    feedPerToothUnit() {
      return this.unitSystem === 'metric' ? 'mm' : 'in'
    },
    feedPerRotationUnit() {
      return this.unitSystem === 'metric' ? 'mm' : 'in'
    },
    cuttingSpeedUnit() {
      return this.unitSystem === 'metric' ? 'm/min' : 'ft/min'
    },
    spindleSpeedUnit() {
      return this.unitSystem === 'metric' ? '1/min' : '1/min'
    },
    feedRateUnit() {
      return this.unitSystem === 'metric' ? 'mm/min' : 'in/min'
    }
  },
  methods: {
    checkValueUpdate(newValue, oldValue) {
      return !isNaN(newValue) && newValue !== Infinity && newValue !== oldValue
    },
    calcFeedPerTooth() {
      let newValue = this.feedPerRotation.value / this.teethCount
      if (this.checkValueUpdate(newValue, this.feedPerTooth.value)) {
        this.feedPerTooth.value = newValue
        return true
      }
      return false
    },
    calcFeedPerRotation() {
      let newValue = this.teethCount * this.feedPerTooth.value
      if (this.checkValueUpdate(newValue, this.feedPerRotation.value)) {
        this.feedPerRotation.value = newValue
        return true
      }
      return false
    },
    calcCuttingSpeed() {
      let newValue = NaN //this.teethCount * this.feedPerTooth.value
      if (this.unitSystem === 'metric') {
        newValue = this.spindleSpeed.value * (Math.PI * this.diameter) / 1000
      } else {
        newValue = this.spindleSpeed.value * (Math.PI * this.diameter) / 12
      }

      if (this.checkValueUpdate(newValue, this.cuttingSpeed.value)) {
        this.cuttingSpeed.value = newValue
        return true
      }
      return false
    },
    calcSpindleSpeed() {
      if (this.unitSystem === 'metric') {
        this.spindleSpeed.value = this.cuttingSpeed.value * 1000 / (Math.PI * this.diameter)
      } else {
        this.spindleSpeed.value = this.cuttingSpeed.value * 12 / (Math.PI * this.diameter)
      }
    },
    calcFeedRate() {
      this.feedRate.value = this.feedPerRotation.value * this.spindleSpeed.value
    },
    calcSpindleSpeedFromFeedRate() {
      this.spindleSpeed.value = this.feedRate.value / this.feedPerRotation.value
    },
    calcFeedPerRotationFromFeedRate() {
      this.feedPerRotation.value = this.feedRate.value / this.spindleSpeed.value
    },
    /*calcMissing() {
      var valueUpdated = false
      if (this.diameter === 0 || this.teethCount === 0) return

      if (this.feedPerTooth.value === 0) {
        console.log('CALC FEED PER TOOTH')
        valueUpdated = this.calcFeedPerTooth()
      } else if (!valueUpdated && this.feedPerRotation.value === 0) {
        console.log('CALC FEED PER TOOTH')
        valueUpdated = this.calcFeedPerRotation()
      } else if (!valueUpdated && (this.cuttingSpeed.value === 0 || this.cuttingSpeed.target)) {
        console.log('UPDATE CUTTING SPEED')
        this.cuttingSpeed.target = true
        this.cuttingSpeed.targetLock = true
        valueUpdated = this.calcCuttingSpeed()
        this.$nextTick(() => {
          this.cuttingSpeed.targetLock = false
        })
      } else if (!valueUpdated && (this.spindleSpeed.value === 0 || this.spindleSpeed.target)) {
        this.spindleSpeed.target = true
        this.spindleSpeed.targetLock = true
        valueUpdated = this.calcSpindleSpeed()
        this.$nextTick(() => {
          this.spindleSpeed.targetLock = false
        })
      }

      if (valueUpdated) {
        this.calcMissing()
      }
    }*/
  },
  watch: {
    diameter() {
      if (this.cuttingSpeed.value === 0) {
        this.calcCuttingSpeed()
      } else if (this.spindleSpeed.value === 0) {
        this.calcSpindleSpeed()
      } else {
        this.calcSpindleSpeed()
      }
      this.calcFeedRate()
      //this.calcMissing()
    },
    teethCount() {
      if (this.feedPerTooth.value === 0) {
        this.calcFeedPerTooth()
      } else if (this.feedPerRotation.value === 0) {
        this.calcFeedPerRotation()
      } else {
        this.calcFeedPerRotation()
      }
      this.calcFeedRate()
     // this.calcMissing()
    },
    'feedPerTooth.value'() {
      this.feedPerTooth.locked = true
      if (!this.feedPerRotation.locked) {
        this.calcFeedPerRotation()
      }
      if (!this.feedRate.locked) {
        this.calcFeedRate()
      }
      this.$nextTick(() => {
        this.feedPerTooth.locked = false
      })
     // this.calcMissing()
    },
    'feedPerRotation.value'() {
      if (!this.feedPerRotation.targetLock) this.feedPerRotation.target = false
      this.feedPerRotation.locked = true
      if (!this.feedPerTooth.locked) {
        this.calcFeedPerTooth()
      }
      if (!this.feedRate.locked) {
        this.calcFeedRate()
      }
      this.$nextTick(() => {
        this.feedPerRotation.locked = false
      })
     // this.calcMissing()
    },
    'cuttingSpeed.value'() {
      if (!this.cuttingSpeed.targetLock) this.cuttingSpeed.target = false
      this.cuttingSpeed.locked = true
      if (!this.spindleSpeed.locked) {
        this.calcSpindleSpeed()
      }
      if (!this.feedRate.locked) {
        this.calcFeedRate()
      }
      this.$nextTick(() => {
        this.cuttingSpeed.locked = false
      })
      //this.calcMissing()
    },
    'spindleSpeed.value'() {
      if (!this.spindleSpeed.targetLock) this.spindleSpeed.target = false
      this.spindleSpeed.locked = true
      if (!this.cuttingSpeed.locked) {
        this.calcCuttingSpeed()
      }
      this.$nextTick(() => {
        this.spindleSpeed.locked = false 
      })
      //this.calcMissing()
    },
    'feedRate.value'() {
      this.feedRate.locked = true
      if ((this.spindleSpeed.value === 0 || this.spindleSpeed.target) && this.feedPerRotation.value !== 0) {
        this.spindleSpeed.targetLock = true
        this.spindleSpeed.target = true
        if (!this.spindleSpeed.locked) {
          this.calcSpindleSpeedFromFeedRate()
        }
        this.$nextTick(() => {
          this.spindleSpeed.targetLock = false
        })
        /*if (!this.cuttingSpeed.locked) {
          this.calcCuttingSpeed()
        }*/
      } else if ((this.feedPerRotation.value === 0 || this.feedPerRotation.target) && this.spindleSpeed.value !== 0) {
        this.feedPerRotation.targetLock = true
        this.feedPerRotation.target = true
        if (!this.feedPerRotation.locked) {
          this.calcFeedPerRotationFromFeedRate()
        }
        this.$nextTick(() => {
          this.feedPerRotation.targetLock = false
        })
        /*if (!this.feedPerTooth.locked) {
          this.calcFeedPerTooth()
        }*/
      } else {
        if (!this.feedPerRotation.locked) {
          this.calcFeedPerRotationFromFeedRate()
        }
      }
      // TODO: maybe have to use this everywhere
      this.$nextTick(() => {
        this.feedRate.locked = false
      })
      //this.calcMissing()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.number-input {
  min-width: 234px; // magic number, for some alignment
}

/deep/ .label {
  .katex {
    text-transform: none;
  }
}

.form-section {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;

  .image {
    max-width: 180px;
    margin-right: 32px;
    margin-bottom: 32px;
  }
}

@media screen and (max-width: $breakpoint-small) {
  .form-section {
    .image {
      max-width: 100%;
      max-height: 300px;
    }
  }
}
</style>