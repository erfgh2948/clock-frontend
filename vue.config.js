
module.exports ={
  devServer:{
    proxy:{
      '/api':{// /api라는 주소로 요청하면 밑으로 우회한다
        target:'https://localhost:8080',
        changeOrigin:true,
        pathRewrite:{
          '^/':''
        }
      }
    }
  }
}