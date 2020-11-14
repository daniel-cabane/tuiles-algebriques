<template>
<v-hover v-slot="{ hover }">
  <v-card tile flat :width='tileWidth' :height="tileHeight" :color="tileColor" style='display:flex;align-content:center;justify-content:center;font-family:"Times new roman";font-style: italic;'>
        <div style='position:absolute;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between' :class='hover ? "font-weight-bold" : ""'>
            <div style='font-size:16px;'>{{ h }}</div>
            <div style='font-size:16px;text-align:right;padding-right:5px'><i>{{ v }}</i></div>
            <div style='visibility:hidden'>hidden</div>
        </div>
        <span style='font-size:72px;display:flex;align-items:center' v-html='centerText'></span>
        <v-btn fab icon x-small color='black' style='position:absolute;left:0px;top:0px' @click='deleteMe' v-if='hover'>
            <v-icon>{{ svgPath }}</v-icon>
        </v-btn>
    </v-card>
</v-hover>
</template>

<script>
import { mdiDelete } from '@mdi/js';

export default {
    props: { h: String, v: String, id: Number },
    data: () => ({
      svgPath: mdiDelete,
    }),
    computed: {
        centerText(){
            if(this.v != this.h){
                return '<span style="margin-bottom:10px;">x</span>';
            } else if(this.v == 'x'){
                return '<span style="margin-bottom:15px;">x<span style="vertical-align:super;font-size:50%">2</span></span>';
            } else {
                return '<span style="font-size:48px;font-style:normal">1</span>';
            }
        },
        tileColor(){
            if(this.v != this.h){
                return 'blue';
            } else if(this.v == 'x'){
                return 'red';
            } else {
                return 'grey';
            }
        },
        tileWidth(){
            return this.h == 'x' ? 135 : 75;
        },
        tileHeight(){
            return this.v == 'x' ? 135 : 75;
        }
    },
    methods: {
        deleteMe(){
            this.eventBus.$emit('deleteTile', this.id);
        }
    }
}
</script>

<style>
sup {
  vertical-align: super;
  font-size: 1%;
}
</style>