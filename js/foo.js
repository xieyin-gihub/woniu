"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var jstcookie={addcookie:function(e,o,t){var r=new Date;r.setDate(r.getDate()+t),document.cookie=e+"="+encodeURIComponent(o)+";expires="+r},getcookie:function(e){decodeURIComponent(document.cookie).split("; ");var o=!0,t=!1,r=void 0;try{for(var n,c=e[Symbol.iterator]();!(o=(n=c.next()).done);o=!0){var i=n.value.split("=");if(e==i[0])return i[1]}}catch(e){t=!0,r=e}finally{try{!o&&c.return&&c.return()}finally{if(t)throw r}}},delcookie:function(e){this.addcookie(e,"",-1)}};function $(e,o){return"true"!==o?document.querySelector(e):document.querySelectorAll(e)}exports.$=$,exports.jstcookie=jstcookie;