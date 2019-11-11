var mongoose = require("mongoose");

var presupuestoSchema = mongoose.Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  auto: String,
  numPresupuesto: Number,
  manoDeObraTotal: Number,
  repuestosTotal: Number,
  importeTotal: Number,
  items: [
    {
      lista: Number,
      codigo: Number,
      descripcion: String,
      importe: Number,
      cantidad: Number,
      tipo: String
    }
  ]
});

module.exports = mongoose.model("Presupuesto", presupuestoSchema);