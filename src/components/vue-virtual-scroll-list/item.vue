<script>
import {h } from 'vue'
import {Wrapper} from './mixins'
import { ItemProps } from './props'

export default {
mixins: [Wrapper], 

  props: ItemProps,
  
  render () {
    const { tag, component, extraProps = {}, index, scopedSlots = {}, uniqueKey, source } = this

    extraProps.source = source
    extraProps.index = index

    return h(tag, {
      key: uniqueKey,
      attrs: {
        role: 'listitem'
      }
    }, [h(component, {
      ...extraProps,
      ...scopedSlots
    })])
  }
}
</script>  