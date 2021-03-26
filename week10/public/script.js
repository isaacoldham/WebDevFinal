document.getElementById("submitButton").addEventListener("click", getLyrics);


function getLyrics() {
    console.log('Author: ' + document.getElementById('author').value);
    document.getElementById("loading").innerHTML = "<br>Getting song lyrics...";


    var author = document.getElementById('author').value;
    var title = document.getElementById('songName').value;
    console.log(title);
    var myUrl = 'https://api.lyrics.ovh/v1/' + author + '/' + title;
    var request = new XMLHttpRequest();
    request.open('GET', myUrl);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            var song = JSON.parse(this.responseText);
            var display_txt = song.lyrics.replace(/\n/g, "<br />");
            document.getElementById("lyricsContainer").innerHTML = display_txt;

            var innerHtml1 =  "<br><br><input id='addSong' class='button2' value='Add Song to Favorites' type='submit'><h3 id='title'>Lyrics:</h3>";
            document.getElementById("mySongsLink").insertAdjacentHTML('beforeend', innerHtml1);
            document.getElementById("loading").innerHTML = "";

            //Add author and lyric values to the hidden inputs of the form.
            document.getElementById("authorInput").value = author;
            document.getElementById("songLyricsInput").value = song.lyrics;
            document.getElementById("songTitleInput").value = title;

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