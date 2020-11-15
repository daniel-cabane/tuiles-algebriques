<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
          <v-card class='pa-3'>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" style='position:absolute;right:2px;top:2px;z-index:5'>
                  <v-icon>{{ svgPathDots }}</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click='flatten' :disabled='totalTiles > 12'>
                  <v-list-item-avatar><v-icon :color='totalTiles > 12 ? "grey lighten-1" : "black"'>{{ svgPathFlat }}</v-icon></v-list-item-avatar>
                  <v-list-item-content>Etaler</v-list-item-content>
                </v-list-item>
                <v-list-item @click='multDialog = true' :disabled='!isFlat'>
                  <v-list-item-avatar><v-icon :color='!isFlat ? "grey lighten-1" : "black"'>{{ svgPathMult }}</v-icon></v-list-item-avatar>
                  <v-list-item-content>Multiplier</v-list-item-content>
                </v-list-item>
                <v-list-item @click='deleteDialog = true'>
                  <v-list-item-avatar><v-icon>{{ svgPathDelete }}</v-icon></v-list-item-avatar>
                  <v-list-item-content>Tout effacer</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-dialog width='400px' v-model="multDialog">
              <v-card>
                <v-card-title>Multiplier par ?</v-card-title>
                <v-card-actions style='display:block'>
                  <v-form ref="multForm" v-model="multFormValid" lazy-validation>
                    <div>
                      <v-text-field autofocus v-model='multFactor' label="Multiplicateur" type='Number' min='1' max='10' step='1' outlined :rules='multRules'></v-text-field>
                    </div>
                  </v-form>
                  <div style='display:flex;justify-content:space-around'>
                    <v-btn width='150px' color='error' @click='multDialog = false'>Annuler</v-btn>
                    <v-btn width='150px' color='primary' @click='multiply'>Multiplier</v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog width='400px' v-model="deleteDialog">
              <v-card>
                <v-card-title>Effacer toutes les tuiles ?</v-card-title>
                <v-card-actions style='display:flex;justify-content:center'>
                  <v-btn width='150px' color='primary' @click='deleteDialog = false'>Annuler</v-btn>
                  <v-btn width='150px' color='error' @click='clearAll'>Effacer tout</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div style='display:flex;justify-content:space-around;align-items:center'>
              <v-card 
                tile hover v-ripple
                @click='addTile("xx")'
                width='85' 
                height="85" 
                color="red" 
                class='text-h3'
                style='display:flex;align-content:center;justify-content:center;'
              >
                <span style='font-family:"Times new roman";font-style:italic;display:flex;align-items:center'>
                  <span style="margin-bottom:15px;">
                    x
                    <span style="vertical-align:super;font-size:50%;margin-left:-10px">
                      2
                    </span>
                  </span>
                </span>
              </v-card>
              <v-card 
                tile hover v-ripple
                @click='addTile("x1")'
                width='85' 
                height="55" 
                color="blue" 
                class='text-h3'
                style='display:flex;align-content:center;justify-content:center;'
              >
                <span style='font-family:"Times new roman";font-style:italic;display:flex;align-items:center'>
                  <span style="margin-bottom:10px;">x</span>
                </span>
              </v-card>
              <v-card 
                tile hover v-ripple
                @click='addTile("1x")'
                width='55' 
                height="85" 
                color="blue" 
                class='text-h3'
                style='display:flex;align-content:center;justify-content:center;'
              >
                <span style='font-family:"Times new roman";font-style:italic;display:flex;align-items:center'>
                  <span style="margin-bottom:10px;">x</span>
                </span>
              </v-card>
              <v-card 
                tile hover v-ripple
                @click='addTile("11")'
                width='55' 
                height="55" 
                color="grey" 
                class='text-h4'
                style='display:flex;align-content:center;justify-content:center;'
              >
                <span style='font-family:"Times new roman";;display:flex;align-items:center'>
                  1
                </span>
              </v-card>
            </div>
          </v-card>
      </v-col>
      <v-col cols="12" style='display:flex'>
        <span v-for='(tileGroup, index) in tileGroups' :key='`group-${index}`' style='display:flex'>
            <draggable group="tiles" @start="drag=true" @end="drag=false" :list="tileGroup"  @change='checkGroups'>
              <singleTile v-for="tile in tileGroup" :key="tile.id" :h='tile.h' :v='tile.v' :id='tile.id'></singleTile>
            </draggable>
          <span style='width:10px' v-if="margins[index]"></span>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import draggable from 'vuedraggable';
  import singleTile from './singleTile';
  import { mdiDelete, mdiDotsVertical, mdiCloseThick, mdiArrowLeftRightBold  } from '@mdi/js';

  export default {
    components: { draggable, singleTile },
    name: 'mainDeck',
    data: () => ({
      svgPathDelete: mdiDelete,
      svgPathDots: mdiDotsVertical,
      svgPathMult: mdiCloseThick,
      svgPathFlat: mdiArrowLeftRightBold,
      deleteDialog: false,
      multDialog: false,
      multFactor: 1,
      tileGroups: [[], []],
      margins: [true],
      multFormValid: true,
      multRules: [
        v => !!v || 'Saisir une valeur',
        v => (v && v >=1 && v <= 10 && Math.floor(v)==v) || 'Valeur entière entre 1 et 10.',
      ],
    }),
    computed:{
      totalTiles(){
        let total = 0;
        this.tileGroups.forEach(group => total += group.length);
        return total;
      },
      isFlat(){
        let flat = true;
        this.tileGroups.forEach(group => {
          if(group.length > 1){
            flat = false;
          } 
        });
        return flat;
      }
    },
    mounted(){
      this.eventBus.$on('deleteTile', id => {
         let tempArray = this.tileGroups;
        this.tileGroups = [];
        tempArray.forEach(group => {
          let newGroup = [];
          group.forEach(tile => {
            if(tile.id != id) newGroup.push(tile);
          });
          this.tileGroups.push(newGroup);
        });
        this.checkGroups();
      });
      this.eventBus.$on('rotateTile', id => {
         let tempArray = this.tileGroups;
        this.tileGroups = [];
        tempArray.forEach(group => {
          let newGroup = [];
          group.forEach(tile => {
            if(tile.id == id){
              newGroup.push({h: tile.v, v: tile.h, id: tile.id});
            } else {
              newGroup.push(tile);
            }
          });
          this.tileGroups.push(newGroup);
        });
        this.checkGroups();
      });
    },
    methods:{
      checkGroups(){
        let tempArray = this.tileGroups;
        this.tileGroups = [];
        tempArray.forEach(group => {
          if(group.length > 0){
            this.tileGroups.push(group);
          }
        });
        this.tileGroups.push([]);
        this.margins = [];
        for(let i=0; i<this.tileGroups.length; i++){
          this.margins.push(!this.compareGroups(i));
        }
      },
      compareGroups(index){
        let group1 = this.tileGroups[index];
        let group2 = this.tileGroups[index+1];
        if(group1 == undefined || group2 == undefined) return false;
        if(!this.isConsistent(group1) || !this.isConsistent(group2)) return false;
        if(group1.length != group2.length) return false;
        for(let i=0; i<group1.length; i++){
          if(group1[i].v != group2[i].v) return false;
        }
        return true;
      },
      isConsistent(group){
        if(group.length == 0) return false;
        let ref = group[0].h;
        group.forEach(tile => {
          if(tile.h != ref) return false;
        });
        return true;
      },
      addTile(type){
        let newId = 1;
        this.tileGroups.forEach(group => {
          group.forEach(tile => {
            newId = Math.max(newId, tile.id + 1);
          });
        });

        let newH = type.charAt(0);
        let newV = type.charAt(1);
        let k = this.tileGroups.length-1;
        while(this.tileGroups[k].length == 0 && k > 0){
          k--;
        }
        if(this.tileGroups[k][0] == undefined || (this.tileGroups[k][0].h == newH && this.tileGroups[k][0].v == newV)){
          this.tileGroups[k].push({v: newV, h: newH, id: newId});
        } else {
          this.tileGroups.push([{v: newV, h: newH, id: newId}]);
        }
        this.checkGroups();
      },
      flatten(){
        let allTiles = [];
        this.tileGroups.forEach(group => {
          group.forEach(tile => allTiles.push(tile));
        });
        this.tileGroups = [];
        allTiles.forEach(tile => this.tileGroups.push([tile]));
        this.checkGroups();
      },
      multiply(){
        if(this.$refs.multForm.validate()){
          let id = 1;
          let allTiles = [];
          this.tileGroups.forEach(group => {
            group.forEach(tile => allTiles.push(tile));
          });
          this.tileGroups = [];
          allTiles.forEach(tile => {
            let group = [];
            for(let k=0; k<this.multFactor; k++){
              group.push({v:tile.v, h:tile.h, id});
              id++;
            }
            this.tileGroups.push(group);
          });
          this.checkGroups();
          this.$refs.multForm.reset();
          this.multDialog = false;
        }
      },
      clearAll(){
        this.tileGroups = [[],[]];
        this.deleteDialog = false;
      }
    }
  }
</script>
