(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-indexModule-pages-payRollCode-payRollCode~pages-indexModule-pages-paymentCode-paymentCode"],{1050:function(r,e,t){t("99af"),t("e25e");var o=126,f=102,i=103,n=104,a=105,c=98,s=101,h=100,u=106,l={CHAR_TILDE:f},d={ANY:1,AB:2,A:3,B:4,C:5};function p(r){for(var e=[],t=0;t<r.length;t++)e.push(r.charCodeAt(t));return e}function v(r){var e={currcs:d.C},t=p(r),f=t[0]==o?1:0,v=t.length>0?b(t[f++]):d.AB,A=t.length>0?b(t[f++]):d.AB;e.currcs=_(v,A),e.currcs=m(t,e.currcs);var C=new Array;switch(e.currcs){case d.A:C.push(i);break;case d.B:C.push(n);break;default:C.push(a);break}for(var B=0;B<t.length;B++){var k=t[B];k in l&&(C.push(l[k]),B++,k=t[B]);var R=t.length>B+1?t[B+1]:-1;C=C.concat(z(k,R,e.currcs)),e.currcs==d.C&&B++}for(var x=C[0],y=1;y<C.length;y++)x+=y*C[y];return C.push(x%103),C.push(u),C;function _(r,e){var t=0;return t+=r==d.A?1:0,t+=r==d.B?-1:0,t+=e==d.A?1:0,t+=e==d.B?-1:0,t>0?d.A:d.B}function m(r,e){for(var t=0;t<r.length;t++){var f=r[t];if((f<48||f>57)&&f!=o)return e}return d.C}function z(r,t,o){var f=[],i=-1;if(g(r,o))o==d.C&&(-1==t?(i=h,o=d.B):-1==t||g(t,o)||(g(t,d.A)?(i=s,o=d.A):(i=h,o=d.B)));else if(-1==t||g(t,o))i=c;else switch(o){case d.A:i=h,o=d.B;break;case d.B:i=s,o=d.A;break}return-1!=i?(f.push(i),f.push(w(t))):o==d.C?f.push(w(r,t)):f.push(w(r)),e.currcs=o,f}}function w(r,e){return"undefined"==typeof e?r>=32?r-32:r+64:parseInt(String.fromCharCode(r)+String.fromCharCode(e))}function g(r,e){var t=b(r);return t==d.ANY||(t==d.AB||(t==d.A&&e==d.A||t==d.B&&e==d.B))}function b(r){return r>=48&&r<=57?d.ANY:r>=32&&r<=95?d.AB:r<32?d.A:d.B}e.code128=function(r,e,t,o){t=parseInt(t),o=parseInt(o);for(var f=v(e),i=new A(r,t,o),n=i.area.width/(11*(f.length-3)+35),a=i.area.left,c=i.area.top,s=0;s<f.length;s++)for(var h=f[s],u=0;u<8;u+=2){var l=C[h][u]*n,d=o-c,p=C[h][u+1]*n;l>0&&i.fillFgRect(a,c,l,d),a+=l+p}r.draw()};var A=function(r,e,t){this.width=e,this.height=t,this.quiet=Math.round(this.width/40),this.border_size=0,this.padding_width=0,this.area={width:e-2*this.padding_width-2*this.quiet,height:t-2*this.border_size,top:this.border_size-4,left:this.padding_width+this.quiet},this.ctx=r,this.fg="#000000",this.bg="#ffffff",this.fillBgRect(0,0,e,t),this.fillBgRect(0,this.border_size,e,t-2*this.border_size)};A.prototype._fillRect=function(r,e,t,o,f){this.ctx.setFillStyle(f),this.ctx.fillRect(r,e,t,o)},A.prototype.fillFgRect=function(r,e,t,o){this._fillRect(r,e,t,o,this.fg)},A.prototype.fillBgRect=function(r,e,t,o){this._fillRect(r,e,t,o,this.bg)};var C=[[2,1,2,2,2,2,0,0],[2,2,2,1,2,2,0,0],[2,2,2,2,2,1,0,0],[1,2,1,2,2,3,0,0],[1,2,1,3,2,2,0,0],[1,3,1,2,2,2,0,0],[1,2,2,2,1,3,0,0],[1,2,2,3,1,2,0,0],[1,3,2,2,1,2,0,0],[2,2,1,2,1,3,0,0],[2,2,1,3,1,2,0,0],[2,3,1,2,1,2,0,0],[1,1,2,2,3,2,0,0],[1,2,2,1,3,2,0,0],[1,2,2,2,3,1,0,0],[1,1,3,2,2,2,0,0],[1,2,3,1,2,2,0,0],[1,2,3,2,2,1,0,0],[2,2,3,2,1,1,0,0],[2,2,1,1,3,2,0,0],[2,2,1,2,3,1,0,0],[2,1,3,2,1,2,0,0],[2,2,3,1,1,2,0,0],[3,1,2,1,3,1,0,0],[3,1,1,2,2,2,0,0],[3,2,1,1,2,2,0,0],[3,2,1,2,2,1,0,0],[3,1,2,2,1,2,0,0],[3,2,2,1,1,2,0,0],[3,2,2,2,1,1,0,0],[2,1,2,1,2,3,0,0],[2,1,2,3,2,1,0,0],[2,3,2,1,2,1,0,0],[1,1,1,3,2,3,0,0],[1,3,1,1,2,3,0,0],[1,3,1,3,2,1,0,0],[1,1,2,3,1,3,0,0],[1,3,2,1,1,3,0,0],[1,3,2,3,1,1,0,0],[2,1,1,3,1,3,0,0],[2,3,1,1,1,3,0,0],[2,3,1,3,1,1,0,0],[1,1,2,1,3,3,0,0],[1,1,2,3,3,1,0,0],[1,3,2,1,3,1,0,0],[1,1,3,1,2,3,0,0],[1,1,3,3,2,1,0,0],[1,3,3,1,2,1,0,0],[3,1,3,1,2,1,0,0],[2,1,1,3,3,1,0,0],[2,3,1,1,3,1,0,0],[2,1,3,1,1,3,0,0],[2,1,3,3,1,1,0,0],[2,1,3,1,3,1,0,0],[3,1,1,1,2,3,0,0],[3,1,1,3,2,1,0,0],[3,3,1,1,2,1,0,0],[3,1,2,1,1,3,0,0],[3,1,2,3,1,1,0,0],[3,3,2,1,1,1,0,0],[3,1,4,1,1,1,0,0],[2,2,1,4,1,1,0,0],[4,3,1,1,1,1,0,0],[1,1,1,2,2,4,0,0],[1,1,1,4,2,2,0,0],[1,2,1,1,2,4,0,0],[1,2,1,4,2,1,0,0],[1,4,1,1,2,2,0,0],[1,4,1,2,2,1,0,0],[1,1,2,2,1,4,0,0],[1,1,2,4,1,2,0,0],[1,2,2,1,1,4,0,0],[1,2,2,4,1,1,0,0],[1,4,2,1,1,2,0,0],[1,4,2,2,1,1,0,0],[2,4,1,2,1,1,0,0],[2,2,1,1,1,4,0,0],[4,1,3,1,1,1,0,0],[2,4,1,1,1,2,0,0],[1,3,4,1,1,1,0,0],[1,1,1,2,4,2,0,0],[1,2,1,1,4,2,0,0],[1,2,1,2,4,1,0,0],[1,1,4,2,1,2,0,0],[1,2,4,1,1,2,0,0],[1,2,4,2,1,1,0,0],[4,1,1,2,1,2,0,0],[4,2,1,1,1,2,0,0],[4,2,1,2,1,1,0,0],[2,1,2,1,4,1,0,0],[2,1,4,1,2,1,0,0],[4,1,2,1,2,1,0,0],[1,1,1,1,4,3,0,0],[1,1,1,3,4,1,0,0],[1,3,1,1,4,1,0,0],[1,1,4,1,1,3,0,0],[1,1,4,3,1,1,0,0],[4,1,1,1,1,3,0,0],[4,1,1,3,1,1,0,0],[1,1,3,1,4,1,0,0],[1,1,4,1,3,1,0,0],[3,1,1,1,4,1,0,0],[4,1,1,1,3,1,0,0],[2,1,1,4,1,2,0,0],[2,1,1,2,1,4,0,0],[2,1,1,2,3,2,0,0],[2,3,3,1,1,1,2,0]]},b6f8:function(r,e,t){var o=t("1050"),f=t("bca4");function i(r){return Math.round(wx.getSystemInfoSync().windowWidth*r/750)}function n(r,e,t,f){o.code128(wx.createCanvasContext(r),e,i(t),i(f))}function a(r,e,t,o){f.api.draw(e,{ctx:wx.createCanvasContext(r),width:i(t),height:i(o)})}r.exports={barcode:n,qrcode:a}},bca4:function(r,e,t){t("fb6a");(function(){var e,t,o,f,i,n,a=[0,11,15,19,23,27,31,16,18,20,22,24,26,28,20,22,24,24,26,28,28,22,24,24,26,26,28,28,24,24,26,26,26,28,28,24,26,26,26,28,28],c=[3220,1468,2713,1235,3062,1890,2119,1549,2344,2936,1117,2583,1330,2470,1667,2249,2028,3780,481,4011,142,3098,831,3445,592,2517,1776,2234,1951,2827,1070,2660,1345,3177],s=[30660,29427,32170,30877,26159,25368,27713,26998,21522,20773,24188,23371,17913,16590,20375,19104,13663,12392,16177,14854,9396,8579,11994,11245,5769,5054,7399,6608,1890,597,3340,2107],h=[1,0,19,7,1,0,16,10,1,0,13,13,1,0,9,17,1,0,34,10,1,0,28,16,1,0,22,22,1,0,16,28,1,0,55,15,1,0,44,26,2,0,17,18,2,0,13,22,1,0,80,20,2,0,32,18,2,0,24,26,4,0,9,16,1,0,108,26,2,0,43,24,2,2,15,18,2,2,11,22,2,0,68,18,4,0,27,16,4,0,19,24,4,0,15,28,2,0,78,20,4,0,31,18,2,4,14,18,4,1,13,26,2,0,97,24,2,2,38,22,4,2,18,22,4,2,14,26,2,0,116,30,3,2,36,22,4,4,16,20,4,4,12,24,2,2,68,18,4,1,43,26,6,2,19,24,6,2,15,28,4,0,81,20,1,4,50,30,4,4,22,28,3,8,12,24,2,2,92,24,6,2,36,22,4,6,20,26,7,4,14,28,4,0,107,26,8,1,37,22,8,4,20,24,12,4,11,22,3,1,115,30,4,5,40,24,11,5,16,20,11,5,12,24,5,1,87,22,5,5,41,24,5,7,24,30,11,7,12,24,5,1,98,24,7,3,45,28,15,2,19,24,3,13,15,30,1,5,107,28,10,1,46,28,1,15,22,28,2,17,14,28,5,1,120,30,9,4,43,26,17,1,22,28,2,19,14,28,3,4,113,28,3,11,44,26,17,4,21,26,9,16,13,26,3,5,107,28,3,13,41,26,15,5,24,30,15,10,15,28,4,4,116,28,17,0,42,26,17,6,22,28,19,6,16,30,2,7,111,28,17,0,46,28,7,16,24,30,34,0,13,24,4,5,121,30,4,14,47,28,11,14,24,30,16,14,15,30,6,4,117,30,6,14,45,28,11,16,24,30,30,2,16,30,8,4,106,26,8,13,47,28,7,22,24,30,22,13,15,30,10,2,114,28,19,4,46,28,28,6,22,28,33,4,16,30,8,4,122,30,22,3,45,28,8,26,23,30,12,28,15,30,3,10,117,30,3,23,45,28,4,31,24,30,11,31,15,30,7,7,116,30,21,7,45,28,1,37,23,30,19,26,15,30,5,10,115,30,19,10,47,28,15,25,24,30,23,25,15,30,13,3,115,30,2,29,46,28,42,1,24,30,23,28,15,30,17,0,115,30,10,23,46,28,10,35,24,30,19,35,15,30,17,1,115,30,14,21,46,28,29,19,24,30,11,46,15,30,13,6,115,30,14,23,46,28,44,7,24,30,59,1,16,30,12,7,121,30,12,26,47,28,39,14,24,30,22,41,15,30,6,14,121,30,6,34,47,28,46,10,24,30,2,64,15,30,17,4,122,30,29,14,46,28,49,10,24,30,24,46,15,30,4,18,122,30,13,32,46,28,48,14,24,30,42,32,15,30,20,4,117,30,40,7,47,28,43,22,24,30,10,67,15,30,19,6,118,30,18,31,47,28,34,34,24,30,20,61,15,30],u=[255,0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,4,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,5,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,29,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,6,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,54,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,30,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,202,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,7,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,227,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,55,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,242,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,31,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,108,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,203,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,79,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175],l=[1,2,4,8,16,32,64,128,29,58,116,232,205,135,19,38,76,152,45,90,180,117,234,201,143,3,6,12,24,48,96,192,157,39,78,156,37,74,148,53,106,212,181,119,238,193,159,35,70,140,5,10,20,40,80,160,93,186,105,210,185,111,222,161,95,190,97,194,153,47,94,188,101,202,137,15,30,60,120,240,253,231,211,187,107,214,177,127,254,225,223,163,91,182,113,226,217,175,67,134,17,34,68,136,13,26,52,104,208,189,103,206,129,31,62,124,248,237,199,147,59,118,236,197,151,51,102,204,133,23,46,92,184,109,218,169,79,158,33,66,132,21,42,84,168,77,154,41,82,164,85,170,73,146,57,114,228,213,183,115,230,209,191,99,198,145,63,126,252,229,215,179,123,246,241,255,227,219,171,75,150,49,98,196,149,55,110,220,165,87,174,65,130,25,50,100,200,141,7,14,28,56,112,224,221,167,83,166,81,162,89,178,121,242,249,239,195,155,43,86,172,69,138,9,18,36,72,144,61,122,244,245,247,243,251,235,203,139,11,22,44,88,176,125,250,233,207,131,27,54,108,216,173,71,142,0],d=[],p=[],v=[],w=[],g=[],b=2;function A(r,e){var t;r>e&&(t=r,r=e,e=t),t=e,t*=e,t+=e,t>>=1,t+=r,w[t]=1}function C(r,e){var o;for(v[r+t*e]=1,o=-2;o<2;o++)v[r+o+t*(e-2)]=1,v[r-2+t*(e+o+1)]=1,v[r+2+t*(e+o)]=1,v[r+o+1+t*(e+2)]=1;for(o=0;o<2;o++)A(r-1,e+o),A(r+1,e-o),A(r-o,e-1),A(r+o,e+1)}function B(r){while(r>=255)r-=255,r=(r>>8)+(255&r);return r}var k=[];function R(r,e,t,o){var f,i,n;for(f=0;f<o;f++)d[t+f]=0;for(f=0;f<e;f++){if(n=u[d[r+f]^d[t]],255!=n)for(i=1;i<o;i++)d[t+i-1]=d[t+i]^l[B(n+k[o-i])];else for(i=t;i<t+o;i++)d[i]=d[i+1];d[t+o-1]=255==n?0:l[B(n+k[0])]}}function x(r,e){var t;return r>e&&(t=r,r=e,e=t),t=e,t+=e*e,t>>=1,t+=r,w[t]}function y(r){var e,o,f,i;switch(r){case 0:for(o=0;o<t;o++)for(e=0;e<t;e++)e+o&1||x(e,o)||(v[e+o*t]^=1);break;case 1:for(o=0;o<t;o++)for(e=0;e<t;e++)1&o||x(e,o)||(v[e+o*t]^=1);break;case 2:for(o=0;o<t;o++)for(f=0,e=0;e<t;e++,f++)3==f&&(f=0),f||x(e,o)||(v[e+o*t]^=1);break;case 3:for(i=0,o=0;o<t;o++,i++)for(3==i&&(i=0),f=i,e=0;e<t;e++,f++)3==f&&(f=0),f||x(e,o)||(v[e+o*t]^=1);break;case 4:for(o=0;o<t;o++)for(f=0,i=o>>1&1,e=0;e<t;e++,f++)3==f&&(f=0,i=!i),i||x(e,o)||(v[e+o*t]^=1);break;case 5:for(i=0,o=0;o<t;o++,i++)for(3==i&&(i=0),f=0,e=0;e<t;e++,f++)3==f&&(f=0),(e&o&1)+!(!f|!i)||x(e,o)||(v[e+o*t]^=1);break;case 6:for(i=0,o=0;o<t;o++,i++)for(3==i&&(i=0),f=0,e=0;e<t;e++,f++)3==f&&(f=0),(e&o&1)+(f&&f==i)&1||x(e,o)||(v[e+o*t]^=1);break;case 7:for(i=0,o=0;o<t;o++,i++)for(3==i&&(i=0),f=0,e=0;e<t;e++,f++)3==f&&(f=0),(f&&f==i)+(e+o&1)&1||x(e,o)||(v[e+o*t]^=1);break}}var _=3,m=3,z=40,M=10;function S(r){var e,t=0;for(e=0;e<=r;e++)g[e]>=5&&(t+=_+g[e]-5);for(e=3;e<r-1;e+=2)g[e-2]==g[e+2]&&g[e+2]==g[e-1]&&g[e-1]==g[e+1]&&3*g[e-1]==g[e]&&(0==g[e-3]||e+3>r||3*g[e-3]>=4*g[e]||3*g[e+3]>=4*g[e])&&(t+=z);return t}function F(){var r,e,o,f,i,n=0,a=0;for(e=0;e<t-1;e++)for(r=0;r<t-1;r++)(v[r+t*e]&&v[r+1+t*e]&&v[r+t*(e+1)]&&v[r+1+t*(e+1)]||!(v[r+t*e]||v[r+1+t*e]||v[r+t*(e+1)]||v[r+1+t*(e+1)]))&&(n+=m);for(e=0;e<t;e++){for(g[0]=0,o=f=r=0;r<t;r++)(i=v[r+t*e])==f?g[o]++:g[++o]=1,f=i,a+=f?1:-1;n+=S(o)}a<0&&(a=-a);var c=a,s=0;c+=c<<2,c<<=1;while(c>t*t)c-=t*t,s++;for(n+=s*M,r=0;r<t;r++){for(g[0]=0,o=f=e=0;e<t;e++)(i=v[r+t*e])==f?g[o]++:g[++o]=1,f=i;n+=S(o)}return n}function I(r){var g,_,m,z,M,S,I,q;z=r.length,e=0;do{if(e++,m=4*(b-1)+16*(e-1),o=h[m++],f=h[m++],i=h[m++],n=h[m],m=i*(o+f)+f-3+(e<=9),z<=m)break}while(e<40);for(t=17+4*e,M=i+(i+n)*(o+f)+f,z=0;z<M;z++)p[z]=0;for(d=r.slice(0),z=0;z<t*t;z++)v[z]=0;for(z=0;z<(t*(t+1)+1)/2;z++)w[z]=0;for(z=0;z<3;z++){for(m=0,_=0,1==z&&(m=t-7),2==z&&(_=t-7),v[_+3+t*(m+3)]=1,g=0;g<6;g++)v[_+g+t*m]=1,v[_+t*(m+g+1)]=1,v[_+6+t*(m+g)]=1,v[_+g+1+t*(m+6)]=1;for(g=1;g<5;g++)A(_+g,m+1),A(_+1,m+g+1),A(_+5,m+g),A(_+g+1,m+5);for(g=2;g<4;g++)v[_+g+t*(m+2)]=1,v[_+2+t*(m+g+1)]=1,v[_+4+t*(m+g)]=1,v[_+g+1+t*(m+4)]=1}if(e>1)for(z=a[e],_=t-7;;){g=t-7;while(g>z-3){if(C(g,_),g<z)break;g-=z}if(_<=z+9)break;_-=z,C(6,_),C(_,6)}for(v[8+t*(t-8)]=1,_=0;_<7;_++)A(7,_),A(t-8,_),A(7,_+t-7);for(g=0;g<8;g++)A(g,7),A(g+t-8,7),A(g,t-8);for(g=0;g<9;g++)A(g,8);for(g=0;g<8;g++)A(g+t-8,8),A(8,g);for(_=0;_<7;_++)A(8,_+t-7);for(g=0;g<t-14;g++)1&g?(A(8+g,6),A(6,8+g)):(v[8+g+6*t]=1,v[6+t*(8+g)]=1);if(e>6)for(z=c[e-7],m=17,g=0;g<6;g++)for(_=0;_<3;_++,m--)1&(m>11?e>>m-12:z>>m)?(v[5-g+t*(2-_+t-11)]=1,v[2-_+t-11+t*(5-g)]=1):(A(5-g,2-_+t-11),A(2-_+t-11,5-g));for(_=0;_<t;_++)for(g=0;g<=_;g++)v[g+t*_]&&A(g,_);for(M=d.length,S=0;S<M;S++)p[S]=d.charCodeAt(S);if(d=p.slice(0),g=i*(o+f)+f,M>=g-2&&(M=g-2,e>9&&M--),S=M,e>9){d[S+2]=0,d[S+3]=0;while(S--)z=d[S],d[S+3]|=255&z<<4,d[S+2]=z>>4;d[2]|=255&M<<4,d[1]=M>>4,d[0]=64|M>>12}else{d[S+1]=0,d[S+2]=0;while(S--)z=d[S],d[S+2]|=255&z<<4,d[S+1]=z>>4;d[1]|=255&M<<4,d[0]=64|M>>4}S=M+3-(e<10);while(S<g)d[S++]=236,d[S++]=17;for(k[0]=1,S=0;S<n;S++){for(k[S+1]=1,I=S;I>0;I--)k[I]=k[I]?k[I-1]^l[B(u[k[I]]+S)]:k[I-1];k[0]=l[B(u[k[0]]+S)]}for(S=0;S<=n;S++)k[S]=u[k[S]];for(m=g,_=0,S=0;S<o;S++)R(_,i,m,n),_+=i,m+=n;for(S=0;S<f;S++)R(_,i+1,m,n),_+=i+1,m+=n;for(_=0,S=0;S<i;S++){for(I=0;I<o;I++)p[_++]=d[S+I*i];for(I=0;I<f;I++)p[_++]=d[o*i+S+I*(i+1)]}for(I=0;I<f;I++)p[_++]=d[o*i+S+I*(i+1)];for(S=0;S<n;S++)for(I=0;I<o+f;I++)p[_++]=d[g+S+I*n];for(d=p,g=_=t-1,m=M=1,q=(i+n)*(o+f)+f,S=0;S<q;S++)for(z=d[S],I=0;I<8;I++,z<<=1){128&z&&(v[g+t*_]=1);do{M?g--:(g++,m?0!=_?_--:(g-=2,m=!m,6==g&&(g--,_=9)):_!=t-1?_++:(g-=2,m=!m,6==g&&(g--,_-=8))),M=!M}while(x(g,_))}for(d=v.slice(0),z=0,_=3e4,m=0;m<8;m++){if(y(m),g=F(),g<_&&(_=g,z=m),7==z)break;v=d.slice(0)}for(z!=m&&y(z),_=s[z+(b-1<<3)],m=0;m<8;m++,_>>=1)1&_&&(v[t-1-m+8*t]=1,m<6?v[8+t*m]=1:v[8+t*(m+1)]=1);for(m=0;m<7;m++,_>>=1)1&_&&(v[8+t*(t-7+m)]=1,m?v[6-m+8*t]=1:v[7+8*t]=1);return v}var q=null,N=null,Y={get ecclevel(){return b},set ecclevel(r){b=r},get size(){return N},set size(r){N=r},get canvas(){return q},set canvas(r){q=r},getFrame:function(r){return I(r)},draw:function(r,e,o,f){if(b=f||b,e=e||q,e){o=o||N||Math.min(e.width,e.height);var i=I(r),n=e.ctx,a=Math.round(o/(t+8)),c=a*(t+8),s=Math.floor((o-c)/2);o=c,n.clearRect(0,0,e.width,e.height),n.setFillStyle("#000000");for(var h=0;h<t;h++)for(var u=0;u<t;u++)i[u*t+h]&&n.fillRect(a*(4+h)+s,a*(4+u)+s,a,a);n.draw()}else console.warn("No canvas provided to draw QR code in!")}};r.exports={api:Y}})()}}]);