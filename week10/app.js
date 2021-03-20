const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

// const { Pool, Client } = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgres://famuwdcambmyum:95c91a12ed40739ed33d91ff68c928179c526ac319fcb20221f3695fb21bcc2a@ec2-18-233-83-165.compute-1.amazonaws.com:5432/d8ru6l43duhil?ssl=true';
// const pool = new Pool({connectionString: connectionString});

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(express.static(path.join(__dirname + '/public')));
//app.use(bodyParser.json());


// views is directory for all template files
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');


app.get('/', homePage);
app.get('/mySongs', mySongs);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


function homePage(req, res) {
    res.render("home");
}
function mySongs(req, res) {
    res.render("mySongs");
}

var sql = "SELECT * FROM mySongs;";

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