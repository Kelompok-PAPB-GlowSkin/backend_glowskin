const mongoose = require("mongoose");
const schema = mongoose.Schema;

const favoriteSchema = new schema(
    {
        id_akun : {
            type: String,
            required: true
        },
        id_barang: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true, versionKey: false
    }
);

module.exports = mongoose.model("Favorites", favoriteSchema);
