const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const partSchema = new Schema(
  {
    Brand: {
      type: String,
      required: [true, "Set Brand"],
    },
    Model: {
      type: Array,
      required: [true, "Set Model"],
    },
    Articul: {
      type: String,
      required: [true, "Set Articul"],
    },
    Part_Name: {
      type: String,
      required: [true, "Set Name"],
    },
    Description: {
      type: String,
    },
    Price: {
      type: String,
      default: "Ціну уточняйте",
    },
    Img: {
      type: String,
      default:
        "https://dummyimage.com/640x480/2a2a2a/ffffff&text=%D0%A4%D0%BE%D1%82%D0%BE+%D0%BE%D1%87%D1%96%D0%BA%D1%83%D1%94%D1%82%D1%8C%D1%81%D1%8F",
    },
    In_stock: {
      type: String,
      default: "&",
    },
    Country: {
      type: String,
      default: "Китай",
    },
    Quantity: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

partSchema.post("save", handleMongooseError);

// module.exports = Contact;

const addSchema = Joi.object({
  Brand: Joi.string().required(),
  Model: Joi.array().items(Joi.string()).required(),
  Articul: Joi.string().required(),
  Part_Name: Joi.string().required(),
  Description: Joi.string().required(),
  Price: Joi.string(),
  Img: Joi.string(),
  In_stock: Joi.string(),
  Country: Joi.string(),
  Quantity: Joi.string(),
});

const addManySchema = Joi.array({
  Brand: Joi.string().required(),
  Model: Joi.array().items(Joi.string()).required(),
  Articul: Joi.string().required(),
  Part_Name: Joi.string().required(),
  Description: Joi.string().required(),
  Price: Joi.string(),
  Img: Joi.string(),
  In_stock: Joi.string(),
  Country: Joi.string(),
  Quantity: Joi.string(),
});

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

const schemas = {
  addSchema,
  addManySchema,
  // updateFavoriteSchema,
};

const Part = model("part", partSchema);

module.exports = {
  Part,
  schemas,
};
