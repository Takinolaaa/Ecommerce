var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT product_id, productname, prodimage, supplier_id, category_id, prodprice, status, homepage FROM product";
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
}
res.render('product/allrecords', {allrecs: result });
    });

});


// ==================================================
// Route to view one specific record. Notice the view is one record
// URL:  http//localhost:3018/7/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    
    let query = "SELECT product_id, productname, prodimage, description, supplier_id,category_id, subcategory_1, subcategory_2, dimensions, prodprice, status, homepage FROM product WHERE product_id = " + 
    req.params.recordid;



    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('product/onerec', {onerec: result[0] });
    }
    });
    
});

// ==================================================
// Route to show empty form to obtain input form end-user.
//URL: http://localhost:3018/product/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('product/addrec');
    });


    
// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO product (productname, prodimage, description, supplier_id, category_id, subcategory_1, subcategory_2, dimensions, prodprice, status, homepage) VALUES (?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?)";

    var hmpage = 0;
    if (req.body.homepage)
    {hmpage = 1;} 



    db.query(insertquery,[req.body.productname, req.body.prodimage, req.body.description,
    req.body.supplier_id, req.body.category_id, req.body.subcategory_1, req.body.subcategory_2,
    req.body.dimensions, req.body.prodprice, req.body.status, hmpage],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/product');
    }
    });
});



// ==================================================
// Route to edit one specific record.
// URL:http://localhost:3018/product/7/edit
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT product_id, productname, prodimage, description, supplier_id,category_id, subcategory_1, subcategory_2, dimensions, prodprice, status, homepage FROM product WHERE  product_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('product/editrec', {onerec: result[0] });
    }
    });
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE product SET productname = ?, prodimage = ?, description = ?,supplier_id = ?, category_id = ?, subcategory_1 = ?, subcategory_2 = ?, dimensions = ?, prodprice = ?, status = ?, homepage = ? WHERE product_id = " + req.body.product_id;

    var hmpage = 0;
if (req.body.homepage)
{hmpage= 1;}

    db.query(updatequery,[req.body.productname, req.body.prodimage, req.body.description,
    req.body.supplier_id, req.body.category_id, req.body.subcategory_1, req.body.subcategory_2,
    req.body.dimensions, req.body.prodprice, req.body.status, hmpage],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/product');
    }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM product WHERE product_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/product');
    }
    });
  
})





module.exports = router;