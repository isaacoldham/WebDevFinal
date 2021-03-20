document.getElementById("submitButton").addEventListener("click", getLyrics);


function getLyrics() {
    console.log('Author: ' + document.getElementById('author').value);
    document.getElementById("loading").innerHTML = "Getting song lyrics...";

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
            var display_txt = song.lyrics.replace(/\n/g, "<br />");
            console.log(song);
            console.log(display_txt);
            document.getElementById("lyricsContainer").innerHTML = display_txt;
            console.log('done');

            document.getElementById("loading").innerHTML = "";
            document.getElementById("mySongsLink").innerHTML =
"<div href='mySongs' id='addSong' class='button2'>Add Song to My Songs</div>";

        }
        else {
            document.getElementById("loading").innerHTML = "";
        }
    };
    request.send();
}

function addSong() {
    console.log('Adding song to database');



}