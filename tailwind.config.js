module.exports = {
  content: ['./public/index.html','./src/*.{vue,js}','./src/**/*.{vue,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins:{
    //如果当前的项目里面有第三方框架，我们就要这个里面把预检关闭掉，防止样式覆盖
    perflight: false
  }
}
