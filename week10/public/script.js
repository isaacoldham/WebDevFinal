document.getElementById("submitButton").addEventListener("click", getLyrics);
function getLyrics() {
    console.log('Author: ' + document.getElementById('author').value);


    var author = document.getElementById('author').value;
    var title = document.getElementById('songName').value;
    var myUrl = 'https://api.lyrics.ovh/v1/' + author + '/' + title;
    var request = new XMLHttpRequest();
    request.open('GET', myUrl);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            console.log('the readystate is 4');
            var song = JSON.parse(this.responseText);
            console.log(song);
            document.getElementById("lyricsContainer").innerHTML = song.lyrics;
            console.log('done');
        }
    };
    request.send();
}