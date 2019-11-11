var mongoose = require("mongoose");

var counterSchema = mongoose.Schema({
  _id: String,
  valor: Number

});

module.exports = mongoose.model("Counter", counterSchema);