import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import Connection from './database/db.js'; 
import Routes from './routes/route.js';

import path from 'path';

const __dirname = path.resolve();

const app = express()
const port = process.env.PORT || 8000;

app.use(cors());

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', Routes);

// For cyclic.sh
app.use(express.static(path.join(__dirname,"./client/build")));

app.get('*', function(_, res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"), function(err){
        res.status(500).send(err);
    })
})
//

Connection();

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})