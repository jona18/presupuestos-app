var mongoose = require("mongoose");

var autoSchema = mongoose.Schema({
  id: Number,
  descripcion: String,
  listamo: Number,
  listare: Number,
  listapf: Number,
  listatf: Number
});

module.exports = mongoose.model("Auto", autoSchema, "autos");