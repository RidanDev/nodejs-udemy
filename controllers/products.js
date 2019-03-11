const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  /*The fetchAll function gets a callback as an input.
    The callback allows me to get the data as soon as they are ready.

    The previous code didn't work cause the fetchAll() had an async code inside.
    It means that the fetchAll() function ended its excecution before having the fileContent.
    That happened because the fs.readFile method is Asynchronous, it means that it will be executed
    in the future, we don't know when, so the fetchAll function doesn't wait it to be completed.

    Using a callback as a parameter of the fetchAll function does the trick!
    This way the function holds the data as a parameter.

    
    OLD SOLUTION -> THROWS ERROR
    ----------------------------
    static fetchAll() {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        )
        //async code below this line!!!
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return []
            } else {
                return JSON.parse(fileContent)
            }
        })
    }
    
    NEW SOLUTION -> OK
    ----------------------------
    static fetchAll(cb) {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        )
        //Used the callback to solve it!!! :D
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([])
            } else {
                cb(JSON.parse(fileContent))
            }
        })
    }

    Below I can finally be sure to get my products using the callback!
    
    Product.fetchAll(products => {prods: products})
    */

  Product.fetchAll(products => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
