const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const contactController = require('../controllers/contactController');

// Home page route:-
router.get('/', (req, res) => {
    res.render('home')
});

// About page route:-
router.get('/about', (req, res) => {
    res.render('about')
});

// Contact page routes:-
router.get('/contact', contactController.getContactPage);
router.post('/contact', contactController.postContactForm);

// Product page routes:-
router.get('/products', productController.getProducts);
router.get('/products/add', (req, res) => res.render('add-product'));
router.post('/products/add', productController.addProduct);
router.get('/products/edit/:id', productController.getEditProductForm);
router.post('/products/edit/:id', productController.updateProduct);
router.post('/products/delete/:id', productController.deleteProduct);

module.exports = router;


module.exports = router;