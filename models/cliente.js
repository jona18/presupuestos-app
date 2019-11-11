var mongoose = require("mongoose");

var clienteSchema = mongoose.Schema({
  numCliente: Number,
  nombre: String,
  domicilio: String,
  localidad: String,
  telefono: Number,
  email: String,
  cuit: Number,
  presupuestos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presupuesto"
    }
  ]

});

module.exports = mongoose.model("Cliente", clienteSchema);