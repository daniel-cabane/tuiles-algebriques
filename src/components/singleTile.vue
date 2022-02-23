<template>
  <v-hover>
    <v-card
        tile flat
        slot-scope="{ hover }"
        :width='tileWidth' :height="tileHeight"
        :color="tileSpecs.color"
        :style='`color:${tileSpecs.fontColor}`'
        style='display:flex;align-content:center;justify-content:center;font-family:"Times new roman";position:relative;'
    >
      <div style='position:absolute;top:0;left:0;width:5px;height:100%' :style='`background:${stripesColor.v}`'/>
      <div style='position:absolute;top:0;right:0;width:5px;height:100%' :style='`background:${stripesColor.v}`'/>
      <div style='position:absolute;top:0;left:0;width:100%;height:5px' :style='`background:${stripesColor.h}`'/>
      <div style='position:absolute;bottom:0;left:0;width:100%;height:5px' :style='`background:${stripesColor.h}`'/>
      <div class='underlay' v-if='hover'>
        <div style='display:flex;justify-content:center;'>
          <span v-html='tileDimensions.h'/>
        </div>
        <div style='display:flex;justify-content:space-between;'>
          <span v-html='tileDimensions.v'/>
          <span v-html='tileDimensions.v'/>
        </div>
        <div style='display:flex;justify-content:center;'>
          <span v-html='tileDimensions.h'/>
        </div>
      </div>
      <span class='text-h3' style='display:flex;align-items:center' v-if='!hover'>
        <span style='font-family:"Times new roman"' :style="{'margin-bottom': tileSpecs.botAdjust+'px'}">
          <span style='vertical-align:text-top;margin-left:5px' v-if='!positiveTile'>–</span>
          <span :style="{'font-style': tileSpecs.italic ? 'italic' : 'normal'}">{{ tileSpecs.text }}</span>
          <sup style='font-size:60%' v-if='tileSpecs.exp'>2</sup>
        </span>
      </span>
      <v-btn icon style='position:absolute;left:-5px;top:-5px' @click='deleteMe' v-if='hover'>
          <v-icon :color='tileSpecs.fontColor' small>{{ deleteIcon }}</v-icon>
      </v-btn>
      <v-btn icon style='position:absolute;left:-5px;bottom:-5px' @click='toggleSign' v-if='hover'>
          <v-icon :color='tileSpecs.fontColor' small>{{ pmIcon }}</v-icon>
      </v-btn>
      <v-btn icon style='position:absolute;right:0px;top:0px' @click='rotateMe' v-if='hover && v=="x" && h=="1"'>
          <v-icon :color='tileSpecs.fontColor' small>{{ rotateLandscape }}</v-icon>
      </v-btn>
      <v-btn icon style='position:absolute;right:0px;top:0px' @click='rotateMe' v-if='hover && v=="1" && h=="x"'>
          <v-icon :color='tileSpecs.fontColor' small>{{ rotatePortrait }}</v-icon>
      </v-btn>
    </v-card>
  </v-hover>
</template>

<script>
import { mdiDelete, mdiPhoneRotateLandscape, mdiPhoneRotatePortrait, mdiPlusMinusVariant } from '@mdi/js';
import tileSpecs from '../tileSpecs';

export default {
    props: { h: String, v: String, positive: Object, pairColor: String, id: Number },
    data: () => ({
      deleteIcon: mdiDelete,
      pmIcon: mdiPlusMinusVariant,
      rotateLandscape: mdiPhoneRotateLandscape,
      rotatePortrait: mdiPhoneRotatePortrait
    }),
    computed: {
      positiveTile(){
        return this.positive.v && this.positive.h || !this.positive.v && !this.positive.h;
      },
      tileDimensions(){
        let absh = this.h == 'x' ? '<i>x</i>' : '1';
        let absv = this.v == 'x' ? '<i>x</i>' : '1';
        return {h: this.positive.h ? absh : `–${absh}`, v: this.positive.v ? absv : `–${absv}`}
      },
      tileSpecs(){
        if(this.h != this.v){
          return this.positiveTile ? tileSpecs.positiveX : tileSpecs.negativeX;
        }
        if (this.h == 'x'){
          return this.positiveTile ? tileSpecs.positiveX2 : tileSpecs.negativeX2;
        }
        return this.positiveTile ? tileSpecs.positiveOne : tileSpecs.negativeOne;
      },
      tileWidth(){
          return this.h == 'x' ? 130 : 80;
      },
      tileHeight(){
          return this.v == 'x' ? 130 : 80;
      },
      stripesColor(){
        return {h: this.borderColor(this.h, this.positive.h), v: this.borderColor(this.v, this.positive.v)};
      },
      // bordersStyle(){
      //   const hColor = this.borderColor(this.h, this.positive.h);
      //   const vColor = this.borderColor(this.v, this.positive.v);
      //   return `border-top-color:${hColor};border-bottom-color:${hColor};border-left-color:${vColor};border-right-color:${vColor};`;
      // }
    },
    methods: {
        borderColor(type, positive){
          if(type == 'x'){
            if(positive){
              return '#FF0000';
            } else {
              return '#660102'
            }
          } else {
            if(positive){
              return '#0000FF';
            } else {
              return '#000011'
            }
          }
        },
        deleteMe(){
            this.eventBus.$emit('deleteTile', this.id);
        },
        rotateMe(){
            this.eventBus.$emit('rotateTile', this.id);
        },
        toggleSign(){
            this.eventBus.$emit('toggleSign', this.id);
        }
    }
}
</script>

<style>
  .underlay {
    position:absolute;
    top:0px;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    font-family:"Times new roman";
    font-size: '16px';
    padding:5px
  }
</style>
