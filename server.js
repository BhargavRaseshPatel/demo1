/********************************************************************************
* WEB700 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Bhargav Rasesh Patel 
  Student ID: 116520248 
  Date: February 14, 2025

  Published URL : 
*
********************************************************************************/

const LegoData = require('./modules/legoSets')
const legoData = new LegoData()

const express = require('express'); // "require" the Express module
const app = express(); // obtain the "app" object
const HTTP_PORT = process.env.PORT || 8080; // assign a port

const path = require('path')

app.use(express.static(__dirname + "public"))

// start the server on the port and output a confirmation to the console
app.listen(HTTP_PORT, () => {
    try {
        legoData.initialize()
    } catch (err) {
        console.log("There is an error in listening the legoData initialize.")
        console.log("Error ", err)
    }
    console.log(`server listening on: ${HTTP_PORT}`)
}
);

app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.sendFile(path.join(__dirname, '/views/home.html'))
});

app.get('/about', (req, res) => {
    // res.send('About the Company');
    res.sendFile(path.join(__dirname, '/views/about.html'))
});

app.get('/lego/sets', (req, res) => {
    const { theme } = req.query
    var data = null;
    if (theme != undefined) {
        data = legoData.getSetsByTheme(theme)
    } else {
        data = legoData.getAllSets()
    }

    if (!data) {
        res.sendFile(path.join(__dirname, '/views/404.html'))
    }
    res.send(data)
})

app.get('/lego/sets/:set_num', (req, res) => {
    const { set_num } = req.params

    const data = legoData.getSetByNum(set_num)
    // console.log("Data ",data)
    if (!data) {
        res.sendFile(path.join(__dirname, '/views/404.html'))
        console.log(true)
    }
    res.send(data)
})