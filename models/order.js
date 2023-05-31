const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const orderSchema = new Schema(
  {
    partId: {
      type: Array,
      ref: "part",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    close: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

orderSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  partId: Joi.array().items(Joi.string()),
});

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

const schemas = {
  addSchema,
  // updateFavoriteSchema,
};

const Order = model("order", orderSchema);

module.exports = {
  Order,
  schemas,
};
