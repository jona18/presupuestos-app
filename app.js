var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    moment      = require("moment"),
    Cliente     = require("./models/cliente"),
    Presupuesto = require("./models/presupuesto"),
    ManoDeObra = require("./models/manoDeObraItem"),
    Auto = require("./models/auto"),
    Counter = require("./models/counter");


mongoose.connect("mongodb://localhost/presupuestos_app", {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("conectado a db");
});
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
    

//====================
//INDEX ROUTES
//====================
app.get("/", function(req, res){
  res.render("index");
});


//====================
//PRESUPUESTOS ROUTES
//====================
app.get("/presupuestos", function(req, res){
  res.render("presupuestos/index");
});

app.get("/presupuestos/new", function(req, res){
  if(req.xhr){
    var autoLista = req.query.autolista;
    var base = req.query.base;
    

    if(base == "mdo"){
      ManoDeObra.find({lista: autoLista}, function(err, datos){
        if(err){
          console.log(err);
        } else {
          res.json(datos);
        }
      });
    } else if(base == "ads"){
      console.log("elegiste autopartes del sur");
      res.json(base);
    } else if(base == "arc"){
      console.log("elegiste arcore");
      res.json(base);
    } else {
      const regex = new RegExp(escapeRegex(req.query.clienteNombre), 'gi');

      Cliente.find({nombre: regex}, function(err, clientesEncontrados){
        if(err){
          console.log(err);
        } else {
          res.json(clientesEncontrados);
        }
      });
    }
  } else {
    Auto.find({}, {descripcion: 1, listamo: 1, _id: 0}).sort({descripcion: 1}).exec(function(err, datos){
      if(err){
        console.log(err);
      } else {
        res.render("presupuestos/new", {autos: datos});
      }
    });
    // Auto.find({}, {descripcion: 1, listamo: 1, _id: 0}, function(err, datos){
    //   if(err){
    //     console.log(err);
    //   } else {
    //     res.render("presupuestos/new", {autos: datos});
    //   }
    // });
  }
});

app.post("/presupuestos/new", function(req, res){

  var data = req.body;

  var presupuesto = data.presupuesto;
  var manoDeObraTotal = presupuesto.manoDeObraTotal;
  var repuestosTotal = presupuesto.repuestosTotal;
  var importeTotal = presupuesto.importeTotal;
  var items = presupuesto.items;
  var auto = presupuesto.auto;
  var nuevoPresupuesto;

  if(req.body.clienteNumero) {
    Cliente.findOne({numCliente: req.body.clienteNumero}).populate('presupuestos').exec(function(err, clienteEncontrado){
      if(err){
        console.log(err);
      } else {
        Counter.findOneAndUpdate({_id: 'numPresupuesto'}, {$inc: {valor: 1}}, {new: true}, function(err, counterPresupuesto){
          if(err){
            console.log(err);
          } else {
            nuevoPresupuesto = {numPresupuesto: counterPresupuesto.valor, auto: auto, manoDeObraTotal: manoDeObraTotal, repuestosTotal: repuestosTotal, importeTotal: importeTotal, items: items};
            Presupuesto.create(nuevoPresupuesto, function(err, presupuestoCreado){
              if(err){
                console.log(err);
              } else {
                clienteEncontrado.presupuestos.push(presupuestoCreado);
                clienteEncontrado.save(function(err, dataFinal){
                  if(err){
                    console.log(err);
                  } else {
                    res.json(dataFinal);
                  }
                })
              }
            })
          }
        });
      }
    })
  } else {
    var cliente = data.cliente;
    var nombre = cliente.nombre;
    var domicilio = cliente.domicilio;
    var localidad = cliente.localidad;
    var telefono = cliente.telefono;
    var email = cliente.email;
    var cuit = cliente.cuit;

    var nuevoCliente;

    var counterQuery = Counter.findOneAndUpdate({_id: 'numCliente'}, {$inc:{valor: 1}}, {new: true}, function(err, counterCliente){
      if(err){
        console.log(err);
      } else {
        nuevoCliente = {numCliente: counterCliente.valor, nombre: nombre, domicilio: domicilio, localidad: localidad, telefono: telefono, email: email, cuit: cuit};
        Counter.findOneAndUpdate({_id: 'numPresupuesto'}, {$inc: {valor: 1}}, {new: true}, function(err, counterPresupuesto){
          if(err){
            console.log(err);
          } else {
            nuevoPresupuesto = {numPresupuesto: counterPresupuesto.valor, auto: auto, manoDeObraTotal: manoDeObraTotal, repuestosTotal: repuestosTotal, importeTotal: importeTotal, items: items};
            Cliente.create(nuevoCliente, function(err, clienteCreado){
              if(err){
                console.log(err);
              } else {
                console.log(clienteCreado);
                Presupuesto.create(nuevoPresupuesto, function(err, presupuestoCreado){
                  if(err){
                    console.log(err);
                  } else {
                    clienteCreado.presupuestos.push(presupuestoCreado);
                    clienteCreado.save(function(err, dataFinal){
                      if(err){
                        console.log(err);
                      } else {
                        res.json(dataFinal);
                      }
                    })
                  }
                });
              }
            });
          }
        })
        // nuevoPresupuesto = {numPresupuesto: data.valor, auto: auto, manoDeObraTotal: manoDeObraTotal, repuestosTotal: repuestosTotal, importeTotal: importeTotal, items: items};
      }
    });
  }
});

app.post('/crearAuto', function(req, res) {
  var auto = req.body.auto;

  Auto.create(auto, function(err, autoCreado) {
    if(err) {
      console.log(err);
    } else {
      res.json(autoCreado);
    }
  });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

app.listen(3000, function(){
  console.log("Servidor de aplicacion de presupuestos ejecutandose.");
});