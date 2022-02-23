<template lang="html">
  <span style='display:flex;'>
    <span style='width:40px' v-if="margin"/>
    <span style='position:relative;'>
      <groupDimension
        :xes='groupData.height.xes'
        :ones='groupData.height.ones'
        style='transform:rotate(-90deg) translateX(-100%);transform-origin:left;position:absolute;top:0px;left:-10px'
        v-if="showDimension"
      />
      <draggable group="tiles" @start="drag=true" @end="drag=false" :list="tileGroup"  @change='checkGroups'>
        <singleTile
          v-for="(tile, index) in tileGroup" :key="tile.id"
          :h='tile.h'
          :v='tile.v'
          :positive='tile.positive'
          :pairColor='tile.pair'
          :id='tile.id'
          :style='`margin-bottom:${groupData.gaps[index] ? "10px" : "0px"}`'
        />
      </draggable>
      <v-btn icon large color='black' @click='simplifyGroup' v-if='simplifiable'>
        <v-icon large>{{ upIcon }}</v-icon>
      </v-btn>
    </span>
  </span>
</template>

<script>
import draggable from 'vuedraggable';
import singleTile from './singleTile';
import groupDimension from './groupDimension';
import { mdiArrowUpBoldOutline } from '@mdi/js';

export default {
  components: { draggable, singleTile, groupDimension },
  props: { tileGroup: Array, index: Number, simplifiable : Boolean, margin: Boolean },
  name: 'tileStack',
  data: () => ({
    upIcon: mdiArrowUpBoldOutline
  }),
  computed:{
    groupData(){
      let xes = 0;
      let ones = 0;
      let gaps = [];
      let href = null;
      let posref = null
      this.tileGroup.forEach(tile => {
        if(href){
          gaps.push(tile.positive.h != posref || tile.h != href);
        }
        href = tile.h;
        posref = tile.positive.h;
        if(tile.v == 'x'){
          xes += tile.positive.v ? 1 : -1;
        } else {
          ones += tile.positive.v ? 1 : -1;
        }
      });
      return {gaps, height: {xes, ones}, noGaps: !gaps.some(g=>g)};
    },
    showDimension(){
      return this.margin && this.groupData.noGaps && !this.simplifiable;
    }
    // groupHeight(){
    //   let xes = 0;
    //   let ones = 0;
    //   this.tileGroup.forEach(tile => {
    //     if(tile.v == 'x'){
    //       xes++;
    //     } else {
    //       ones++;
    //     }
    //   });
    //   return {xes, ones};
    // }
  },
  methods: {
    checkGroups(){
      this.eventBus.$emit('checkGroups', {});
    },
    simplifyGroup(){
      this.eventBus.$emit('simplifyGroup', this.index);
    }
  }
}
</script>

<style lang="css" scoped>

</style>
