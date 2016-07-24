// THIRD PARTY DEPENDENCIES
!function(){var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;
(function(){function S(a){function d(e){var b=e.charCodeAt(0);if(b!==92)return b;var a=e.charAt(1);return(b=r[a])?b:"0"<=a&&a<="7"?parseInt(e.substring(1),8):a==="u"||a==="x"?parseInt(e.substring(2),16):e.charCodeAt(1)}function g(e){if(e<32)return(e<16?"\\x0":"\\x")+e.toString(16);e=String.fromCharCode(e);return e==="\\"||e==="-"||e==="]"||e==="^"?"\\"+e:e}function b(e){var b=e.substring(1,e.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),e=[],a=
b[0]==="^",c=["["];a&&c.push("^");for(var a=a?1:0,f=b.length;a<f;++a){var h=b[a];if(/\\[bdsw]/i.test(h))c.push(h);else{var h=d(h),l;a+2<f&&"-"===b[a+1]?(l=d(b[a+2]),a+=2):l=h;e.push([h,l]);l<65||h>122||(l<65||h>90||e.push([Math.max(65,h)|32,Math.min(l,90)|32]),l<97||h>122||e.push([Math.max(97,h)&-33,Math.min(l,122)&-33]))}}e.sort(function(e,a){return e[0]-a[0]||a[1]-e[1]});b=[];f=[];for(a=0;a<e.length;++a)h=e[a],h[0]<=f[1]+1?f[1]=Math.max(f[1],h[1]):b.push(f=h);for(a=0;a<b.length;++a)h=b[a],c.push(g(h[0])),
h[1]>h[0]&&(h[1]+1>h[0]&&c.push("-"),c.push(g(h[1])));c.push("]");return c.join("")}function s(e){for(var a=e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),c=a.length,d=[],f=0,h=0;f<c;++f){var l=a[f];l==="("?++h:"\\"===l.charAt(0)&&(l=+l.substring(1))&&(l<=h?d[l]=-1:a[f]=g(l))}for(f=1;f<d.length;++f)-1===d[f]&&(d[f]=++x);for(h=f=0;f<c;++f)l=a[f],l==="("?(++h,d[h]||(a[f]="(?:")):"\\"===l.charAt(0)&&(l=+l.substring(1))&&l<=h&&
(a[f]="\\"+d[l]);for(f=0;f<c;++f)"^"===a[f]&&"^"!==a[f+1]&&(a[f]="");if(e.ignoreCase&&m)for(f=0;f<c;++f)l=a[f],e=l.charAt(0),l.length>=2&&e==="["?a[f]=b(l):e!=="\\"&&(a[f]=l.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return a.join("")}for(var x=0,m=!1,j=!1,k=0,c=a.length;k<c;++k){var i=a[k];if(i.ignoreCase)j=!0;else if(/[a-z]/i.test(i.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){m=!0;j=!1;break}}for(var r={b:8,t:9,n:10,v:11,
f:12,r:13},n=[],k=0,c=a.length;k<c;++k){i=a[k];if(i.global||i.multiline)throw Error(""+i);n.push("(?:"+s(i)+")")}return RegExp(n.join("|"),j?"gi":"g")}function T(a,d){function g(a){var c=a.nodeType;if(c==1){if(!b.test(a.className)){for(c=a.firstChild;c;c=c.nextSibling)g(c);c=a.nodeName.toLowerCase();if("br"===c||"li"===c)s[j]="\n",m[j<<1]=x++,m[j++<<1|1]=a}}else if(c==3||c==4)c=a.nodeValue,c.length&&(c=d?c.replace(/\r\n?/g,"\n"):c.replace(/[\t\n\r ]+/g," "),s[j]=c,m[j<<1]=x,x+=c.length,m[j++<<1|1]=
a)}var b=/(?:^|\s)nocode(?:\s|$)/,s=[],x=0,m=[],j=0;g(a);return{a:s.join("").replace(/\n$/,""),d:m}}function H(a,d,g,b){d&&(a={a:d,e:a},g(a),b.push.apply(b,a.g))}function U(a){for(var d=void 0,g=a.firstChild;g;g=g.nextSibling)var b=g.nodeType,d=b===1?d?a:g:b===3?V.test(g.nodeValue)?a:d:d;return d===a?void 0:d}function C(a,d){function g(a){for(var j=a.e,k=[j,"pln"],c=0,i=a.a.match(s)||[],r={},n=0,e=i.length;n<e;++n){var z=i[n],w=r[z],t=void 0,f;if(typeof w==="string")f=!1;else{var h=b[z.charAt(0)];
if(h)t=z.match(h[1]),w=h[0];else{for(f=0;f<x;++f)if(h=d[f],t=z.match(h[1])){w=h[0];break}t||(w="pln")}if((f=w.length>=5&&"lang-"===w.substring(0,5))&&!(t&&typeof t[1]==="string"))f=!1,w="src";f||(r[z]=w)}h=c;c+=z.length;if(f){f=t[1];var l=z.indexOf(f),B=l+f.length;t[2]&&(B=z.length-t[2].length,l=B-f.length);w=w.substring(5);H(j+h,z.substring(0,l),g,k);H(j+h+l,f,I(w,f),k);H(j+h+B,z.substring(B),g,k)}else k.push(j+h,w)}a.g=k}var b={},s;(function(){for(var g=a.concat(d),j=[],k={},c=0,i=g.length;c<i;++c){var r=
g[c],n=r[3];if(n)for(var e=n.length;--e>=0;)b[n.charAt(e)]=r;r=r[1];n=""+r;k.hasOwnProperty(n)||(j.push(r),k[n]=q)}j.push(/[\S\s]/);s=S(j)})();var x=d.length;return g}function v(a){var d=[],g=[];a.tripleQuotedStrings?d.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,q,"'\""]):a.multiLineStrings?d.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
q,"'\"`"]):d.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,q,"\"'"]);a.verbatimStrings&&g.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,q]);var b=a.hashComments;b&&(a.cStyleComments?(b>1?d.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):d.push(["com",/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/,q,"#"]),g.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,q])):d.push(["com",
/^#[^\n\r]*/,q,"#"]));a.cStyleComments&&(g.push(["com",/^\/\/[^\n\r]*/,q]),g.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,q]));if(b=a.regexLiterals){var s=(b=b>1?"":"\n\r")?".":"[\\S\\s]";g.push(["lang-regex",RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*("+("/(?=[^/*"+b+"])(?:[^/\\x5B\\x5C"+b+"]|\\x5C"+s+"|\\x5B(?:[^\\x5C\\x5D"+b+"]|\\x5C"+
s+")*(?:\\x5D|$))+/")+")")])}(b=a.types)&&g.push(["typ",b]);b=(""+a.keywords).replace(/^ | $/g,"");b.length&&g.push(["kwd",RegExp("^(?:"+b.replace(/[\s,]+/g,"|")+")\\b"),q]);d.push(["pln",/^\s+/,q," \r\n\t\u00a0"]);b="^.[^\\s\\w.$@'\"`/\\\\]*";a.regexLiterals&&(b+="(?!s*/)");g.push(["lit",/^@[$_a-z][\w$@]*/i,q],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,q],["pln",/^[$_a-z][\w$@]*/i,q],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,q,"0123456789"],["pln",/^\\[\S\s]?/,
q],["pun",RegExp(b),q]);return C(d,g)}function J(a,d,g){function b(a){var c=a.nodeType;if(c==1&&!x.test(a.className))if("br"===a.nodeName)s(a),a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)b(a);else if((c==3||c==4)&&g){var d=a.nodeValue,i=d.match(m);if(i)c=d.substring(0,i.index),a.nodeValue=c,(d=d.substring(i.index+i[0].length))&&a.parentNode.insertBefore(j.createTextNode(d),a.nextSibling),s(a),c||a.parentNode.removeChild(a)}}function s(a){function b(a,c){var d=
c?a.cloneNode(!1):a,e=a.parentNode;if(e){var e=b(e,1),g=a.nextSibling;e.appendChild(d);for(var i=g;i;i=g)g=i.nextSibling,e.appendChild(i)}return d}for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),d;(d=a.parentNode)&&d.nodeType===1;)a=d;c.push(a)}for(var x=/(?:^|\s)nocode(?:\s|$)/,m=/\r\n?|\n/,j=a.ownerDocument,k=j.createElement("li");a.firstChild;)k.appendChild(a.firstChild);for(var c=[k],i=0;i<c.length;++i)b(c[i]);d===(d|0)&&c[0].setAttribute("value",d);var r=j.createElement("ol");
r.className="linenums";for(var d=Math.max(0,d-1|0)||0,i=0,n=c.length;i<n;++i)k=c[i],k.className="L"+(i+d)%10,k.firstChild||k.appendChild(j.createTextNode("\u00a0")),r.appendChild(k);a.appendChild(r)}function p(a,d){for(var g=d.length;--g>=0;){var b=d[g];F.hasOwnProperty(b)?D.console&&console.warn("cannot override language handler %s",b):F[b]=a}}function I(a,d){if(!a||!F.hasOwnProperty(a))a=/^\s*</.test(d)?"default-markup":"default-code";return F[a]}function K(a){var d=a.h;try{var g=T(a.c,a.i),b=g.a;
a.a=b;a.d=g.d;a.e=0;I(d,b)(a);var s=/\bMSIE\s(\d+)/.exec(navigator.userAgent),s=s&&+s[1]<=8,d=/\n/g,x=a.a,m=x.length,g=0,j=a.d,k=j.length,b=0,c=a.g,i=c.length,r=0;c[i]=m;var n,e;for(e=n=0;e<i;)c[e]!==c[e+2]?(c[n++]=c[e++],c[n++]=c[e++]):e+=2;i=n;for(e=n=0;e<i;){for(var p=c[e],w=c[e+1],t=e+2;t+2<=i&&c[t+1]===w;)t+=2;c[n++]=p;c[n++]=w;e=t}c.length=n;var f=a.c,h;if(f)h=f.style.display,f.style.display="none";try{for(;b<k;){var l=j[b+2]||m,B=c[r+2]||m,t=Math.min(l,B),A=j[b+1],G;if(A.nodeType!==1&&(G=x.substring(g,
t))){s&&(G=G.replace(d,"\r"));A.nodeValue=G;var L=A.ownerDocument,o=L.createElement("span");o.className=c[r+1];var v=A.parentNode;v.replaceChild(o,A);o.appendChild(A);g<l&&(j[b+1]=A=L.createTextNode(x.substring(t,l)),v.insertBefore(A,o.nextSibling))}g=t;g>=l&&(b+=2);g>=B&&(r+=2)}}finally{if(f)f.style.display=h}}catch(u){D.console&&console.log(u&&u.stack||u)}}var D=window,y=["break,continue,do,else,for,if,return,while"],E=[[y,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],M=[E,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],N=[E,"abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
O=[N,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],E=[E,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],P=[y,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
Q=[y,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],W=[y,"as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],y=[y,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],R=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
V=/\S/,X=v({keywords:[M,O,E,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",P,Q,y],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),F={};p(X,["default-code"]);p(C([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",
/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]);p(C([["pln",/^\s+/,q," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,q,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],
["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);p(C([],[["atv",/^[\S\s]+/]]),["uq.val"]);p(v({keywords:M,hashComments:!0,cStyleComments:!0,types:R}),["c","cc","cpp","cxx","cyc","m"]);p(v({keywords:"null,true,false"}),["json"]);p(v({keywords:O,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:R}),
["cs"]);p(v({keywords:N,cStyleComments:!0}),["java"]);p(v({keywords:y,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]);p(v({keywords:P,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]);p(v({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]);p(v({keywords:Q,
hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]);p(v({keywords:E,cStyleComments:!0,regexLiterals:!0}),["javascript","js"]);p(v({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);p(v({keywords:W,cStyleComments:!0,multilineStrings:!0}),["rc","rs","rust"]);
p(C([],[["str",/^[\S\s]+/]]),["regex"]);var Y=D.PR={createSimpleLexer:C,registerLangHandler:p,sourceDecorator:v,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ",prettyPrintOne:D.prettyPrintOne=function(a,d,g){var b=document.createElement("div");b.innerHTML="<pre>"+a+"</pre>";b=b.firstChild;g&&J(b,g,!0);K({h:d,j:g,c:b,i:1});
return b.innerHTML},prettyPrint:D.prettyPrint=function(a,d){function g(){for(var b=D.PR_SHOULD_USE_CONTINUATION?c.now()+250:Infinity;i<p.length&&c.now()<b;i++){for(var d=p[i],j=h,k=d;k=k.previousSibling;){var m=k.nodeType,o=(m===7||m===8)&&k.nodeValue;if(o?!/^\??prettify\b/.test(o):m!==3||/\S/.test(k.nodeValue))break;if(o){j={};o.replace(/\b(\w+)=([\w%+\-.:]+)/g,function(a,b,c){j[b]=c});break}}k=d.className;if((j!==h||e.test(k))&&!v.test(k)){m=!1;for(o=d.parentNode;o;o=o.parentNode)if(f.test(o.tagName)&&
o.className&&e.test(o.className)){m=!0;break}if(!m){d.className+=" prettyprinted";m=j.lang;if(!m){var m=k.match(n),y;if(!m&&(y=U(d))&&t.test(y.tagName))m=y.className.match(n);m&&(m=m[1])}if(w.test(d.tagName))o=1;else var o=d.currentStyle,u=s.defaultView,o=(o=o?o.whiteSpace:u&&u.getComputedStyle?u.getComputedStyle(d,q).getPropertyValue("white-space"):0)&&"pre"===o.substring(0,3);u=j.linenums;if(!(u=u==="true"||+u))u=(u=k.match(/\blinenums\b(?::(\d+))?/))?u[1]&&u[1].length?+u[1]:!0:!1;u&&J(d,u,o);r=
{h:m,c:d,j:u,i:o};K(r)}}}i<p.length?setTimeout(g,250):"function"===typeof a&&a()}for(var b=d||document.body,s=b.ownerDocument||document,b=[b.getElementsByTagName("pre"),b.getElementsByTagName("code"),b.getElementsByTagName("xmp")],p=[],m=0;m<b.length;++m)for(var j=0,k=b[m].length;j<k;++j)p.push(b[m][j]);var b=q,c=Date;c.now||(c={now:function(){return+new Date}});var i=0,r,n=/\blang(?:uage)?-([\w.]+)(?!\S)/,e=/\bprettyprint\b/,v=/\bprettyprinted\b/,w=/pre|xmp/i,t=/^code$/i,f=/^(?:pre|code|xmp)$/i,
h={};g()}};typeof define==="function"&&define.amd&&define("google-code-prettify",[],function(){return Y})})();}()


var lib = {
	components: {}
};

(function(document, window, $) {
	'use strict';
	// note that the $ symbol is referencing the ish.js library and not jQuery.

	/* -------------------------------------------------------- *\
	 * ISH.UI 
	 */
	$.ui = {};
	$.ui.util = {};
	/**
	 * Creates a paneSwitch instance
	 * @name  ish.ui.util.paneSwitch
	 * @constructor
	 * @param {Object} options
	 * @param {Node} options.node A Node which you wish to use for the constructor.
	 * @param {String} options.selector The items attribute selector.
	 * @param {Object} options.selectors An Object containing strings representing valid css attribute selectors for use in the module.
	 * @param {String} options.selectors.pane Individual panes have this attribute.
	 * @param {Integer} options.startPane The index of the pane shown on instantiation. Panes are indexed in sequential order. 
	 * @param {Boolean} options.oneAtATime Can more than one pane be shown at once. Handy for things like accordions. 
	 * @param {Function} options.validation [description]
	 * @param {Function} options.animation A callback function where you can describe animation tasks. 
	 * @param {String} options.eventPrefix The prefix or namespace events will be called under. 
	 * @param {String} options.inactiveAttr The inactive attributes state parameter.
	 * @param {String} options.activeAttr The active attributes state parameter. 
	 * @return {ish.ui.util.paneSwitch} The paneSwitch instances public API.
	 * @example
	 * ish.ui.util.paneSwitch(Node, '[selector]', options);
	 * // or
	 * ish('[selector]').module(ish.ui.util.paneSwitch, options);
	 */
	$.ui.util.paneSwitch = function(options) {
	    var _settings = $.extend({
	        selectors: {
	            pane: '[data-ui-pane]'
	        },
	        inactiveAttr: '',
	        activeAttr: 'active',
	        startPane: 0,
	        oneAtATime: true,
	        validation: null,
	        eventPrefix: 'ish.util.paneswitch',
	        animation: null
	    }, options || {});
	    var $this = $(_settings.node, null, _settings.selector);
	
	    var _attrPrefix = _settings.selectors.pane.replace(/[\[\]]+/g, '');
	    var _activeAttr = _settings.activeAttr;
	    var _inactiveAttr = _settings.inactiveAttr;
	    var _eventPrefix = _settings.eventPrefix;
	    var _animation = _settings.animation;
	
	    var _$panes = $(_settings.selectors.pane, $this);
	    var _currentIndex = _settings.startPane;
	    var _totalPanes = _$panes.length - 1;
	    var _oneAtATime = _settings.oneAtATime;
	
	    var _disabled = [];
	
	    // PUBLIC API
	    /**
	     * Disables all or specific panes from being switched too.
	     * @memberOf ish.ui.util.paneSwitch
	     * @param {Number|Node|null} item Disable individual items by passing a number representing the index of the item or a node reference of the item to remove. Leaving this parameter out or passing in null will disable all items under the modules control.
	     * @return {ish.ui.util.paneSwitch} Chainable, returns the module instance.
	     */
	    this.disable = function(item) {
	        var index = 0;
	        if (item === 'number') {
	            index = item;
	        } else if (item) {
	            index = _$panes.indexOf(item);
	        } else {
	            // disable all
	            _disabled = [];
	            for (var i = 0; i <= _totalPanes; i++) {
	                // push all but the last item, we'll set the last number as the index var and add it to the array that way.
	                _disabled.push(i);
	            }
	        }
	        if (index !== -1) _disabled.push(index);
	        return this;
	    };
	
	    /**
	     * Removes all handlers and returns null. We cannot destroy the module internally, but you can use the return value to null out your references if you wish. 
	     * @memberOf ish.ui.util.paneSwitch
	     * @return {null} Returns null;
	     */
	    this.destroy = function() {
	        return null;
	    };
	
	    /**
	     * Enables all or specific panes from being switched too.
	     * @memberOf ish.ui.util.paneSwitch
	     * @param {Number|Node|null} item Enable individual items by passing a number representing the index of the item or a node reference of the item to remove. Leaving this parameter out or passing in null will disable all items under the modules control. 
	     * @return {ish.ui.util.paneSwitch} Chainable, returns the module instance.
	     */
	    this.enable = function(item) {
	        var index = 0;
	        if (item === 'number') {
	            index = _disabled.indexOf(item);
	        } else if (item) {
	            index = _$panes.indexOf(item);
	            index = _disabled.indexOf(index);
	        } else {
	            // enable all
	            _disabled = [];
	        }
	        if (index !== -1) _disabled.splice(index, 1);
	        return this;
	    };
	
	    /**
	     * Switches to the pane specified in the methods arguments, you can also pass in custom attribute parameters and an integer to increment the switch by.
	     * @memberOf ish.ui.util.paneSwitch
	     * @fires ish.util.paneswitch.onSwitched
	     * @param {Node|Number|String} $pane The pane to switch to active. When a Node is specified it will be the target. A Number representing the postion of the pane in the list of panes. You can also use a String containing the attribute value of the pane, 'prev' and 'next' strings are special keywords which decrement and increment the active pane.
	     * @param {Array} attrNameArray array[0] active attribute value, array[1] inactive attribute value.
	     * @param {Integer} increment An integer to increment the pane being switched to.
	     * @return {ish.ui.util.paneSwitch} Chainable, returns the module instance.   
	     */
	    this.switchPane = function(pane, attrNameArray, increment) {
	
	        _currentIndex = getActiveIndex();
	
	        if (typeof pane === 'undefined') return this;
	        increment = increment || 1;
	        attrNameArray = typeof attrNameArray !== 'undefined' ? attrNameArray : [_activeAttr, _inactiveAttr];
	        var tempIndex;
	        //make pane selection based on $pane input
	        if (pane === 'next') {
	            tempIndex = _currentIndex + increment;
	            if (tempIndex > _totalPanes) {
	                tempIndex = 0;
	            }
	            pane = _$panes[tempIndex];
	        } else if (pane === 'prev') {
	            tempIndex = _currentIndex - increment;
	            if (tempIndex < 0) {
	                tempIndex = _totalPanes;
	            }
	            pane = _$panes[tempIndex];
	        } else if (typeof pane === 'number') {
	
	            tempIndex = pane * increment;
	            pane = _$panes[tempIndex];
	        } else {
	            tempIndex = _$panes.indexOf(pane);
	        }
	        // check the tempIndex is within range _$panes.length and that it's not disabled
	        if (tempIndex >= _$panes.length || tempIndex === -1 && _disabled.indexOf(tempIndex) !== -1) {
	            return this;
	        }
	        var complete = function() {
	            if (_oneAtATime) {
	                // set active pane state to inactive
	                _$panes.nth(_currentIndex).attr(_attrPrefix + '-state', attrNameArray[1]);
	            }
	            //set the new pane state active
	            $(pane).attr(_attrPrefix + '-state', attrNameArray[0]);
	
	            // cache the old _currentIndex for use in the below event and update the currentIndex value
	            var forId = _currentIndex;
	            _currentIndex = tempIndex;
	            /**
	             * @memberOf ish.ui.util.paneSwitch
	             * @event onSwitched
	             * @property {Number} left - The x coordinate the element has been moved to.
	             * @property {Number} top - The y coordinate the element has been moved to.
	             */
	            $this.trigger(_eventPrefix + ".onSwitched", {
	                from: {
	                    pane: _$panes[_currentIndex],
	                    index: forId
	                },
	                to: {
	                    pane: _$panes,
	                    index: tempIndex
	                }
	            });
	
	        };
	
	        // call the animation callback
	        if (_animation) {
	            _animation($this, _$panes[_currentIndex], pane, complete);
	        } else {
	            complete();
	        }
	
	        return tempIndex;
	    };
	
	    /**
	     * Updates the panes controlled by the module. This method should be called whenever you've added or removed panes.
	     * @memberOf ish.ui.util.paneSwitch
	     * @return {ish.ui.util.paneSwitch} Chainable, returns the module instance.     
	     */
	    this.updateItems = function() {
	        _$panes = $(_settings.selectors.pane, $this);
	        _totalPanes = _$panes.length - 1;
	        _currentIndex = getActiveIndex();
	        // chainable
	        return this;
	    };
	
	    // Private API
	    var getActiveIndex = function() {
	        var $active = $('[' + _attrPrefix + '-state="' + _activeAttr + '"]', $this)[0];
	        return _$panes.indexOf($active);
	    }.bind(this);
	
	    // return publics
	    return this;
	};
	
	/**
	 * Creates an Accordion instance.
	 * @name  ish.ui.accordion
	 * @constructor
	 * @param {Object} options
	 * @param {Node} options.node A Node which you wish to use for the constructor.
	 * @param {String} options.selector The items attribute selector.
	 * @param {string} options.selectors An Object containing strings representing valid css attribute selectors for use in the module.
	 * @param {string} options.selectors.itemWrapper A valid CSS attribute selector for each accordion items wrapper element.
	 * @param {string} options.selectors.itemTitle A valid CSS attribute selector for each accordion items title element.
	 * @param {Function} options.animation A callback function where you can describe animation tasks. 
	 * @param {String} options.eventPrefix The prefix or namespace events will be called under. 
	 * @param {String} options.inactiveAttr The inactive attributes state parameter.
	 * @param {String} options.activeAttr The active attributes state parameter. 
	 * @return {ish.ui.accordion} The Accordion instances public API.
	 * @example
	 * ish.ui.accordion(Node, '[selector]', options);
	 * // or
	 * ish('[selector]').module(ish.ui.accordion, {
	 *        selectors: {
	 *           itemWrapper: '[data-ui-pane]',
	 *            itemTitle: '[data-ui-btn-collapse]'
	 *        },
	 *        eventPrefix: 'ish.accordion',
	 *        animation: null,
	 *        inactiveAttr: 'closed',
	 *        activeAttr: 'open'
	 *    });
	 */
	$.ui.accordion = function(options) {
	
	    var _settings = $.extend({
	        selectors: {
	            pane: '[data-ui-item]',
	            itemTitle: '[data-ui-btn-collapse]'
	        },
	        eventPrefix: 'ish.accordion',
	        animation: null,
	        inactiveAttr: 'closed',
	        activeAttr: 'open'
	    }, options || {});
	    var $this = $(_settings.node, null, _settings.selector);
	    var _attrPrefix = _settings.selectors.pane.replace(/[\[\]]+/g, '');
	    var _eventPrefix = _settings.eventPrefix;
	    var _animation = _settings.animation;
	    var _activeAttr = _settings.activeAttr;
	    var _inactiveAttr = _settings.inactiveAttr;
	
	
	    var _$wrappers = []; // = $(_settings.selectors.pane, $this[0])
	    var _$toggleAll = $(_settings.selectors.toggleAll, $this);
	    var _hasToggle = _$toggleAll.length !== 0 ? true : false;
	    var _itemAttr = _settings.selectors.itemTitle;
	
	    var _psUtil = $.ui.util.paneSwitch.call({}, $.extend(_settings, {
	        oneAtATime: false,
	    }));
	
	
	    // PUBLIC API
	    /**
	     * Adds all or specfic Accordion items from the modules control.
	     * @memberOf ish.ui.accordion
	     * @param {ishList|null} $items An ish list containing the nodes to add or null. When no parameters are passed all applicable child Nodes under the modules element selector will be added.
	     * @return {ish.ui.accordion}     Chainable, returns the module instance.    
	     */
	    this.addItems = function($items) {
	        addItems($items);
	        return this;
	    };
	
	    /**
	     * Closes the accordion.
	     * @memberOf ish.ui.accordion 
	     * @param  {ishList} $targets An ish object containing the items you wish to open or close
	     * @return {ish.ui.accordion}     Chainable, returns the module instance.
	     */
	    this.close = function($targets) {
	        openClose($targets, _inactiveAttr);
	        return this;
	    };
	
	    /**
	     * Disables all or specific Accordion items.
	     * @memberOf ish.ui.accordion
	     * @param {Number|Node|null} item Disable individual items by passing a number representing the index of the item or a node reference of the item to remove. Leaving this parameter out or passing in null will disable all items under the modules control.
	     * @return {ish.ui.accordion} Chainable, returns the module instance.
	     */
	    this.disable = function(item) {
	        if (!isNAN(item)) {
	            _$wrappers.nth(item).undelegate('click', toggleAccordion);
	        } else if (item) {
	            item.undelegate('click', toggleAccordion);
	        } else {
	            removeAllHandlers();
	        }
	        _psUtil.disable(item);
	        return this;
	    };
	
	    /**
	     * Removes all handlers and returns null. We cannot destroy the module internally, but you can use the return value to null out your references if you wish. 
	     * @memberOf ish.ui.accordion
	     * @return {null} Returns null;
	     */
	    this.destroy = function() {
	        _psUtil = _psUtil.destroy();
	        removeAllHandlers();
	        _$wrappers = [];
	        return null;
	    };
	
	    /**
	     * Enables all or specific Accordion items.
	     * @memberOf ish.ui.accordion
	     * @return {ish.ui.accordion} Chainable, returns the module instance.
	     */
	    this.enable = function(item) {
	        addItems();
	        _psUtil.enable(item);
	        return this;
	    };
	
	    /**
	     * Opens the accordion.
	     * @memberOf ish.ui.accordion 
	     * @param  {ishList} $targets An ish object containing the items you wish to open or close
	     * @return {ish.ui.accordion}     Chainable, returns the module instance.
	     */
	    this.open = function($targets) {
	        openClose($targets, _activeAttr);
	        return this;
	    };
	
	    /**
	     * Removes  all or specfic Accordion items from the modules control.
	     * @memberOf ish.ui.accordion
	     * @param {ishList|null} $items An ish list containing the nodes to add or null. When no parameters are passed all applicable child Nodes under the modules element selector will be added.
	     * @return {ish.ui.accordion}     Chainable, returns the module instance.   
	     */
	    this.removeItems = function($items) {
	
	        $items = $items || $(_settings.selectors.pane, $this);
	        $items.forEach(function($el) {
	            if (_$wrappers.indexOf($el, i) !== -1) {
	                $el.undelegate('click', toggleAccordion);
	                _$wrappers.splice(i, 1);
	            }
	        });
	        _psUtil.updateItems();
	        return this;
	    };
	
	
	    // PRIVATE API
	    var openClose = function($targets, state) {
	        $targets.forEach(function($target) {
	            _psUtil.switchPane($target[0], [state]);
	        });
	        return this;
	    };
	
	    var addItems = function($items) {
	        $items = $items || $(_settings.selectors.pane, $this);
	        // console.log($items);
	        $items.forEach(function($el) {
	            if (_$wrappers.indexOf($el) === -1) {
	                $el.delegate(_itemAttr, 'click', toggleAccordion);
	                _$wrappers.push($el);
	            }
	        });
	        // add paneSwitch functionality to the item
	        _psUtil.updateItems();
	    };
	
	    var removeAllHandlers = function() {
	        _$wrappers.forEach(function($el) {
	            $el.undelegate('click', toggleAccordion);
	        });
	
	    };
	
	    var toggleAccordion = function(evt) {
	        evt.preventDefault();
	        evt.stopPropagation();
	        var $target = $(evt.currentTarget);
	        var attr = $target.attr(_attrPrefix + '-state');
	
	        if (attr === null || attr === _activeAttr) {
	            openClose($target, _inactiveAttr);
	        } else {
	            openClose($target, _activeAttr);
	        }
	    };
	
	    var init = function() {
	        addItems();
	    }();
	
	    // return publics
	    return this;
	};
	
	/* -------------------------------------------------------- *\
	 * CUSTOM DEPS
	 */ 
	lib.components.scrollpop = function(options) {
	
		var _settings = $.extend({
			selectors: {
				bar: '[data-scrollpop-bar]',
				content: '[data-scrollpop-content]'
			},
			eventPrefix: 'df.scrollpop',
			animation: null,
			activeAttr: 'data-has-scroll'
		}, options || {});
	
		var $this = $(_settings.node, null, _settings.selector);
		var $bar = $(_settings.selectors.bar, $this);
	
		var _attrProp = $this.attr(_settings.selector.replace(/[\[\]]+/g, ''));
		var _eventPrefix = _settings.eventPrefix + '.' + _attrProp ;
		var _isScrollBarShowing;
	
		var _responsiveBreak;
		var _breakName = 'scrollpop.' + _attrProp;
	
		// heights and widths
		var _contentHeight = $(_settings.selectors.content, $this).height();
		var _barHeight = $bar.height();
		var _screenHeight = screen.height;
		var _barContainerWidth;
		var _barContainerWidthWithScrollbar;
	
		this.destroy = function() {
			$bar.on('mouseenter mouseleave', slideToggleHandler);
			return null;
		};
	
		var slideScrollBarAnimateWidth = function($el, from, to) {
			// check if scroll bars are showing
			if (_isScrollBarShowing) {
				lib.effects.scrollbarPopout({
					$element: $el,
					to: to
				});
			}
		};
	
		var slideToggleHandler = function(evt) {
			if (evt.type === 'mouseenter') {
				//slideScrollBarAnimateWidth($bar, _barContainerWidthWithScrollbar, _barContainerWidth);
				$bar.css('width', _barContainerWidth + 'px');
				$bar.off('mouseenter', slideToggleHandler);
				$bar.on('mouseleave', slideToggleHandler);
			} else {
				//slideScrollBarAnimateWidth($bar, _barContainerWidth, _barContainerWidthWithScrollbar);
				$bar.css('width', _barContainerWidthWithScrollbar + 'px');
				$bar.on('mouseenter', slideToggleHandler);
				$bar.off('mouseleave', slideToggleHandler);
			}
		};
	
		var _widthBreakOK = false;
		var _heightBreakOK = false;
	
		var toggleOnOff = function(evt) {
			var name = evt.data.name;
	
			if(name === _breakName + '.width.true') {
				_widthBreakOK = true;
			} else if (name === _breakName + '.width.false') {
				_widthBreakOK = false;
			}
	
			if(name === _breakName + '.height.true') {
				_heightBreakOK = true;
			} else if (name === _breakName + '.height.false') {
				_heightBreakOK = false;
			}
	
	
			setWidths();
			console.log('toggleOnOff '+evt.data.name );
			if (_heightBreakOK && _widthBreakOK && !_isScrollBarShowing) {
				_isScrollBarShowing = true;
				$bar.css('width', _barContainerWidthWithScrollbar + 'px');
				$this.attr(_settings.activeAttr, '');
				$bar.on('mouseenter', slideToggleHandler);
			} else if (_isScrollBarShowing) {
				_isScrollBarShowing = false;
				$this[0].removeAttribute(_settings.activeAttr);
				//$bar.css('width', _barContainerWidth + 'px');
				$bar.css('width', 'auto');
				$bar.off('mouseenter', slideToggleHandler);
			}
			console.log(_eventPrefix + '.state');
			$this.trigger(_eventPrefix + '.state', { 
				active: _isScrollBarShowing
			});
		};
	
		// Scrollbar Width Util
		var getScrollbarWidth = function() {
			var outer = document.createElement("div");
			outer.style.visibility = "hidden";
			outer.style.width = "100px";
			outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
			document.body.appendChild(outer);
			// get width without scrollbars
			var widthNoScroll = outer.offsetWidth;
			// force scrollbars & get width with scrollbars
			outer.style.overflow = "scroll";
			// add innerdiv
			var inner = document.createElement("div");
			inner.style.width = "100%";
			outer.appendChild(inner);
			var widthWithScroll = inner.offsetWidth;
			// remove divs
			outer.parentNode.removeChild(outer);
			return widthNoScroll - widthWithScroll;
		}
	
		var setWidths = function(){
			_barContainerWidth = $bar.width();
			_barContainerWidthWithScrollbar = _barContainerWidth + getScrollbarWidth();
		};
	
		var init = function() {
			setWidths();
	
			// Add responsive functionality
			// set to fire when the scrollbar starts to show.
			// 
			$(window).on( _eventPrefix + '.onBreakpoint', toggleOnOff);
	
			_responsiveBreak = $.responsive({
				breakpoints: [{
					name: _breakName + '.height.true',
					height: 1
				}, {
					name: _breakName + '.height.false',
					height: _contentHeight
				}],
				eventPrefix: _settings.eventPrefix + '.' + _attrProp
			});
	
			var _widthBreakpoints = $.responsive({
				breakpoints: [{
					name: _breakName + '.width.false',
					width: 1
				},{
					name: _breakName + '.width.true',
					width: 780
				}],
				eventPrefix: _settings.eventPrefix + '.' + _attrProp
			});
	
		}.call(this);
	
		return this;
	};

})(document, this, ish);


// NAMESPACE: Site module
var _app = {}; // This line can be removed or placed within the closure if you don't wish your App API to be globally accessible.

(function(document, window, $, appObj) {
	'use strict';
	var _appObj = appObj || {};

	prettyPrint();

	// Set attribute if JavaScript is on
	$('html').attr('data-js', 'true');

	// Get the page title
	var pagename = window.location.href.substr(window.location.href.lastIndexOf("/") + 1)
		.replace('.html', '')
		.split('#')[0];
	// Set the appropriate menu item to active
	$('body').attr('data-pagename', pagename);
	$('[data-name="' + pagename + '"]').addClass('c-menu__item--active');


	// Invoke the Scrollpop component.
	var _isHeaderScrollActive;
	$('[data-scrollpop]').on('df.scrollpop.header.state', function(evt){
		_isHeaderScrollActive = evt.data.active;
			$('[data-ui-main-nav]').attr('data-ui-main-nav--state','');
		console.log(_isHeaderScrollActive);
		if(_isHeaderScrollActive) {
			//console.log(_isHeaderScrollActive);
			//$('[data-ui-main-nav]').attr('data-ui-main-nav--state','');

		}
	});
	appObj.scrollpop = $('[data-scrollpop]').invoke(lib.components.scrollpop);
	
	// Invoke the Accordion component.
	//appObj.accordion = $('[data-ui-accordion]').invoke($.ui.accordion);
	//
	var $mainNav = $('[data-ui-main-nav]');
	//var $navToggleBtn = $('[data-ui-main-nav--toggle]');
	$('[data-ui-main-nav--toggle]').on('click',function(evt){
		var state = $mainNav.attr('data-ui-main-nav--state');	
		//$('[data-scrollpop-bar]').css('width','auto');
		if(state === 'active'){
			$mainNav.attr('data-ui-main-nav--state','');
			$('body').css({'height' : 'auto', 'overflow':'auto'});
			$(this).attr('data-open','false');
		} else{
			$mainNav.attr('data-ui-main-nav--state','active');
			$('body').css({'height' : '100vh', 'overflow':'hidden'});
			$(this).attr('data-open','true');
		}
	});

})(document, this, ish, _app);