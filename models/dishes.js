const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;
/* Comments Schema */

/* Dishes Schema */

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: { type: String, required: true },
    category: { type: String, required: true },
    label: { type: String, default: "" },
    price: { type: Currency, requred: true, min: 0 },
    featured: { type: Boolean, default: false },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes;
