var express = require('express');
var router = express.Router();

var bd = require('./bd');

// ALTA DE REGISTROS
router.get('/alta', function(req, res, next) {
  res.render('alta');
});

router.post('/alta', function(req, res, next) {
  res.send('El alumno ha sido dado de alta <br> <a href="/">Volver al inicio</a>');

  bd.query('insert into alumnos set ?', req.body, function (error, resultado){
    if (error){
      console.log(error);
      return;
    }
  });    

});

// BAJA DE REGISTROS
router.get('/baja', function(req, res, next) {
  res.render('baja');
});

router.post('/baja', function(req, res, next) {
  res.send('El alumno ha sido dado de baja <br> <a href="/">Volver al inicio</a>');

  bd.query('DELETE FROM alumnos WHERE numero_legajo=?', req.body.numero_legajo, function (error, resultado){
    if (error){
      console.log(error);
      return;
    }
  });    

});

// MODIFICACION
router.get('/modificacion', function(req, res, next) {
  res.render('modificacion');
});

router.post('/modificacion', function(req, res, next) {

  bd.query('select numero_legajo, apellido, domicilio, codigo_postal, fecha_nacimiento, email, grupo_sanguineo, telefono, celular, dni from alumnos where numero_legajo = ?', req.body.numero_legajo, function(error,filas){

            if (error) {            
                console.log('Error en la consulta.');
                return;
            }
            if (filas.length > 0) {
                res.render('formulario_modificacion', {alumnos:filas});
            } else {
                res.send(`No existe alumno con el número de legajo ${req.body.numero_legajo} <br> <a href="/">Volver al inicio</a>`);
            }    
        });
});


router.post('/confirmar_modificacion', function(req, res, next) {

  // var registro = req.body;
  // var numero_legajo = req.body.numero_legajo;

  console.log(req.body)
  
  bd.query('UPDATE alumnos SET ? WHERE ?', [req.body, {numero_legajo:req.body.numero_legajo}], function(error,filas){
            if (error) {            
                console.log('Error en la consulta.');
                console.log(error);
                return;
            }
            res.send('El registro ha sido modificado <br> <a href="/">Volver al inicio</a>');
        });

});

// LISTADO DE REGISTROS
router.get('/listado', function(req, res, next) {
  // bd.query('select numero_legajo, apellido, domicilio, codigo_postal, fecha_nacimiento, email, grupo_sanguineo, telefono, celular, dni from alumnos', function(error,filas){

  bd.query('select * from alumnos', function(error,filas){

        if (error) {            
            console.log('Error en el listado');
            return;
        }    
        res.render('listado',{alumnos:filas});
  });

});


// CONSULTAS
router.get('/residentes_batan', function(req, res, next) {

  bd.query('select * from alumnos where codigo_postal = 7601', function(error, filas){

        if (error) {            
            console.log('Error en el listado');
            return;
        }    
        res.render('listado',{alumnos:filas});
  });

});

router.get('/residentes_batan_rh_negativo', function(req, res, next) {

  bd.query('select * from alumnos where codigo_postal = 7601 AND grupo_sanguineo = "rh-"', function(error, filas){

        if (error) {            
            console.log('Error en el listado');
            console.log(error);
            return;
        }    
        res.render('listado',{alumnos:filas});
  });

});

router.get('/nacidos_2002', function(req, res, next) {

  bd.query('SELECT * FROM alumnos WHERE YEAR(fecha_nacimiento) = 2002', function(error, filas){

        if (error) {            
            console.log('Error en el listado');
            console.log(error);
            return;
        }    
        res.render('listado',{alumnos:filas});
  });

});

router.get('/ordenados_dni_ascendente', function(req, res, next) {

  bd.query('SELECT * FROM alumnos ORDER BY dni ASC', function(error, filas){

        if (error) {            
            console.log('Error en el listado');
            console.log(error);
            return;
        }    
        res.render('listado',{alumnos:filas});
  });

});

router.get('/domicilio_av_jb_justo', function(req, res, next) {

  bd.query('SELECT * FROM alumnos WHERE domicilio LIKE "Av. J.B. Justo%"', function(error, filas){

        if (error) {            
            console.log('Error en el listado');
            console.log(error);
            return;
        }    
        res.render('listado',{alumnos:filas});
  });

});

module.exports = router;
