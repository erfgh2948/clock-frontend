<template>
  
    <div class="album py-5 bg-light">
      <div class="container">

        <div><input type="text" v-model="userSearch" class="searchWine" autofocus></div>
          <!-- span에 대한 구조적인 문제. span에 속성을 주고 크기를 주면 안됨 -->
          
          <span v-for="(item, idx) in state.items" :key="idx">
            <transition>
            <div class="cardBox" v-if="item.name.includes(userSearch)">
              <Card :itemprops="item"></Card>
            </div>
          </transition>
          </span>

          <div class="clear"></div>

        <ul class="filterList">
          <div class="fliterListContainer">
          <li><CheckBox :itemprops=state.filterData[0] @forwatch="isChangedIntegratedFilter"> </CheckBox></li>
          <li><CheckBox :itemprops=state.filterData[1] @forwatch="isChangedIntegratedFilter"> </CheckBox></li>
          <li><CheckBox :itemprops=state.filterData[2] @forwatch="isChangedIntegratedFilter"> </CheckBox></li>
          <li><CheckBox :itemprops=state.filterData[3] @forwatch="isChangedIntegratedFilter"> </CheckBox></li>
          <li><CheckBox :itemprops=state.filterData[4] @forwatch="isChangedIntegratedFilter"> </CheckBox></li>  
        </div>
        </ul>
        <!-- <button class= "imtest" @click="isChangedIntegratedFilter">Store 테스트예요</button> -->
        
      </div>
    </div>

</template>
<script>
import Card from '@/components/Card.vue'
import CheckBox from '@/components/CheckBox.vue'

// import router from '@/scripts/router'
import axios from "axios"
import {reactive, ref,watch } from 'vue';
import store from '@/scripts/store'

export default{
    name:'Home',
    components:{
        Card,CheckBox
    },
    setup(){
      
      const userSearch=ref('');
      const state=reactive({
        items:[],
        filterData:[
          {id:1,identifier:'레드와인',isOn:false},
          {id:2,identifier:'화이트와인',isOn:false},
          {id:3,identifier:'스파클링',isOn:false},
          {id:4,identifier:'로제와인',isOn:false},
           {id:5,identifier:'기타와인',isOn:false},],
      })
      let integratedFilter=reactive({
        variety:[],winename:'',nation:[],price:[],matching:[],sugar:0,acidity:0,texture:0,tannin:0,scent:'',salesVolume:0
    })

      axios.get("/java:8080/items")
      .then(({data})=>{state.items=data
      console.log(state.items);
    });

   // const test = computed(()=>{return store.getters.filter.wineCategory})//store에서 가져온다. 왜 못가져와 lifecycleHooks 문제인듯...
    // console.log(test.value)

    // Store getter 테스트
    const isChangedIntegratedFilter = async ()=>{
      integratedFilter.variety=await store.getters.getIntegratedFilterVariety//state.integratedFilter에 store.integratedFilter 덮어씌우기
    }
    watch(integratedFilter,(newValue)=>{
      //현재 home의 integratedFilter(스토어 카피)
          console.log(newValue.variety)
        })
    
    // console.log(store.getters.doneTodos)
        
      return {state, userSearch,isChangedIntegratedFilter,integratedFilter}
    }


}
</script>
<style scoped>
.album{
  margin-top:50px;
}
.cardBox{
  width:200px;height:400px;
}
.searchWine{margin-bottom:50px;}
span{float:left;display:block;}

/*transition for no -name component*/
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* 하위 컴포넌트인 checkbox의 구조를 home component 에서 제어하기 위함 */
ul{
  list-style: none;
        padding: 0;
        margin: 0;
}
ul li{
  float:left;
}
/* test */
.imtest{width:200px;height:50px;background-color: aqua;}
</style>