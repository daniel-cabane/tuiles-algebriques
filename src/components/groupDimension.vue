<template lang="html">
  <div style='display:flex;justify-content:center;align-items:center;position:relative;' :style='`width:${width}px`' v-if='show'>
    <div style='position:absolute;top:-28px;left:0px;width:100%;display:flex;justify-content:center'>
      <span style='font-family:"Times new roman";font-size:24px' v-html='expr'/>
    </div>
    <div class='arrow left'/>
    <div style='width:calc(100% - 10px);height:2px;background:black;margin-left:-7px;margin-right:-7px;'/>
    <div class='arrow right'/>
  </div>
</template>

<script>
export default {
  props: { xes: Number, ones: Number },
  name: 'groupDimension',
  data: () => ({

  }),
  computed:{
    width(){
      return Math.abs(this.xes)*130 + Math.abs(this.ones)*80;
    },
    expr(){
      if(this.ones == 0){
        if(this.xes == 1) return '<i>x</i>';
        if(this.xes == -1) return '–<i>x</i>';
        return `${this.xes}<i>x</i>`;
      }
      if(this.xes == 0) return `${this.ones}`;
      if(this.xes == 1) return this.ones > 0 ? `<i>x</i>+${this.ones}` : `<i>x</i>–${-this.ones}`;
      if(this.xes == -1) return this.ones > 0 ? `–<i>x</i>+${this.ones}` : `–<i>x</i>–${-this.ones}`;
      return this.ones > 0 ? `${this.xes}<i>x</i>+${this.ones}` : `${this.xes}<i>x</i>–${-this.ones}`;
    },
    show(){
      return this.xes != 0 || this.ones != 0;
    }
  },
  methods: {

  }
}
</script>

<style lang="css" scoped>
  .arrow {
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
  }
  .left {
    transform: rotate(135deg);
  }
  .right {
    transform: rotate(-45deg);
  }
</style>
