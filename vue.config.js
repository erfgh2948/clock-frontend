
module.exports ={
  devServer:{
    proxy:{
      '/api':{// /api라는 주소로 요청하면 밑으로 우회한다
        target:'http://port-0-wine-backend-4uvg2mledushse.sel3.cloudtype.app/',
        changeOrigin:true,
        pathRewrite:{
          '^/':''
        }
      }
    }
  }
}

// java:8080
// https://port-0-wine-backend-4uvg2mledushse.sel3.cloudtype.app/