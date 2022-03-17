<template lang="html">
  <div style='font-family:"Times new roman";font-size:48px;' v-html='formula'/>
</template>

<script>
export default {
  props: { groups: Array },
  computed:{
    formula(){
      let formula = '';
      this.groups.forEach(group => {
        let str = '';
        if(group.consistent){
          str = this.gpFormula(group.v.xes, group.v.ones, group.h.xes, group.h.ones)
        } else {
          str = '???'
        }
        if(str[0] == '-' || str[0] == '–'){
           formula += ` – ${str.slice(1)}`;
        } else {
          if(formula.length){
            formula += ` + ${str}`;
          } else {
            formula += `${str}`;
          }
        }
      });
      return formula
    }
  },
  methods:{
    bn(a, b){
      if(a == 0){
        if(b == 0) return '';
        return `${b}`;
      }
      let c = a == 1 ? '' : a == -1 ? '–' : a < 0 ? `–${-a}` : a;
      if(b == 0) return `${c}<i>x</i>`;
      if( b < 0){
        return `${c}<i>x</i> – ${-b}`;
      }
      return `${c}<i>x</i> + ${b}`;
    },
    gpFormula(a, b, c, d){
      if(a == 0){
        if(c == 0) return `${b*d}`;
        if(d == 0) {
          if(b*c == 1) return '<i>x</i>'
          if(b*c == -1) return '–<i>x</i>'
          return `${b*c}<i>x</i>`;
        }
        if(b == 1) return this.bn(c,d);
        if(b == -1) return `–(${this.bn(c,d)})`;
        return `${b}(${this.bn(c,d)})`;
      }
      if(b == 0){
        if(c == 0){
          if(a*d == 1) return `<i>x</i>`;
          if(a*d == -1) return `–<i>x</i>`;
          return `${a*d}<i>x</i>`;
        }
        if(d == 0){
          if(a*c == 1) return `<i>x</i><sup style="font-size:60%">2</sup>`;
          if(a*c == -1) return `–<i>x</i><sup style="font-size:60%">2</sup>`;
          return `${a*c}<i>x</i><sup style="font-size:60%">2</sup>`;
        }
        if(a == 1) return `<i>x</i>(${this.bn(c,d)})`;
        if(a == -1) return `–<i>x</i>(${this.bn(c,d)})`;
        return `${a}<i>x</i>(${this.bn(c,d)})`;
      }
      if(c == 0){
        if(d == 1) return this.bn(a,b);
        if(d == -1) return `–${this.bn(a,b)}`;
        if(b == 0) return `${a*d}<i>x</i>`;
        return `${d}${this.bn(a,b)}`;
      }
      if(d == 0){
        if(c == 1) return `<i>x</i>(${this.bn(a,b)})`;
        if(c == -1) return `–<i>x</i>(${this.bn(a,b)})`;
        return `${c}<i>x</i>(${this.bn(a,b)})`;
      }

      return `(${this.bn(a, b)})(${this.bn(c, d)})`;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
