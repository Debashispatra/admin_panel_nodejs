const app=require('./server/server')
let mongoConnect = require('./config/db')
const port=8000


mongoConnect.then(()=>{
    app.listen(port,()=>{
        console.log(`server started at ${port}`);
        console.log("MongoDB connected");
    })
}).catch(err=>{
    console.log("Error occured---.",err);
})

// const products = [
//     { id: 1, name: 'Product 1' },
//     { id: 2, name: 'Product 2' },
//     { id: 3, name: 'Another Product' },
//   ];
  
//   app.get('/search', (req, res) => {
//     const keywords = req.query.keywords;
//     const filteredProducts = products.filter(product =>
//       product.name.toLowerCase().includes(keywords.toLowerCase())
//     );
//     res.json(filteredProducts);
//   });
