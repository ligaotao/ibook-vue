<template>
  <div class="chapter-info" :class="index === active ? 'chapter-info-active': ''">
    <div><Icon name="location-o" v-if="index === active" /></div>
    
    <span>{{index}} - {{active}} - {{ source.name }}</span>
  </div>
</template>

<script>
  import {Icon} from "vant"
  export default {
    name: 'item',
    components: { Icon },
    props: {
      index: { // index of current item
        type: Number
      },
      active: {
        type: Number
      },
      source: { // here is: {uid: 'unique_1', text: 'abc'}
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="less">
.chapter-info {
  box-sizing: border-box;
  height: 50px;
  text-align: left;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  color: rgb(117,117,117);
  overflow: hidden;
}
.chapter-info div {
  width: 20px;
  margin-right: 5px;
  text-align: center;
}
.chapter-info-active{
  color: @title-color-active;
}
</style>