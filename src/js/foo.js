
function Way () { }
//cookie存取
Way.prototype = {
  addcookie: function (key, value, days) {
    let d = new Date();
    d.setDate(d.getDate() + days);
    document.cookie = `${key}=${encodeURIComponent(value)};expires=${d}`;
  },
  getcookie: function (key) {
    //取出cookie进行转码然后split进行分割(一定要加空格！)形成数组
    let arr = decodeURIComponent(document.cookie).split('; ');
    for (let v of key) {
      let newarr = v.split('=');
      if (key == newarr[0]) {
        return newarr[1];
      }
    }
  },
  delcookie: function (key) {
    this.addcookie(key, '', -1);
  }
}
//DOM元素获取
Way.prototype.$ = function (selector, all) {
  if (all !== 'true') {
    return document.querySelector(selector);
  } else {
    return document.querySelectorAll(selector);
  }
}
//ajax promise
Way.prototype.ajax = function (obj) {
  //1.获取ajax的实例对象
  var promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    //判断url值是否为空
    if (obj.url == '' || obj.url == null) {
      throw new Error('url值不能为空');
    }
    //5.传输方式是get还是post
    if (!obj.type || obj.type == 'get') {//如果没有值
      obj.type = 'get';//如果未传值默认get
      if (obj.type == 'get') {//get需要将数据与地址栏进行拼接
        if (Object.prototype.toString(obj.data).slice(8, -1) === "Object") {
          for (let v in obj.data) {
            obj.url += (obj.url.indexOf("?")) == -1 ? "?" : "&";
            obj.url += v + '=' + obj.data[v];
          }
        }
      }
    }
    // console.log(obj.type);
    if (obj.type != 'post' && obj.type != 'get') {//如果有值 并且判断是否为get或者post
      throw new Error('传输方式不是get或post请重新输入');//抛出错误不执行
    }

    //如果async有值则就是该值，如果没有值则默认true
    if ((obj.async != true && obj.async != false) || obj.async == null) {
      obj.async = true;
    }
    // console.log(obj.async);
    //2.创建连接
    xhr.open(obj.type, obj.url, obj.async);
    if (obj.type == 'post') {
      var str = '';
      if (Object.prototype.toString(obj.data).slice(8, -1) === "Object") {
        var dataarr = [];
        for (let i in obj.data) {
          dataarr.push(i + '=' + obj.data[i]);
        }
      }
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      obj.data = dataarr.join('&');
      // console.log(obj.data);
      xhr.send(obj.data);
    } else {
      //3.发送请求
      xhr.send();
    }
    //4.设置回调函数用于监听就绪状态码获取返回内容
    if (obj.async == 'true' || obj.async == true) {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let objdata = null;
            if (obj.datatype == 'JSON' || obj.datatype == 'json') {
              objdata = JSON.parse(xhr.responseText);
            } else {
              objdata = xhr.responseText;
            }
            resolve(objdata);
          } else {
            reject('接口地址有误');
          }
        }
      }
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.status === 200) {
          let objdata = null;
          if (obj.datatype == 'JSON' || obj.datatype == 'json') {
            objdata = JSON.parse(xhr.responseText);
          } else {
            objdata = xhr.responseText;
          }
          resolve(objdata);
        } else {
          reject('接口地址有误');
        }
      }
    }
  });
  return promise;
}
Way.prototype.userChildren = function () {
  let chid = this.childNodes;
  let eleMatch = [];
  for (let i = 0, l = chid.length; i < l; i++) {
    eleMatch.push(chid[i]);
  }
  return eleMatch;
}
//获取地址栏？后的参数
Way.prototype.getRequest = function () {
  let url = window.location.search; //获取url中"?"符后的字串
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
Way.prototype.topEvent = function () {
  // console.log(this.$(".top-nav-list"));
  let _this = this;//防止this指向被修改
  //获取元素
  _this.nav = this.$(".top-nav-list");//获取顶部导航栏
  _this.hideNav = this.$('.top-nav-con>.site-ct');//获取顶部隐藏导航
  //顶部导航移入功能
  _this.nav.addEventListener('mouseover', function (ev) {
    ev = ev || event;
    // console.log(ev.target.className);
    if (ev.target.className == "top-nav-item J-webhall") {
      //获取移入标签对应的导航信息内容
      let infor = ev.target.parentNode.querySelectorAll('.none')[0].innerHTML;

      //移出隐藏导航的导航属性
      _this.hideNav.parentNode.classList.remove("none");
      //添加文本内容
      _this.hideNav.innerHTML = infor;
    }
  });


  //当鼠标的坐标大于隐藏导航的最底部坐标时候隐藏
  document.addEventListener("mousemove", function (ev) {
    //上方导航
    if (ev.pageY > _this.$('.top-nav-con').offsetHeight + _this.$('.top-nav-con').offsetTop + 44) {
      _this.hideNav.parentNode.classList.add("none");
    }

    //菜单导航
    // let menuPageY = menu.offsetHeight + _this.$('.top-nav').offsetHeight + _this.$(".topbar").offsetHeight;
    // console.log(menuPageX);
  });
}



// //主体函数
// class Main {
//   constructor() {
//     this.ajax = new Way().ajax;   //ajax方法
//     this.$ = new Way().$;//元素选择
//     this.getRequest = new Way().getRequest;
//     this.jstcookie = {
//       addcookie: new Way().addcookie,
//       getcookie: new Way().getcookie,
//       delcookie: new Way().delcookie
//     }
//   }




//   //顶部导航效果
// topEvent() {
//   // console.log(this.$(".top-nav-list"));
//   let _this = this;//防止this指向被修改
//   //获取元素
//   _this.nav = this.$(".top-nav-list");//获取顶部导航栏
//   _this.hideNav = this.$('.top-nav-con>.site-ct');//获取顶部隐藏导航
//   //顶部导航移入功能
//   _this.nav.addEventListener('mouseover', function (ev) {
//     ev = ev || event;
//     // console.log(ev.target.className);
//     if (ev.target.className == "top-nav-item J-webhall") {
//       //获取移入标签对应的导航信息内容
//       let infor = ev.target.parentNode.querySelectorAll('.none')[0].innerHTML;

//       //移出隐藏导航的导航属性
//       _this.hideNav.parentNode.classList.remove("none");
//       //添加文本内容
//       _this.hideNav.innerHTML = infor;
//     }
//   });


//   //当鼠标的坐标大于隐藏导航的最底部坐标时候隐藏
//   document.addEventListener("mousemove", function (ev) {
//     //上方导航
//     if (ev.pageY > _this.$('.top-nav-con').offsetHeight + _this.$('.top-nav-con').offsetTop + 44) {
//       _this.hideNav.parentNode.classList.add("none");
//     }

//     //菜单导航
//     // let menuPageY = menu.offsetHeight + _this.$('.top-nav').offsetHeight + _this.$(".topbar").offsetHeight;
//     // console.log(menuPageX);
//   });
// }

//   //**********首页初始化**********//
//   index_init () {
//     let _this = this;
//     this.ajax({
//       type: 'get',
//       url: '../php/getData.php',
//       datatype: 'json'
//     })
//       .then(function (data) {
//         _this.index_render(data);
//         _this.index_events();
//       });
//   }
//   //首页内容区页面效果
//   index_events () {
//     let _this = this;//防止this指向被修改
//     let menu = this.$(".dropdown-menu-index");//菜单


//     //菜单移入事件
//     menu.addEventListener("mouseover", function (ev) {
//       // console.log(ev.target.hasAttribute('href'));
//       if (ev.target.hasAttribute('href')) {
//         ev.target.parentNode.classList.add("nav-current");
//         //菜单移出事件
//         ev.target.addEventListener("mouseout", function () {
//           this.parentNode.classList.remove("nav-current");
//         });
//       }
//     });
//   }
//   //首页渲染
//   index_render (data) {
//     // console.log(data);
//     //元素获取
//     let content = this.$('.content');//渲染地区盒子
//     let str = '';

//     for (let i in data) {
//       if (i > 2) {
//         str += `<a  href="http://10.31.161.213:8080/woniu/src/details.html?pid=${data[i].pid}" class="prop-rqdp-product">
//         <img src="${data[i].url}">
//         <div class="prop-rqdp-product-name">${data[i].title}</div>
//         <div class="prop-rqdp-product-price">${data[i].price}</div>
//       </a>`;
//       }
//     }
//     content.innerHTML = str;

//   }

//   //**********详情页初始化**********//
//   detail_init () {
//     let _this = this;
//     let pid = _this.getRequest();//获取sid对象
//     // console.log(_this.getRequest());

//     _this.ajax({
//       type: 'get',
//       url: '../php/detail.php',
//       data: pid,
//       datatype: 'json'
//     })
//       .then(function (data) {
//         _this.detail_render(data[0]);
//         _this.detail_events();
//       });
//   }
//   //详情页渲染
//   detail_render (data) {
//     console.log(data);
//     let _this = this;
//     let sImg = _this.$('.sImg-i');//获取展示图img
//     let imglist = _this.$('.imgOption');//获取小图列表
//     let urlsData = data.urls.split(",");//获取urls数组
//     let tb_title = _this.$('.tb-title');//大标题
//     let tb_towtitle = _this.$('.tb-towtitle');//第二个标题
//     let tb_price = _this.$('.tb-price');//价格
//     let tb_num = _this.$('.num');//商品数量
//     let linkBasket = _this.$('.linkBasket');//添加购物车

//     let str = '';
//     sImg.setAttribute('src', data.url);//展示区添加图片

//     //小图列表渲染
//     for (let v of urlsData) {
//       str += ` <li><img src="${v}" alt=""></li>`;
//     }
//     imglist.innerHTML = str;//将数据添加到小图列表中


//     //标题价格渲染
//     tb_title.innerHTML = data.title;
//     tb_towtitle.innerHTML = data.title;
//     tb_price.innerHTML = data.price;



//   }

//   //详情页事件
//   detail_events () {
//     let _this = this;
//     let sImg = _this.$('.sImg');//获取展示图上层盒子
//     let bImg = _this.$('.bigImg-box');//获取大放
//     let sel = _this.$('.sel');//放大镜选择器
//     let lbtn = _this.$('.lbtn');//左侧按钮
//     let rbtn = _this.$('.rbtn');//右侧按钮



//     //放大镜效果
//     function blowUp () {
//       sImg.addEventListener('mouseover', function (ev) {//鼠标移入
//         sel.classList.remove('none');//移除放大镜隐藏效果
//         bImg.classList.remove('none');//移除大方隐藏效果
//         bImg.firstElementChild.setAttribute('src', sImg.lastElementChild.src);//大放的图片由展示图所提供

//         //计算放大镜的宽高比例
//         sel.style.width = sImg.offsetWidth * bImg.offsetWidth / _this.$('.bigImg-box>img').offsetWidth + 'px';//放大镜的宽
//         sel.style.height = sImg.offsetHeight * bImg.offsetHeight / _this.$('.bigImg-box>img').offsetHeight + 'px';//放大镜的高

//         //放大镜移动事件
//         sImg.addEventListener('mousemove', function (ev) {
//           var ev = ev || window.event;
//           //计算放大镜的数值,让鼠标始终处于放大镜中心
//           let top = ev.pageY - _this.$('#content').offsetTop - (sel.offsetWidth / 2);
//           let left = ev.pageX - _this.$('#content').offsetLeft - (sel.offsetHeight / 2);
//           let ratio = _this.$('.bigImg-box>img').offsetWidth / sImg.offsetWidth;

//           //边界管理
//           if (left <= 0) {
//             left = 0;
//           } else if (left > sImg.offsetWidth - sel.offsetWidth) {
//             left = sImg.offsetWidth - sel.offsetWidth - 2;
//           }

//           if (top <= 0) {
//             top = 0;
//           } else if (top > sImg.offsetHeight - sel.offsetHeight) {
//             top = sImg.offsetHeight - sel.offsetHeight - 2;
//           }
//           sel.style.left = left + 'px';
//           sel.style.top = top + 'px';

//           _this.$('.bigImg-box>img').style.left = -left * ratio + 'px';
//           _this.$('.bigImg-box>img').style.top = -top * ratio + 'px'
//         });
//         //鼠标移出
//         sImg.addEventListener('mouseout', function () {
//           sel.classList.add('none');//移除放大镜隐藏效果
//           bImg.classList.add('none');//移除大方隐藏效果
//         });


//       });
//     }

//     //列表移动
//     function tab () {
//       let count = 0;//用于记录当前展示图片的下标
//       let movernum = 0;//记录滑动位移效果
//       let imgOption = _this.$('.imgOption');//选项列表
//       let ulist = _this.$('.imgOption>li', 'true');//选项了表下所有的li
//       ulist[0].style = 'border: 2px solid #ff910e;';

//       //右侧按钮点击事件
//       rbtn.addEventListener('click', function () {

//         if (count >= ulist.length - 1) {//如果count大于列表图片的数量,则让它失效
//           count = ulist.length - 1;

//         } else {
//           count++;//每点击一次 都会计数
//           //清除每一个li的边框
//           for (let i = 0; i < ulist.length; i++) {
//             ulist[i].style = "border:0px";
//           }
//           //给当前下标的li添加边框
//           ulist[count].style = 'border:2px solid gold';

//           if (count > 3 && movernum < 4) {
//             movernum++;
//             let right = movernum * _this.$('.imgOption>li').offsetWidth;
//             // imgOption.css('left', -right);
//             // console.log(right);
//             imgOption.style = `left:${-right}px;`;
//           }
//           if (count <= ulist.length - 1) {
//             _this.$('.sImg-i').setAttribute('src', ulist[count].firstElementChild.src);//展示图片等于我们选中的
//           }
//         }
//       });

//       //左侧按钮点击事件
//       lbtn.addEventListener('click', function () {
//         let smimg = _this.$('.sImg-i'); //获取展示图片
//         if (count <= 0) {
//           count = 0;
//         } else {
//           count--;//用以当做下标

//           //给每个标签移出边框效果
//           for (let i = 0; i < ulist.length; i++) {
//             ulist[i].style = "border:0px";
//           }
//           smimg.setAttribute('src', ulist[count].firstElementChild.src);
//           ulist[count].style = 'border:2px solid gold';
//         }

//         if (movernum !== 0) {
//           movernum--;
//           console.log(count + 'count');
//           console.log(movernum + 'movernum');
//         }
//         if (count < ulist.length - 3) {
//           console.log(movernum);
//           let right = movernum * _this.$('.imgOption>li').offsetWidth;
//           imgOption.style = `left:${right}px;`;
//         }
//       });

//       //点击
//       imgOption.addEventListener('click', function (ev) {
//         let smimg = _this.$('.sImg-i'); //获取展示图片
//         for (let i = 0; i < ulist.length; i++) {
//           ulist[i].style = "border:0px";
//         }

//         if (ev.target.nodeName == "IMG") {
//           ev.target.parentNode.style = 'border:2px solid gold';
//           for (let i = 0; i < ulist.length; i++) {
//             if (ulist[i] == ev.target.parentNode) {
//               smimg.setAttribute('src', ev.target.src);//展示图片等于我们选中的
//               count = i;
//               if (i < 4) {
//                 movernum = 0;
//               } else if (i >= 4) {
//                 movernum = i;
//               }
//             }
//           }
//         }


//       });

//     }

//     //购物车点击事件
//     function addCart () {
//       let price = _this.$('.tb-price');//价格
//       let linkBasket = _this.$('.linkBasket');//添加购物车
//       let sid = location.search.slice(1).split('=')[1];//获取当前sid 键值对
//       let moeny = price.innerHTML.split('.')[0];//获取价格
//       linkBasket.addEventListener('click', function () {
//         let num = _this.$('.num').value;//商品数量
//         console.log(num);
//         //获取当前页面sid值
//         console.log(sid);
//         _this.jstcookie.addcookie(sid, num, 1);
//         alert('添加成功');
//       });
//     }

//     blowUp();
//     tab();
//     addCart();
//   }

//   //**********购物车初始化**********//
//   cart_init () {
//     let _this = this;
//     //获取cookie
//     let g_cookie = decodeURIComponent(document.cookie).split('; ');
//     let numArr = [];//第0位是sid 第2位是对应的数量
//     for (let i in g_cookie) {
//       numArr[i] = g_cookie[i].split(',')[0].split('=');
//     }

//     //发送ajax请求获取数据
//     _this.ajax({
//       url: "../php/getData.php",
//       datatype: 'json'
//     })
//       .then(function (data) {
//         _this.cart_render(data, numArr);
//         _this.cart_events();
//       });
//   }

//   //页面渲染
//   cart_render (data, numArr) {
//     let _this = this;
//     let content = _this.$('.item-list');
//     for (let v of numArr) {
//       console.log(v);
//       for (let i in data) {
//         if (data[i].pid == v[0]) {
//           // numArr[numCount];
//           content.innerHTML += `<div class="goods-item goods-item-sele" sid="${data[i].pid}"style="display: block;">
//             <div class="goods-info">
//               <div class="cell b-checkbox">
//                 <div class="cart-checkbox">
//                   <input class='odd-input' type="checkbox" name="" id="" value="" />
//                   <span class="line-circle"></span>
//                 </div>
//               </div>
//               <div class="cell b-goods">
//                 <div class="goods-name">
//                   <div class="goods-pic">
//                     <a href=""><img id="sMap" src="${data[i].url}" alt="" /></a>
//                   </div>
//                   <div class="goods-msg">
//                     <div class="goods-d-info">
//                       <a href="">${data[i].title}</a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div class="cell b-props">
//                 <div class="prop-text"></div>
//               </div>
//               <div class="cell b-price">
//                 <strong class="unit_price">${data[i].price}</strong>
//               </div>
//               <div class="cell b-quantity">
//                 <div class="quantity-form">
//                   <a class="quantity-down" href="javascript:void(0)">-</a>
//                   <input type="text" value="${ v[1]}" />
//                   <a class="quantity-add" href="javascript:void(0)">+</a>
//                 </div>
//                 <div class="quantity-text">有货</div>
//               </div>
//               <div class="cell b-sum">
//                 <strong class="t-count">${data[i].price * v[1]}</strong>
//               </div>
//               <div class="cell b-action">
//                 <a class = "del-btn" href="javascript:void(0)">删除</a>
//               </div>
//             </div>
//           </div>`;
//         }
//       }
//     }
//   }

//   //页面事件
//   cart_events () {
//     let _this = this;
//     let ck = _this.$('.odd-input', 'true');//商品勾选
//     let allsel = _this.$('.allsel', 'true');//商品全部勾选
//     let addBtn = _this.$('.quantity-add', 'true');//添加数量按钮
//     let reBtn = _this.$('.quantity-down', 'true');//减少数量按钮
//     let delBtn = _this.$('.del-btn', 'true');//删除按钮
//     let content = _this.$('.item-list');
//     //单选框的祖先元素 用以事件委托
//     let ckParent = _this.$('.cart-tbody');

//     //全选事件
//     function allSel (i, ii) {
//       allsel[i].addEventListener('change', function () {
//         allsel[ii]['checked'] = allsel[i].checked === true;
//         if (this.checked) {
//           for (let i = 0; i < ck.length; i++) {
//             //checkbox原生设置checked属性方法
//             ck[i]['checked'] = true;
//           }
//         } else {
//           for (let i = 0; i < ck.length; i++) {
//             ck[i]['checked'] = false;

//           }
//         }
//         ct();
//       });

//     }
//     allSel(0, 1);
//     allSel(1, 0);


//     //单选事件
//     ckParent.addEventListener('click', function (ev) {
//       if (ev.target.nodeName == 'INPUT') {
//         let count = 0;
//         ev.target.setAttribute('checked', true);

//         for (let i = 0; i < ck.length; i++) {
//           if (ck[i]['checked'] === true) {
//             count++;
//           }
//         }
//         if (ev.target['checked'] === false) {
//           count--;
//         }
//         if (count === ck.length) {
//           allsel[0]['checked'] = true;
//           allsel[1]['checked'] = true;
//         } else {
//           allsel[1]['checked'] = false;
//           allsel[0]['checked'] = false;
//         }
//         ct();
//       }
//     });

//     //**************函数封装*****************//
//     //计算总价函数
//     function ct () {
//       let totalprice = _this.$('.totalprice');//总价
//       let t_count = _this.$('.t-count', 'true');
//       let t_price = 0;
//       let ck = _this.$('.odd-input', 'true');//商品勾选
//       for (let i = 0; i < ck.length; i++) {
//         if (ck[i].checked === true) {

//           t_price += parseFloat(t_count[i].innerHTML);
//         }
//       }
//       totalprice.innerHTML = '￥' + t_price;
//     }
//     //添加减少核心函数
//     function addremove (regulation) {

//       let num = this.parentNode.childNodes[3];
//       let sid = this.parentNode.parentNode.parentNode.parentNode.getAttribute('sid');
//       let c_price = _this.$('.goods-item', 'true');
//       let t_count = _this.$('.t-count', 'true');
//       let unit_price = _this.$('.unit_price', 'true');

//       if (regulation == 'add') {
//         num.value = parseInt(num.value) + 1;
//       }
//       if (regulation == 'reduce') {
//         num.value = parseInt(num.value) - 1;
//       }
//       // console.log(c_price);
//       for (let i = 0; i < c_price.length; i++) {
//         if (this == addBtn[i] || this == reBtn[i]) {
//           t_count[i].innerHTML = unit_price[i].innerHTML * num.value;
//         }
//       }
//       _this.jstcookie.addcookie(sid, num.value);
//       ct();
//     }
//     //**************函数封装结束*****************//


//     content.addEventListener('click', function (ev) {
//       //删除元素
//       let msg = "您确定删除该物品？";

//       if (ev.target.className == 'del-btn') {
//         if (confirm(msg) == true) {
//           let delLi = ev.target.parentNode.parentNode.parentNode;
//           //要删除的选项

//           delLi.parentNode.removeChild(delLi);
//           _this.jstcookie.delcookie(delLi.getAttribute('sid'));
//           ct();
//         }
//       }

//       //添加数量
//       if (ev.target.className == 'quantity-add') {
//         addremove.call(ev.target, 'add');
//       }
//       //减少
//       if (ev.target.className == 'quantity-down') {
//         addremove.call(ev.target, 'reduce');
//       }



//     });
//   }
// }


export { Way };
