// ==UserScript==
// @name UltraCompact
// @version 1.1.1
// @include https://mail.google.*/*
// @include http://mail.google.*/*
// @include https://www.google.*/reader/view*
// @include http://www.google.*/reader/view*
// @include https://plus.google.*/*
// ==/UserScript==

window.addEventListener('load', function (e) {
	console.log('================UltraCompact: ' + window.location.href);
	if (!isGmail() && !isGReader() && !isGPlus()) {
		return;
	}
	styleIt();
	if (isGmail()) {
		// seems necessary for some reasons...
		setInterval('styleIt()', 1000);
	}
}, false);

function styleIt() {

	var docHead = document.getElementsByTagName("head")[0];

	var lastStyleNode = docHead.getElementsByTagName('style');
	if (lastStyleNode!==null && lastStyleNode.length>0 && lastStyleNode[lastStyleNode.length-1].id === 'EtienneCustomCss') {
		return;
	}
	
	var css = '';
	
	if (isGmail()) {
		css = gmailMods();
	} else if (isGReader()) {
		css = greaderMods();
	} else if (isGPlus()) {
		css = gplusMods();
	} else {
		return;
	}

	var style = document.getElementById('UltraCompactCustomCss');
	if (style !== null) {
		docHead.removeChild(style);
	}
	style = document.createElement("style");
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
	css += '.T0 { display:none; }';
	css += '.ae0 { display:none; }';
	css += 'element.style { height: 265px; }';
	css += '.akc, .aeO {display:none;}';
	css += '.c-r-P-V-wk-Eb { width: 674px;}';
	css += '.c-C  {  width:1100px;}';
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

function gplusMods() {
    var css = '';
	css += '.c-cb-C { padding-top: 1px; }';
	css += '.c-cb-C { height:40px; }';
	css += '.c-cb-V { height:40px; }';
	css += '.Sv { margin-top:5px; }';
	css += '.mA { margin-top:5px; }';
	css += '.iA { margin-top:0px;padding-top:5px; }';
	css += '.gi { padding-top:3px;padding-bottom:3px; }';
	css += '.dl, .Us { padding-bottom:3px; }';
	css += '.Rx, .yx { padding-top:1px;padding-bottom:1px; }';
	css += '.wx { padding-top:0px;padding-bottom:0px; }';
	css += '.B-u-C { margin-top: 0px;margin-bottom: 0px; }';
	css += '.Ex {background-color:#eeeeee;}';
	css += '.Mo {margin-right: -10px;}';
	css += '.jn {margin-right: 10px;margin-left: 35px;}';
	css += '.Fn {margin-left: -55px;}';
	return css;
}

function isGmail() {
	if (window.location.hostname.indexOf('mail.google.') === 0) return true;
	return false;
}
function isGPlus() {
	if (window.location.hostname.indexOf('plus.google.') === 0) return true;
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
