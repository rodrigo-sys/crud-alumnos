var mysql = require('mysql');

var conexion = mysql.createConnection({
    // host:'localhost',
    // user:'root',
    // password:'',

    // database:'escuela',

    host:'remotemysql.com',
    user:'Vyx1otPXam',
    password:'Wu0dXe7KEc',

    database:'Vyx1otPXam',

    dateStrings: ['DATE','DATETIME']

});

conexion.connect(function (error){
    if (error){
        console.log('Problemas de conexión con mysql');
        console.log(error);
    }
    else{
        console.log('Se inicio conexión');
    }
});

module.exports = conexion;
