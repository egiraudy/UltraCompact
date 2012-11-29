var idx = 3;

function saveOptions() {
    var gmail = new Array();
    gmail.push(document.getElementsByName('gmail_enabled')[0].checked);
    gmail.push(document.getElementsByName('gmail_gtalk_hidden')[0].checked);
    localStorage.setItem('gmail', gmail.join(';'));

    var greader = new Array();
    greader.push(document.getElementsByName('greader_enabled')[0].checked);
    localStorage.setItem('greader', greader.join(';'));
}

function loadOptions() {
    var gmail_ = localStorage.getItem('gmail')
    if (gmail_) {
		var gmail = gmail_.split(';');
		if (gmail[0]) {
			document.getElementsByName('gmail_enabled')[0].checked = (gmail[0]==="true");
		}
		if (gmail[1]) {
			document.getElementsByName('gmail_gtalk_hidden')[0].checked = (gmail[1]==="true");
		}
    }

    var greader = localStorage.getItem('greader');
    if (greader) {
        document.getElementsByName('greader_enabled')[0].checked = (greader==="true");
    }
}
window.addEventListener( 'DOMContentLoaded', function() {
    loadOptions();
    document.getElementById("saveOptions").addEventListener('click', saveOptions);
});

