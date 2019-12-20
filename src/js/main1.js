import { Way } from "./foo.js";
import { Index } from "./module_index.js";
import { Detail } from "./moudule_detail.js";
import { Cart } from "./module_cart.js";
let way = new Way();
switch (way.$('script').getAttribute('id')) {
  case "index_module":
    //****************** 渲染在人气单品 也就是轮播图下方 *******************/
    // 首页目只做了两个二级导航和商品渲染 效果
    new Index().index_init();
    break;
  case "detail_module":
    // 详情页完成功能已完成
    new Detail().detail_init();
    break;
  case "cart_module":
    // 购物车功能除了选中删除其余都完成
    new Cart().cart_init();
    break;
  case "reg_module":
    //还没开始写
    new Reg().cart_init();
    break;
  case "login_module":
    //还没开始写
    new Login().cart_init();
    break;
}
