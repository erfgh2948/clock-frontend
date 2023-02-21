<template>
  <article>
    <div class="invbox"></div>
    <div class="wine-container"> 
      
      <div class="benner">
       <div class="benner-img"></div>
       <input type="text" value="와인검색"/>
      </div>
      <!--좌측영역-->
      <div class="allwine">
        <div class="wrap-board-left">
          <div class="board-top">
            <h2 class="cate-tit">전체와인
              <span class="cate-tit-total" id="lblTotalCount">(27,295)</span>
            </h2>
          </div>
          <div class="board-top-sch">
            <select class="cate-filter" id="shOrder1" name="shOrder1" onchange="sortWine(this)">
              <option value="a.CREATE_DESC|ASC" selected>최신등록순</option>
              <option value="PRICE|ASC">가격높은순</option>
              <option value="PRICE|DESC">가격낮은순</option>
              <option value="POINT2|DESC">평점순</option>
            </select>
          </div>
          <!--콘텐츠-->
          <div class="board-list board-list-wine">
            <ul id="wine_list_no" style="display: none;">
              <li class="no-list">해당 사항이 없습니다.</li>
            </ul>
            <ul id="wine_list" style="display: block;">
              <li class="rel">
                <div class="thumb">
                  <a href="javascript:goWineViewWithParam(164047);">
                    <img src="@/assets/wine.png" alt="">
                  </a>
                </div>
                <div class="txt-area">
                  <div class="cnt-header">
                    <p class="winery">
                      <a href="#">라 솔가 La Sorga</a>
                    </p>
                    <h3>
                      <a href="#">라 솔가, 메이트레 스프린터                    </a>
                      <p class="wine-name-en">La Sorga, Maitre Splinter</p>
                    </h3>
                    <div class="write-info wine-info wine-info-01">
                      <span class="country">프랑스(France)</span>
                      <span class="nation">
                        랑그독 루씨용(Languedoc Roussillon)
                      </span>
                    </div>
                    <div class="write-info wine-info wine-info-02">
                      <em class="board-badge badge-red">레드</em>
                      <span class="score-star">
                        <span class="star-rating">
                          <em style="width:0%"></em>
                        </span>
                        0
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--여기-->
          <div v-for="k in state.cardObject" :key="k">
          <wine :itemprops=k></wine>
          </div>
        </div>
      </div>

      <div class="search">
        <div class="search-container">
          <div class="filter">
            <span>
              <div class="filter-img"></div>
              <p>필터</p>
            </span>
            <div>전제초기화</div>


            
            <!-- <div class="wine-type wine-filter-box wine-filter-box-price">
              <h3>가격</h3>
              <div class="chk-price-none">
                <div class="input-box chk-bx">
                  <input type="checkbox" id="checkNoPriceInfo" name="checkNoPriceInfo" onchange="searchWine();" checked>
                  <label for="checkNoPriceInfo">
                    <span>가격정보없음</span>
                  </label>
                </div>
              </div>

              <div class="range-slider">
                <span class="irs js-irs-0">
                  <span class="irs-line" tabindex="-1">
                    <span class="irs-line-left"></span>
                    <span class="irs-line-middle"></span>
                    <span class="irs-line-right"></span>
                  </span>
                  <span class="irs-min" style="visibility: hidden;">₩ 0</span>
                  <span class="irs-max" style="visibility: hidden;">전체</span>
                  <span class="irs-from" style="visibility: visible; left: -1.07669%;">₩ 0</span>
                </span>
              </div> -->
            <div class="wine-type wine-filter-box wine-filter-box-price">
              <h3>가격</h3>
              <div class="chk-price-none">
                <div class="input-box chk-bx">
                  <input type="checkbox" id="checkNoPriceInfo" name="checkNoPriceInfo" onchange="searchWine();" checked> 
                  <label for="checkNoPriceInfo">
                    <span></span>가격정보없음
                  </label>
                </div>
              </div>
              <div class="range-slider"><!-- 관련 스크립트 하단에 입력 -->
                <span class="irs js-irs-0">
                    <span class="irs">
                    <span class="irs-line">
                      <span class="irs-line-left"></span>
                      <span class="irs-line-mid"></span>
                      <span class="irs-line-right"></span>
                    </span>
                    <span class="irs-min" style="visibility: hidden;">₩ 0</span>
                    <span class="irs-max" style="visibility: hidden;">전체</Span>{{ name11 }}
                    <span class="irs-from" style="visibility: visible; left: -1.25562%;">₩ 0</span>
                    <span class="irs-to" style="visibility: visible; left: 92.1529%;">전체</span>
                    <span class="irs-single" style="visibility: hidden; left: 40.1006%;">₩ 0 — 전체</span>
                  </span>
                  <span class="irs-grid"></span>
                  <span class="irs-bar" style="left: 2.81965%; width: 94.3607%;"></span>
                  <span class="irs-shadow shadow-from" style="display: none;"></span>
                  <span class="irs-shadow shadow-to" style="display: none;"></span>
                  <span class="irs-slider from" style="left: 0%;"></span>
                  <span class="irs-slider to" style="left: 94.3607%;"></span>
                </span>
                <input type="text" class="js-range-slider" value="" />
              </div>
              <div class="range-box">
                <span class="range-box-from">₩ 0
                  <input type="text" class="js-input-from" value="0" disabled="disabled" />
                </span>
                <span class="range-box-to">전체
                  <input type="text" class="js-input-to" value="0" disabled="disabled" />
                </span>
              </div>
            </div><!--.wine-filter-box -->
          </div>          
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import {reactive, ref} from 'vue';
import Wine from '@/components/Wine.vue';

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
export default{
  
  name:'AllWine',
  components:{
    Wine
  },
  setup(){
    
    const userSearch=ref('');
    const name=ref('hi');
    const data = reactive({ value: 0 })
    const state=reactive({
      items:[],
      cardObject:[
        {imgPath :"/img/1.jpg", id:1,name:'코르바지알라 Corvagialla',name2:'코르바지알라, 로제',name3:'Corvagialla, Bianco Ambar',
        country:'이탈리아(Italy)', nation:'라치오(Lazio)', color:'블루', star:'', rating:'3'},
        {imgPath:"/img/2.jpg",id:2,name:'페이루스 Peyrus',name2:'페이루스, 블랑',name3:'Peyrus, Blanc',
        country:'프랑스(France)', nation:'꼬또 뒤 랑그독(Côteaux du Languedoc)', color:'블루', star:'', rating:'0'},
        {imgPath:"/img/3.png",id:3,name:'니콜라 호 Nicolas Reau',name2:'니콜라 호, 퐁푸아',name3:'Nicolas Reau, Pompois',
        country:'프랑스(France)', nation:'루아르(Loire)', color:'레드', star:'', rating:'0'}
      ]
    })
    
    return {state, userSearch, Wine,name,data, VueSlider}
  }
}
</script>

<style>
  /* reset */
  *{margin:0; padding:0; box-sizing:border-box;}

  /* 그리드 위 박스 */
  .invbox{width:100%; height:60px;}

  /* 그리드 시작 */
  .wine-container{
    margin:0 auto; padding:0 10px;
    max-width:1300px;
    display:grid;
    grid-template-columns:2fr 1fr;
    grid-template-rows:200px auto;
  }

  /* 그리드 아이템 속성 지정 */
  .benner {grid-row:1 / 2;}
  .allwine {grid-row:2 / 3;}
  .search {grid-row:1 / 3; background:wheat;}
  
  /* 배너 및 검색버튼 */
  .benner-img {
    width:80%; height:60%; margin:10px auto;
    background:url('@/assets/wine.gif') no-repeat center center;
    background-size:cover;
  }
  .benner input {
    display:block;
    width:80%; height:30px; margin:20px auto; padding-left:15px;
    color:darkgrey;
    border:none; border-radius:3px; background:gainsboro;
  }
  .benner input:focus {outline: 1px solid #d50000;}

  /* 검색필터 */
  /* .search-container{    
    height:100%;
    padding:40px 40px 40px; border-left:1px solid #333;
  }
  .filter {
    display:flex; justify-content:space-between;
    height:45px;
    padding: 0 0 15px;
  }
  .filter-img {
    width:16px; height:17px;
    background:url('@/assets/ico-filter.png');
  } */
  .search-container{
    overflow: hidden;
    padding: 20px 10px 20px 20px;
}
  /*===== 좌측영역 =====*/
  .wrap-board-left{
    position: relative;
    width:80%;
    margin:0 auto;
  }
  /*===== 전체와인, select =====*/
  .board-top {
    position: relative;
    padding-bottom: 13px;
    top:0;
    left:0;
    border-bottom: 1px solid #262626;
  }
  .cate-tit {
      font-size: 22px;
      color: #262626;
      font-weight: 500;
      letter-spacing: -0.5px;
  }
  .board-top-sch {
      position: absolute;
      right: 0;
      top: 0;
  }

  /*===== 제품 영역 =====*/
  .board-list ul li {
    overflow: hidden;
    padding: 25px 0;
  }

  /*===== 제품 구분선 =====*/
  #wine_list{
    border-bottom:1px solid #ebebeb;
  }

  /*===== 제품 이미지 =====*/
  .board-list li .thumb{
    margin-right: 30px;
  }

  .board-list.board-list-wine .thumb img {border: none;}
  .board-list.board-list-wine li .thumb{
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 148px;
    text-align: center;
    border: 1px solid rgba(0,0,0,0.1);
  }
  .board-list.board-list-wine li .thumb img, .board-list.board-list-wine li .thumb a, .board-list.board-list-wine li .thumb a >div {width:85.33px; height:128px;}

  /*제품 설명*/
  .cnt-header .winery a {
    color: #404040;
    font-weight: 400;
    text-decoration:none;
  }
  /*영어품명*/
  .wine-name-en{
    font-size: 16px;
      color: #999;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  /*===== 제품 한글,영어 품명=====*/
  .cnt-header > h3 {
    padding-bottom: 9px;
    font-size: 18px;
  }
  .cnt-header > h3 > a {
    color:#262626;
    text-decoration:none;
  }

  /*====국가명, 지역명====*/
  .wine-info-01 > span, .wine-info-02 > span{
    color: #999;
    font-weight: 400;
  }
  .board-list .write-info span + span:before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 14px;
    margin: 0 10px 0 9px;
    background: #ebebeb;
    vertical-align: middle;
  }
  /*=====배지, 별 평점 =====*/
  .board-badge {
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
      margin: -4px 8px 0 0;
      padding: 0 9px 1px;
      border-radius: 2px;
      vertical-align: middle;
  }
  .board-badge.badge-red {
      color: #fff;
      border-color: #c70039;
      background-color: #c70039;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      font-style:normal;
      line-height: 20px;
      font-size:1px;
  }
  .wine-info .score-star {
      color: #404040;
  }
  .wine-info .star-rating {
      display: inline-block;
      width: 86px;
      height: 14px;
      margin-right: 5px;
      background:url(@/assets/ico-star-off.png) repeat-x;
  }
  

  /*===더보기 버튼====*/
  .pagination-box {
      position: relative;
      margin:50px auto 0;
      text-align: center;
  }
  .button-large {
      width: 240px;
      font-size: 18px;
      font-weight: 500;
      line-height: 50px;
      border: 1px solid #b3b3b3;
      border-radius: 4px;
      background:#FFF;
      cursor:pointer;
  }
  .button-large:hover{
    border: 1px solid #c70039;
  }



/*=====가격=====*/
.wine-filter-box-price h3 {
    padding: 40px 0 15px;
    color: #404040;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
}
.wine-filter-box-price{position: relative;}
.wine-filter-box-price .range-slider{position:relative;height:50px;font-size:13px;letter-spacing:0;}
.wine-filter-box-price .irs-line {top:36px;height:8px;background-color:#f4f4f4;border-radius:4px;}
.wine-filter-box-price .irs-slider {position:absolute;top:30px;width:18px;height:18px;border-radius:9px;box-shadow:2.4px 6.6px 10px 0 rgba(0, 0, 0, 0.1);border:solid 1px #c70039;background-color:#fff;}
.wine-filter-box-price .irs-bar {position:absolute;display:block;top:36px;height:8px;background-color:#c70039;}
.wine-filter-box-price .irs-min, .wine-filter-box-price .irs-max {color:#777;line-height:1;top:0;padding:3px 5px;background-color:#f4f4f4;border-radius:4px;}
.irs-min {left:0;}
.irs-max {right:0;}
.irs-min, .irs-max {position:absolute;display:block;cursor:default;}
.wine-filter-box-price .irs-from, .wine-filter-box-price .irs-to, .wine-filter-box-price .irs-single {font-size:12px;line-height:1;text-shadow:none;padding:3px 5px;background-color:#c70039;color:white;border-radius:4px;}
.irs-from, .irs-to, .irs-single {position:absolute;display:block;top:0;left:0;cursor:default;white-space:nowrap;}
.wine-filter-box-price .irs-from:before, .wine-filter-box-price .irs-to:before, .wine-filter-box-price .irs-single:before {
position:absolute;display:block;content:"";bottom:-6px;left:50%;width:0;height:0;margin-left:-3px;overflow:hidden;border:3px solid transparent;border-top-color:#c70039;}
.range-box{overflow:hidden;}
.range-box input[type=text]{min-width:32%; width: auto;height:24px;margin-top:0;padding:0;color:#404040;font-size:14px;border:0;outline:none;background:#fff;}
.range-box .js-input-to{float:right;text-align:right;}
.range-box span{display:inline-block;width:40%;}
.range-box .range-box-to{float:right;text-align:right;}
.chk-price-none {position: absolute; top: 0; right: 0; z-index: 3; padding: 34px 0 0;}
.chk-price-none .input-box label {margin-right: 0;}
.js-range-slider, .js-input-to, .js-input-from {display:none;}
/* .irs {
    position: relative; display: block;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}
    .irs-line {
        position: relative; display: block;
        overflow: hidden;
        outline: none !important;
    }
        .irs-line-left, .irs-line-mid, .irs-line-right {
            position: absolute; display: block;
            top: 0;
        }
        .irs-line-left {
            left: 0; width: 11%;
        }
        .irs-line-mid {
            left: 9%; width: 82%;
        }
        .irs-line-right {
            right: 0; width: 11%;
        }

    .irs-bar {
        position: absolute; display: block;
        left: 0; width: 0;
    }
        .irs-bar-edge {
            position: absolute; display: block;
            top: 0; left: 0;
        }

    .irs-shadow {
        position: absolute; display: none;
        left: 0; width: 0;
    }

    .irs-slider {
        position: absolute; display: block;
        cursor: default;
        z-index: 1;
    }
        .irs-slider.single {

        }
        .irs-slider.from {

        }
        .irs-slider.to {

        }
        .irs-slider.type_last {
            z-index: 2;
        }

    .irs-min {
        position: absolute; display: block;
        left: 0;
        cursor: default;
    }
    .irs-max {
        position: absolute; display: block;
        right: 0;
        cursor: default;
    }

    .irs-from, .irs-to, .irs-single {
        position: absolute; display: block;
        top: 0; left: 0;
        cursor: default;
        white-space: nowrap;
    }

.irs-grid {
    position: absolute; display: none;
    bottom: 0; left: 0;
    width: 100%; height: 20px;
}
.irs-with-grid .irs-grid {
    display: block;
}
    .irs-grid-pol {
        position: absolute;
        top: 0; left: 0;
        width: 1px; height: 8px;
        background: #000;
    }
    .irs-grid-pol.small {
        height: 4px;
    }
    .irs-grid-text {
        position: absolute;
        bottom: 0; left: 0;
        white-space: nowrap;
        text-align: center;
        font-size: 9px; line-height: 9px;
        padding: 0 3px;
        color: #000;
    }

.irs-disable-mask {
    position: absolute; display: block;
    top: 0; left: -1%;
    width: 102%; height: 100%;
    cursor: default;
    background: rgba(0,0,0,0.0);
    z-index: 2;
}
.irs-disabled {
    opacity: 0.4;
}
.lt-ie9 .irs-disabled {
    filter: alpha(opacity=40);
}


.irs-hidden-input {
    position: absolute !important;
    display: block !important;
    top: 0 !important;
    left: 0 !important;
    width: 0 !important;
    height: 0 !important;
    font-size: 0 !important;
    line-height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    outline: none !important;
    z-index: -9999 !important;
    background: none !important;
    border-style: solid !important;
    border-color: transparent !important;
} */
</style>