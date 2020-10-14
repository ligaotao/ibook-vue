import bus from './bus'

export const Wrapper = {
    created () {
      this.shapeKey = this.horizontal ? 'offsetWidth' : 'offsetHeight'
    },
  
    mounted () {
      // if (typeof ResizeObserver !== 'undefined') {
      //   this.resizeObserver = new ResizeObserver(() => {
      //     this.dispatchSizeChange()
      //   })
      //   this.resizeObserver.observe(this.$el)
      // }
    },
  
    // since componet will be reused, so disptach when updated
    updated () {
      this.dispatchSizeChange()
    },
  
    beforeUnmount () {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
        this.resizeObserver = null
      }
    },
  
    methods: {
      getCurrentSize () {
        return this.$el ? this.$el[this.shapeKey] : 0
      },
  
      // tell parent current size identify by unqiue key
      dispatchSizeChange () {
        bus.$emit(this.event, this.uniqueKey, this.getCurrentSize(), this.hasInitial)
      }
    }
  }