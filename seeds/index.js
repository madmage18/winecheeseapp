const mongoose = require('mongoose');
//const methodOverride = require('method-override');
const Maker = require('../models/maker');
const initialSeeds = require('./seeds');
require('dotenv').config();
// the above used to seed cloud database manually.

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Maker.deleteMany({});
    for (let i = 0; i < 18; i++) {
        const make = new Maker({
            makername: `${initialSeeds[i].makername}`,
            makertype: `${initialSeeds[i].makertype}`,
            city: `${initialSeeds[i].city}`,
            state: `${initialSeeds[i].state}`,
            geometry: {
                type: "Point",
                coordinates: initialSeeds[i].longLat
            },

            images: [
                {
                    url: `${initialSeeds[i].url}`,
                    filename: `${initialSeeds[i].filename}`
                }
            ],


            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            products: `${initialSeeds[i].products}`,
            website: `${initialSeeds[i].website}`,
            submittedBy: '60b2a5082d08ed001501a2f1'
        })
        await make.save();

    }
}
seedDB().then(() => {
    mongoose.connection.close()
})

