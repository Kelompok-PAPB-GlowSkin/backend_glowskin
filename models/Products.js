const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema(
    {
        nama_barang: {
            type: String,
            required: true
        },
        kategori: {
            type: Number,
            required: true
        },
        deskripsi_barang: {
            type: String,
            required: true
        },
        rating_total: {
            type: Number,
            required: true
        },
        total_favorite: {
            type: Number,
            required: true
        },
        foto_barang: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true, versionKey: false
    }
);

module.exports = mongoose.model("Products", productSchema);
