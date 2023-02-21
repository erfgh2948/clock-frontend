<template>
  <div class="rankListLinkContainer">
    <div><span>{{itemprops+1}} </span> &nbsp; {{MutatedProps}}</div>
  </div>
    <!-- <p>winename = {{props.winename}}  SalesVolume = {{ props.salesVolume }}</p> -->
</template>

<script setup>

import { defineProps,computed } from 'vue';

const takeProps=defineProps(['props','itemprops'])

// const itemNum =["1"]
const MutatedProps = computed(() =>{
  let prox = takeProps.props.winename.substring(0,takeProps.props.winename.indexOf('('))
  if(prox.lastIndexOf(' ')==-1) return prox
  else{
    if(prox.lastIndexOf(' ',prox.lastIndexOf(' ',prox.lastIndexOf(' ')-1)-1)) return prox
    else return prox
  }
 

})
// substring(startIndex,endIndex)와 indexof로 '('까지 찾아서 반환





</script>

<style scoped>
.search-container > div > ul {padding-left:15px;}
.tab_menu{position:relative;}
.tab_menu .list{overflow:hidden;}
</style>