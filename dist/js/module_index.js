"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Index=void 0;var _createClass=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),_foo=require("./foo.js");function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Index=function(){function e(){_classCallCheck(this,e),this.ajax=(new _foo.Way).ajax,this.$=(new _foo.Way).$,(new _foo.Way).topEvent()}return _createClass(e,[{key:"index_init",value:function(){var t=this;this.ajax({type:"get",url:"../php/getData.php",datatype:"json"}).then(function(e){t.index_render(e),t.index_events()})}},{key:"index_events",value:function(){this.$(".dropdown-menu-index").addEventListener("mouseover",function(e){e.target.hasAttribute("href")&&(e.target.parentNode.classList.add("nav-current"),e.target.addEventListener("mouseout",function(){this.parentNode.classList.remove("nav-current")}))})}},{key:"index_render",value:function(e){var t=this.$(".content"),n="";for(var r in e)2<r&&(n+='<a  href="http://10.31.161.213:8080/woniu/dist/details.html?pid='+e[r].pid+'" class="prop-rqdp-product">\n        <img src="'+e[r].url+'">\n        <div class="prop-rqdp-product-name">'+e[r].title+'</div>\n        <div class="prop-rqdp-product-price">'+e[r].price+"</div>\n      </a>");t.innerHTML=n}}]),e}();exports.Index=Index;