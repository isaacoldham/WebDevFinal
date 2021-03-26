const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const axios = require('axios');
const { Pool } = require('pg');


const connectionString = process.env.DATABASE_URL || 'postgres://famuwdcambmyum:95c91a12ed40739ed33d91ff68c928179c526ac319fcb20221f3695fb21bcc2a@ec2-18-233-83-165.compute-1.amazonaws.com:5432/d8ru6l43duhil?ssl=true';
const pool = new Pool({ connectionString: connectionString });
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

    // var checkDuplicateStmt = "SELECT song_title FROM mySongs WHERE song_title = 'back in black';";
    // //var checkValues = [songTitle];
    // pool.query(checkDuplicateStmt, (err, res) => {
    //     console.log('this is req.rows[0]' + req.rows[0])
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         if (req.rows == null) {
    //             console.log('Value of req.rows' + req.rows)
    var insertStmt = "INSERT INTO mySongs (author, song_title, lyrics) VALUES($1, $2, $3);"
    var bindVariables = [author, songTitle, songLyrics];
    pool.query(insertStmt, bindVariables, (err, res) => {
        console.log(err);
    })

    // pool.query("SELECT song_title FROM mySongs;", (err, res) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(res.rows[0]);
    //     }
    // })
    //     } else {
    //         console.log(res.rows[0])
    //     }
    // }
    //})

    res.render('mySongs');
}


// pool.query(sql, function(err, result) {
//     // If an error occurred...
//     if (err) {
//         console.log("Error in query: ")
//         console.log(err);
//     }

//     // Log this to the console for debugging purposes.
//     console.log("Back from DB with result:");
//     console.log(result.rows);

// });



// pool.connect((err, client, done) => {
//     if (err) throw err
//     client.query('SELECT * FROM mySongs;', (err, res) => {
//         done()
//         if (err) {
//             console.log(err.stack)
//         } else {
//             console.log(res.rows[0])
//         }
//     })
// })
// // promise - checkout a client
// pool.connect().then(client => {
//     return client
//         .query('SELECT author FROM mySongs;')
//         .then(res => {
//             client.release()
//             console.log(res.rows[0])
//         })
//         .catch(err => {
//             client.release()
//             console.log(err.stack)
//         })
// })
//     // async/await - check out a client
//     ; (async () => {
//         const client = await pool.connect()
//         try {
//             const res = await client.query('SELECT * FROM mySongs;')
//             console.log(res.rows[0])
//         } finally {
//             // Make sure to release the client before any error handling,
//             // just in case the error handling itself throws an error.
//             client.release()
//         }
//     })().catch(err => console.log(err.stack))