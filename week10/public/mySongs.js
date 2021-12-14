document.getElementById("container").innerHTML = "Your song has been added to the database.";

//console.log(songParams);
// function getLyrics() {
//     console.log('Author: ' + document.getElementById('author').value);
//     document.getElementById("loading").innerHTML = "<br>Getting song lyrics...";
//     var author = document.getElementById('author').value;
//     var title = document.getElementById('songName').value;
//     console.log(title);
//     var myUrl = 'https://api.lyrics.ovh/v1/' + author + '/' + title;
//     var request = new XMLHttpRequest();
//     request.open('GET', myUrl);
//     request.onreadystatechange = function () {
//         if (this.readyState === 4) {
//             console.log('Status:', this.status);
//             console.log('Headers:', this.getAllResponseHeaders());
//             console.log('Body:', this.responseText);
//             var song = JSON.parse(this.responseText);
//             var display_txt = song.lyrics.replace(/\n/g, "<br />");
//         }
//         else {
//             document.getElementById("loading").innerHTML = "";
//         }
//     };
//     request.send();
// }
