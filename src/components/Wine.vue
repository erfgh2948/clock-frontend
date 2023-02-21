<template>
  <div class="wine-list-container">
    <div class="wine-box">
      <h4>전체와인</h4>
      <select class="cate-filter">
        <option value="a.CREATE_DESC|ASC" selected>최신등록순</option>
        <option value="PRICE|ASC">가격높은순</option>
        <option value="PRICE|DESC">가격낮은순</option>
        <option value="POINT2|DESC">평점순</option>
      </select>
    </div>

    <ul v-for="wine in state.orders.slice(0, max)" :key="wine" class="wine-list">
      <li>
        <div class="wine-img" @click="clickList(wine)">
          <img :src="wine.imgPath" />
        </div>
        <div class="list-txt">
          <p>{{ wine.nation }}</p>
          <div class="wine-name" @click="clickList(wine)">
            <p>{{ wine.winenameko }}</p>
            <p>{{ wine.winenameen }}</p>
          </div>
          <div class="wine-etc">
            <div>
              <div
                :class="{
                  red: wine.variety === '레드',
                  yellow: wine.variety === '스파클링',
                  blue: wine.variety === '화이트',
                  rose: wine.variety === '로제',
                }"
              >
                {{ wine.variety }}
              </div>
              <p>{{ wine.salesVolume }}개 판매 <span></span> </p>
            </div>
            <div>
              <!-- 조건문으로 장바구니에 추가된 항목만 스왑되어 나옴-->
              <div v-if=wine.inCart class="cart cart-minus" @click.prevent="deleteCart(wine.number, wine.winenameko)">장바구니 삭제</div><!--  v-else장바구니 삭제 -->
              <div v-else class="cart cart-add" @click.prevent="addCart(wine.number, wine.winenameko)">장바구니 추가</div><!-- v-if="wine!=mypage" 장바구니 추가 -->
            </div>
          </div>

        </div>
      </li>
    </ul>

    <div class="clear"></div>
    <div>
      <button @click="nextPage" class="next-btn">
        더보기
        <p>{{ state.allwinelist - max }} / {{ state.allwinelist }}</p>
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import store from "@/scripts/store";

export default {
  data() {
    return {
      max: 5, // 화면에 표시되는 list 수, 5는 초기값
      wineCart:  { wineId: 0,memberId:0,flag:false },

    };
  },
  methods: {
    nextPage() {
      this.max = this.max + 5; //함수실행(더보기 클릭) 마다 5씩 증가
    },
    async addCart(itemNumber, winenameko) {//wineid를 얻어서 winecart에 담아 서버로 전송. 서버의 cart에는 wineid,memberid만 저장됨.
      /* 이거 취소. 
      let addedWine = {}; // 새로 등록할 와인
      addedWine.wineId = await itemNumber;
      addedWine.memberId = store.getters.getAccountId;
      if( addedWine.memberId == 0) {
        window.alert("로그인하세요!");
        return; // 로그인 안했으면 더 진행안해줘~돌아가
      }
      // 그니까 여까지 왔다? 문제없이 로그인된 상태라는거임

      // 그 다음 단계인 카트db에 추가해주기
      axios.post("/api/cart/winesincart", this.wineCart)
       .then(({ data }) =>{
        window.alert(`${winenameko} 추가되었습니다! ${data}`);
        this.wineCart.flag=true
        })
        .catch(error=>{
          console.log(error);
          return; // 여기도 마찬가지로 문제있으면? 당신은 저희와 함께 갈 수 없습니다. 수고하셨습니다.
        })
      
      // 파이널 스테이지. 카트 목록에 등록 되셨습니다!! 를 해줘야함
      this.wineCart.push(addedWine)
      */
     console.log(this.state.orders[0])

      this.wineCart.wineId = await itemNumber;
      this.wineCart.memberId = store.getters.getAccountId;
      if(this.wineCart.memberId==0)window.alert("로그인하세요!")
      else{
       axios.post("/api/cart/winesincart", this.wineCart)
       .then(({ data }) =>{
        console.log(data)
        window.alert(`${winenameko} 추가되었습니다! ${data}`);
        this.wineCart.flag=true
        //클릭한 와인이 장바구니에 들어 있다는 값을 넣어준다.
        //와인 number가 중간에 삭제되거나 오름차순이 아니면 쓸모없음
        //정석은 클릭한 와인을 찾아서 inCart 값을 변경해 줘야함.
        this.state.orders[itemNumber-1].inCart = true; 
        //this.state.orders.find
        })
        .catch(error=>{console.log(error)})
      }

    },
    async deleteCart(itemNumber, winenameko){
      this.wineCart.wineId = await itemNumber;
      this.wineCart.memberId = store.getters.getAccountId;
      axios.post("/api/cart/winesincartdelete", this.wineCart)
       .then(({ data }) =>{
        window.alert(`${winenameko} 삭제되었습니다! ${data}`);
        this.wineCart.flag=false
        this.state.orders[itemNumber-1].inCart = false;
        })
        .catch(error=>{console.log(error)})

    },
    clickList(wine) {
      this.$router.push({
        path: `/wineview/${wine.number}`,
      });
    },

  },

  setup() {
    const state = reactive({
      orders: [],
      page: 0,
      allwinelist: 0, //전체 list 수
    });

    axios
      .get("/api/wineList", state.form)
      .then(({ data }) => {
        //wines 테이블 전체 데이터 가져오기
        state.allwinelist = data.length; //data row 수(list수)
        for (const item of data) {
          item.variety = item.variety.substring(0, item.variety.indexOf("(")); //variety (영문) 제거
          item.producer = item.producer.replace("(", " "); // '(' 공백으로 치환
          item.producer = item.producer.replace(")", ""); // ')' 제거
          item.winenameko = item.winename.substring(0, item.winename.indexOf("(")); // 와인한글이름만 추출
          item.winenameen = item.winename.substring(
            item.winename.indexOf("("),
            item.winename.indexOf(")")
          ); // 와인영문이름 추출
          item.winenameen = item.winenameen.replace("(", ""); //와인 영문이름 '(' 제거
          item.inCart = false;  // 장바구니에 담겨있는지
          state.orders.push(item); //ordues이름의 배열로 지정
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
    
    // 다른 페이지에 갔다 와도 장바구니에 담겨 있는 애들은 카트 아이콘이 다르게 표시되어야 한다.
    // 해당 와인이 카트에 담겨 있는 정보에 따라 카트 아이콘을 다르게 표시해야 하니까
    // 그 정보를 어딘가에서 받아와야 한다.
    // 1. DB에서 받아온다. - 지금 카트 데이터도 db에 저장중이니까 걍 db에서 받아온다.
    // 2. Vuex 의 store에 카트목록을 저장/로드 한다. - 작업양 좀 있. 카트는 이미 DB 저장/로드 방식으로 작업된 상태에서 store?
    // 그래서 1번
    if( store.getters.getAccountId != 0 ) {
      axios
      .get("/api/cart/winesincart") // 이거 왜 해당 계정의 카트목록만 오는겨? 백에 있는 그 token이 로그인할 때 유저 id값인가? ㅇㅇ맞는듯
      .then( ({data}) => {
        for( const inCartWine of data ) {
          // 전체 와인 목록에서 카트에 담겨있는 와인을 찾아서
          let findwine = state.orders.find(wine=> { return wine.number == inCartWine.wineId } );
          // 찾아서!!
          if( findwine.number ){
            findwine.inCart = true; // 표시를 해줘. 카드에 담겨있다고 표시를 해놔. 
          }
        }
      })
    }
    
    return { state };
  },
};
</script>

<style scoped>
/* 전체와인 컨테이너  */
.wine-list-container {
  width: 80%;
  margin: 0 auto;
}

.wine-box {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  border-bottom: 1px solid #262626;
}

/* 와인 정렬 */
.cate-filter {
  height: 30px;
  width: 100px;
  border-radius: 4px;
}

/* 와인 리스트*/
.wine-list {
  margin-top: 30px;
  padding: 0;
}
.wine-list li {
  display: flex;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #333;
}
/* 와인사진 */
.wine-img {
  width: 130px;
  height: 148px;
  text-align: center;
  line-height: 140px;
  margin-right: 10px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.wine-img img {
  max-width: 100%;
  height: 128px;
}
/* 와인 내용 */
.list-txt {
  width: 80%;
  padding-left: 10px;
}
.list-txt > p {
  font-family: NotoSansRe;
  margin-bottom: 5px;
  padding-top: 5px;
}
/* 와인 이름 */
.wine-name {
  margin: 12px 0;
  cursor: pointer;
}
.wine-name > p {
  margin: 0;
}
.wine-name > p:first-child {
  font-size: 18px;
}
.wine-name > p:last-child {
  font-family: NotoSansRe;
}

/* 와인 내용 기타(종류, 판매수량) */
.wine-etc {
  display: flex; justify-content: space-between;
  height: 30px;
  margin-top: 10px;
}
.wine-etc > div {display:flex;}
.wine-etc > p {
  height: 100%;
  line-height: 40px;
  font-size: 14px;
  margin-left: 3px;
}
.wine-etc div {
  margin-right: 5px;
  padding: 0 9px 1px;
  text-align: center;
  line-height: 26px;
  border-radius: 3px;
}

/* 장바구니  */

.cart {
  cursor:pointer;
  width: 130px;
  line-height: 60px;
  text-align: center;
  font-size: 15px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #c70039;
  }

.cart-add {
  color: #fff;
  background-color: #c70039;
}
.cart-minus {
  color: #c70039;
  border:1px solid #c70039;
  background-color: #fff;
}

/* 더보기 버튼 */
.next-btn {
  display: flex;
  justify-content: center;
  width: 50%;
  height: 50px;
  margin: 20px auto;
  font-size: 20px;
  letter-spacing: 8px;
  line-height: 45px;
  border: 1px #333 solid;
  border-radius: 10px;
}
.next-btn > p {
  letter-spacing: 0px;
  font-size: 15px;
  line-height: 50px;
  margin-left: 10px;
}
</style>
