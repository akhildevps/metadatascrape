
var express = require('express');
var app = express();
var fs = require('fs'),
    bodyParser = require('body-parser'),
    request = require('request'),
    cheerio = require('cheerio'),
    path = require('path'),
    env = process.env;
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));

app.post('/scrape', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    //make a new request 
    request(req.body.url, function (error, response, responseHtml) {
        var resObj = {};

        //if there was an error occured
        if (error) {
            res.end(JSON.stringify({ error: 'There was an error occured' }));
            return;
        }

        //create the cheerio object
        let $ = cheerio.load(responseHtml);

        //create metaData keys
        let title = $('head title').text(),
            description = $('meta[name="description"]').attr('content'),
            images = $('img');

        if (title) {
            resObj.title = title;
        }

        if (description) {
            resObj.description = description;
        }

        if (images && images.length) {
            resObj.images = [];
            for (var i = 0; i < images.length; i++) {
                resObj.images.push($(images[i]).attr('src'));
            }
        }

        //send the response
        res.end(JSON.stringify(resObj));
    });
});


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

