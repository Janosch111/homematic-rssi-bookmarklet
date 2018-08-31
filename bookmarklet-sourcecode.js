/*
    +++ Javascript Bookmarklet für die Web-Adminoberfläche der HomeMatic Zentrale CCU2/3 und baugleiche (z.B. RaspberryMatic) +++

    Nutzen / Zweck: Anzeigen der RSSI Werte aller "HomeMatic IP" Komponenten um die Funk-Signalstärke übersichtlich in einer Tabelle zu visualisieren

    Autor: https://github.com/Janosch111/
    
    Entwickelt und getestet mit folgender RaspberryMatic Firmwareversion: 2.35.16.20180715

    Getestet mit folgenden Geräten: HmIP-eTRV-2, HMIP-PSM, HmIP-STHO

    Hinweis: Dieses Bookmarklet setzt eine aktive Internetverbindung voraus!

    Tipp zum Anlegen eines Bookmarklet-Lesezeichens im Browser: https://www.stichpunkt.de/bookmarklets/

    Relevante Parse URLS:
        Homematic WebUI Startseite:  https://xxx.meine-homematic.de/pages/index.htm?sid=@6ykr2gvHnA@&client=3
        Device Startseite: https://xxx.meine-homematic.de/tools/devconfig.cgi?sid=@hV9mO3uQad@
        Device Übersicht: https://xxx.meine-homematic.de/tools/devconfig.cgi?cmd=list_devices&sid=@hV9mO3uQad@
        Beispiel URL fuer Maintanance Details: https://xxx.meine-homematic.de/tools/devconfig.cgi?cmd=config&device=000A1709AF5E94:0&iface=HmIP-RF&sid=@EX97kZQ4cs@
        Quelle für Originale Geräte-Bilder: https://xxx.meine-homematic.de/tools/devicetypes.html

    Tools:
        aus diesem JS-Code Bookmarklet erzeugen mit:
        - https://mrcoles.com/bookmarklet/ (inkl. Kommentare)
        - http://bookmarklets.org/maker/ (ohne Kommentare und maximal komprimiert)

        ein beliebiges Bookmarklet in leserlichen JS-Code zurückverwandeln:
        - http://jsbeautifier.org/

   Letzte Änderung:
        - 30.08.2018: JJ: initiale Version

*/

(function(e, a, g, h, f, c, b, d) {
    if (!(f = e.jQuery) || g > f.fn.jquery || h(f)) {
        c = a.createElement("script");
        c.type = "text/javascript";
        c.src = window.location.protocol + "//ajax.googleapis.com/ajax/libs/jquery/" + g + "/jquery.min.js";
        c.onload = c.onreadystatechange = function() {
            if (!b && (!(d = this.readyState) || d === "loaded" || d === "complete")) {
                h((f = e.jQuery).noConflict(1), b = 1);
                f(c).remove()
            }
        };
        a.documentElement.childNodes[0].appendChild(c)
    }
})(window, document, "3.3.1", function($, L) {

    /* Variablen initialisieren */

    var localSessionID = "";
    var resultLocalSessionID = [];
    var regexSid = /.+sid=(@[A-Za-z0-9].+@).*/;
    var regexUrlDevconfig = /devconfig.cgi\?cmd=list_devices/;
    var urlFull = window.location.href;
    var urlBase = window.location.protocol + "//" + window.location.host;
    var urlPath = window.location.pathname;


    if (typeof SessionId !== 'undefined') {
        console.log("Homematic SessionID = " + SessionId);
        localSessionID = SessionId;
    } else {
        resultLocalSessionID = regexSid.exec(window.location.search);
        if (!!resultLocalSessionID && (typeof resultLocalSessionID !== 'undefined') && (resultLocalSessionID.length > 1)) {
            localSessionID = resultLocalSessionID[1];
        }
    }


    if (frames.length > document.getElementsByTagName("meta").length) {
        alert("Sorry, Frameset entdeckt...\nHier funktioniert dieses Bookmarklet nicht :-(");
    } else if (localSessionID === "") {
        alert("Keine Ergebnisse. Bitte sicherstellen, dass die WebUi im aktuellen Browserfenster geoeffnet ist.");
    } else if (!regexUrlDevconfig.test(urlFull)) {
        var urlDeviceList = urlBase +"/tools/devconfig.cgi?cmd=list_devices&sid="+ localSessionID;
        $("<div style='background-color: white;padding: 20px;'><h2>Bitte sicherstellen, dass dieses Script auf der korrekten Unterseite ausgefuehrt wird!<br/>Direkt-Link auf devconfig/devices: <a href='"+ urlDeviceList +"'>" + urlDeviceList + "</a></h2></div><hr/>").prependTo("body");
    } else {
        var el = document.getElementsByTagName("a");
        var x = "";
        var deviceID = "";
        var arrDeviceID = [];
        var deviceName = "";
        var arrDeviceName = [];
        var urlMaintenance = "";
        var resultRssiDevice = [];
        var resultRssiPeer = [];
        var regexDeviceID = /.+expand=([A-F0-9]{14}).+/;
        var regexDeviceName = /([-A-Za-z0-9]+) \([A-F0-9]{14}\)/;
        var regexRssiDevice = /name="RSSI_DEVICE" value="([-0-9]+)"/;
        var regexRssiPeer = /name="RSSI_PEER" value="([-0-9]+)"/;

        if (typeof el[0] !== 'undefined') {
            for (i = 0; i < el.length; i++) {
                if ((el[i].href.search(regexDeviceID) !== -1)) {

                    deviceID = el[i].href.replace(regexDeviceID, "$1");
                    arrDeviceID.push(deviceID);

                    deviceName = el[i].innerHTML.replace(regexDeviceName, "$1");
                    arrDeviceName.push(deviceName);

                    /* console.log("Treffer Nr. " + i + " = " + el[i].href); */
                    /* console.log("deviceID = " + deviceID); */
                    /* console.log("deviceName = " + deviceName); */

                };
            };
        };

        /*
        console.log("localSessionID = " + localSessionID);
        console.log("urlFull = " + urlFull);
        console.log("urlBase = " + urlBase);
        console.log("urlPath = " + urlPath);
        */

        function getRssiValues(deviceID, deviceName, urlMaintenance) {
            var debugOutput = "";
            var valRssiDevice = "unknown";
            var valRssiPeer = "unknown";

            var xhr = new XMLHttpRequest(), method = "GET", url = urlMaintenance;

            /* console.log("getRssiValues: Durchlauf fuer deviceID="+deviceID+" / deviceName="+deviceName+" / urlMaintenance="+urlMaintenance); */

            /* Lade und Parse Maintenance URLs */

            xhr.open(method, url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    debugOutput += deviceName + " (" + deviceID + "): ";

                    resultRssiDevice = regexRssiDevice.exec(xhr.responseText);
                    debugOutput += "RSSI_DEVICE = ";
                    if (!!resultRssiDevice && (typeof resultRssiDevice !== 'undefined') && (resultRssiDevice.length > 1)) {
                        debugOutput += resultRssiDevice[1];
                        valRssiDevice = resultRssiDevice[1];
                    } else {
                        debugOutput += "unknown";
                    }

                    resultRssiPeer = regexRssiPeer.exec(xhr.responseText);
                    debugOutput += " / RSSI_PEER = ";
                    if (!!resultRssiPeer && (typeof resultRssiPeer !== 'undefined') && (resultRssiPeer.length > 1)) {
                        debugOutput += resultRssiPeer[1];
                        valRssiPeer = resultRssiPeer[1];
                    } else {
                        debugOutput += "unknown";
                    }

                    debugOutput += " # " + urlMaintenance;

                    /* console.log(debugOutput); */


                    var tmpIdDevice = "#rssioutputRssiDevice" + deviceID;
                    $(tmpIdDevice).html(valRssiDevice);

                    var tmpIdPeer   = "#rssioutputRssiPeer" + deviceID;
                    $(tmpIdPeer).html(valRssiPeer);

                }
            };
            xhr.send();

        }

        /* Ausgabe der Liste in neuem Fenster */

        $("<div id='rssioutput'></div><hr/>").prependTo("body");

        $("#rssioutput").append("<h2>Collecting RSSI values of "+ arrDeviceID.length +" HmIP Devices...</h2>");

        $("#rssioutput").append("<style type='text/css'>.img_show {\n" +
            "    width: 100px;\n" +
            "    height: 100px;\n" +
            "    border: 1px solid black;\n" +
            "    display: none;\n" +
            "    position: absolute;\n" +
            "}</style>");


        /* Lade JS-Scripts nach, um an HM-Bildnamen zu kommen */

        $.getScript( "/webui/js/extern/wz_jsgraphics.js", function( data, textStatus, jqxhr ) {
            /* console.log( "wz_jsgraphics.js: Load was performed." ); */

            $.getScript( "/tools/js/jsDevDescr.cgi", function( data, textStatus, jqxhr ) {
                /* console.log( "jsDevDescr.cgi: Load was performed." ); */

                for (k = 0; k < arrDeviceID.length; k++) {
                    var tmpIDPic = "#rssioutputPic" + arrDeviceID[k];
                    var tmpIDImgSmall = "rssioutputImgSmall" + arrDeviceID[k];

                    var jsEventHtml = " onMouseOver=\"zoomPicture('" + tmpIDImgSmall + "', 1)\" onMouseOut=\"zoomPicture('" + tmpIDImgSmall + "', 0)\"";
                    var tmpPicHtml      = "<img id='" + tmpIDImgSmall + "' src='" + DEV_getImagePath(arrDeviceName[k], "250") + "' width='50' height='50' style='position: relative;z-index: 0;'>";

                    $(tmpIDPic).html("<div style='position:relative;top:0;left:0;height:50px;width:50px'" + jsEventHtml + ">" + tmpPicHtml + "</div>");
                }
            });

        });


        var spinnerGif = "<img src='https://cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif' width='15' height='15'>";

        var rssiTableHtml = "<table border='1' cellspacing='0' cellpadding='5' >" +
                                "<thead>" +
                                    "<tr>"  +
                                        "<th>Device Name</th>" +
                                        "<th>Pic</th>" +
                                        "<th>RSSI_DEVICE</th>" +
                                        "<th>RSSI_PEER</th>" +
                                    "</tr>" +
                                "</thead>"+
                                "<tbody>";


        for (j = 0; j < arrDeviceID.length; j++) {

            urlMaintenance = urlBase + urlPath + "?cmd=config&device=" + arrDeviceID[j] + ":0&iface=HmIP-RF&sid=" + localSessionID;

            getRssiValues(arrDeviceID[j], arrDeviceName[j], urlMaintenance);

            rssiTableHtml +=    "<tr>" +
                                    "<td id='rssioutputName" + arrDeviceID[j] + "'>" + arrDeviceName[j] + " (" + arrDeviceID[j] +")" + "</td>" +
                                    "<td id='rssioutputPic" + arrDeviceID[j] + "' align='center'>" + spinnerGif + "</td>" +
                                    "<td id='rssioutputRssiDevice" + arrDeviceID[j] + "' align='center'>" + spinnerGif + "</td>" +
                                    "<td id='rssioutputRssiPeer" + arrDeviceID[j] + "' align='center'>" + spinnerGif + "</td>" +
                                "</tr>";

            /*
            console.log("--------------");
            console.log("result = " + result);
            console.log("urlMaintenance: " + urlMaintenance);
            */
        }

        rssiTableHtml +=       "</tbody>" +
            "</table>";

        /* Ergaenze weitere JS Helferlein */
        /* Achtung: hier funktioniert kein jQuery! */

        rssiTableHtml +=    '<script type="text/javascript">' +
            '    function zoomPicture(id, zoom) {' +
            /* '        console.log("zoomPicture: id=" + id + " # show=" + zoom);' + */
            '        if (zoom == "1"){' +
            '            document.getElementById(id).style.height = "150px";' +
            '            document.getElementById(id).style.width  = "150px";' +
            '            document.getElementById(id).style.zIndex  = "99";' +
            '        } else if (zoom == "0") {\n' +
            '            document.getElementById(id).style.height = "50px";' +
            '            document.getElementById(id).style.width  = "50px";' +
            '            document.getElementById(id).style.zIndex  = "auto";' +
            '        }' +
            '    }' +
            '</script>';



        $("#rssioutput").append(rssiTableHtml);

    }

});
