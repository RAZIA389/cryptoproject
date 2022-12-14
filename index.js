
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./src/routes/route');
const mongoose = require('mongoose');
const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://raziaperwez38:48Vny2gtwyeSFdMo@functionup1.txsq8.mongodb.net/crypto", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route);

route.all("/*", function (req, res) {
    res.status(400).send({
        status: false,
        msg: "The api you request is not available!"
    })
})


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});