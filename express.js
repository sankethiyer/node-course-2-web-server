const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var hbs = require('hbs');
const fs = require('fs');

hbs.registerHelper('currentYear', function () {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('some error while writing log file');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    //res.send('<h1>Hello World!</h1>')
    // res.send({
    //     name: 'sanketh',
    //     likes: [
    //         'football',
    //         'history'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'home page',
        welcomeMessage: 'welcome message'
    });
});

app.get('/about', (req, res) => {
    //res.send('<h1>About us!</h1>')
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});
app.get('/bad', (req, res) => {
    //res.send('<h1>Hello World!</h1>')
    res.send({
        errorMessage: 'bad request'
    })
});
app.listen(port, () => {
    console.log("server started on " + port);

});