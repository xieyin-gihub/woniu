import { Way } from "./foo.js";//引入模块
class Detail {
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
    new Way().topEvent();
  }
  //   //**********详情页初始化**********//
  detail_init () {
    let _this = this;
    let pid = _this.getRequest();//获取sid对象
    // console.log(_this.getRequest());

    _this.ajax({
      type: 'get',
      url: '../php/detail.php',
      data: pid,
      datatype: 'json'
    })
      .then(function (data) {
        _this.detail_render(data[0]);
        _this.detail_events();
      });
  }
  //详情页渲染
  detail_render (data) {
    console.log(data);
    let _this = this;
    let sImg = _this.$('.sImg-i');//获取展示图img
    let imglist = _this.$('.imgOption');//获取小图列表
    let urlsData = data.urls.split(",");//获取urls数组
    let tb_title = _this.$('.tb-title');//大标题
    let tb_towtitle = _this.$('.tb-towtitle');//第二个标题
    let tb_price = _this.$('.tb-price');//价格
    let tb_num = _this.$('.num');//商品数量
    let linkBasket = _this.$('.linkBasket');//添加购物车

    let str = '';
    sImg.setAttribute('src', data.url);//展示区添加图片

    //小图列表渲染
    for (let v of urlsData) {
      str += ` <li><img src="${v}" alt=""></li>`;
    }
    imglist.innerHTML = str;//将数据添加到小图列表中


    //标题价格渲染
    tb_title.innerHTML = data.title;
    tb_towtitle.innerHTML = data.title;
    tb_price.innerHTML = data.price;
  }

  //详情页事件
  detail_events () {
    let _this = this;
    let sImg = _this.$('.sImg');//获取展示图上层盒子
    let bImg = _this.$('.bigImg-box');//获取大放
    let sel = _this.$('.sel');//放大镜选择器
    let lbtn = _this.$('.lbtn');//左侧按钮
    let rbtn = _this.$('.rbtn');//右侧按钮



    //放大镜效果
    function blowUp () {
      sImg.addEventListener('mouseover', function (ev) {//鼠标移入
        sel.classList.remove('none');//移除放大镜隐藏效果
        bImg.classList.remove('none');//移除大方隐藏效果
        bImg.firstElementChild.setAttribute('src', sImg.lastElementChild.src);//大放的图片由展示图所提供

        //计算放大镜的宽高比例
        sel.style.width = sImg.offsetWidth * bImg.offsetWidth / _this.$('.bigImg-box>img').offsetWidth + 'px';//放大镜的宽
        sel.style.height = sImg.offsetHeight * bImg.offsetHeight / _this.$('.bigImg-box>img').offsetHeight + 'px';//放大镜的高

        //放大镜移动事件
        sImg.addEventListener('mousemove', function (ev) {
          var ev = ev || window.event;
          //计算放大镜的数值,让鼠标始终处于放大镜中心
          let top = ev.pageY - _this.$('#content').offsetTop - (sel.offsetWidth / 2);
          let left = ev.pageX - _this.$('#content').offsetLeft - (sel.offsetHeight / 2);
          let ratio = _this.$('.bigImg-box>img').offsetWidth / sImg.offsetWidth;

          //边界管理
          if (left <= 0) {
            left = 0;
          } else if (left > sImg.offsetWidth - sel.offsetWidth) {
            left = sImg.offsetWidth - sel.offsetWidth - 2;
          }

          if (top <= 0) {
            top = 0;
          } else if (top > sImg.offsetHeight - sel.offsetHeight) {
            top = sImg.offsetHeight - sel.offsetHeight - 2;
          }
          sel.style.left = left + 'px';
          sel.style.top = top + 'px';

          _this.$('.bigImg-box>img').style.left = -left * ratio + 'px';
          _this.$('.bigImg-box>img').style.top = -top * ratio + 'px'
        });
        //鼠标移出
        sImg.addEventListener('mouseout', function () {
          sel.classList.add('none');//移除放大镜隐藏效果
          bImg.classList.add('none');//移除大方隐藏效果
        });


      });
    }

    //列表移动
    function tab () {
      let count = 0;//用于记录当前展示图片的下标
      let movernum = 0;//记录滑动位移效果
      let imgOption = _this.$('.imgOption');//选项列表
      let ulist = _this.$('.imgOption>li', 'true');//选项了表下所有的li
      ulist[0].style = 'border: 2px solid #ff910e;';

      //右侧按钮点击事件
      rbtn.addEventListener('click', function () {

        if (count >= ulist.length - 1) {//如果count大于列表图片的数量,则让它失效
          count = ulist.length - 1;

        } else {
          count++;//每点击一次 都会计数
          //清除每一个li的边框
          for (let i = 0; i < ulist.length; i++) {
            ulist[i].style = "border:0px";
          }
          //给当前下标的li添加边框
          ulist[count].style = 'border:2px solid gold';

          if (count > 3 && movernum < 4) {
            movernum++;
            let right = movernum * _this.$('.imgOption>li').offsetWidth;
            // imgOption.css('left', -right);
            // console.log(right);
            imgOption.style = `left:${-right}px;`;
          }
          if (count <= ulist.length - 1) {
            _this.$('.sImg-i').setAttribute('src', ulist[count].firstElementChild.src);//展示图片等于我们选中的
          }
        }
      });

      //左侧按钮点击事件
      lbtn.addEventListener('click', function () {
        let smimg = _this.$('.sImg-i'); //获取展示图片
        if (count <= 0) {
          count = 0;
        } else {
          count--;//用以当做下标

          //给每个标签移出边框效果
          for (let i = 0; i < ulist.length; i++) {
            ulist[i].style = "border:0px";
          }
          smimg.setAttribute('src', ulist[count].firstElementChild.src);
          ulist[count].style = 'border:2px solid gold';
        }

        if (movernum !== 0) {
          movernum--;
          console.log(count + 'count');
          console.log(movernum + 'movernum');
        }
        if (count < ulist.length - 3) {
          console.log(movernum);
          let right = movernum * _this.$('.imgOption>li').offsetWidth;
          imgOption.style = `left:${right}px;`;
        }
      });

      //点击
      imgOption.addEventListener('click', function (ev) {
        let smimg = _this.$('.sImg-i'); //获取展示图片
        for (let i = 0; i < ulist.length; i++) {
          ulist[i].style = "border:0px";
        }

        if (ev.target.nodeName == "IMG") {
          ev.target.parentNode.style = 'border:2px solid gold';
          for (let i = 0; i < ulist.length; i++) {
            if (ulist[i] == ev.target.parentNode) {
              smimg.setAttribute('src', ev.target.src);//展示图片等于我们选中的
              count = i;
              if (i < 4) {
                movernum = 0;
              } else if (i >= 4) {
                movernum = i;
              }
            }
          }
        }


      });

    }
    //购物车点击事件
    function addCart () {
      let price = _this.$('.tb-price');//价格
      let linkBasket = _this.$('.linkBasket');//添加购物车
      let sid = location.search.slice(1).split('=')[1];//获取当前sid 键值对
      let moeny = price.innerHTML.split('.')[0];//获取价格
      linkBasket.addEventListener('click', function () {
        let num = _this.$('.num').value;//商品数量
        console.log(num);
        //获取当前页面sid值
        console.log(sid);
        _this.jstcookie.addcookie(sid, num, 1);
        alert('添加成功');
      });
    }

    blowUp();
    tab();
    addCart();
  }
}

export { Detail };
