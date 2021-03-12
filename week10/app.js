const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


function homePage(req, res) {
    res.render("home")
}

    
//    const params = { total: total, mailtype: mailtype, weight: weight };
//    res.render("rate", params);