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
var gtalk_hidden = false;

if (typeof opera !== "undefined") {
	opera.extension.onmessage = function(event) {
		console.log("++++++++++++("+whichApp()+") message received: " + event.data);
		if (!isSupported()) {
			return;
		}
		if (event.data==="UltraCompact:ready") {
			event.source.postMessage(whichApp());
			return;
		}
		if (event.data.indexOf("UltraCompact:enabled:"+whichApp()+":true")===0) {
			if (isGMail() && event.data.indexOf("gtalk_hidden:true")>1) {
				gtalk_hidden = true;
			}
			styleIt();
			if (isGMail()) {
				// seems necessary for some reasons...
				setInterval('styleIt()', 1000);
			}
			return;
		}
	};
}

if (typeof chrome !== "undefined") {
	console.log("++++++++++++("+whichApp()+")");
	chrome.extension.sendRequest({method: "get"+whichApp()+"Enabled"}, function(response) {
		console.log(response.enabled);
		if (response.enabled == true) {
			if (window.location.hostname.indexOf('mail.google.') === 0 && response.gtalkhidden==true) {
				gtalk_hidden = true;
			}
			styleIt();
			if (window.location.hostname.indexOf('mail.google.') === 0) {
				// seems necessary for some reasons...
				setInterval('styleIt()', 1000);
			}
		}
	});
}

function styleIt() {

	var docHead = document.getElementsByTagName("head")[0];

	var lastStyleNode = docHead.getElementsByTagName('style');
	if (lastStyleNode!==null && lastStyleNode.length>0 && lastStyleNode[lastStyleNode.length-1].id === 'UltraCompactCustomCss') {
		return;
	}
	
	var css = '';
	
	if (isGMail()) {
	   //console.log(" ************ [UltraCompactCss.js] GMail styling...");
		css = gmailMods();
	} else if (isGReader()) {
	   //console.log(" ************ [UltraCompactCss.js] Google Reader styling...");
		css = greaderMods();
	} else {
	   //console.log(" ************ [UltraCompactCss.js] No styling, unknown app");
		return;
	}

	var style = document.createElement("style");
	style.type = "text/css";
	style.id = 'UltraCompactCustomCss';
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	docHead.appendChild(style);	
}

function gmailMods() {
   var css = '';
   css += '.xY { height: 1ex; }';
	css += '.Wg { padding-top: 0; padding-bottom: 0; }';
	css += '.VP5otc-pzeoBf, .VP5otc-YU0EGb-pzeoBf, .iI, .VP5otc-U4m8q, .iE { margin-top: 0px; padding-bottom: 1px; }';
	css += '.GcwpPb-Z8OBDd { margin-bottom: 1px; }';
	css += '.Wg { background-color: #C7EEFF; }';
	css += '.LIMjF-d2fWKd { margin-left: 6px; margin-top: -22px; }';
	css += '.qd { padding-bottom: 0.2ex; padding-top: 0.2ex; }';
	css += 'element.style { height: 265px; }';
	css += '.c-r-P-V-wk-Eb { width: 674px;}';
	css += '.c-C  {  width:1100px;}';

	// make recipients italic
	css += '.yP, .zF {font-style: italic;}';
	// important icon adjustment
	css += '.apd {padding: 0px 2px 0 0;}';
	
	if (gtalk_hidden) {
		css += '.akc, .aeO {display:none;}';
		css += '.T0 { display:none; }';
	}
	
	// TODO:
	// labels expanded by default
	return css;
}

function greaderMods() {
   var css = '';
	css += '#scrollable-sections-top-shadow, #scrollable-sections-bottom-shadow { width: 194px; }';
	css += '#nav { width: 194px; }';
	css += '#chrome { margin-left: 195px; }';
	css += '#lhn-add-subscription-section { width: 14px; }';
	css += '#viewer-header { height:33px;}';
	css += '#lhn-add-subscription-section { height:33px;}';
	css += '#title-and-status-holder { padding-bottom: 0px; padding-top: 0px; }';
	css += '.cards .entry-0 { padding-top: 0px; }';
	css += '.scroll-tree { font-size: 11px;line-height: 18px; }';
	css += '.scroll-tree li { margin-bottom: 0px;margin-top: 0px; }';
	css += '.scroll-tree li.folder .link, .scroll-tree li.sub { height: 18px; }';
	css += '.lhn-section-primary { line-height: 22px; }';
	css += '#recommendations-tree .lhn-section-primary { height: 22px; }';
	css += '#home-section { padding-bottom: 0.1em;padding-top: 0.1em; }'; 
	css += '#title-and-status-holder { display:none; }';
	css += '.label {padding-top:0px;}';
	css += '.unread-count {padding-top:0px;}';
	css += '#reading-list-unread-count { margin-top: 0px; }';
	return css;
}

function isSupported() {
	return isGMail() || isGReader();
}

function isGMail() {
	if (window.location.hostname.indexOf('mail.google.') === 0) return true;
	return false;
}
function isGReader() {
	if (
			(window.location.href.indexOf('https://www.google.')===0 
			     || window.location.href.indexOf('http://www.google.')===0)
			&& window.location.href.indexOf('/reader/view')>=0
		) return true;
	return false;
}
function whichApp() {
	if (isGMail()) return "gmail";
	if (isGReader()) return "greader";
	return "unknown";
}

