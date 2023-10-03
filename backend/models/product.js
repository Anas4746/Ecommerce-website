
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    },
    image: {
        type: String
    },
    description: {
        type: String,
        // enum: [
        //     "None", "Fruits", "Vegetables", "Fresh Herbs",
        //     "Milk", "Cheese", "Yogurt", "Butter",
        //     "Chicken", "Beef", "Pork", "Fish", "Shrimp", "Deli Meats",
        //     "Bread", "Rolls", "Bagels", "Pastries",
        //     "Cereal", "Pasta", "Rice", "Canned Goods", "Condiments",
        //     "Chips", "Cookies", "Crackers", "Nuts", "Granola Bars",
        //     "Water", "Juice", "Soda", "Coffee", "Tea",
        //     "Frozen Vegetables", "Frozen Fruits", "Frozen Meals", "Ice Cream",
        //     "Flour", "Sugar", "Baking Powder", "Chocolate Chips", "Vanilla Extract",
        //     "Beans", "Tomatoes", "Soup", "Tuna",
        //     "Ketchup", "Mustard", "Mayonnaise", "Soy Sauce", "Hot Sauce",
        //     "Salt", "Pepper", "Basil", "Oregano", "Cinnamon",
        //     "Olive Oil", "Vegetable Oil", "Balsamic Vinegar", "Apple Cider Vinegar",
        //     "Cereal", "Oatmeal", "Granola",
        //     "Baby Food", "Diapers", "Baby Wipes",
        //     "Paper Towels", "Toilet Paper", "Cleaning Supplies",
        //     "Shampoo", "Soap", "Toothpaste", "Deodorant",
        //     "Vitamins", "First Aid Supplies", "Pain Relievers",
        //     "Pet Food", "Pet Treats", "Cat Litter",
        //     "Asian Foods", "Mexican Foods", "Middle Eastern Foods",
        //     "Organic Produce", "Natural Snacks", "Organic Dairy",
        //     "Gluten-Free Breads", "Gluten-Free Pasta", "Gluten-Free Snacks",
        //     "Gourmet Cheeses", "Artisan Breads", "Imported Foods",
        //     "Beer", "Wine", "Spirits",
        //     "Batteries", "Light Bulbs", "Trash Bags",
        //     "T-shirts", "Shirts", "Blouses", "Tank Tops", "Sweaters", "Hoodies", "Sweatshirts", "Cardigans",
        //     "Jeans", "Pants", "Leggings", "Shorts", "Skirts", "Trousers", "Joggers"
        // ]

    },
    farm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;