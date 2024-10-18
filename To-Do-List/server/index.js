const express = require("express");
const fs = require("fs");
var cors = require('cors');
const app = express();
// const { v4: uuidv4 } = require('uuid');

app.use(cors())
app.use(express.json())


// fetch products:-
app.get("/getproduct", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.send(data);
            // res.end("okay");
        }
    })
})

// get particular data using id:-
app.get("/product/:id", (req, res) => {
    const { id } = req.params;
  
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            const products = JSON.parse(data);
            const [singleproduct] = products.filter((el)=>el.id==id);
          
            if (singleproduct) {
                res.send(singleproduct);
            } else {
                res.send("Product not found");
            }
        }
    });
});       


// delete products:-
app.delete("/deleteproduct/:id", (req, res) => {
    const { id } = req.params;

    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let newdata = JSON.parse(data)
            const updatedProducts = newdata.filter((el) => el.id != id);

            fs.writeFile("./db.json", JSON.stringify(updatedProducts), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Product deleted successfully");
                }
            });
        }
    })
})


// update products:-
app.patch("/updateproduct/:productid", (req, res) => {
    const { productid } = req.params;

    fs.readFile("./db.json", "utf-8", (err, data) => {
        let newdata = JSON.parse(data);
        const index = newdata.findIndex((el) => el.id == productid)

        if (index != -1) {
            newdata[index] = { ...newdata[index], ...req.body };
            fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Product updated successfully");
                }
            });

        }
        else {
            res.end("err");
        };
    });

});


// post products:-
app.post("/addproduct", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let products = JSON.parse(data);
            const newProduct = req.body;
            // newProduct.id = uuidv4(); 
            newProduct.id = products.length + 1;
            products.push(newProduct);

            fs.writeFile("./db.json", JSON.stringify(products), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ message: "product added ..!", id: newProduct.id });
                }
            })
        }
    })
});


app.listen(8081, () => {
    console.log("server is running on port 8081");
})