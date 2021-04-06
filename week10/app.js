const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const axios = require('axios');
const { Pool } = require('pg');

const db_url = 'postgres://famuwdcambmyum:95c91a12ed40739ed33d91ff68c928179c526ac319fcb20221f3695fb21bcc2a@ec2-18-233-83-165.compute-1.amazonaws.com:5432/d8ru6l43duhil?ssl=true';
const connectionString = process.env.DATABASE_URL || db_url;
const pool = new Pool({
    connectionString: db_url,
    ssl: {
      rejectUnauthorized: false
    }
  });
//const pool = new Pool({ connectionString: connectionString });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
})


// axios.get('https://api.scryfall.com/cards/random')
//   .then(response => {
//     console.log('This:')
//     console.log(response.data.image_uris.png)
//     res.status(200).json(response.data.image_uris.png)
//   })
//   .catch(error => {
//     console.log(error);
//   });
//   })

app.use(express.static(path.join(__dirname + '/public')));

// views is directory for all template files
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');


app.get('/', homePage);
app.get('/home', homePage);
app.get('/mySongs', mySongs);
app.get('/addMySong', addMySong);
app.get('/goToFavorites', goToFav);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


function homePage(req, res) {
    res.render("home");
}
function mySongs(req, res) {
    res.render("mySongs");
}



async function addMySong(req, res) {
    var author = req.query.authorInput;
    var songTitle = req.query.songNameInput;
    var songLyrics = req.query.songLyricsInput;
    console.log('author: ' + author);
    console.log('title: ' + songTitle);
    //console.log('lyrics: ' + songLyrics);

    var checkDuplicateStmt = "SELECT song_title FROM mySongs WHERE song_title = $1;";
    var checkDuplicateBindVars = [songTitle];
    //var checkValues = [songTitle];
    pool.query(checkDuplicateStmt, checkDuplicateBindVars, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.rows[0] == null) {
                var insertStmt = "INSERT INTO mySongs (author, song_title, lyrics) VALUES($1, $2, $3);"
                var bindVariables = [author, songTitle, songLyrics];
                pool.query(insertStmt, bindVariables, (err, result) => {
                    console.log(err);
                })

                pool.query("SELECT song_title, author, lyrics FROM mySongs;", (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        var rows = result.rows;
                        res.render('mySongs', { params: JSON.stringify(rows) });
                    }
                })
            }
            else {
                console.log(result.rows[0])
                pool.query("SELECT song_title, author, lyrics FROM mySongs;", (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        var rows = result.rows;
                        res.render('mySongs', { params: JSON.stringify(rows) });
                    }
                })
            }
        }
    })
}

function goToFav(req, res) {
    pool.query("SELECT song_title, author, lyrics FROM mySongs;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            var rows = result.rows;
            res.render('mySongs', { params: JSON.stringify(rows) });
        }
    })
}

