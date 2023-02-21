<template>
  <header name="test1">
    <div class="redbar"></div>
    <div class="graybar" :class="{isOpen}"></div>
    <nav id="nav">
      <router-link to="/" class="text-white"><img src="@/assets/logo_top.png" alt="wine"/></router-link>
      <input type="text">
      <ul class="menu"> 
        <li v-for="item in items" :key="item.id" class="mainmenu">
          <span @mouseenter="chkIndex" @mouseleave="mouseleave" >
            <!-- mouse hover 시 item.name을 한글-영어로 스왑하고 빨간색 입히기. -->
            <span v-if="item.id!=idx" :class="{swapKorToEng: false}" >{{item.name}}</span>
            <span v-if="item.id==idx" :class="{swapKorToEng: swapEng}" @click="clickBigMenu(item.id)">{{swapEng ? item.name2:item.name }}</span>
              <transition>
              <ul class="dropdown" :class="{ isOpen }" v-if="item.id==idx"> 
                <li v-for="child in item.children" :key="child">
                  <a :href="child.url">
                    {{ child.name }}
                  </a>
                </li>
              </ul>
              
              </transition>
          </span>
        </li>
      </ul>
      
      <ul class="bt-topmenu">
        <li>
          <router-link to="signup" v-if="!$store.state.account.id">회원가입</router-link>
          <router-link to="cart" v-if="$store.state.account.id" disabled> Mypage </router-link>
          <!-- 회원 이름 store로 입력받는걸 까먹어서 id로 대체함. 수정필요 -->
        </li>
        <li>
          <router-link to="/login" v-if="!$store.state.account.id">로그인</router-link>
          <a to="/login" class="logout" @click.prevent="this.logout()" v-else>Logout</a>
        </li>
        
      </ul>
    </nav>
  </header>

</template>

<script>
import {ref} from 'vue';
import store from '@/scripts/store'
import router from '@/scripts/router'

export default {
  setup() {
    const isOpen = ref(false)
    const idx = ref(0)
    const swapEng = ref(false)
    const items = [
      {
        id: 1,
        url: '#와인검색',
        name: '와인검색',
        name2:'Search',
        children: [
          {
            url: '#전체와인',
            name: '전체와인'
          },
          {
            url: '#이달의와인',
            name: '이달의와인'
          },
          {
            url: '#와인추천',
            name: '와인추전'
          }
        ]
      },
      {
        id: 2,
        url: '#뉴스',
        name: '뉴스',
        name2:'News',
        children: [//서브메뉴2
          {
            url: '#',
            name: '와인뉴스'
          },
          {
            url: '#',
            name: '와인21기자단'
          }
        ]
      },
      {
        id: 3,
        url: '#service',
        name: '서비스',
        name2:'Service',
        children: [ //서브메뉴3
          {
            url: '#',
            name: '전체이벤트'
          },
          {
            url: '#',
            name: '판매행사'
          },
          {
            url: '#',
            name: '시음회'
          },
          {
            url: '#',
            name: '교육'
          }
        ]
      },
      {
        id: 4,
        url: '#contact',
        name: '정보',
        name2:'Contact',
        children: [ //서브메뉴4
          {
            url: '#',
            name: '전체정보'
          },
          {
            url: '#',
            name: '와인사전'
          },
          {
            url: '#',
            name: '샵&레스토랑'
          }
        ]
      }
    ]

    const mouseover = () => {
      isOpen.value = true;
      swapEng.value=true;
    }
    const mouseleave = () => {
      swapEng.value=false}
    const chkIndex = (e) => {
      const nodes = [...e.target.parentElement.parentElement.children]
      const index = nodes.indexOf(e.target.parentElement)
      idx.value = index + 1
      // console.log(idx.value)
      isOpen.value = true
      swapEng.value=true
    }
    
    const itemss = [1, 2, 3, 4, 5];
    const show = ref(true);
    const logout=()=>{
      store.commit('setAccount',0);
      sessionStorage.removeItem("id")
      router.push({path:"/"})
    }
    const clickBigMenu = index =>{
      //todo...
      //눌렀을때 router 이용해서 각 페이지로 이동.
      console.log(index)
      router.push({path:"searchpage"})
    }
    return {isOpen, items, idx, show, itemss,swapEng,clickBigMenu, mouseover, mouseleave, chkIndex,logout}
  }

}
</script>

<style scoped>
span, a {cursor:pointer}
@media screen and (min-width:1400px) {
  header {width:100%; background-color: #ffffff;}
  /* 레드 테두리 nav*/
  .redbar {width:100%; height:30px; background:#c70039;}
  /* nav바 */
  #nav {
    display: flex;
    align-items: center;
    justify-content:space-between;
    width: 100%;
    margin: 0 auto;
    padding:0 100px;
    font-size:20px;
    box-shadow:0px 5px 5px -4px rgba(0, 0, 0, 0.3);
  }
  #nav > ul > li > a {
    display: block;
    height: auto;
    padding: 20px;
    color: #333;  
    text-decoration: none;
  }
  #nav > ul > li > span {
    position: relative;
    display: block;
    padding:20px 30px;
    color: #333;
  }
  /*서치박스*/
  input{display:none;}

  /* 한글 영어로 토글하고 색바꿈 */
  .swapKorToEng{
    color:#c70039;
  }
  .mainmenu > span {font-family:NotoSansBold;width:143px;text-align: center;}
  
  /* 드롭다운-회색 박스 */
  .graybar{
    display:none;
    position:absolute;
    left:0px;
    top:100px;
    width:100%;
    height:47px;
    box-shadow:0px 7px 7px -4px rgba(0, 0, 0, 0.6);
    background:#f4f4f4;
  }
  /* 드롭다운 */
  .dropdown {
    display: none;
    position: absolute;
    top: 62px; 
    font-family: NotoSansMD;
  }
  .dropdown li {
    height:50px;
    padding:0 5px;
  }
  .dropdown li a {
    display: block;
    text-align: center;
    padding:10px 20px;
    color: #333;
    font-size:15px;
    text-decoration: none;
    margin-top:2px;
  }
  /* 드롭다운 메뉴 hover */
  .dropdown li a:hover {margin-top:9px; padding:5px 20px; color:#f4f4f4; border-radius:20px; background:#c70039;}

  /* 드롭다운 메뉴 공통*/
  .menu > li > span > ul {
      display:flex;align-items: center;justify-content: space-evenly;
      width:500px;height:50px;
      top:68px; z-index:11;
    }

  /* 드롭다운 메뉴 위치 조정*/
  .menu>li:nth-child(1)>span>ul{
    left:20%;
  }
  .menu>li:nth-child(2)>span>ul{
    left:-80%;
  }
  .menu>li:nth-child(3)>span>ul{
   left:-180%;
  }
  .menu>li:nth-child(4)>span>ul{
    left:-280%;
  }
  /* 회원가입-로그인 버튼 */
  #nav .bt-topmenu li a {padding:7px 12px; margin-left:10px; font-size:18px; border-radius:5px;}
  #nav .bt-topmenu li:first-child a {color:#f4f4f4; background:#c70039;}
  #nav .bt-topmenu li:last-child a {color:#c70039; border:1px solid #c70039;}

  /* logout 버튼 */
  .logout{
    cursor: pointer;
  }
  .isOpen {
    display: block;
  }
  /*transition for no -name component*/
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  .v-enter-from, .v-leave-to {
    opacity: 0;
  }
}
@media screen and (max-width:600px) {
  header {width:100%; background-color: #ffffff;}
  /* 레드 테두리 nav*/
  .redbar {display:none;}
  /* nav바 */
  #nav {
  position: relative;
  padding: 15px;
  z-index: 5;
  font-size:20px; 
  }
  #nav ul{
    padding:0;
  }
  /* 서치박스 */
  input{
  position: relative;
  top: 30px;
  left: 5%;
  width: 90%;
  height: 35px;
  padding: 0 14px 0 16px;
  border: solid 1px #c70039;
  border-radius: 99px;
  background-color: #fff;
  box-shadow: 2.4px 6.6px 10px 0 rgb(0 0 0 / 10%)
  }
  
  /* 메인메뉴 */
  .menu {
    display: flex;
    justify-content: space-between;
    margin:30px auto 0;
  }
  .mainmenu{
    position: relative;
    width: 100px;
  }
  .mainmenu > span {
    font-family:NotoSansBold;
    text-align: center;
  }
  #nav > ul > li > a {
  display: block;
  height: auto;
  padding: 20px;
  color: #333;  
  text-decoration: none;
  }
  #nav > ul > li > span {
    position: relative;
    display: block;
    padding:20px 0;
    font-size:15px;
    color: #333;
  }
   /* 드롭다운-회색 박스 */
  .graybar{
    display:none;
    position:absolute;
    left: 0;
    top: 170px;
    width:100%; height:47px;
    box-shadow:0px 7px 7px -4px rgba(0, 0, 0, 0.6); background:#f4f4f4;
  }
   /* 한글 영어로 토글하고 색바꿈 */
  .swapKorToEng{
    color:#c70039;
  }
  .mainmenu > span {font-family:NotoSansBold; text-align:center;}

  /* 서브 메뉴 공통*/
  .menu > li > span > ul {
    display:flex;align-items: center;justify-content: space-evenly;
    width:380px ;height:50px;
    top:68px; z-index:11;
  }

  /* 서브 메뉴 위치 조정*/
  .menu>li:nth-child(1)>span>ul{
    left:80%;
  }
  .menu>li:nth-child(2)>span>ul{
   left:-60%;
  }
  .menu>li:nth-child(3)>span>ul{
   left:-210%;
  }
  .menu>li:nth-child(4)>span>ul{
    left:-350%;
  }
  /*미디어 쿼리 중단점 2개 지정- max-width:400px 시작*/
  @media screen and (max-width:500px) {
    /* 서브 메뉴 공통 */
    .menu > li > span > ul {
    display:flex;align-items: center;justify-content: space-evenly;
    width:300px; height:50px;
    top:68px; z-index:11;
    }

    /* 서브 메뉴 위치 조정*/
    .menu>li:nth-child(1)>span>ul{
     left:20%;
    }
    .menu>li:nth-child(2)>span>ul{
     left:-80%;
    }
    .menu>li:nth-child(3)>span>ul{
     left:-180%;
    }
    .menu>li:nth-child(4)>span>ul{
     left:-280%;
    }
  }/* max-width:400px 끝*/
  /* 드롭다운 */
  .dropdown {
    display: none;
    position: absolute;
    /* top: 62px; */
    font-family: NotoSansMD;
  }
  .dropdown li {
    height:50px;
  }
  .dropdown li a {
    display: block;
    text-align: center;
    padding:0;
    color: #333;
    font-size:15px;
    text-decoration: none;
  }
   /* 드롭다운 메뉴 hover */
  .dropdown li a:hover {padding:5px 20px; margin:0; text-align:center; color:#f4f4f4; border-radius:20px; background:#c70039;}

  /* 모바일-로그인,회원가입 버튼 */
  #nav .bt-topmenu li:first-child a {display:none}
  #nav .bt-topmenu li:last-child {
    position: absolute;
    top:15px;
    right:15px;
    width:65px; 
    height:30px;
    border-radius: 4px;
    background:#c70039;
  }
  #nav .bt-topmenu li:last-child a{
    padding:0;
    font-size:15px;
    color:#f4f4f4;
    text-align:center;
    line-height:25px;
  }

  /* logout 버튼 */
  .logout{
    cursor: pointer;
  }
  .isOpen {
    display: block;
  }
  /*transition for no -name component*/
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  .v-enter-from, .v-leave-to {
    opacity: 0;
  }

}
</style>