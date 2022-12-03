const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema(
    {
        id_kategori: {
            type: Number,
            required: true
        },
        nama_kategori: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true, versionKey: false
    }
);

const Category = mongoose.model("Category", categorySchema);