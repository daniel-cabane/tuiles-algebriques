<template>
  <v-hover v-slot="{ hover }">
    <v-card
        tile flat
        :width='tileWidth' :height="tileHeight"
        :color="tileSpecs.color"
        style='display:flex;align-content:center;justify-content:center;font-family:"Times new roman";'
        :style='{color: tileSpecs.fontColor, border: borderColor ? borderColor+" solid 3px" : "unset", "z-index": borderColor ? 10 : 1}'
    >
      <span class='text-h3' style='display:flex;align-items:center'>
        <span style='font-family:"Times new roman"' :style="{'margin-bottom': tileSpecs.botAdjust+'px'}">
          <span style='vertical-align:text-top;margin-left:5px' v-if='!positive'>–</span>
          <span :style="{'font-style': tileSpecs.italic ? 'italic' : 'normal'}" class='mr-3 ml-1'>{{ tileSpecs.text }}</span>
          <sup style='margin-left:-10px;font-size:60%' v-if='tileSpecs.exp'>2</sup>
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
    props: { h: String, v: String, positive: Boolean, borderColor: String, id: Number },
    data: () => ({
      deleteIcon: mdiDelete,
      pmIcon: mdiPlusMinusVariant,
      rotateLandscape: mdiPhoneRotateLandscape,
      rotatePortrait: mdiPhoneRotatePortrait
    }),
    computed: {
        tileSpecs(){
          if(this.h != this.v){
            return this.positive ? tileSpecs.positiveX : tileSpecs.negativeX;
          }
          if (this.h == 'x'){
            return this.positive ? tileSpecs.positiveX2 : tileSpecs.negativeX2;
          }
          return this.positive ? tileSpecs.positiveOne : tileSpecs.negativeOne;
        },
        tileWidth(){
            return this.h == 'x' ? 130 : 80;
        },
        tileHeight(){
            return this.v == 'x' ? 130 : 80;
        }
    },
    methods: {
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
