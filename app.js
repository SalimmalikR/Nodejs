const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.json());

const db = require('./config/database')

const sync = require('./model/sync')

sync()

const glberr = require('./utils/globalerr')

const CustomError =require('./utils/customerr')

const userrouter = require('./routers/user_roter')

const contentrouter = require('./routers/content_router')

const imagerouter = require('./routers/images_router')

const resultrouter = require('./routers/result_router')

const pdf_img = require('./routers/pdf_img')

app.use(userrouter)

app.use(contentrouter)

app.use(imagerouter)

app.use(resultrouter)

app.use(pdf_img)


app.all('*', (req, res, next) => {
    const err = new CustomError(404, `can't find ${req.originalUrl} on the server!`);
    next(err);
})

app.use(glberr)

const port = process.env.API_PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});