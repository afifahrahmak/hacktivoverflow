const mongoose = require('mongoose')
const db = process.env.URL_DB

mongoose.connect(process.env.URL_DB,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) console.log(`failed connect to db`);
        else console.log(`success connect to db`);
    })
