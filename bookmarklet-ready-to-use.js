javascript:void%20function(){(function(e,t,i,n,o,s,d,r){(!(o=e.jQuery)||i%3Eo.fn.jquery||n(o))%26%26(s=t.createElement(%22script%22),s.type=%22text/javascript%22,s.src=window.location.protocol+%22//ajax.googleapis.com/ajax/libs/jquery/%22+i+%22/jquery.min.js%22,s.onload=s.onreadystatechange=function(){d||(r=this.readyState)%26%26%22loaded%22!==r%26%26%22complete%22!==r||(n((o=e.jQuery).noConflict(1),d=1),o(s).remove())},t.documentElement.childNodes[0].appendChild(s))})(window,document,%223.3.1%22,function(e,t){function%20n(t,i,n){var%20o=%22%22,s=%22unknown%22,d=%22unknown%22,r=new%20XMLHttpRequest,a=%22GET%22,c=n;r.open(a,c,!0),r.onreadystatechange=function(){if(4===r.readyState%26%26200===r.status){o+=i+%22%20(%22+t+%22):%20%22,y=I.exec(r.responseText),o+=%22RSSI_DEVICE%20=%20%22,y%26%26%22undefined%22!=typeof%20y%26%26y.length%3E1%3F(o+=y[1],s=y[1]):o+=%22unknown%22,v=E.exec(r.responseText),o+=%22%20/%20RSSI_PEER%20=%20%22,v%26%26%22undefined%22!=typeof%20v%26%26v.length%3E1%3F(o+=v[1],d=v[1]):o+=%22unknown%22,o+=%22%20%23%20%22+n;var%20a=%22%23rssioutputRssiDevice%22+t;e(a).html(s);var%20c=%22%23rssioutputRssiPeer%22+t;e(c).html(d)}},r.send()}var%20o=%22%22,s=[],d=/.+sid=(%40[A-Za-z0-9].+%40).*/,r=/devconfig.cgi\%3Fcmd=list_devices/,a=window.location.href,c=window.location.protocol+%22//%22+window.location.host,l=window.location.pathname;if(%22undefined%22!=typeof%20SessionId%3F(console.log(%22Homematic%20SessionID%20=%20%22+SessionId),o=SessionId):(s=d.exec(window.location.search),s%26%26%22undefined%22!=typeof%20s%26%26s.length%3E1%26%26(o=s[1])),frames.length%3Edocument.getElementsByTagName(%22meta%22).length)alert(%22Sorry,%20Frameset%20entdeckt...\nHier%20funktioniert%20dieses%20Bookmarklet%20nicht%20:-(%22);else%20if(%22%22===o)alert(%22Keine%20Ergebnisse.%20Bitte%20sicherstellen,%20dass%20die%20WebUi%20im%20aktuellen%20Browserfenster%20geoeffnet%20ist.%22);else%20if(r.test(a)){var%20u=document.getElementsByTagName(%22a%22),p=%22%22,h=[],g=%22%22,m=[],f=%22%22,y=[],v=[],w=/.+expand=([A-F0-9]{14}).+/,x=/([-A-Za-z0-9]+)%20\([A-F0-9]{14}\)/,I=/name=%22RSSI_DEVICE%22%20value=%22([-0-9]+)%22/,E=/name=%22RSSI_PEER%22%20value=%22([-0-9]+)%22/;if(%22undefined%22!=typeof%20u[0])for(i=0;i%3Cu.length;i++)-1!==u[i].href.search(w)%26%26(p=u[i].href.replace(w,%22$1%22),h.push(p),g=u[i].innerHTML.replace(x,%22$1%22),m.push(g));e(%22%3Cdiv%20id='rssioutput'%3E%3C/div%3E%3Chr/%3E%22).prependTo(%22body%22),e(%22%23rssioutput%22).append(%22%3Ch2%3ECollecting%20RSSI%20values%20of%20%22+h.length+%22%20HmIP%20Devices...%3C/h2%3E%22),e(%22%23rssioutput%22).append(%22%3Cstyle%20type='text/css'%3E.img_show%20{\n%20%20%20%20width:%20100px;\n%20%20%20%20height:%20100px;\n%20%20%20%20border:%201px%20solid%20black;\n%20%20%20%20display:%20none;\n%20%20%20%20position:%20absolute;\n}%3C/style%3E%22),e.getScript(%22/webui/js/extern/wz_jsgraphics.js%22,function(t,i,n){e.getScript(%22/tools/js/jsDevDescr.cgi%22,function(t,i,n){for(k=0;k%3Ch.length;k++){var%20o=%22%23rssioutputPic%22+h[k],s=%22rssioutputImgSmall%22+h[k],d=%22%20onMouseOver=\%22zoomPicture('%22+s+%22',%201)\%22%20onMouseOut=\%22zoomPicture('%22+s+%22',%200)\%22%22,r=%22%3Cimg%20id='%22+s+%22'%20src='%22+DEV_getImagePath(m[k],%22250%22)+%22'%20width='50'%20height='50'%20style='position:%20relative;z-index:%200;'%3E%22;e(o).html(%22%3Cdiv%20style='position:relative;top:0;left:0;height:50px;width:50px'%22+d+%22%3E%22+r+%22%3C/div%3E%22)}})});var%20S=%22%3Cimg%20src='https://cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'%20width='15'%20height='15'%3E%22,b=%22%3Ctable%20border='1'%20cellspacing='0'%20cellpadding='5'%20%3E%3Cthead%3E%3Ctr%3E%3Cth%3EDevice%20Name%3C/th%3E%3Cth%3EPic%3C/th%3E%3Cth%3ERSSI_DEVICE%3C/th%3E%3Cth%3ERSSI_PEER%3C/th%3E%3C/tr%3E%3C/thead%3E%3Ctbody%3E%22;for(j=0;j%3Ch.length;j++)f=c+l+%22%3Fcmd=config%26device=%22+h[j]+%22:0%26iface=HmIP-RF%26sid=%22+o,n(h[j],m[j],f),b+=%22%3Ctr%3E%3Ctd%20id='rssioutputName%22+h[j]+%22'%3E%22+m[j]+%22%20(%22+h[j]+%22)%3C/td%3E%3Ctd%20id='rssioutputPic%22+h[j]+%22'%20align='center'%3E%22+S+%22%3C/td%3E%3Ctd%20id='rssioutputRssiDevice%22+h[j]+%22'%20align='center'%3E%22+S+%22%3C/td%3E%3Ctd%20id='rssioutputRssiPeer%22+h[j]+%22'%20align='center'%3E%22+S+%22%3C/td%3E%3C/tr%3E%22;b+=%22%3C/tbody%3E%3C/table%3E%22,b+='%3Cscript%20type=%22text/javascript%22%3E%20%20%20%20function%20zoomPicture(id,%20zoom)%20{%20%20%20%20%20%20%20%20if%20(zoom%20==%20%221%22){%20%20%20%20%20%20%20%20%20%20%20%20document.getElementById(id).style.height%20=%20%22150px%22;%20%20%20%20%20%20%20%20%20%20%20%20document.getElementById(id).style.width%20%20=%20%22150px%22;%20%20%20%20%20%20%20%20%20%20%20%20document.getElementById(id).style.zIndex%20%20=%20%2299%22;%20%20%20%20%20%20%20%20}%20else%20if%20(zoom%20==%20%220%22)%20{\n%20%20%20%20%20%20%20%20%20%20%20%20document.getElementById(id).style.height%20=%20%2250px%22;%20%20%20%20%20%20%20%20%20%20%20%20document.getElementById(id).style.width%20%20=%20%2250px%22;%20%20%20%20%20%20%20%20%20%20%20%20document.getElementById(id).style.zIndex%20%20=%20%22auto%22;%20%20%20%20%20%20%20%20}%20%20%20%20}%3C/script%3E',e(%22%23rssioutput%22).append(b)}else{var%20R=c+%22/tools/devconfig.cgi%3Fcmd=list_devices%26sid=%22+o;e(%22%3Cdiv%20style='background-color:%20white;padding:%2020px;'%3E%3Ch2%3EBitte%20sicherstellen,%20dass%20dieses%20Script%20auf%20der%20korrekten%20Unterseite%20ausgefuehrt%20wird!%3Cbr/%3EDirekt-Link%20auf%20devconfig/devices:%20%3Ca%20href='%22+R+%22'%3E%22+R+%22%3C/a%3E%3C/h2%3E%3C/div%3E%3Chr/%3E%22).prependTo(%22body%22)}})}();
