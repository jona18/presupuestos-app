var mongoose = require("mongoose");

var manoDeObraItemSchema = mongoose.Schema({
  lista: Number,
  codigo: Number,
  descripcion: String,
  importe: Number,
  cantidad: Number
});

module.exports = mongoose.model("ManoDeObraItem", manoDeObraItemSchema, "mano_de_obra");