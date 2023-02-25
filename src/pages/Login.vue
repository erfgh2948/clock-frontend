<template>
    <div class="login">
        <h2 class="wrap-tit">LOGIN</h2>
        <main class="form-login">
            <form>
                <div class="loginFrm">
                    <div class="input-box">
                        <div class="input-member">
                            <input type="radio" name="member" value="1" @keyup.enter="submit()" checked > <label>개인회원</label> &nbsp;&nbsp; 
                            <input type="radio" name="member" value="2" @keyup.enter="submit()"> <label>기업회원</label>
                        </div>
                        <div class="input-email">
                            <input type="email" class="form-email" placeholder="아이디 또는 이메일"  @keyup.enter="submit()" v-model="state.form.email">
                            <label for="floatingInput"></label>
                        </div>
                        <div class="input-password">
                            <input type="password" class="form-password" placeholder="비밀번호" @keyup.enter="submit()" v-model="state.form.password">
                            <label for="floatingPassword"></label>
                        </div>
                        <div class="input-checkbox">
                            <label>
                                <input type="checkbox"  @keyup.enter="submit()">&nbsp;&nbsp;로그인 상태 유지
                            </label>
                        </div>
                        <button class="btn-login" @click.prevent="this.submit()">로그인</button>
                        <div class="login-boxLink">
                            <router-link to="Signup.vue">회원가입</router-link>
                            <router-link to="Signup.vue">비밀번호 재설정</router-link>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    </div>
</template>

<script>
import { reactive } from 'vue';
import  axios  from 'axios'
import store from '@/scripts/store'
import router from '@/scripts/router'
export default {

    setup() {
        const state = reactive({
            form: {
                email: "",
                password: ""
            }
        })
        const submit = () => {
            
            axios.post("https://port-0-wine-backend-4uvg2mledushse.sel3.cloudtype.app//account/login", state.form)
                .then(res => {
                    store.commit('setAccount',  res.data)
                    console.log(res.data)
                    sessionStorage.setItem("id",res.data)
                    router.push({path:"/"})
                    console.log(res)
                    window.alert(res.data.name + "님 환영합니다!")
                }).catch(error=>{
                    console.log(error)
                    window.alert("Email과 Password가 일치하지 않습니다.")
                })
        }
        return { state, submit }
    }
}
</script>

<style scoped>
/*배경박스*/
.login {
  display: flex;
  align-items: center;
  margin-top: -7px;
  padding-top: 38px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
/*===== 타이틀 =====*/
.wrap-tit{
    position:absolute;
    width:100px;
    top:180px;
    left:50%;
    margin-left:-50px;
    font-size:34px;
    font-weight:600;
    color:#262626;
}
/*===== 입력폼 회색 감싸는 흰색 박스 =====*/
.form-login {
  width: 540px;
  padding:50px 46px;
  margin: 115px auto;
  background:#FFF;
  border-radius:10px;
  box-shadow: 2.4px 6.6px 10px 0 rgb(0 0 0 / 10%);
}

/*===== 입력폼 =====*/
.loginFrm {
    width:100%;
}
.input-member {
    float:left;
}
/*=====email, password공통=====*/
.form-email, .form-password{
    margin-top:10px;
    float:left;
    width:448px;
    height:48px;
    padding: 0 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.input-checkbox {
    float:left;
    padding:15px 0;
}

/*=====로그인 버튼=====*/
.btn-login{
    width:448px;
    font-size: 20px;
    font-weight: 500;
    line-height: 60px;
    border:none;
    border-radius: 4px;
    color: #fff;
    background: #c70039;
}
/*공통으로 뺄 수 있음*/
ul li{
    float:left;
    list-style:none;
}
label{
    cursor: pointer;
}
.btn-join{
    float:left;
}
.btn-repassword{
    float:right;
}
.login-boxLink a {
    padding-top:30px;
    text-decoration:none;
    color: #737373;
    font-weight:600;
}
/*===== 로그인, 비밀번호 재설정=====*/
.login-boxLink a:first-child{
    float:left;
}
.login-boxLink a:last-child{
    float:right;
}
</style>