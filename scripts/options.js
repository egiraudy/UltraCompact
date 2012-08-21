var idx = 3;

function saveOptions() {
    var gmail = new Array();
    gmail.push(document.getElementsByName('gmail_enabled')[0].checked);
    localStorage.setItem('gmail', gmail.join(';'));

    var greader = new Array();
    greader.push(document.getElementsByName('greader_enabled')[0].checked);
    localStorage.setItem('greader', greader.join(';'));
}

function loadOptions() {
    var gmail = localStorage.getItem('gmail');
    if (gmail) {
        document.getElementsByName('gmail_enabled')[0].checked = (gmail==="true");
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

