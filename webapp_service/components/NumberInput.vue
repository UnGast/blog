<template>
  <div class="number-input">
    <input class="internal-input" type="text" @input="onInput" :value="sValue"><span v-if="unit" class="unit">{{ unit }}</span>
  </div>
</template>

<script>
import { parse } from 'querystring'
export default {
  props: {
    unit: {
      type: String
    },
    min: {
      type: [Number, String],
    },
    max: {
      type: [Number, String]
    },
    decimalPlaces: {
      type: Number,
      default: 3
    },
    type: {
      type: String,
      default: 'decimal' // decimal or integer
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      iValue: this.value,
      sValue: this.toDecimalLimitedString(this.value),
    }
  },
  computed: {
    iMin() {
      if (this.min === undefined) return undefined
      return Number.parseFloat(this.min)
    },
    iMax() {
      if (this.max === undefined) return undefined
      return Number.parseFloat(this.max)
    },
    decimalSeparator() {
      return this.$t('decimalSeparator')
    }
  },
  methods: {
    onInput(event) {
      //console.log(event, event)
      //console.log(event.target.value)
      //console.log(event.target.selectionStart, event.target.selectionEnd)
      // TODO: need to fix: remove decimal separators if there are multiple!!!
      event.target.value = event.target.value.replace(new RegExp(`[^0-9${this.decimalSeparator}-]`), '')
      event.target.value = event.target.value.replace(/^.*\-(.+)/, '-$1')
      event.target.value = event.target.value.replace(/^(-)?0?([0-9]+)/, '$1$2')
            
      if (this.iMin !== undefined && this.iMin >= 0) {
        event.target.value = event.target.value.replace('-', '')
      } else if (this.iMax !== undefined && this.iMax <= 0) {
        event.target.value = event.target.value.replace(/^([^-])(.*)/, '-$1$2')
      }

      let parseInput
      let parsedNumber
      if (parseInput === '') {
        parsedNumber = 0
      } else if (this.type === 'integer') {
        event.target.value = event.target.value.replace(this.decimalSeparator, '')

        parseInput = event.target.value
        try {
          parsedNumber = parseInt(parseInput)
        } catch (error) {
          console.debug('Parser number error', error)
        }
      } else {
        parseInput = event.target.value.replace(this.decimalSeparator, '.')
        try {
          parsedNumber = parseFloat(parseInput)
        } catch (error) {
          console.debug('Parser number error', error)
        }
      }

      if (this.iMin !== undefined && parsedNumber < this.iMin) {
        parsedNumber = this.iMin
      } else if (this.iMax !== undefined && parsedNumber > this.iMax) {
        parsedNumber = this.iMax
      }

      if (parsedNumber !== undefined && !isNaN(parsedNumber)) {
        this.iValue = parsedNumber
      }
    },
    toDecimalLimitedString(number) {
      if (this.type === 'integer') {
        return String(Math.floor(number))
      }

      const fixed = Number(number).toFixed(this.decimalPlaces)
      if (fixed.length > String(number).length) {
        return String(number).replace('.', this.decimalSeparator)
      } else {
        return fixed.replace('.', this.decimalSeparator)
      }
    }
  },
  watch: {
    value() {
      if (this.value !== this.iValue) {
        if (isNaN(this.value)) {
          this.iValue = this.iMin
        } else {
          this.iValue = this.value
        }
        this.sValue = this.toDecimalLimitedString(this.iValue)
      }
    },
    iValue() {
      this.$emit('input', this.iValue)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.number-input {
  border: 0;
  border-bottom: 2px solid $primary-color;
  padding: 4px 0;
  outline: 0;
  font-size: .8rem;
  display: flex;
  
  /*&::placeholder {
    color: $primary-color;
    opacity: .5;
    font-size: .8rem;
  }*/

  .negative & {
    border-bottom-color: white;
    color: rgb(87, 80, 80);

    /*&::placeholder {
      color: white;
    }*/
  }

  .internal-input {
    flex-grow: 1;
    outline: 0;
    width: 150px;
    //white-space: nowrap;
    //overflow: hidden;
    border: 0;
    padding: 0;
  }

  .unit {
    color: $primary-color;
  }
}
</style>