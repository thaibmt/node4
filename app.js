const express = require('express');
const config = require("config");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongodbStore = require("connect-mongodb-session")(session);
const controller = require('./controllers/web');
const DB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/laptop_db';
const app = express();
const PORT = process.env.PORT || 3000;
/* session store*/
const store = new mongodbStore({
    uri: DB_CONNECTION_STRING,
    collection: "sessions",
});
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
// Cấu hình trình xử lý view template
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/styles', express.static(__dirname + '/styles'));
app.use(bodyParser.urlencoded({ extended: true }));
// Kết nối với MongoDB 
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// điều hướng controllers
app.use('/', controller);
// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});
