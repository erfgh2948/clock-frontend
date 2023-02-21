<template>
  <footer>
  <aside class='main-bottom-links inner rel'>
    <div class='footer-side'>
      <ul class='sns-link'>
        <li class='sns-blog'><a href='https://blog.naver.com/wine21com' target='_blank'>blog naver</a></li>
        <li class='sns-instagram'><a href='https://www.instagram.com/wine21_korea/' target='_blank'>instagram</a></li>
        <li class='sns-facebook'><a href='https://www.facebook.com/Wine21/' target='_blank'>face book</a></li>
        <li class='sns-youtube'><a href='https://www.youtube.com/channel/UCiiHbM5xmLO6Vxr-KwDkKpQ' target='_blank'>youtube</a></li>
      </ul>
      <div class='info-tel'>
        <p class='txt'>와인 관련 정보문의/행사문의</p>
        <p class='tel'><a href='tel:02-2231-4901'>02.2231.4901</a></p>
      </div>
    </div>

    <ul class='footer-link'>
      <li><a href='/17_company/company_introduction.html'>회사소개</a></li>
      <li><a href='/17_company/company_service.html'>회원사서비스안내</a></li>
      <li><a href='/17_company/company_service.html'>광고제휴안내</a></li>
      <li><a href='/17_company/company_terms.html'>이용약관</a></li>
      <li><a href='/17_company/company_privacy.html'>개인정보처리방침</a></li>
    </ul>
    <div class='footer-info'>
      <p><span>㈜와인21닷컴</span><span>대표이사 : 최성순</span><span>사업자등록번호 : 106-81-98868</span><span>와인21미디어 인터넷신문등록번호 : 서울특별시 아01345</span><span>등록연월일 : 2010.09.09</span></p>
      <p><span>주소 : 서울시 용산구 한강대로 366, A동 716호</span><span>개인정보 관리책임자 : 변용진</span><span>청소년보호책임자 : 변용진</span><span>발행.편집인 : 최성순</span></p>
    </div>
    <p class='copyright'>Copyright &copy; WINE21.COM. All rights reserved since 1998</p>
  </aside>
  <!-- end .main-bottom-links -->
  </footer>
</template>

<script>
export default {
  name: 'Footer-Han',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer{
  position:relative; padding:40px 0;margin-top:100px; 
  color:#fff; font-size:16px; line-height:1.6;background:#262626;
}
footer p {
  padding-left:25px;
  font-size: 13px;}
.main-bottom-links {
  padding-right:10px;
}

.footer-link{
  overflow:hidden; margin-bottom:20px;
  }

.footer-link li{
  display:inline-block;
}
.footer-link li + li:before{
  content:''; display:inline-block; width:1px;height:16px; margin:0 15px;
  background:#4d4d4d; vertical-align:middle;
}
.footer-link li a{color:#fff; text-decoration: none; outline:0;}
.footer-info{
  padding-right:400px;
  color:#999;
  font-weight: 100;
  line-height: 15px;
}
.footer-info span{
  display:inline-block; 
  margin-left: 10px;
 }
.footer-addr{
  font-weight:400;line-height:20px;
}
.footer-addr span{padding:0 5px;}
.copyright{
  margin-top:10px;
  margin-left:10px;
  font-size:14px; color:#999
}
.btnTop{
  position:fixed; display:block; width:50px;height:50px;left:50%;bottom:110px;margin-left:630px; z-index:999;border-radius:50%;
}
.footer-side{
  position:absolute;
  right:0; top:0;}
.sns-link{
  overflow:hidden;
  margin:60px 0 0 -40px;
}
.sns-link li{
  float:left;border-radius:4px;
  overflow:hidden;}
.sns-link li + li{margin-left:10px;}
.sns-link li a{
  display:block; width:34px; height:34px;border-radius:4px; text-indent:-9999em;
}
.sns-instagram{
  background:url('@/assets/logo.png')50% no-repeat;
background-size:cover}
.sns-blog a{background:url('@/assets/logo.png') #2db400 50% no-repeat;}
.sns-instagram a{
  background:url('@/assets/logo.png')50% no-repeat;
}
.sns-facebook a{
  background:url('@/assets/logo.png')#355189 50% no-repeat;
}
.sns-youtube a{
  background:url('@/assets/logo.png')#d32f2a 50% no-repeat;}
.info-tel{
  position:relative;
  margin-top:-30px;
  padding:0px 30px 0 0px; color:#fff;
}
.info-tel:before{
  position:absolute; content:'';
  left:0; top:30px; width:52px; height:52px;border-radius:50%;
}
.info-tel .txt{
  position:relative;
  top: 50px; left: 35px;
  font-size:11px; line-height:normal;
}
.info-tel .tel{
  padding: 20px 0 0 60px;
  font-size:30px; font-weight:bold;line-height:normal; font-family: 'Times New Roman', Times, serif;
  background:url('@/assets/logo.png') no-repeat;
}
.info-tel .tel a {
  color: #fff;
  text-decoration:none;
}
@media screen and (min-width:715px){
footer{
  position:relative; padding:40px 0; margin-top:100px; 
  color:#fff; font-size:16px; line-height:1.6; background:#262626;
}
.footer { font-size: 14px; text-align: center; }
  .footer-addr span { display: inline-block; }
  .footer-info { padding-right: 0; font-size: 12px; }
  .footer-info * { color: #999; }
  .footer-info span { padding-right: 10px; }
  .footer-side { position: relative; right: 0; margin-bottom: 20px; }
  .footer-side .sns-link { display: inline-block; }

}
</style>
