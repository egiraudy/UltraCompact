/*
 Copyright 2012 Etienne Giraudy

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var gmail_enabled = false;
var gtalk_hidden = false;
var greader_enabled = false;

if (typeof opera !== "undefined") {
    window.addEventListener("DOMContentLoaded", function() {
        console.log("######## background process loading");

        opera.extension.onconnect = function(event) {
            //console.log("######## on connect [");
            loadOptions("xxx");
            event.source.postMessage("UltraCompact:ready");
            //console.log("######## on connect ]");
        };

        opera.extension.onmessage = function(event) {
        console.log("######## message received: " + event.data);
            if (event.data==="gmail") {
                event.source.postMessage("UltraCompact:enabled:gmail:"+gmail_enabled+":gtalk_hidden:"+gtalk_hidden);
            }
            if (event.data==="greader") {
                event.source.postMessage("UltraCompact:enabled:greader:"+greader_enabled);
            }
        };
    }, false);
}

if (typeof chrome !== "undefined") {
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        console.log("######## message received: " + request.method);
        loadOptions("xxx");
        console.log("######## apps enabled: " + gmail_enabled + ":" + greader_enabled);
        if (request.method == "getgmailEnabled") {
            sendResponse({enabled: gmail_enabled, gtalkhidden: gtalk_hidden});
        } else if (request.method == "getgreaderEnabled") {
            sendResponse({enabled: greader_enabled});
        } else {
            sendResponse({}); // snub them.
        }
    });
}

function loadOptions(app) {
    var gmail = localStorage.getItem('gmail');
    if (gmail) {
        gmail = gmail.split(";");
		if (gmail[0]) gmail_enabled = (gmail[0]==="true");
		if (gmail[1]) gtalk_hidden = (gmail[1]==="true");
    }

    var greader = localStorage.getItem('greader');
    if (greader) {
        //greader = gmail.split(";");
        greader_enabled = (greader==="true");
    }
}
