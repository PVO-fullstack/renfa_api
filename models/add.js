const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const addSchema = new Schema(
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

addSchema.post("save", handleMongooseError);

const addNewSchema = Joi.object({
  partId: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      ordered: Joi.number(),
    })
  ),
});

const updateCloseSchema = Joi.object({
  close: Joi.boolean().required(),
});

const schemas = {
  addNewSchema,
  updateCloseSchema,
};

const Add = model("add", addSchema);

module.exports = {
  Add,
  schemas,
};
