const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true
  },
  state:{
      type: Boolean,
      default: true,
      required: true
  },
  usuario:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  precio:{
      type: Number,
      default: 0
  },
  categoria:{
      type: Schema.Types.ObjectId,
      ref: 'Categoria',
      require: true
  },
  descripcion: { type : String},
  disponible: {type: Boolean, default: true},
  img: {type: String }
});
ProductoSchema.methods.toJSON = function () {
  const { __v, estado,...data } = this.toObject();
   return data;

}

module.exports = model("Producto", ProductoSchema);
