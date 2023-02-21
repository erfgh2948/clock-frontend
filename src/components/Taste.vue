<template>
  <div class="taste">
    <ul>
      <li>
        <span>당도</span>
        <div class="filter-grade" >
          <button :class="{on:colorChk('sweet', 1)}" @click="taste('sweet', 1)"></button>
          <button :class="{on:colorChk('sweet', 2)}" @click="taste('sweet', 2)"></button>
          <button :class="{on:colorChk('sweet', 3)}" @click="taste('sweet', 3)"></button>
          <button :class="{on:colorChk('sweet', 4)}" @click="taste('sweet', 4)"></button>
          <button :class="{on:colorChk('sweet', 5)}" @click="taste('sweet', 5)"></button>
        </div>
      </li>
      <li>
        <span>산도</span>
        <div class="filter-grade">
          <button :class="{on:colorChk('acidity', 1)}" @click="taste('acidity', 1)"></button>
          <button :class="{on:colorChk('acidity', 2)}" @click="taste('acidity', 2)"></button>
          <button :class="{on:colorChk('acidity', 3)}" @click="taste('acidity', 3)"></button>
          <button :class="{on:colorChk('acidity', 4)}" @click="taste('acidity', 4)"></button>
          <button :class="{on:colorChk('acidity', 5)}" @click="taste('acidity', 5)"></button>
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <span>바디</span>
        <div class="filter-grade">
          <button :class="{on:colorChk('body', 1)}" @click="taste('body', 1)"></button>
          <button :class="{on:colorChk('body', 2)}" @click="taste('body', 2)"></button>
          <button :class="{on:colorChk('body', 3)}" @click="taste('body', 3)"></button>
          <button :class="{on:colorChk('body', 4)}" @click="taste('body', 4)"></button>
          <button :class="{on:colorChk('body', 5)}" @click="taste('body', 5)"></button>
        </div>
      </li>
      <li>
        <span>타닌</span>
        <div class="filter-grade">
          <button :class="{on:colorChk('tannin', 1)}" @click="taste('tannin', 1)"></button>
          <button :class="{on:colorChk('tannin', 2)}" @click="taste('tannin', 2)"></button>
          <button :class="{on:colorChk('tannin', 3)}" @click="taste('tannin', 3)"></button>
          <button :class="{on:colorChk('tannin', 4)}" @click="taste('tannin', 4)"></button>
          <button :class="{on:colorChk('tannin', 5)}" @click="taste('tannin', 5)"></button>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
export default{
  data(){
    return{    
      level: {sweet: 0, body: 0, acidity: 0, tannin:0},
    }
  },
  methods: {
    taste(filter, lv){
      this.level[filter] = lv
    },
    colorChk(filter, lv) {
      return lv <= this.level[filter]
    },
  }
}
</script>

<style scoped>
 /* 맛 선택  */
  .taste ul {
    float:left;
    width:100%;
    padding:0;
  }
  .taste ul li {
    display:flex; justify-content:space-between;
    padding-left:20px;
  }
  .filter-grade button {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-left: 5px;
    border: solid 1px #ccc;
    border-radius: 50%;
  }
  /* 맛 선택버튼 색 */
  .filter-grade .on{
    border-color: #fff;
    background-color: #c70039;
  }
  .filter-grade .on:nth-child(1) {opacity:0.25;}
  .filter-grade .on:nth-child(2) {opacity:0.4;}
  .filter-grade .on:nth-child(3) {opacity:0.55;}
  .filter-grade .on:nth-child(4) {opacity:0.75;}
  .filter-grade .on:nth-child(5) {opacity:1;}
</style>