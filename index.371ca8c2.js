function t(t,e,n,r){Object.defineProperty(t,e,{get:n,set:r,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},i={},o=n.parcelRequire3f0c;null==o&&((o=function(t){if(t in r)return r[t].exports;if(t in i){var e=i[t];delete i[t];var n={id:t,exports:{}};return r[t]=n,e.call(n.exports,n,n.exports),n.exports}var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){i[t]=e},n.parcelRequire3f0c=o),o.register("27Lyk",(function(e,n){var r,i;t(e.exports,"register",(()=>r),(t=>r=t)),t(e.exports,"resolve",(()=>i),(t=>i=t));var o={};r=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)o[e[n]]=t[e[n]]},i=function(t){var e=o[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),o("27Lyk").register(JSON.parse('{"aT88m":"index.371ca8c2.js","1gJOG":"spark.24ae8431.png","dCtuD":"firework_red.a19cf305.png","5p4FD":"firework_green.412a7857.png","fD4Nq":"firework_blue.1a22081f.png","ieuaM":"smoke.a79fdda0.png"}'));var a;a=new URL(o("27Lyk").resolve("1gJOG"),import.meta.url).toString();var s;s=new URL(o("27Lyk").resolve("dCtuD"),import.meta.url).toString();var u;u=new URL(o("27Lyk").resolve("5p4FD"),import.meta.url).toString();var c;c=new URL(o("27Lyk").resolve("fD4Nq"),import.meta.url).toString();var l;l=new URL(o("27Lyk").resolve("ieuaM"),import.meta.url).toString();var f={spark:e(a),fireworkRed:e(s),fireworkGreen:e(u),fireworkBlue:e(c),smoke:e(l)},d={};t(d,"HTML",(()=>h),(t=>h=t));var h,p,m=function(t,e,n){if(n||2===arguments.length)for(var r,i=0,o=e.length;i<o;i++)!r&&i in e||(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);return t.concat(r||Array.prototype.slice.call(e))};function v(t,e){return void 0===t?e:t}function g(t){return JSON.parse(JSON.stringify(t))}function y(t){return new Promise((function(e,n){var r=new Image;r.crossOrigin="anonymous",r.onload=function(){return e(r)},r.onerror=function(){return n(new Error("Can't load image ".concat(t)))},r.src=t}))}function x(t,e){return Object.fromEntries(Object.entries(t).map((function(t){var n=t[0],r=t[1];return[n,e(r,n)]})))}function w(t,e){for(var n in t){var r=e[n];void 0===r?e[n]=(i=t[n],JSON.parse(JSON.stringify(i))):"object"==typeof r&&w(t[n],r)}var i;return e}function _(t,e,n){var r=n.has(t),i=n.get(t);switch(typeof e){case"string":return r?i:e;case"number":return r?Number(i):e;case"boolean":return r?"false"!==i:e;default:throw new Error("type ".concat(typeof e," does not supported"))}}!function(t){function e(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return n.apply(void 0,m([document.createElement(t)],e,!1))}function n(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return e.forEach((function(e){return e(t)})),t}function r(t){return function(e){return e.title=t}}function i(t){return function(e){return e.id=t}}function o(t){return function(e){return e.name=t}}function a(t){return void 0===t&&(t=!0),function(e){return e.required=t}}function s(t){return function(e){return e.type=t}}function u(t,e,n){return function(r){r.min=void 0===t?"any":t.toString(),r.max=void 0===e?"any":e.toString(),r.step=void 0===n?"any":n.toString()}}function c(t,e){return function(n){n.textContent=t,e&&(n.title=e)}}function l(t){return function(e){return t(e.style)}}function f(e,n,r){return t.CreateElement("select",t.AddEventListener("change",(function(){try{r(this.value)}catch(t){alert("".concat(t))}})),t.Append.apply(t,Object.entries(n).map((function(e){var n=e[0],r=e[1];return t.CreateElement("option",t.SetText(r),(function(t){return t.value=n}))}))),(function(t){t.selectedIndex=Object.keys(n).findIndex((function(t){return t===e})),r(e)}))}function d(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return function(e){return t.forEach((function(t){t instanceof HTMLElement?e.append(t):t.forEach((function(t){return e.append(t)}))}))}}function h(t,e,n){return function(r){r.addEventListener(t,e,n)}}t.CreateElement=e,t.ModifyElement=n,t.SetTitle=r,t.SetId=i,t.AddClass=function(t){return function(e){return e.classList.add(t)}},t.SetName=o,t.SetRequired=a,t.SetChecked=function(t){return void 0===t&&(t=!0),function(e){return e.checked=t}},t.SetInputType=s,t.SetNumberInputRange=u,t.SetText=c,t.SetStyles=l,t.FlexContainer=function(t,e,n){return void 0===t&&(t="row"),void 0===e&&(e=""),void 0===n&&(n={wrap:!1}),l((function(r){r.display="flex",r.flexDirection=t,r.justifyContent=e,r.flexWrap=n.wrap?"wrap":"no-wrap"}))},t.CreateSwitcher=function(e,n,r){var i=t.CreateElement("button",c(e()?r.off:r.on));return t.ModifyElement(i,h("click",(function(){n(!e()),i.innerText=e()?r.off:r.on})))},t.CreateSelector=f,t.ModifyChildren=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return function(e){for(var r=0;r<e.children.length;r++){var i=e.children.item(r);i instanceof HTMLElement&&n.apply(void 0,m([i],t,!1))}}},t.Append=d,t.AddEventListener=h,function(n){function l(n,g){return e("ul",d((y=n,Object.entries(y)).map((function(n){var y=n[0],x=n[1];return e("li",d(e("label",c(y,x.description||y),(function(t){return t.htmlFor=y})),function(n,c,d,g,y){void 0===y&&(y=!0);switch(c.type){case"boolean":case"string":case"int":case"float":case"color":return d(g||c.default),e.apply(void 0,m(m(["input",o(n),i(n),r(c.description||n),a(y),h("change",(function(t){d(function(t){switch(t.type){case"number":return t.valueAsNumber;case"radio":case"checkbox":return t.checked;default:return t.value}}(this))}))],function(e){switch(e.type){case"float":return[s("number"),u(v(e.min,Number.MIN_SAFE_INTEGER),v(e.max,Number.MAX_SAFE_INTEGER),.001)];case"int":return[s("number"),u(v(e.min,Number.MIN_SAFE_INTEGER),v(e.max,Number.MAX_SAFE_INTEGER),1)];case"boolean":return[t.SetRequired(!1),t.SetInputType("checkbox")];case"color":return[s("color")]}return[]}(c),!1),[p.bind(null,c,v(g,c.default))],!1));case"enum":return d(g||c.default),t.ModifyElement(f(v(g,c.default),c.values,d),r(c.description||n),i(n));case"object":var x=g||{};return d(x),l(c.values,x)}}(y,x,(function(t){return g[y]=t}),g[y])))}))));var y}function p(t,e,n){switch(t.type){case"int":case"float":return void(n.valueAsNumber=e);case"color":case"string":return void(n.value=e);case"boolean":return void(n.checked=e)}}n.GetDefault=function(t){var e={};return l(t,e),e},n.CreateForm=function(e,n,r,i){var o,a=i||{},s=l(e,a),u=r,c=t.CreateElement("section",t.Append(s),t.SetStyles((function(t){return t.width="286px"})),t.AddEventListener("click",(o="li",function(t){var e=t.target;if(0===t.button&&e.tagName.toLowerCase()===o.toLowerCase()){var n="hideChilds";e.classList.contains(n)?e.classList.remove(n):e.classList.add(n)}}))),f=t.CreateElement("form",t.AddClass("settings-input"),t.Append(t.CreateElement("header"),c));return t.ModifyElement(f,t.Append(t.CreateElement("footer",t.FlexContainer("row","space-around",{wrap:!0}),t.SetStyles((function(t){return t.width="286px"})),t.Append(Object.keys(n).map((function(e){return t.CreateElement("input",t.SetInputType("submit"),t.SetStyles((function(t){t.flex="1",t.margin="8px"})),t.AddEventListener("click",(function(){u=e})),(function(t){t.value=e,e===r&&setTimeout((function(){return t.click()}))}))}))))),t.AddEventListener("submit",(function(t){t.preventDefault(),u&&n[u](g(a),(function(t){c.innerHTML="",a=g(t),c.append(l(e,a))}))})))}}(t.Input||(t.Input={}))}(h||(h={})),function(t){function e(t,e){return void 0===t&&(t=0),void 0===e&&(e=1),Math.random()*(e-t)+t}function n(){return Math.random()>.5?1:-1}t.range=e,t.signed=function(t,r){return void 0===t&&(t=1),void 0===r&&(r=0),n()*e(r,t)},t.sign=n}(p||(p={}));var S=function(t,e,n,r){var i=e.vertex,o=e.fragment;this.gl=t;try{this.program=function(t,e,n){var r=A(t,t.VERTEX_SHADER,e),i=A(t,t.FRAGMENT_SHADER,n),o=t.createProgram();if(t.attachShader(o,r),t.attachShader(o,i),t.linkProgram(o),!t.getProgramParameter(o,t.LINK_STATUS))throw new Error("Unable to initialize the shader program: ".concat(t.getProgramInfoLog(o)));return o}(t,i,o),this.uniforms=function(t,e,n){return x(n,(function(n){var r=t.getUniformLocation(e,n);if(null===r)throw new Error("Not found uniform ".concat(n));return r}))}(t,this.program,n),this.attributes=function(t,e,n){return x(n,(function(n){var r=t.getAttribLocation(e,n);if(null===r)throw new Error("Not found attribute ".concat(n));return r}))}(t,this.program,r);for(var a=t.getProgramParameter(this.program,t.ACTIVE_UNIFORMS),s=new Set(Object.values(n)),u=0;u<a;++u){var c=t.getActiveUniform(this.program,u),l=c.name,f=c.type;s.has(l)||console.warn("Not used uniform ".concat(l," (").concat(f,") in ").concat(this.constructor.name))}var d=t.getProgramParameter(this.program,t.ACTIVE_ATTRIBUTES),h=new Set(Object.values(r));for(u=0;u<d;++u){var p=t.getActiveAttrib(this.program,u);l=p.name,f=p.type,h.has(l)||console.warn("Not used attribute ".concat(l," (").concat(f,") in ").concat(this.constructor.name))}}catch(t){throw new Error("Failed create program ".concat(this.constructor.name,": ").concat(t))}},b=function(){function t(t,e){var n=0;this.textures=x(e,(function(e){var r=t["TEXTURE".concat(n)]||void 0;if(void 0===r)throw new Error("Textures overflow");t.activeTexture(r);var i=function(t,e){var n=t.createTexture();return t.bindTexture(t.TEXTURE_2D,n),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.bindTexture(t.TEXTURE_2D,null),n}(t,e);return t.bindTexture(t.TEXTURE_2D,i),n++}))}return t.prototype.get=function(t){return this.textures[t]},t}();function A(t,e,n){var r=t.createShader(e);if(!r)throw new Error("Failed to compile the shader of type ".concat(e,":\n").concat(n));if(t.shaderSource(r,n),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS))throw t.deleteShader(r),new Error("An error occurred compiling the shaders: "+t.getShaderInfoLog(r));return r}var M=function(){function t(t,e){this.x=t,this.y=e}return t.prototype.Add=function(e){return new t(this.x+e.x,this.y+e.y)},t.prototype.Sub=function(e){return new t(this.x-e.x,this.y-e.y)},t.prototype.Dot=function(t){return this.x*t.x+this.y*t.y},t.prototype.Len=function(){return Math.sqrt(this.Dot(this))},t.prototype.Norm=function(){return this.Div(this.Len())},t.prototype.Dist=function(t){return t.Sub(this).Len()},t.prototype.Manhattan=function(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)},t.prototype.Mult=function(e){return new t(this.x*e,this.y*e)},t.prototype.Div=function(e){return new t(this.x/e,this.y/e)},t.prototype.Clone=function(){return new t(this.x,this.y)},t.prototype.Transform=function(e){var n=e.Get(0,0)*this.x+e.Get(1,0)*this.y+e.Get(2,0),r=e.Get(0,1)*this.x+e.Get(1,1)*this.y+e.Get(2,1),i=e.Get(0,2)*this.x+e.Get(1,2)*this.y+e.Get(2,2);return new t(n/i,r/i)},t.prototype.Invert=function(){return new t(-this.x,-this.y)},t.Zero=new t(0,0),t}(),C=function(){function t(t,e){this.width=t,this.height=e}return t.prototype.Area=function(){return this.width*this.height},t.prototype.Scale=function(e,n){return void 0===n&&(n=e),new t(e*this.width,n*this.width)},t}(),T=(function(){function t(){this.data=[[0,0,0],[0,0,0],[0,0,0]]}t.Zero=function(){return new t},t.Ident=function(){var e=new t;return e.data[0][0]=1,e.data[1][1]=1,e.data[2][2]=1,e},t.Rotation=function(t){var e=Math.sin(t),n=Math.cos(t);return this.RotationCosSin(n,e)},t.RotationCosSin=function(e,n){var r=t.Ident();return r.data[0][0]=e,r.data[0][1]=n,r.data[1][0]=-n,r.data[1][1]=e,r},t.Translate=function(e,n){var r=t.Ident();if(n)r.data[2][0]=e,r.data[2][1]=n;else{var i=e;r.data[2][0]=i.x,r.data[2][1]=i.y}return r},t.prototype.Get=function(t,e){return this.data[t][e]},t.prototype.Set=function(t,e,n){this.data[t][e]=n},t.prototype.Mult=function(e){for(var n=t.Zero(),r=0;r<3;++r)for(var i=0;i<3;++i)for(var o=0;o<3;++o)n.data[r][i]+=this.data[r][o]*e.data[o][i];return n}}(),function(){function t(t,e,n){void 0===n&&(n=100),this.create=t,this.parent=e,this.cap=n,this.buffer=[],this.cur=0,e.style.overflow="auto";for(var r=0;r<n;r++){var i=(this.buffer[r]=this.create()).section;this.parent.appendChild(i)}}return t.prototype.insert=function(t){var e=this.buffer[this.cur++%this.cap];this.parent.appendChild(e.section),t(e)},t}()),E=function(){function t(t,e){var n=this;this.logsContainer=t,this.buffer=new Array,this.logs=e.reduce((function(t,r){return t[r]=new T((function(){return{section:d.HTML.CreateElement("div",d.HTML.AddClass(r))}}),n.logsContainer,1e3/e.length|0),t}),{})}return t.prototype.WriteLine=function(t,e){this.buffer.push([e,t])},t.prototype.Tick=function(t){var e=this;this.buffer.length&&(this.buffer.forEach((function(t){var n=t[0],r=t[1];return e.logs[r].insert((function(t){return t.section.textContent=n}))})),this.logsContainer.scrollTop=this.logsContainer.scrollHeight,this.buffer.length=0)},t}(),L=function(){function t(t,e){var n=this;this.rows=e,this.lines=[],this.table=d.HTML.CreateElement("table",d.HTML.SetStyles((function(t){t.width="100%",t.height="100%",t.borderCollapse="collapse"}))),t.appendChild(this.table),e.forEach((function(t){return n._append(t)}))}return t.prototype._append=function(t){var e,n=this;this.table.append(d.HTML.CreateElement("tr",d.HTML.SetStyles((function(t){t.width="100%"})),d.HTML.Append(d.HTML.CreateElement("td",d.HTML.SetStyles((function(t){return t.border="1px solid black"})),d.HTML.SetText(t.name)),d.HTML.CreateElement("td",d.HTML.SetStyles((function(t){t.height="".concat(100/n.rows.length,"%"),t.width="100%",t.border="1px solid gray"})),d.HTML.Append(e=d.HTML.CreateElement("div",d.HTML.SetStyles((function(e){e.backgroundColor=t.color,e.height="100%",e.textAlign="center"})),d.HTML.AddClass(H.cssClasses.visibleOnAnything))))))),this.lines.push(e)},t.prototype.append=function(t){this.rows.push(t),this._append(t)},t.prototype.Tick=function(t){var e=this,n=Math.max.apply(Math,this.rows.map((function(t){return t.value})));this.lines.forEach((function(t,r){t.style.width="".concat(e.rows[r].value/n*100,"%"),t.textContent=e.rows[r].value.toFixed(2)}))},t}(),R=function(){function t(t){this.last=0,this.first=!0;var e=d.HTML.CreateElement("canvas");t.append(e),this.context=e.getContext("2d"),this.context.strokeStyle="lime",this.context.fillStyle="black"}return t.prototype.append=function(t){if(t=this.context.canvas.height-t,this.first)return this.first=!1,void(this.last=t);var e=this.context.canvas.width-1,n=this.context.canvas.height;this.context.drawImage(this.context.canvas,1,0,e,n,0,0,e,n),this.context.fillRect(e,0,10,this.context.canvas.height),this.context.beginPath(),this.context.moveTo(e,this.last),this.context.lineTo(this.context.canvas.width,t),this.context.stroke(),this.context.closePath(),this.last=t},t}(),F=function(){function t(t,e){void 0===e&&(e=""),this.styleSheet=t,this.selector=e,this.rules=new Set,this.childs=new Array}return t.prototype.addRule=function(t,e){void 0===e&&(e="");var n=this.styleSheet.insertRule("".concat(this.selector," ").concat(t," {").concat(e,"}"),this.styleSheet.rules.length),r=this.styleSheet.cssRules[n];return this.rules.add(r),r},t.prototype.chainAddRule=function(t,e){return void 0===e&&(e=""),this.addRule(t,e),this},t.prototype.deleteRule=function(t){if(!this.rules.has(t))throw new RangeError("Try remove rule '".concat(t.cssText,"' from incorrect sheet"));this.rules.delete(t);for(var e=0;e<this.styleSheet.cssRules.length;e++)if(this.styleSheet.cssRules.item(e)===t)return void this.styleSheet.removeRule(e);throw new RangeError("Can't remove rule ".concat(t.cssText))},t.prototype.child=function(e){var n=new t(this.styleSheet,"".concat(this.selector," ").concat(e));return this.childs.push(n),n},t.prototype.Dispose=function(t){void 0===t&&(t=!0),t&&(this.childs.forEach((function(t){return t.Dispose()})),this.childs.length=0);for(var e=this.styleSheet.cssRules.length-1;e>=0;e--)this.rules.has(this.styleSheet.cssRules.item(e))&&this.styleSheet.removeRule(e)},t}(),H=function(){function t(e,n){this.container=e,this.tickers=new Array,this.disposes=new Array;var r="windows-container"+Math.random().toString().slice(2);e.classList.add(r),n.child("form.settings-input").chainAddRule("ul","\n\t\t\t\tpadding-inline-start: 8px;\n\t\t\t\tborder-left: 1px solid;\n\t\t\t\tborder-top: 1px solid;\n\t\t\t").chainAddRule("li","\n\t\t\t\tpadding-top: 8px;\n\t\t\t\tmargin-bottom: 2px;\n\t\t\t\tdisplay: flex;\n\t\t\t\tjustify-content: space-between;\n\t\t\t\talign-items: flex-start;\n\t\t\t\tflex-wrap: wrap;\n\t\t\t\tcursor: pointer;\n\t\t\t").chainAddRule("li > label","\n\t\t\t\tcursor: auto;\n\t\t\t\tmargin-right: 8px;\n\t\t\t").chainAddRule("li:not(:last-child)","\n\t\t\t\tborder-bottom: 1px solid grey;\n\t\t\t").chainAddRule('input[type="number"]',"\n\t\t\t\twidth: 48px;\n\t\t\t").chainAddRule(".hideChilds ul","\n\t\t\t\tdisplay: none\n\t\t\t").chainAddRule(">section","\n\t\t\t\tmax-height: 500px!important;\n\t\t\t\toverflow-x: auto;\n\t\t\t"),this.windowCSS=n.child(".".concat(r," > article")),this.headerCSS=this.windowCSS.child("> header"),this.contentCSS=this.windowCSS.child("> section"),this.windowCSS.addRule("",'\n\t\t\tposition: absolute;\n\t\t\tborder: double 5px gray;\n\t\t\tborder-radius: 5px;\n\t\t\tbackground-color: rgba(255, 255, 255, 0.9);\n\t\t\tfont-family: "Bitstream Vera Sans Mono", monospace;\n\t\t\tfont-size: 12px;\n\t\t'),this.headerCSS.addRule("","\n\t\t\tborder-bottom: solid 1px gray;\n\t\t\tdisplay: flex;\n\t\t\theight: 1.3em;\n\t\t\tpadding-left: 4px;\n\t\t"),this.headerCSS.addRule("button","\n\t\t\tborder: none;\n\t\t\tborder-left: solid 1px gray;\n\t\t\tmargin: 0;\n\t\t\theight: 100%;\n\t\t\twidth: 18px;\n\t\t"),this.headerCSS.addRule("button:focus","\n\t\t\toutline: none;\n\t\t"),this.contentCSS.child(".table").chainAddRule("","\n\t\t\t\tdisplay: table;\n\t\t\t\tborder-collapse: collapse;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t").chainAddRule("td","\n\t\t\t\tborder-top: solid 1px gray;\n\t\t\t\tpadding-top: 4px;\n\t\t\t\tpadding-left: 8px;\n\t\t\t\tpadding-right: 8px;\n\t\t\t").chainAddRule("td:first-child","\n\t\t\t\tpadding-right: 16px;\n\t\t\t\tpadding-left: 0px;\n\t\t\t").chainAddRule("td:last-child","\n\t\t\t\tpadding-right: 0px;\n\t\t\t\tpadding-left: 16px;\n\t\t\t"),this.contentCSS.addRule("*","max-height: 80vh"),this.contentCSS.addRule(".".concat(t.cssClasses.visibleOnAnything),"\n\t\t\tfont-weight: bold;\n\t\t\ttext-shadow: #000 1px 0 0px, #000 0 1px 0px, #000 -1px 0 0px, #000 0 -1px 0px;\n\t\t\tcolor: white;\n\t\t")}return t.prototype.Tick=function(t){this.tickers.forEach((function(e){return e.Tick(t)}))},t.prototype.Dispose=function(){this.tickers.length=0,this.disposes.forEach((function(t){return t.Dispose()})),this.disposes.length=0,this.container.innerHTML=""},t.prototype.NewCreateBarChartWindow=function(t,e){void 0===e&&(e=new C(50,30));var n=d.HTML.CreateElement("div",d.HTML.SetStyles((function(t){t.width="".concat(e.width,"rem"),t.height="".concat(e.height,"rem"),t.overflow="auto",t.color="rgb(250, 250, 250)",t.backgroundColor="black",t.display="table"}))),r=new L(n,t);return this.tickers.push(r),[n,r]},t.prototype.CreateBarChartWindow=function(t,e,n,r){void 0===n&&(n=M.Zero),void 0===r&&(r=new C(50,30));var i=this.NewCreateBarChartWindow(e,r);return this.CreateInfoWindow(t,i[0],n),i[1]},t.prototype.CreateConsoleWindow=function(t,e,n,r){void 0===e&&(e=M.Zero),void 0===n&&(n=new C(50,30));var i=this.contentCSS.child("> article");Object.entries(r).forEach((function(t){var e=t[0],n=t[1],r=i.addRule(".".concat(e));for(var o in n){var a=n[o];a&&(r.style[o]=a)}})),this.disposes.push(i);var o=d.HTML.CreateElement("div",d.HTML.SetStyles((function(t){t.overflow="auto"}))),a=new E(o,Object.keys(r));return this.tickers.push(a),this.CreateInfoWindow(t,d.HTML.CreateElement("article",d.HTML.FlexContainer("column"),d.HTML.SetStyles((function(t){t.whiteSpace="pre",t.width="".concat(n.width,"rem"),t.height="".concat(n.height,"rem"),t.color="lime",t.backgroundColor="black"})),d.HTML.Append(d.HTML.CreateElement("footer",d.HTML.FlexContainer("row","space-between",{wrap:!0}),d.HTML.Append(Object.keys(r).map((function(t){var e="div.".concat(t),n=i.addRule(e);return d.HTML.CreateElement("section",d.HTML.Append(d.HTML.CreateElement("input",d.HTML.SetInputType("checkbox"),d.HTML.AddClass(t),d.HTML.SetChecked(),d.HTML.AddEventListener("change",(function(){n.style.display=this.checked?"":"none"}))),d.HTML.CreateElement("span",d.HTML.SetText(t),d.HTML.AddClass(t))))})))),o)),e),a},t.prototype.CreateChartWindow=function(t,e,n){void 0===e&&(e=M.Zero),void 0===n&&(n=new C(50,30));var r=d.HTML.CreateElement("div",d.HTML.SetStyles((function(t){t.whiteSpace="pre",t.width="".concat(n.width,"rem"),t.height="".concat(n.height,"rem"),t.overflow="auto",t.color="lime",t.backgroundColor="black"}))),i=new R(r);return this.CreateInfoWindow(t,r,e),i},t.prototype.CreateInfoWindow=function(t,e,n){void 0===n&&(n=M.Zero),this.container.appendChild(this.CreateWindow(t,e,n))},t.prototype.CreateCloseableWindow=function(t,e,n){var r=this;void 0===n&&(n=new M(document.body.clientWidth/3,document.body.clientHeight/3));var i=this.CreateWindow(t,e,n,!0);this.container.appendChild(i);return{close:function(){return r.container.removeChild(i)}}},t.prototype.CreateWindow=function(t,e,n,r){void 0===n&&(n=M.Zero),void 0===r&&(r=!1);var i=d.HTML.CreateElement("article",d.HTML.SetStyles((function(t){t.left="".concat(n.x,"px"),t.top="".concat(n.y,"px")}))),o=d.HTML.CreateElement("section",d.HTML.Append(e));return d.HTML.ModifyElement(i,d.HTML.Append(this.CreateHeader(t,i,o,r),o))},t.prototype.CreateHeader=function(t,e,n,r){var i,o,a=this;void 0===r&&(r=!1);var s=function(t){!function(t,e){if(null!=i&&null!=o){var n=t.Sub(i);e.style.left="".concat(o.x+n.x,"px"),e.style.top="".concat(o.y+n.y,"px")}}(new M(t.pageX,t.pageY),e)};return d.HTML.CreateElement("header",d.HTML.Append(d.HTML.CreateElement("header",d.HTML.SetText(t)),d.HTML.CreateElement("section",d.HTML.SetStyles((function(t){t.cursor="move",t.flex="1",t.minWidth="64px"})),d.HTML.AddEventListener("mousedown",(function(t){if(t.target===this){t.preventDefault();var n=e.getBoundingClientRect();i=new M(t.pageX,t.pageY),o=new M(n.x,n.y),document.addEventListener("mousemove",s)}})),d.HTML.AddEventListener("mouseup",(function(t){t.target===this&&(t.preventDefault(),document.removeEventListener("mousemove",s),i=o=null)}))),d.HTML.CreateElement("section",d.HTML.Append(d.HTML.CreateSwitcher((function(){return"none"!==n.style.display}),(function(t){return n.style.display=t?"":"none"}),{on:"🗖",off:"🗕"}),r?d.HTML.CreateElement("button",d.HTML.SetText("X"),d.HTML.AddEventListener("click",(function(){a.container.removeChild(e)}))):[]))))},t.cssClasses={visibleOnAnything:"visible-on-anything"},t}();var k={vertex:e("#version 300 es\n#define GLSLIFY 1\n\nin vec3 a_position;\nuniform mat4 u_mvMatrix;\nuniform mat4 u_pMatrix;\nvoid main() {\n    gl_Position = u_pMatrix * u_mvMatrix * vec4(a_position, 1.);\n    gl_PointSize = 32.;\n}\n"),fragment:e("#version 300 es\n\nprecision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_texture;\nout vec4 FragColor;\n\nvoid main() {\n    FragColor = texture(u_texture, gl_PointCoord);\n}\n")},I={vertex:e("#version 300 es\n#define GLSLIFY 1\n\nin vec3 a_position;\nin vec3 a_color;\n\nuniform mat4 u_mvMatrix;\nuniform mat4 u_pMatrix;\n\nout vec3 v_color;\n\nvoid main() {\n    v_color = a_color;\n    gl_Position = u_pMatrix * u_mvMatrix * vec4(a_position, 1.0);\n}\n"),fragment:e("#version 300 es\n\nprecision mediump float;\n#define GLSLIFY 1\n\nin vec3 v_color;\nout vec4 FragColor;\n\nvoid main() {\n    FragColor = vec4(v_color, 1.0);\n}\n")},B={vertex:e("#version 300 es\n#define GLSLIFY 1\n\nin vec3 a_position;\nuniform mat4 u_mvMatrix;\nuniform mat4 u_pMatrix;\nuniform float u_size;\nvoid main() {\n    gl_Position = u_pMatrix * u_mvMatrix * vec4(a_position, 1.);\n    gl_PointSize = u_size;\n}\n"),fragment:e("#version 300 es\n\nprecision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_texture;\nout vec4 FragColor;\n\nuniform int u_frame;\n\nvoid main() {\n    FragColor = mix(texture(u_texture, vec2(\n        (float(u_frame)*256.0 + gl_PointCoord.x *256.0)/(256.0*24.0), \n        gl_PointCoord.y)), vec4(1.0, 0.0, 0.0, 1.0), 0.0);\n}")},P={vertex:e("#version 300 es\n#define GLSLIFY 1\n#define PI  3.141592653589793\n#define PI_2 6.283185307179586\nin float a_time;\n\nuniform mat4 u_mvMatrix;\nuniform mat4 u_pMatrix;\nuniform float u_size;\nuniform float u_radius;\nuniform int u_count;\nuniform float u_layers;\nuniform float u_gravitation;\nout float time;\nvoid main() {\n    float angle = PI_2 / (float(u_count) / u_layers) * float(gl_VertexID);\n    vec2 pos = vec2(cos(angle), sin(angle)) * u_radius * a_time - vec2(0, u_gravitation) * 0.5 * a_time * a_time;\n    gl_Position = u_pMatrix * u_mvMatrix * vec4(pos, 0, 1.);\n    gl_PointSize = u_size;\n    time = smoothstep(0.0, 1.0, a_time);\n}\n"),fragment:e("#version 300 es\n\nprecision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D u_texture;\nuniform float u_framesCount;\n\nin float time;\nout vec4 FragColor;\n\nvoid main() {\n    FragColor = texture(u_texture, vec2((trunc(u_framesCount * time) + gl_PointCoord.x) / u_framesCount, gl_PointCoord.y));\n}")},D={vertex:e("#version 300 es\n#define GLSLIFY 1\n#define PI  3.141592653589793\n#define PI_2 6.283185307179586\nin float a_time;\n\nuniform mat4 u_mvMatrix;\nuniform mat4 u_pMatrix;\nuniform float u_size;\nuniform float u_gravitation;\nuniform float u_timeShift;\nuniform float u_width;\nout float time;\n\nfloat random(vec2 st) {\n    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) *\n        323758.5453123);\n}\n\nvoid main() {\n    float x = random(vec2(float(gl_VertexID), -gl_VertexID)) * 200. - 100.0;\n    float y = sin(-acos(abs(0.5 * x) / u_width)) * 100.;\n    vec2 pos = vec2(x, y - 500. * u_timeShift + 400. * (u_timeShift - 1.)) - vec2(0, u_gravitation) * 0.5 * a_time * a_time;\n    gl_Position = u_pMatrix * u_mvMatrix * vec4(pos, 0, 1.);\n    time = smoothstep(0.0, 1.0, abs(u_timeShift - a_time));\n    gl_PointSize = u_size * time;\n}\n"),fragment:e("#version 300 es\n\nprecision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D u_texture;\nuniform vec4 u_color;\n\nin float time;\nout vec4 FragColor;\n\nvoid main() {\n    FragColor = texture(u_texture, gl_PointCoord) * vec4(u_color.xyz, time);\n}")},O={count:{type:"int",default:40},r:{type:"float",default:340,min:.1,max:3400},speed:{type:"float",default:1},colors:{type:"object",values:{red:{type:"boolean",default:!0},green:{type:"boolean",default:!0},blue:{type:"boolean",default:!0}}},size:{type:"int",default:32},groups:{type:"int",default:1},layers:{type:"float",default:2},gravitation:{type:"float",default:0}},N=function(){function t(t){this.gl=t,this.posBuffer=this.gl.createBuffer(),this.shader=new S(this.gl,P,{texture:"u_texture",mvMatrix:"u_mvMatrix",pMatrix:"u_pMatrix",size:"u_size",radius:"u_radius",count:"u_count",layers:"u_layers",gravitation:"u_gravitation",framesCount:"u_framesCount"},{time:"a_time"})}return t.prototype.draw=function(t,e,n,r,i,o,a,s,u){var c=this.gl,l=this.shader,f=l.uniforms,d=l.attributes,h=l.program;c.useProgram(h),c.uniform1i(f.texture,t),c.uniform1f(f.size,i),c.uniform1f(f.radius,o),c.uniform1i(f.count,r.length),c.uniform1f(f.layers,a),c.uniform1f(f.gravitation,s),c.uniform1f(f.framesCount,u),c.uniformMatrix4fv(f.mvMatrix,!1,e),c.uniformMatrix4fv(f.pMatrix,!1,n),c.bindBuffer(c.ARRAY_BUFFER,this.posBuffer),c.vertexAttribPointer(d.time,1,c.FLOAT,!1,0,0),c.bufferData(c.ARRAY_BUFFER,r,c.STATIC_DRAW),c.enableVertexAttribArray(d.time),c.bindBuffer(c.ARRAY_BUFFER,null),c.drawArrays(c.POINTS,0,r.length),c.useProgram(null)},t}(),U=function(){function t(t,e,n,r){void 0===r&&(r=0),this.count=t,this.r=e,this.minSpeed=n,this.positions=new Float32Array(3*this.count),this.time=0,this.size=0,this.percent=0,this.time-=r}return t.prototype.update=function(t){if(this.time+=t,!(this.time<0)){var e=.5*this.r,n=2.5*this.r,r=this.time*this.minSpeed,i=r<e;this.percent=r/n;for(var o=0;o<3*this.count;o+=3){var a=2*Math.PI/this.count*(o/3),s=this.minSpeed*Math.cos(a),u=this.minSpeed*Math.sin(a)-(i?0:30*this.time*this.time);this.positions[o+0]+=s*t,this.positions[o+1]+=u*t,this.positions[o+2]+=0*t,this.size=r/e*32,r>n&&(this.size=this.time=this.positions[o]=this.positions[o+1]=this.positions[o+2]=0)}}},t}(),G=function(){function t(t){this.gl=t,this.posBuffer=this.gl.createBuffer(),this.shader=new S(this.gl,B,{texture:"u_texture",mvMatrix:"u_mvMatrix",pMatrix:"u_pMatrix",size:"u_size",frame:"u_frame"},{position:"a_position"})}return t.prototype.draw=function(t,e,n,r,i,o){void 0===i&&(i=32),void 0===o&&(o=20);var a=this.gl,s=this.shader,u=s.program,c=s.uniforms,l=s.attributes;a.useProgram(u),a.uniform1i(c.texture,t),a.uniform1f(c.size,i),a.uniform1i(c.frame,o),a.uniformMatrix4fv(c.mvMatrix,!1,e),a.uniformMatrix4fv(c.pMatrix,!1,n),a.bindBuffer(a.ARRAY_BUFFER,this.posBuffer),a.vertexAttribPointer(l.position,3,a.FLOAT,!1,0,0),a.bufferData(a.ARRAY_BUFFER,r,a.STATIC_DRAW),a.enableVertexAttribArray(l.position),a.bindBuffer(a.ARRAY_BUFFER,null),a.drawArrays(a.POINTS,0,r.length/3),a.useProgram(null)},t}(),z=function(){function t(t){this.gl=t,this.posBuffer=this.gl.createBuffer(),this.shader=new S(this.gl,k,{texture:"u_texture",mvMatrix:"u_mvMatrix",pMatrix:"u_pMatrix"},{position:"a_position"})}return t.prototype.draw=function(t,e,n,r){var i=this.gl,o=this.shader,a=o.program,s=o.uniforms,u=o.attributes;i.useProgram(a),i.uniform1i(s.texture,t),i.uniformMatrix4fv(s.mvMatrix,!1,e),i.uniformMatrix4fv(s.pMatrix,!1,n),i.bindBuffer(i.ARRAY_BUFFER,this.posBuffer),i.vertexAttribPointer(u.position,3,i.FLOAT,!1,0,0),i.bufferData(i.ARRAY_BUFFER,r,i.STATIC_DRAW),i.enableVertexAttribArray(u.position),i.bindBuffer(i.ARRAY_BUFFER,null),i.drawArrays(i.POINTS,0,r.length/3),i.useProgram(null)},t}(),W=function(){function t(t){this.gl=t,this.posBuffer=this.gl.createBuffer(),this.colorBuffer=this.gl.createBuffer(),this.shader=new S(this.gl,I,{mvMatrix:"u_mvMatrix",pMatrix:"u_pMatrix"},{position:"a_position",color:"a_color"})}return t.prototype.draw=function(t,e,n,r){var i=this.gl,o=this.shader,a=o.program,s=o.uniforms,u=o.attributes;i.useProgram(a),i.uniformMatrix4fv(s.mvMatrix,!1,t),i.uniformMatrix4fv(s.pMatrix,!1,e),i.bindBuffer(i.ARRAY_BUFFER,this.posBuffer),i.vertexAttribPointer(u.position,3,i.FLOAT,!1,0,0),i.bufferData(i.ARRAY_BUFFER,n,i.STATIC_DRAW),i.enableVertexAttribArray(u.position),i.bindBuffer(i.ARRAY_BUFFER,this.colorBuffer),i.vertexAttribPointer(u.color,3,i.FLOAT,!1,0,0),i.bufferData(i.ARRAY_BUFFER,r,i.STATIC_DRAW),i.enableVertexAttribArray(u.color),i.bindBuffer(i.ARRAY_BUFFER,null),i.drawArrays(i.LINES,0,n.length/3),i.useProgram(null)},t}(),Y=function(){function t(t,e,n,r){this.count=t,this.r=e,this.minSpeed=n,this.maxSpeed=r,this.positions=new Float32Array(3*this.count),this.paths=new Float32Array(6*this.count),this.colors=new Float32Array(6*this.count).fill(1),this.speeds=new Float32Array(3*this.count);for(var i=0;i<3*t;i+=3)this.setRandomSpeed(i);for(i=0;i<6*t;i+=6)this.colors[i+3]=.47,this.colors[i+4]=.31,this.colors[i+5]=.24}return t.prototype.setRandomSpeed=function(t){var e=Math.random(),n=Math.random(),r=Math.random(),i=Math.sqrt(e*e+n*n+r*r),o=p.range(this.minSpeed,this.maxSpeed);this.speeds[t+0]=p.sign()*(e/i*o),this.speeds[t+1]=p.sign()*(n/i*o),this.speeds[t+2]=p.sign()*(r/i*o)},t.prototype.update=function(t){for(var e=0;e<3*this.count;e+=3){var n=this.paths[2*e+3]=this.positions[e]+=this.speeds[e]*t,r=this.paths[2*e+4]=this.positions[e+1]+=this.speeds[e+1]*t,i=this.paths[2*e+5]=this.positions[e+2]+=this.speeds[e+2]*t;i*i+r*r+n*n>=this.r*this.r&&(this.paths[2*e+3]=this.paths[2*e+4]=this.paths[2*e+5]=this.positions[e]=this.positions[e+1]=this.positions[e+2]=p.signed(.05*this.r),this.setRandomSpeed(e))}},t}(),j={};t(j,"default",(()=>J),(t=>J=t));var X=function(t,e,n){if(n||2===arguments.length)for(var r,i=0,o=e.length;i<o;i++)!r&&i in e||(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);return t.concat(r||Array.prototype.slice.call(e))},V={count:{type:"int",default:1001},speed:{type:"float",default:.5},fireColor:{type:"color",default:"#FF0D05"},smokeColor:{type:"color",default:"#1F1F1F"},size:{type:"int",default:64},groups:{type:"float",default:1},width:{type:"float",default:80},gravitation:{type:"float",default:-1500}};function q(t){switch((t=t.substring(1)).length){case 6:return X(X([],[0,2,4].map((function(e){return parseInt(t.substring(e,e+2),16)/255})),!0),[1],!1);case 8:return[0,2,4,6].map((function(e){return parseInt(t.substring(e,e+2),16)/255}))}throw new Error("Can't parse color ".concat(t,"."))}var J=function(t){return{name:"Дым и огонь",shader:new Z(t),settings:V,make:function(t,e){for(var n=this,r=e.fireColor,i=e.smokeColor,o=e.size,a=e.groups,s=e.count,u=e.speed,c=e.gravitation,l=e.width,f=new Float32Array(s).fill(0),d=1/s,h=0;h<s;h++)f[h]=d*(h%(s/a));var p=s/5,m=new Float32Array(p).fill(0),v=1/p;for(h=0;h<p;h++)m[h]=v*(h%(p/a));return function(e,a,d){for(var h=0;h<s;h++)f[h]=(f[h]+e*u)%1;for(h=0;h<p;h++)m[h]=(m[h]+v*u*5)%1;n.shader.draw(t.get("smoke"),a,d,f,o,c,q(r),l),n.shader.draw(t.get("smoke"),a,d,m,o,c,q(i),l,0)}},presets:{Fireball:{width:20},Orange:{fireColor:"#D58E1A",smokeColor:"#38250b"},Green:{fireColor:"#1ad552",smokeColor:"#3a647e"}}}},Z=function(){function t(t){this.gl=t,this.posBuffer=this.gl.createBuffer(),this.shader=new S(this.gl,D,{texture:"u_texture",mvMatrix:"u_mvMatrix",pMatrix:"u_pMatrix",size:"u_size",gravitation:"u_gravitation",color:"u_color",shift:"u_timeShift",width:"u_width"},{time:"a_time"})}return t.prototype.draw=function(t,e,n,r,i,o,a,s,u){void 0===u&&(u=1);var c=this.gl,l=this.shader,f=l.uniforms,d=l.attributes,h=l.program;c.useProgram(h),c.uniform1i(f.texture,t),c.uniform1f(f.size,i),c.uniform1f(f.gravitation,o),c.uniform1f(f.shift,u),c.uniform1f(f.width,s),c.uniform4f.apply(c,X([f.color],a,!1)),c.uniformMatrix4fv(f.mvMatrix,!1,e),c.uniformMatrix4fv(f.pMatrix,!1,n),c.bindBuffer(c.ARRAY_BUFFER,this.posBuffer),c.vertexAttribPointer(d.time,1,c.FLOAT,!1,0,0),c.bufferData(c.ARRAY_BUFFER,r,c.STATIC_DRAW),c.enableVertexAttribArray(d.time),c.bindBuffer(c.ARRAY_BUFFER,null),c.drawArrays(c.POINTS,0,r.length),c.useProgram(null)},t}(),K=function(){return K=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},K.apply(this,arguments)},Q={sparking:function(t){return{name:"Бенгальский огонь",sparks:new z(t),tails:new W(t),settings:{count:{type:"int",default:200},r:{type:"float",default:.5*t.drawingBufferWidth,min:.1},minSpeed:{type:"float",default:.2*t.drawingBufferWidth},maxSpeed:{type:"float",default:.5*t.drawingBufferWidth}},make:function(t,e){var n=this,r=e.count,i=e.r,o=e.minSpeed,a=e.maxSpeed,s=new Y(r,i,o,a);return function(e,r,i){s.update(e),n.sparks.draw(t.get("spark"),r,i,s.positions),n.tails.draw(r,i,s.paths,s.colors)}},presets:{Small:{count:40,r:150,minSpeed:200,maxSpeed:500}}}},circleFirework:function(t){return{name:"Фейерверк",firework:new G(t),settings:{count:{type:"int",default:40},r:{type:"float",default:Math.min(.5*t.drawingBufferWidth,340),min:.1,max:340},speed:{type:"float",default:Math.min(.5*t.drawingBufferWidth,138)}},make:function(t,e){var n=this,r=e.count,i=e.r,o=e.speed,a=new U(r,i,o,0),s=new U(r,i,o,1.5),u=new U(r,i,o,3),c=i/10|0;return function(e,r,i){a.update(e),s.update(e),u.update(e),n.firework.draw(t.get("fireworkBlue"),r,i,a.positions,c,24*a.percent),n.firework.draw(t.get("fireworkGreen"),r,i,s.positions,c,24*s.percent),n.firework.draw(t.get("fireworkRed"),r,i,u.positions,c,24*u.percent)}},presets:{}}},spiralFirework:function(t){return{name:"Фейрверк спиральный",firework:new N(t),settings:O,make:function(t,e){for(var n=this,r=e.size,i=e.groups,o=e.count,a=e.r,s=e.layers,u=e.speed,c=e.colors,l=e.gravitation,f=new Float32Array(o).fill(0),d=1/o,h=c.red,p=c.green,m=c.blue,v=0;v<o;v++)f[v]=d*(v%(o/i));return function(e,i,c){for(var d=0;d<o;d++)f[d]=(f[d]+e*u)%1;m&&n.firework.draw(t.get("fireworkBlue"),i,c,f,r,a,s,l,24),p&&n.firework.draw(t.get("fireworkGreen"),i,c,f,r,a,s,l,24),h&&n.firework.draw(t.get("fireworkRed"),i,c,f,r,a,s,l,24)}},presets:{Circle:{count:40,size:32,groups:40,layers:1},Double:{count:40,size:32,groups:2,layers:1},UpStar:{groups:7,layers:16,gravitation:-1e3},Explosion1:{count:40,size:256,groups:20,layers:2},Explosion2:{count:40,size:256,groups:20,layers:10.1},CircularSaw:{count:400,colors:{red:!1,green:!0,blue:!1},size:33,groups:2,layers:34},Rose:{speed:.81,colors:{red:!0,green:!1,blue:!1},size:320,groups:5,layers:2,gravitation:-1e3}}}},smoke:j.default};var $,tt,et,nt,rt,it=($={systemID:"sparking"},tt=new URL(location.href),Object.fromEntries(Object.entries($).map((function(t){var e=t[0];return[e,_(e,t[1],tt.searchParams)]})))).systemID;if(et=it,!Reflect.has(Q,et))throw new Error("Unknown system '".concat(it,"'"));(nt=f,rt=Object.entries(nt),Promise.all(rt.map((function(t){return t[0],t[1]})).map(y)).then((function(t){return Object.fromEntries(t.map((function(t,e){return[rt[e][0],t]})))}))).then((function(t){var e=document.querySelector("style").sheet,n=document.querySelector("canvas");n.width=n.clientWidth,n.height=n.clientHeight,document.body.appendChild(n);var r=n.getContext("webgl2");r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE);var i=new b(r,t),o=new H(d.HTML.CreateElement("div",(function(t){return document.body.appendChild(t)})),new F(e));function a(t){o.CreateCloseableWindow("Preset",d.HTML.CreateElement("pre",d.HTML.SetText(JSON.stringify(t,void 0,4))))}function s(t){navigator.clipboard.writeText(JSON.stringify(t,void 0,4))}var u=n.width/n.height,c=Math.tan(Math.PI/4),l=new Float32Array([1/c,0,0,0,0,u/c,0,0,0,0,1,0,0,0,0,n.width]),f=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),h=x(Q,(function(t){return t(r)})),p=0,m=-1,v=d.HTML.CreateElement("article");o.CreateInfoWindow("Настройки",d.HTML.CreateElement("article",d.HTML.Append(d.HTML.CreateSelector(it,x(h,(function(t){return t.name})),(function(t){v.innerHTML="",-1!=m&&cancelAnimationFrame(m);var e=h[t],n=function(t){-1!=m&&cancelAnimationFrame(m);var n=e.make(i,t),o=function(t){var e=(t-p)/1e3;p=t,r.clearColor(.1,.1,.1,1),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),n(e,f,l),m=requestAnimationFrame(o)};m=requestAnimationFrame(o)},o=e.settings,u=e.presets,c=d.HTML.Input.GetDefault(o),g=x(K({Default:c},u),(function(t){var e=w(c,t);return function(t,r){r(e),n(e)}}));v.appendChild(d.HTML.Input.CreateForm(o,K(K({Start:n},g),{ViewPreset:a,CopyPreset:s}),"Start"))})),v)))}));
//# sourceMappingURL=index.371ca8c2.js.map
