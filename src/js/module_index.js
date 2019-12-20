import { Way } from "./foo.js";
//****************** 渲染在人气单品 也就是轮播图下方 *******************/
class Index {
  constructor() {
    this.ajax = new Way().ajax;   //ajax方法
    this.$ = new Way().$;//元素选择
    new Way().topEvent();
  }
  //**********首页初始化**********//
  index_init () {
    let _this = this;
    this.ajax({
      type: 'get',
      url: '../php/getData.php',
      datatype: 'json'
    })
      .then(function (data) {
        _this.index_render(data);
        _this.index_events();
      });
  }
  //首页内容区页面效果
  index_events () {
    let _this = this;//防止this指向被修改
    let menu = this.$(".dropdown-menu-index");//菜单

    //菜单移入事件
    menu.addEventListener("mouseover", function (ev) {
      // console.log(ev.target.hasAttribute('href'));
      if (ev.target.hasAttribute('href')) {
        ev.target.parentNode.classList.add("nav-current");
        //菜单移出事件
        ev.target.addEventListener("mouseout", function () {
          this.parentNode.classList.remove("nav-current");
        });
      }
    });

  }
  //首页渲染
  index_render (data) {
    // console.log(data);
    //元素获取
    let content = this.$('.content');//渲染地区盒子
    let str = '';

    for (let i in data) {
      if (i > 2) {
        str += `<a  href="http://10.31.161.213:8080/woniu/src/details.html?pid=${data[i].pid}" class="prop-rqdp-product">
        <img src="${data[i].url}">
        <div class="prop-rqdp-product-name">${data[i].title}</div>
        <div class="prop-rqdp-product-price">${data[i].price}</div>
      </a>`;
      }
    }
    content.innerHTML = str;

  }

}
export { Index };

