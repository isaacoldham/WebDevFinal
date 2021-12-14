const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/rate', handleRequest);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function handleRequest(req, res) {
    const mailtype = req.query.mailType;
    const weight = Number(req.query.weight);


    calcPostage(res, weight, mailtype);
}

function calcPostage(res, weight, mailtype) {
    console.log("The calcPostage function");

    var total;

    console.log('This is the mailtype: ' + mailtype);
    console.log('This is the weight: ' + weight);


    if (mailtype == "stamped") {
        if (weight < 1) {
            total = .55;
        }
        else if (weight < 2) {
            total = .75;
        }
        else if (weight < 3) {
            total = .95;
        }
        else if (weight < 3.5) {
            total = 1.15;
        }
        else{
            console.log("This is a test");
            res.render("sorry");
        }
    }
    else if (mailtype == "metered") {
        if (weight < 1) {
            total = .51;
        }
        else if (weight < 2) {
            total = .71;
        }
        else if (weight < 3) {
            total = .91;
        }
        else if (weight < 3.5) {
            total = 1.11;
        }
        else{
            console.log("This is a test");
            res.render("sorry");
        }
    }
    else if (mailtype == "envelope") {
        if (weight < 1) {
            total = 1;
        }
        else if (weight < 2) {
            total = 1.2;
        }
        else if (weight < 3) {
            total = 1.4;
        }
        else if (weight < 4) {
            total = 1.6;
        }
        else if (weight < 5) {
            total = 1.8;
        }
        else if (weight < 6) {
            total = 2;
        }
        else if (weight < 7) {
            total = 2.2;
        }
        else if (weight < 8) {
            total = 2.4;
        }
        else if (weight < 9) {
            total = 2.6;
        }
        else if (weight < 10) {
            total = 2.8;
        }
        else if (weight < 11) {
            total = 3;
        }
        else if (weight < 12) {
            total = 3.2;
        }
        else if (weight < 13) {
            total = 3.4;
        }
        else{
            console.log("This is a test");
            res.render("sorry");
        }
    }
    else if (mailtype == "package") {
        if (weight < 1) {
            total = 4;
        }
        else if (weight < 2) {
            total = 4;
        }
        else if (weight < 3) {
            total = 4;
        }
        else if (weight < 4) {
            total = 4;
        }
        else if (weight < 5) {
            total = 4.8;
        }
        else if (weight < 6) {
            total = 4.8;
        }
        else if (weight < 7) {
            total = 4.8;
        }
        else if (weight < 8) {
            total = 4.8;
        }
        else if (weight < 9) {
            total = 5.5;
        }
        else if (weight < 10) {
            total = 5.5;
        }
        else if (weight < 11) {
            total = 5.5;
        }
        else if (weight < 12) {
            total = 5.5;
        }
        else if (weight < 13) {
            total = 5.5;
        }
        else{
            console.log("This is a test");
            res.render("sorry");
        }
    }
    
    const params = { total: total, mailtype: mailtype, weight: weight };
    res.render("rate", params);
}
