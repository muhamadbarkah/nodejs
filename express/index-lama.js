var express = require('express');
var app = express();
// CAR MENGGUNKAN LONGGER MORGAN
var logger = require('morgan');
// CARA MENGHUBUNGKAN EXPRESS DENGAN ROUTES
var expressku = require('./routes/expressku');
// CARA KONEK NODEJS KE MYSQL
var conn = require('express-myconnection');
// CONNECT DATABSE
var mysql = require('mysql');


// CARA MEMBUAT PORT OTOMATIS
app.set('port', process.env.port || 4000);
// SCRIPT JS EJS
app.set('view engine', 'ejs');
// 
app.use(logger('dev'));
// CARA MEMANGGIL FOLDER DIPASANG PORT
app.use('/public', express.static(__dirname + '/public'));
// CONNECT DATABSE
app.use(
    conn(mysql, {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        port: '3306',
        databse: 'express_db'
    }, 'single')
);



// PESAN YANG DIKIRIM KE WEB
app.get('/', function(req, res) {
    res.send('Menggunan Port' + app.get('port'));
    // res.send('Yeayh Berhasil Konek');
});
// SCRIPT route HTML
app.get('/express', expressku.homes);
app.get('/express/news', expressku.news);
app.get('/express/about', expressku.about);
app.get('/express/contact', expressku.contact);
app.get('/express/gallery', expressku.gallery);


// CARA MEMBUAT PORT MANUAL
app.listen(app.get('port'), function() {
    console.log('Menggunakan Port ' + app.get('port'));
});