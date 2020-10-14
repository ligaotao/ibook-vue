<script>
/**
 * item and slot component both use similar wrapper
 * we need to know their size change at any time
 */

import {h } from 'vue'
import {Wrapper} from './mixins'
import {SlotProps } from './props'
export default {
  mixins: [Wrapper],
  props: SlotProps,

  render () {
    const { tag, uniqueKey } = this

    return h(tag, {
      key: uniqueKey,
      attrs: {
        role: uniqueKey
      }
    }, this.$slots.default)
  }
}
</script>