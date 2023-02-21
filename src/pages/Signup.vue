<template>
  <div class="signup">
      <h2 class="wrap-tit">회원가입</h2>
      <main class="form-sign">
        <form novalidate>
          <div class="signFrm">
            <div class="input-box">
              <div class="flex-id">
                <input type="text" name="id" placeholder="계정(email)" class="input-id" autofocus>
                <button type="button" onClick="idCheck(this.form.id.value)" class="bt-id">중복확인</button>
              </div>
              <div class="flex-nick">
                <input type="text" id="nick_name" placeholder="닉네임(2~10자)" class="input-id" required>
                <button type="button" onClick="idCheck(this.form.id.value)" class="bt-id">중복확인</button>
              </div>
              <div>
                <input type="password" name="pwd" placeholder="비밀번호 입력" class="input-pwd" required>
                <input type="password" name="repwd" placeholder="비밀번호 확인" class="input-repwd" required>
              </div>
              </div>
            <div class="input-checkbox">
              <label>
                  <input type="checkbox"  @keyup.enter="submit()">&nbsp;&nbsp;와인21 뉴스레터 수신동의(선택)
                  <button class="btn-sign" @click.prevent="submit()">가입하기</button>
              </label>
            </div>

          </div>
      </form>
    </main>
  </div>
</template>

<script>
import { reactive } from 'vue';
import  axios  from 'axios'
// import store from '@/scripts/store'
import router from '@/scripts/router'
export default {

  setup() {
      const state = reactive({
          form: {
              email: "",
              password: "",
              name: "",
              address:"",
          }
      })
      const submit = () => {
          axios.post("/api/account/signup", state.form)
              .then(({data}) => {
                  console.log(data)
                  //중복체크로직 다시짜야함.
                  if(data.name!==null||data.name!==undefined){
                    
                    router.push({path:"/"})
                  alert(data.name + "님, 가입되었습니다. 다시 로그인해주세요!") 
                  }
                  else {
                      alert("중복된 아이디입니다.")
              }
              }).catch(error=>{
                  console.log(error)
                  alert("Error!")
              })
      }
      return { state, submit }
  }
}
</script>

<style scoped>
/*배경박스*/
.signup {
display: flex;
align-items: center;
margin-top: -7px;
padding-top: 38px;
padding-bottom: 40px;
background-color: #f5f5f5;
}
/*===== 입력폼 회색 감싸는 흰색 박스 =====*/
.form-sign {
width:540px;
padding:50px 40px;
margin:125px auto;
background:#FFF;
border-radius:10px;
box-shadow:2.4px 6.6px 10px 0 rgb(0 0 0 / 10%);
}
/*===== 타이틀 =====*/
.wrap-tit{
position:absolute;
width:140px;
top:180px;
left:50%;
margin-left:-70px;
font-size:34px;
font-weight:600;
color:#262626;
}
/*===== 입력폼 =====*/
.signFrm {
width:100%;
}
/*공통으로 뺄 수 있음*/
li{
float:left;
list-style:none;
}
label{
cursor: pointer;
}
/*====닉네임=====*/
.flex-nick{
margin-top:15px;
}
.input-id{
width:348px;
height: 48px;
padding: 0 10px;
font-size: 14px;
border: 1px solid #ccc;
border-radius: 4px;
}
.bt-id{
float: right;
width: 96px;
height: 48px;
padding: 0 10px;
font-size: 16px;
font-weight: 600;
color: #595959;
border: 1px solid #e6e6e6;
border-radius: 4px;
background: #f5f5f5;
}
/*===== pwd, repwd공통 =====*/
.input-pwd, .input-repwd{
width: 100%;
height: 48px;
margin-top:15px;
padding: 0 10px;
font-size: 14px;
border: 1px solid #ccc;
border-radius: 4px;
}
.input-checkbox {
float:left;
width:460px;
margin-top:15px;
}
/*=====회원가입 버튼=====*/
.btn-sign{
float:left;
width:460px;
margin-top:20px;
font-size: 20px;
font-weight: 500;
line-height: 60px;
border:none;
border-radius: 4px;
color: #fff;
background: #c70039;
}
</style>