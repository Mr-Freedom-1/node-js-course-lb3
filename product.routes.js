const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
   return response.json(products);
});

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params; // Access the brand parameter from the URL

   // Filter products based on the brand parameter
   const filteredProducts = products.filter(product => product.brand === brand);

   response.json(filteredProducts); // Send the filtered products as a JSON response
});

router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ")
   err.statusCode = 400
   throw err
});

router.get('/products/:id', (request, response) => {
   const { id } = request.params; // Access the id parameter from the URL

   // Find the product with the specified ID
   const product = products.find(product => product.id === parseInt(id));

   if (product) {
      response.json(product); // Send the product as a JSON response
   } else {
      response.status(404).json({ error: 'Product not found' }); // If the product is not found, return a 404 error
   }
});

module.exports = router;