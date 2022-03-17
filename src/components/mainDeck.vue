<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
          <v-card class='pa-3'>
            <v-btn icon color='black' style='position:absolute;right:0px;bottom:0px' @click='toggleSign'>
                <v-icon>{{ pmIcon }}</v-icon>
            </v-btn>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" style='position:absolute;right:2px;top:2px;z-index:5'>
                  <v-icon color='black'>{{ svgPathDots }}</v-icon>
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
                <v-list-item @click='insertDialog = true'>
                  <v-list-item-avatar><v-icon color='black'>{{ svgPathAdd }}</v-icon></v-list-item-avatar>
                  <v-list-item-content>Insérer</v-list-item-content>
                </v-list-item>
                <v-list-item @click='expandDialog = true'>
                  <v-list-item-avatar><v-icon color='black'>{{ svgPathExpand }}</v-icon></v-list-item-avatar>
                  <v-list-item-content>Développer</v-list-item-content>
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
                    <v-btn width='150px' text color='error' @click='multDialog = false'>Annuler</v-btn>
                    <v-btn width='150px' color='primary' @click='multiply'>Multiplier</v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog width='400px' v-model="deleteDialog">
              <v-card>
                <v-card-title>Effacer toutes les tuiles ?</v-card-title>
                <v-card-actions style='display:flex;justify-content:center'>
                  <v-btn width='150px' text color='primary' @click='deleteDialog = false'>Annuler</v-btn>
                  <v-btn width='150px' color='error' @click='clearAll'>Effacer tout</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog width='400px' v-model="expandDialog">
              <v-card>
                <v-card-title>Développer l'expression ?</v-card-title>
                <v-card-actions style='display:flex;justify-content:center'>
                  <v-btn width='150px' text color='primary' @click='expandDialog = false'>Annuler</v-btn>
                  <v-btn width='150px' color='error' @click='expandExpr'>Développer</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog width='600px' v-model="insertDialog">
              <v-card>
                <v-card-title>Insérer une expression</v-card-title>
                <v-card-text style='font-family:"Times new roman";font-size:32px'>
                  <v-select style='font-size:24px' :items="expressionItems" v-model='exprType' label="Expression" outlined/>
                  <v-window v-model='exprType'>
                    <v-window-item :key='0'>
                      Choose an expression
                    </v-window-item>
                    <v-window-item :key='1'>
                      <div style='display:flex;align-items:baseline'>
                        <span style='max-width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.a' solo/>
                        </span>
                        <span class='mx-2'>
                          <i>x</i> +
                        </span>
                        <span style='width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.b' solo/>
                        </span>
                      </div>
                    </v-window-item>
                    <v-window-item :key='2'>
                      <div style='display:flex;align-items:baseline'>
                        <span style='max-width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.k' solo/>
                        </span>
                        <span class='mx-2'>
                          (
                        </span>
                        <span style='max-width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.a' solo/>
                        </span>
                        <span class='mx-2'>
                          <i>x</i> +
                        </span>
                        <span style='width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.b' solo/>
                        </span>
                        <span class='mx-2'>
                          )
                        </span>
                      </div>
                    </v-window-item>
                    <v-window-item :key='3'>
                      <div style='display:flex;align-items:baseline'>
                        <span style='max-width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.k' solo/>
                        </span>
                        <span class='mx-2'>
                          <i>x</i>(
                        </span>
                        <span style='max-width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.a' solo/>
                        </span>
                        <span class='mx-2'>
                          <i>x</i> +
                        </span>
                        <span style='width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.b' solo/>
                        </span>
                        <span class='mx-2'>
                          )
                        </span>
                      </div>
                    </v-window-item>
                    <v-window-item :key='4'>
                      <div style='display:flex;align-items:baseline'>
                        <span class='mx-2'>
                          (
                        </span>
                        <span style='max-width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.c' solo/>
                        </span>
                        <span class='mx-2'>
                          <i>x</i> +
                        </span>
                        <span style='width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.d' solo/>
                        </span>
                        <span class='mx-2'>
                          )
                        </span>
                        <span class='mx-2'>
                          (
                        </span>
                        <span style='max-width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.a' solo/>
                        </span>
                        <span class='mx-2'>
                          <i>x</i> +
                        </span>
                        <span style='width:60px;'>
                          <v-text-field style='font-size:24px' hide-details type='number' max='9' min='-9' v-model='exprCoeffs.b' solo/>
                        </span>
                        <span class='mx-2'>
                          )
                        </span>
                      </div>
                    </v-window-item>
                  </v-window>
                </v-card-text>
                <v-card-actions style='display:flex;justify-content:flex-end'>
                  <v-btn width='150px' text color='error' @click='insertDialog = false'>Annuler</v-btn>
                  <v-btn width='150px' color='primary' @click='insertExpr'>Insérer</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div style='display:flex;justify-content:space-around;align-items:center'>
              <v-card
                v-for='button in tileButtons' :key='button.type'
                tile hover v-ripple
                @click='addTile(button.type)'
                :width='button.h=="x" ? 110 : 70'
                :height='button.v=="x" ? 110 : 70'
                :color="button.color"
                class='text-h3'
                style='display:flex;align-items:center;justify-content:center;'
                :style='`color: ${button.fontColor}`'
              >
                <span style='font-family:"Times new roman";display:flex;align-items:center'>
                  <span :style="{'margin-bottom': button.botAdjust+'px'}">
                    <span style='vertical-align:text-top;' v-if='!inputPositive'>–</span>
                    <span :style="{'font-style': button.italic ? 'italic' : ''}">{{ button.text }}</span>
                    <sup style='font-size:60%' v-if='button.exp'>2</sup>
                  </span>
                </span>
              </v-card>
            </div>
          </v-card>
      </v-col>
      <v-col cols='12' style='position:relative'>
        <v-switch v-model="autoFactor" label="Factoriser" style='position:absolute;top:-20px;right:0px;' @change='checkGroups'/>
        <formulaDisplay :groups='groupsDims'/>
      </v-col>
      <v-col cols="12" class='pb-0' style='display:flex'>
        <div style='width:40px'></div>
        <groupDimension
          v-for='(dim, index) in groupsDims' :key='index'
          :xes='dim.h.xes'
          :ones='dim.h.ones'
          style='margin-right:40px'
        />
      </v-col>
      <v-col cols="12" class='pt-1' style='display:flex'>
        <tileStack
          v-for='(tileGroup, index) in tileGroups' :key='`group-${index}`'
          :tileGroup='tileGroup'
          :index='index'
          :margin='margins[index]'
          :simplifiable='simplifiableGroups[index]'
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import tileStack from './tileStack';
  import groupDimension from './groupDimension';
  import formulaDisplay from './formulaDisplay';
  import { mdiDelete, mdiDotsVertical, mdiCloseThick, mdiArrowLeftRightBold, mdiPlusMinusVariant, mdiPlusCircleOutline, mdiArrowExpandHorizontal } from '@mdi/js';
  import tileSpecs from '../tileSpecs';

  export default {
    components: { tileStack, groupDimension, formulaDisplay },
    name: 'mainDeck',
    data: () => ({
      svgPathDelete: mdiDelete,
      svgPathDots: mdiDotsVertical,
      svgPathMult: mdiCloseThick,
      svgPathAdd: mdiPlusCircleOutline,
      svgPathFlat: mdiArrowLeftRightBold,
      svgPathExpand: mdiArrowExpandHorizontal,
      pmIcon: mdiPlusMinusVariant,
      autoFactor: true,
      inputPositive: true,
      deleteDialog: false,
      multDialog: false,
      insertDialog: false,
      expandDialog: false,
      multFactor: 1,
      expressionItems: [{text: 'ax+b', value: 1}, {text: 'k(ax+b)', value: 2}, {text: 'kx(ax+b)', value: 3}, {text: '(ax+b)(cx+d)', value: 4}],
      exprCoeffs: {a: 1, b: 1, c: 1, d: 1, k: 1},
      exprType: null,
      tileGroups: [[], []],
      groupBases: [],
      margins: [true],
      multFormValid: true,
      multRules: [
        v => !!v || 'Saisir une valeur',
        v => (v && v >=1 && v <= 10 && Math.floor(v)==v) || 'Valeur entière entre 1 et 10.',
      ],
      pairSets : [
        {color: '#FF0000', used: false}, {color: '#3f00ff', used: false}, {color: '#66ff00', used: false}, {color: '#39ff14', used: false},
        {color: '#fe6700', used: false}, {color: '#ffc82a', used: false}, {color: '#fea051', used: false}, {color: '#ff3503', used: false},
        {color: '#f08300', used: false}, {color: '#ff9889', used: false}, {color: '#fe01b1', used: false}, {color: '#ff85ff', used: false},
        {color: '#d90166', used: false}, {color: '#ff6ffc', used: false}, {color: '#ff1b2d', used: false}, {color: '#b21807', used: false},
      ]
    }),
    computed:{
      groupsDims(){
        let dims = [];
        let currentDim = {xes: 0, ones: 0};
        let simplifiable = false
        this.tileGroups.forEach((group, index) => {
          if(this.simplifiableGroups[index]) simplifiable = true;
          if(group.length > 0) {
            let vxes = 0;
            let vones = 0;
            let gaps = [];
            let href = null;
            let posref = null;
            group.forEach(tile => {
              if(href){
                gaps.push(tile.positive.h != posref || tile.h != href);
              }
              href = tile.h;
              posref = tile.positive.h;
              if(tile.v == 'x'){
                vxes += tile.positive.v ? 1 : -1;
              } else {
                vones += tile.positive.v ? 1 : -1;
              }
            });
            if(group[0].h == 'x'){
              currentDim.xes += group[0].positive.h ? 1 : -1;
            } else {
              currentDim.ones += group[0].positive.h ? 1 : -1;
            }
            if(this.margins[index+1]){
              dims.push({h: currentDim, v: {xes: vxes, ones: vones}, consistent: !simplifiable && !gaps.some(g=>g)});
              currentDim = {xes: 0, ones: 0};
            }
          }
        });
        return dims;
      },
      tileButtons(){
        let btns = [];
        ["xx", "x1", "1x", "11"].forEach(type => {
          const h = type.charAt(0);
          const v = type.charAt(1);
          if(h != v){
            const specs = this.inputPositive ? tileSpecs.positiveX : tileSpecs.negativeX;
            btns.push({type, h, v, ...specs});
          } else if (h == 'x'){
            const specs = this.inputPositive ? tileSpecs.positiveX2 : tileSpecs.negativeX2;
            btns.push({type, h, v, ...specs});
          } else {
            const specs = this.inputPositive ? tileSpecs.positiveOne : tileSpecs.negativeOne;
            btns.push({type, h, v, ...specs});
          }
        });
        return btns;
      },
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
      },
      simplifiableGroups(){
        let groups = [];
        this.tileGroups.forEach(group => {
          groups.push(group.some(tile => tile.pair != null));
        });
        return groups;
      }
    },
    mounted(){
      this.eventBus.$on('simplifyGroup', this.simplifyGroup);
      this.eventBus.$on('checkGroups', this.checkGroups);
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
              newGroup.push({h: tile.v, v: tile.h, positive: {h: tile.positive.v, v: tile.positive.h}, pair:tile.pair, id: tile.id});
            } else {
              newGroup.push(tile);
            }
          });
          this.tileGroups.push(newGroup);
        });
        this.checkGroups();
      });
      this.eventBus.$on('toggleSign', id => {
         let tempArray = this.tileGroups;
        this.tileGroups = [];
        tempArray.forEach(group => {
          let newGroup = [];
          group.forEach(tile => {
            if(tile.id == id){
              newGroup.push({
                v: tile.v,
                h: tile.h,
                positive: {h: tile.positive.h && tile.positive.v || !tile.positive.h && !tile.positive.v, v: !tile.positive.v},
                pair:tile.pair,
                id: tile.id
              });
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
      expandExpr(){
        let tilesByType = {s: 0, x: 0, o: 0}
        this.tileGroups.forEach(group => {
          group.forEach(tile => {
            if(tile.h == '1' && tile.v == '1'){
              tilesByType.o += this.isPositive(tile) ? 1 : -1;
            } else if(tile.h == 'x' && tile.v == 'x'){
              tilesByType.s += this.isPositive(tile) ? 1 : -1;
            } else {
              tilesByType.x += this.isPositive(tile) ? 1 : -1;
            }
          });
        });
        this.tileGroups = [];
        if(tilesByType.s != 0){
          this.addGroup('xx', {h: tilesByType.s>0, v: true}, Math.abs(tilesByType.s));
        }
        if(tilesByType.x != 0){
          console.log('x')
          this.addGroup('x1', {h: tilesByType.x>0, v: true}, Math.abs(tilesByType.x));
        }
        if(tilesByType.o != 0){
          this.addGroup('11', {h: tilesByType.o>0, v: true}, Math.abs(tilesByType.o));
        }
        this.autoFactor = false;
        this.checkGroups();
        this.expandDialog = false;
      },
      isPositive(tile){
        return tile.positive.v && tile.positive.h || !tile.positive.v && !tile.positive.h;
      },
      simplifyGroup(index){
        let temp = this.tileGroups[index];
        this.tileGroups[index] = [];
        if(temp != undefined){
          temp.forEach(tile => {
            if (tile.pair){
              this.pairSets.filter(set => set.color == tile.pair)[0].used = false;
            } else {
              this.tileGroups[index].push(tile);
            }
          });
        }
        this.checkGroups();
      },
      toggleSign(){
        this.inputPositive = !this.inputPositive;
      },
      checkGroups(){
        let tempArray = this.tileGroups;
        let nbGroups = 0;
        this.tileGroups = [];
        tempArray.forEach(group => {
          if(group.length > 0 && nbGroups <= 7){
            nbGroups++;
            this.tileGroups.push(group);
          }
        });
        this.tileGroups.push([]);
        this.margins = [true];
        for(let i=0; i<this.tileGroups.length; i++){
          this.margins.push(!this.compareGroups(i));
        }
        this.tileGroups.forEach(group => {
          let oldPairs = {};
          group.forEach(tile => {
            if(tile.pair){
              if(oldPairs[tile.pair]){
                oldPairs[tile.pair].push(tile);
              } else {
                oldPairs[tile.pair] = [tile];
              }
            }
          });
          Object.values(oldPairs).forEach(pair => {
            if(pair.length == 1){
              pair[0].pair = null;
            } else {
              if(this.isPositive(pair[0]) == this.isPositive(pair[1])){
                pair[0].pair = null;
                pair[1].pair = null;
              }
            }
          })
          group.forEach(tile1 => {
            group.forEach(tile2 => {
              if((tile1.v == tile2.v && tile1.h == tile2.h || tile1.v == tile2.h && tile1.h == tile2.v) && this.isPositive(tile1) == !this.isPositive(tile2) && tile1.pair == null && tile2.pair == null){
                let pairColor = null;
                while(pairColor == null){
                  const pickedSet = this.pairSets[Math.floor(Math.random()*this.pairSets.length)];
                  if(!pickedSet.used){
                    pairColor = pickedSet.color;
                    pickedSet.used = true;
                  }
                }
                tile1.pair = pairColor;
                tile2.pair = pairColor;
              }
            });
          });
        });
      },
      compareGroups(index){
        let group1 = this.tileGroups[index];
        let group2 = this.tileGroups[index+1];
        if(group1 == undefined || group2 == undefined) return false;
        if(!this.isConsistent(group1) || !this.isConsistent(group2)) return false;
        if(group1.length != group2.length) return false;
        if(group1[0].h != group2[0].h && !this.autoFactor) return false;
        for(let i=0; i<group1.length; i++){
          if(group1[i].v != group2[i].v || group1[i].positive.v != group2[i].positive.v) return false;
        }
        return true;
      },
      isConsistent(group){
        if(group.length == 0) return false;
        let ref = group[0].h;
        let signRef = group[0].positive.h
        let consistent = true;
        group.forEach(tile => {
          if(tile.h != ref || tile.positive.h != signRef) {
            consistent = false;
          }
        });
        return consistent;
      },
      insertExpr(){
        switch(this.exprType){
          case 1:
            this.addGroup('x1', {h: this.exprCoeffs.a > 0, v: true}, Math.abs(this.exprCoeffs.a));
            this.addGroup('11', {h: this.exprCoeffs.b > 0, v: true}, Math.abs(this.exprCoeffs.b));
          break;
          case 2:
            for(let i=0 ; i < Math.abs(this.exprCoeffs.a) ; i++){
              this.addGroup('x1', {h: this.exprCoeffs.a > 0, v: this.exprCoeffs.k > 0}, Math.abs(this.exprCoeffs.k));
            }
            for(let i=0 ; i < Math.abs(this.exprCoeffs.b) ; i++){
              this.addGroup('11', {h: this.exprCoeffs.b > 0, v: this.exprCoeffs.k > 0}, Math.abs(this.exprCoeffs.k));
            }
          break;
          case 3:
            for(let i=0 ; i < Math.abs(this.exprCoeffs.a) ; i++){
              this.addGroup('x1', {h: this.exprCoeffs.a > 0, v: this.exprCoeffs.k > 0}, Math.abs(this.exprCoeffs.k));
            }
            for(let i=0 ; i < Math.abs(this.exprCoeffs.b) ; i++){
              this.addGroup('11', {h: this.exprCoeffs.b > 0, v: this.exprCoeffs.k > 0}, Math.abs(this.exprCoeffs.k));
            }
          break;
          case 4:
            for(let i=0 ; i<Math.abs(this.exprCoeffs.a) ; i++){
              this.addMixedGroup(
                {type: 'xx', positive: {h: this.exprCoeffs.a>0, v: this.exprCoeffs.c>0}, nb: Math.abs(this.exprCoeffs.c)},
                {type: 'x1', positive: {h: this.exprCoeffs.a>0, v: this.exprCoeffs.d>0}, nb: Math.abs(this.exprCoeffs.d)}
              );
            }
            for(let i=0 ; i<Math.abs(this.exprCoeffs.b) ; i++){
              this.addMixedGroup(
                {type: '1x', positive: {h: this.exprCoeffs.b>0, v: this.exprCoeffs.c>0}, nb: Math.abs(this.exprCoeffs.c)},
                {type: '11', positive: {h: this.exprCoeffs.b>0, v: this.exprCoeffs.d>0}, nb: Math.abs(this.exprCoeffs.d)}
              );
            }
          break;
        }
        this.checkGroups();
        this.insertDialog = false;
      },
      addGroup(type, positive, nb){
        let newId = 1;
        this.tileGroups.forEach(group => {
          group.forEach(tile => {
            newId = Math.max(newId, tile.id + 1);
          });
        });
        let newGroup = [];
        for(let i=0 ; i<nb ; i++){
          newGroup.push({v: type.charAt(1), h: type.charAt(0), positive: {h: positive.h, v: positive.v}, pair: null, id: newId});
          newId++;
        }
        this.tileGroups.push(newGroup);
      },
      addMixedGroup(group1, group2){
        let newId = 1;
        this.tileGroups.forEach(group => {
          group.forEach(tile => {
            newId = Math.max(newId, tile.id + 1);
          });
        });
        let newGroup = [];
        for(let i=0 ; i<group1.nb ; i++){
          newGroup.push({v: group1.type.charAt(1), h: group1.type.charAt(0), positive: {h: group1.positive.h, v: group1.positive.v}, pair: null, id: newId});
          newId++;
        }
        for(let i=0 ; i<group2.nb ; i++){
          newGroup.push({v: group2.type.charAt(1), h: group2.type.charAt(0), positive: {h: group2.positive.h, v: group2.positive.v}, pair: null, id: newId});
          newId++;
        }
        this.tileGroups.push(newGroup);
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
          this.tileGroups[k].push({v: newV, h: newH, positive: {h: this.inputPositive, v: true}, pair: null, id: newId});
        } else {
          this.tileGroups.push([{v: newV, h: newH, positive: {h: this.inputPositive, v: true}, pair: null, id: newId}]);
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
              group.push({v:tile.v, h:tile.h, positive: tile.positive, id});
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
