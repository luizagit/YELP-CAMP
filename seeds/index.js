const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62541f895fda69e501728472',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores natus aliquid sapiente repudiandae aut aliquam cumque ipsum minima animi. Facilis, repellat quidem. Fugit eligendi esse, delectus unde voluptatibus minus tempore',
            price,
            images: [{
                    url: 'https://res.cloudinary.com/dw6ehf3rd/image/upload/v1653574838/Yelp-Camp/prnqczy4kyzazzf97rcl.jpg',
                    filename: 'Yelp-Camp/prnqczy4kyzazzf97rcl.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dw6ehf3rd/image/upload/v1653586922/Yelp-Camp/y5f1uhse4n8p3wmo0wgj.jpg',
                    filename: 'Yelp-Camp/y5f1uhse4n8p3wmo0wgj.jpg'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})