
const express = require('express');
const app = express();
const methodoverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');;
const multer = require('multer');
var cors = require('cors')
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ShopAndProductReact', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connect with Mongo');
    })
    .catch(err => {
        console.log(`Find an error in Mongo connection`);
        console.log(err);
    });

const path = require('path');
const Product = require('./models/product');
const Farm = require('./models/farm');
const User = require('./models/register');
const { read } = require('fs');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodoverride('_method'));
const sessionOption = { secret: 'secret', resave: false, saveUninitialized: false }
app.use(session(sessionOption));
app.use(flash());
const secret = "Thisiswebtokensecret"
app.use(express.static(path.join(__dirname, '../backend')));

app.use(cors())

// app.use(express.static('public'))
// app.get('/farms', express.static('index'));

app.use((req, res, next) => {
    res.locals.ShopAdded = req.flash('add');
    res.locals.loginError = req.flash('loginError');
    res.locals.userlogin = req.flash('user_id');
    next();
});

app.listen(5000, () => {
    console.log("Get request");
});

var isOwner = false;

// User Request render

app.get('/register', (req, res) => {
    var emailtake = ""
    res.render('user/register', { emailtake });
})

app.post('/register', async (req, res) => {

    const { email, password } = req.body;
    const userexist = await User.findOne({ email: email });
    if (!userexist) {
        const hash = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hash
        })
        await user.save();
        req.session.user_id = user._id;
        req.session.user_login = true;
        //res.redirect('/farms');

        var authtoken = jwt.sign({ user_id: user._id }, secret);
        success.success = true
        res.status(200).json({ success, authtoken })
    } else {
        var usertake = "*email taken"
        //res.render('user/register', { usertake })
        // success.success = false
        res.status(400).json({ success, usertake })

    }
});

app.get('/login', (req, res) => {
    res.render('user/login');
})

const loginRequire = (req, res, next) => {
    //console.log(req.session.user_id);
    if (req.session.user_id) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// app.get('/secret', loginRequire, (req, res) => {
//     res.render('user/secret');
// })

const verifyUser = async (req, res) => {
    let success = { success: false }
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            req.session.user_id = user._id;
            //console.log(req.session.user_id)

            var authtoken = jwt.sign({ user_id: user._id }, secret);
            success.success = true
            res.status(200).json({ success, authtoken })

            //next();

        } else {
            // req.flash('loginError', '*Invalid email or password');
            // res.redirect('/login');
            res.status(400).json({ success, "error": '*Invalid email or password' });
        }
    } else {
        // req.flash('loginError', '*Invalid email or password');
        // res.redirect('/login');
        res.status(500).send({ success, "error": '*Invalid email or password' });
    }

}

app.post('/login', verifyUser, (req, res) => {
    //res.status(500).send(req.body)
    req.flash('loginError', '');
    res.redirect('/farms');

})

app.post('/logout', (req, res) => {
    //console.log(req.session.user_id)
    req.session.user_id = false;
    res.redirect('/farms')
})

const getUser = async (req, res, next) => {

    const token = req.header('auth-token')
    // console.log(req.header('auth-token'))
    // console.log(token)
    if (!token) {
        console.log('token nhi hai.')
        return res.status(200).json({ "error": 'Please Login' })
    }
    try {
        const data = jwt.verify(token, secret);
        req.user = data.user_id
        next()
    } catch (error) {
        // console.error('JWT Verification Error:', error);
        res.status(401).json({ "error": 'Invalid token' });
    }
}

app.post('/getuser', getUser, async (req, res) => {
    try {
        const userId = req.user
        const user = await User.findById(userId).select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ 'error': 'Internal server error' })
    }
})

// User CartProducts

app.post('/cartProduct', getUser, async (req, res) => {
    try {
        const user_id = req.user
        const { cartProduct, quantity } = req.body
        // console.log(cartProduct)
        const user = await User.findById(user_id).populate('cartProduct.product')
        const product = await Product.findById(cartProduct)
        const existingCartItem = user.cartProduct.find(cart => cart.product._id.equals(cartProduct));
        if (existingCartItem) {
            return res.json({ 'CartPosition': 'This product is already added in your cart.' });
        }
        user.cartProduct.push({ product: cartProduct, quantity: quantity, price: product.price })   // Add here the quantity property in Product
        await user.save()
        // console.log(user)
        res.json(user)
    } catch (error) {
        res.status(500).json({ 'error': 'Internal server error', error })
    }
})

app.get('/cartProduct', getUser, async (req, res) => {
    try {
        const user_id = req.user
        const user = await User.findById(user_id).populate('cartProduct.product')
        // console.log(user.cartProduct)
        res.json({ cartProduct: user.cartProduct })
    } catch (error) {
        res.status(500).json({ 'error': 'Internal server error' })
    }
})

app.delete('/cartProduct/:id', getUser, async (req, res) => {
    try {
        const user_id = req.user;
        const { id } = req.params;

        const user = await User.findById(user_id);

        // Find the index of the item with the given id within the cartProduct array
        const index = user.cartProduct.findIndex(cartItem => cartItem.product._id.equals(id));

        if (index !== -1) {
            // Remove the item from the cartProduct array and associated quantity
            user.cartProduct.splice(index, 1);

            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ 'error': 'Product not found in the cart.' });
        }
    } catch (error) {
        res.status(500).json({ 'error': 'Internal server error', error });
    }
});

app.post('/addQuantity', getUser, async (req, res) => {
    try {
        const user_id = req.user
        const { cartProduct } = req.body
        // console.log(cartProduct)
        const user = await User.findById(user_id).populate('cartProduct.product')
        const product = await Product.findById(cartProduct)
        const existingCartItem = user.cartProduct.find(cart => cart.product._id.equals(cartProduct));
        if (existingCartItem) {
            existingCartItem.price = existingCartItem.price + product.price
            existingCartItem.quantity = existingCartItem.quantity + 1
            await user.save()
            // console.log(existingCartItem)
            // console.log(user)
            res.json(user)
        }
    } catch (error) {
        res.status(500).json({ 'error': 'Internal server error', error })
    }
})

app.post('/removeQuantity', getUser, async (req, res) => {
    try {
        const user_id = req.user
        const { cartProduct } = req.body
        // console.log(cartProduct)
        const user = await User.findById(user_id).populate('cartProduct.product')
        const product = await Product.findById(cartProduct)
        const existingCartItem = user.cartProduct.find(cart => cart.product._id.equals(cartProduct));
        if (existingCartItem) {
            if (existingCartItem.price && existingCartItem.quantity !== 1) {
                existingCartItem.price = existingCartItem.price - product.price
                existingCartItem.quantity = existingCartItem.quantity - 1
                await user.save()
                // console.log(existingCartItem)
                // console.log(user)
                res.json(user)
            }
        } else {
            res.json(user)
        }
    } catch (error) {
        res.status(500).json({ 'error': 'Internal server error', error })
    }
})

// Farms Request render

app.get('/farms', async (req, res) => {
    const islogin = req.session.user_id;
    const farms = await Farm.find({});
    res.status(200).json(farms)
    //res.render('farms/index', { farms, islogin, isOwner })

});

app.get('/farms/new', (req, res) => {
    res.render('farms/new');
});

app.get('/farms/:id', async (req, res) => {
    try {
        const farm = await Farm.findById(req.params.id).populate('products');
        // const user = await User.findById(farm.users);
        // const loginUser = req.session.user_id
        //console.log(loginUser);
        //console.log(user._id)
        const farmProducts = farm.products
        // var isOwner = loginUser == user._id ? true : false
        // res.render('farms/show', { farm, loginUser, user, isOwner });

        res.json(farmProducts)
    } catch (e) {
        res.status(500).send('Shop not found');
    }
});

const verifyShop = (req, res, next) => {
    try {
        const { name, address, email } = req.body;
        if (name && address && email) {
            next();
        }
    } catch (e) {
        res.status(400).send('Fill all details.');
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

app.post('/farms', getUser, upload.single('image'), verifyShop, async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    const img = req.file
    const farm = new Farm(req.body);
    const user = await User.findById(req.user);
    //console.log(user);
    user.farms.push(farm);
    farm.users = user;
    farm.image = img.filename;
    await user.save();
    await farm.save();
    //console.log(user)
    req.flash('add', 'Shop added');
    //res.redirect('/farms')

    res.status(200).json(farm)
})

app.put('/farms/:id', getUser, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params
        // console.log(req.body)
        // console.log(id)
        // console.log(req.file)

        const farm = await Farm.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        // console.log(farm)
        if (req.file) {
            farm.image = req.file.filename
            await farm.save()
        }
        // console.log(farm)
        //res.redirect(`/product/${product._id}`)
        // success.success = true
        res.status(200).json({ farm })
    } catch (e) {
        res.status(500).send({ e, 'Erro': 'Fill all details' })
    }
})


const verifyProduct = (req, res, next) => {
    try {
        const { name, price } = req.body;
        //console.log(name, price);

        if (!name || isNaN(price)) {
            res.status(400).send('Fill all details and use only numbers in price.');
        } else {
            next();
        }
    } catch (e) {
        res.status(400).send('Invalid input.');
    }
};

app.post('/farms/:id/product', upload.single('image'), verifyProduct, async (req, res) => {
    const { name, price, description } = req.body;
    // console.log(req.body);
    // console.log(req.file);
    const product_image = req.file.filename;
    // console.log(product_image);
    const product = new Product({ name, price, description });
    product.image = product_image;
    const farm = await Farm.findById(req.params.id);
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    // res.redirect(`/farms/${farm._id}`);

    res.status(200).json({ farm })
})

app.get('/farms/:id/products/new', loginRequire, (req, res) => {
    const { id } = req.params;
    res.render('products/new', { categories, id })
})

app.delete('/farms/:id', async (req, res) => {

    const { id } = req.params;

    try {
        // Find the farm and populate its products
        const farm = await Farm.findById(id).populate('products');

        const user = await User.findById(farm.users);

        await User.updateOne({ _id: user._id }, { $pull: { farms: farm._id } });

        // await Farm.updateOne(
        //     { _id: deleteProduct.farm }, // Specify the user by their ID
        //     { $pull: { products: deleteProduct._id } });

        // Delete all associated products

        await Product.deleteMany({ _id: { $in: farm.products.map(product => product._id) } });

        // Delete the farm itself
        await Farm.findByIdAndDelete(id);
        const Farms = await Farm.find()
        // res.redirect('/farms');
        res.status(200).json(Farms)
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the farm and products.', });
        // console.log(error)
    }
});

app.post('/userShop', getUser, async (req, res) => {
    const userId = req.user
    const user = await User.findById(userId).populate('farms')
    const userFarms = user.farms
    res.json(userFarms)
})

// Products Request render


const categories = [
    "Fruits", "Vegetables", "Fresh Herbs",
    "Milk", "Cheese", "Yogurt", "Butter",
    "Chicken", "Beef", "Pork", "Fish", "Shrimp", "Deli Meats",
    "Bread", "Rolls", "Bagels", "Pastries",
    "Cereal", "Pasta", "Rice", "Canned Goods", "Condiments",
    "Chips", "Cookies", "Crackers", "Nuts", "Granola Bars",
    "Water", "Juice", "Soda", "Coffee", "Tea",
    "Frozen Vegetables", "Frozen Fruits", "Frozen Meals", "Ice Cream",
    "Flour", "Sugar", "Baking Powder", "Chocolate Chips", "Vanilla Extract",
    "Beans", "Tomatoes", "Soup", "Tuna",
    "Ketchup", "Mustard", "Mayonnaise", "Soy Sauce", "Hot Sauce",
    "Salt", "Pepper", "Basil", "Oregano", "Cinnamon",
    "Olive Oil", "Vegetable Oil", "Balsamic Vinegar", "Apple Cider Vinegar",
    "Cereal", "Oatmeal", "Granola",
    "Baby Food", "Diapers", "Baby Wipes",
    "Paper Towels", "Toilet Paper", "Cleaning Supplies",
    "Shampoo", "Soap", "Toothpaste", "Deodorant",
    "Vitamins", "First Aid Supplies", "Pain Relievers",
    "Pet Food", "Pet Treats", "Cat Litter",
    "Asian Foods", "Mexican Foods", "Middle Eastern Foods",
    "Organic Produce", "Natural Snacks", "Organic Dairy",
    "Gluten-Free Breads", "Gluten-Free Pasta", "Gluten-Free Snacks",
    "Gourmet Cheeses", "Artisan Breads", "Imported Foods",
    "Beer", "Wine", "Spirits",
    "Batteries", "Light Bulbs", "Trash Bags",
    "T-shirts", "Shirts", "Blouses", "Tank Tops", "Sweaters", "Hoodies", "Sweatshirts", "Cardigans",
    "Jeans", "Pants", "Leggings", "Shorts", "Skirts", "Trousers", "Joggers"
]
categories.sort();

app.get('/product', async (req, res) => {
    const products = await Product.find({})
    //console.log(products)
    // res.render('products/template', { products })
    res.json(products)
})


app.post('/product', async (req, res) => {
    try {
        const newProduct = await new Product(req.body);
        await newProduct.save()
        res.redirect(`/product/${newProduct._id}`)
    } catch (e) {
        res.status(500).send('Fill all details')
    }
})

app.get('/product/new', (req, res) => {
    res.render('products/new', { categories })
})

app.get('/product/:id', loginRequire, async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id).populate('farm');
        // console.log(product)
        const farm = product.farm
        const isOwner = farm.users == req.session.user_id ? true : false
        res.render('products/show', { product, isOwner })
    } catch (e) {
        res.status(500).send('Product not found');
    }
})

app.put('/product/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        if (req.file) {
            product.image = req.file.filename
            await product.save()
        }
        // console.log(product)
        // res.redirect(`/product/${product._id}`)
        res.json(product)
    } catch (e) {
        res.status(500).send('Fill all details')
    }
})

app.get('/product/:id/edit', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        //console.log(product)
        res.render('products/edit', { product, categories })
    } catch (e) {
        res.status(500).send('Product dont found')
    }
})

app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await Product.findByIdAndDelete(id).populate('farm')
        //console.log(product)
        await Farm.updateOne(
            { _id: deleteProduct.farm }, // Specify the user by their ID
            { $pull: { products: deleteProduct._id } });
        const products = await Product.find({})
        // res.redirect(`/farms/${deleteProduct.farm._id}`);
        res.json(products)
    } catch (e) {
        res.status(500).send('Product not found');
    }
})

