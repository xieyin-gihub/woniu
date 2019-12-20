import { Way } from "./foo.js";
class Cart {
  constructor() {
    this.ajax = new Way().ajax;   //ajax方法
    this.$ = new Way().$;//元素选择
    this.getRequest = new Way().getRequest;//获取搜索栏方法
    //cookie方法
    this.jstcookie = {
      addcookie: new Way().addcookie,
      getcookie: new Way().getcookie,
      delcookie: new Way().delcookie
    }
  }
  //**********购物车初始化**********//
  cart_init () {
    let _this = this;
    //获取cookie
    let g_cookie = decodeURIComponent(document.cookie).split('; ');
    let numArr = [];//第0位是sid 第2位是对应的数量
    for (let i in g_cookie) {
      numArr[i] = g_cookie[i].split(',')[0].split('=');
    }

    //发送ajax请求获取数据
    _this.ajax({
      url: "../php/getData.php",
      datatype: 'json'
    })
      .then(function (data) {
        _this.cart_render(data, numArr);
        _this.cart_events();
      });
  }

  //页面渲染
  cart_render (data, numArr) {
    let _this = this;
    let content = _this.$('.item-list');
    for (let v of numArr) {
      console.log(v);
      for (let i in data) {
        if (data[i].pid == v[0]) {
          // numArr[numCount];
          content.innerHTML += `<div class="goods-item goods-item-sele" sid="${data[i].pid}"style="display: block;">
              <div class="goods-info">
                <div class="cell b-checkbox">
                  <div class="cart-checkbox">
                    <input class='odd-input' type="checkbox" name="" id="" value="" />
                    <span class="line-circle"></span>
                  </div>
                </div>
                <div class="cell b-goods">
                  <div class="goods-name">
                    <div class="goods-pic">
                      <a href=""><img id="sMap" src="${data[i].url}" alt="" /></a>
                    </div>
                    <div class="goods-msg">
                      <div class="goods-d-info">
                        <a href="">${data[i].title}</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cell b-props">
                  <div class="prop-text"></div>
                </div>
                <div class="cell b-price">
                  <strong class="unit_price">${data[i].price}</strong>
                </div>
                <div class="cell b-quantity">
                  <div class="quantity-form">
                    <a class="quantity-down" href="javascript:void(0)">-</a>
                    <input type="text" value="${ v[1]}" />
                    <a class="quantity-add" href="javascript:void(0)">+</a>
                  </div>
                  <div class="quantity-text">有货</div>
                </div>
                <div class="cell b-sum">
                  <strong class="t-count">${data[i].price * v[1]}</strong>
                </div>
                <div class="cell b-action">
                  <a class = "del-btn" href="javascript:void(0)">删除</a>
                </div>
              </div>
            </div>`;
        }
      }
    }
  }

  //页面事件
  cart_events () {
    let _this = this;
    let ck = _this.$('.odd-input', 'true');//商品勾选
    let allsel = _this.$('.allsel', 'true');//商品全部勾选
    let addBtn = _this.$('.quantity-add', 'true');//添加数量按钮
    let reBtn = _this.$('.quantity-down', 'true');//减少数量按钮
    let delBtn = _this.$('.del-btn', 'true');//删除按钮
    let content = _this.$('.item-list');
    //单选框的祖先元素 用以事件委托
    let ckParent = _this.$('.cart-tbody');

    //全选事件
    function allSel (i, ii) {
      allsel[i].addEventListener('change', function () {
        allsel[ii]['checked'] = allsel[i].checked === true;
        if (this.checked) {
          for (let i = 0; i < ck.length; i++) {
            //checkbox原生设置checked属性方法
            ck[i]['checked'] = true;
          }
        } else {
          for (let i = 0; i < ck.length; i++) {
            ck[i]['checked'] = false;

          }
        }
        ct();
      });

    }
    allSel(0, 1);
    allSel(1, 0);


    //单选事件
    ckParent.addEventListener('click', function (ev) {
      if (ev.target.nodeName == 'INPUT') {
        let count = 0;
        ev.target.setAttribute('checked', true);

        for (let i = 0; i < ck.length; i++) {
          if (ck[i]['checked'] === true) {
            count++;
          }
        }
        if (ev.target['checked'] === false) {
          count--;
        }
        if (count === ck.length) {
          allsel[0]['checked'] = true;
          allsel[1]['checked'] = true;
        } else {
          allsel[1]['checked'] = false;
          allsel[0]['checked'] = false;
        }
        ct();
      }
    });

    //**************函数封装*****************//
    //计算总价函数
    function ct () {
      let totalprice = _this.$('.totalprice');//总价
      let t_count = _this.$('.t-count', 'true');
      let t_price = 0;
      let ck = _this.$('.odd-input', 'true');//商品勾选
      for (let i = 0; i < ck.length; i++) {
        if (ck[i].checked === true) {

          t_price += parseFloat(t_count[i].innerHTML);
        }
      }
      totalprice.innerHTML = '￥' + t_price;
    }
    //添加减少核心函数
    function addremove (regulation) {

      let num = this.parentNode.childNodes[3];
      let sid = this.parentNode.parentNode.parentNode.parentNode.getAttribute('sid');
      let c_price = _this.$('.goods-item', 'true');
      let t_count = _this.$('.t-count', 'true');
      let unit_price = _this.$('.unit_price', 'true');

      if (regulation == 'add') {
        num.value = parseInt(num.value) + 1;
      }
      if (regulation == 'reduce') {
        num.value = parseInt(num.value) - 1;
      }
      // console.log(c_price);
      for (let i = 0; i < c_price.length; i++) {
        if (this == addBtn[i] || this == reBtn[i]) {
          t_count[i].innerHTML = unit_price[i].innerHTML * num.value;
        }
      }
      _this.jstcookie.addcookie(sid, num.value);
      ct();
    }
    //**************函数封装结束*****************//


    content.addEventListener('click', function (ev) {
      //删除元素
      let msg = "您确定删除该物品？";

      if (ev.target.className == 'del-btn') {
        if (confirm(msg) == true) {
          let delLi = ev.target.parentNode.parentNode.parentNode;
          //要删除的选项

          delLi.parentNode.removeChild(delLi);
          _this.jstcookie.delcookie(delLi.getAttribute('sid'));
          ct();
        }
      }

      //添加数量
      if (ev.target.className == 'quantity-add') {
        addremove.call(ev.target, 'add');
      }
      //减少
      if (ev.target.className == 'quantity-down') {
        addremove.call(ev.target, 'reduce');
      }
    });
  }
}
export { Cart };