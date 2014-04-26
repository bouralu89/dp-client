var express = require('express'),
    app = express();

app.configure(function () {
    app.use(express.static(__dirname + '/'));
});

app.get('/', function (req, res) {
    res.render('cordova/www/index.html');
});

app.listen(8081);

console.log('App running at http://localhost:8081');