const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  price: {
    type: Currency,
    required: true,
  },
  featured: { type: Boolean, required: true },
  description: {
    type: String,
    required: true,
  },
});

let Promos = mongoose.model("Promotion", promotionSchema);

module.exports = Promos;
