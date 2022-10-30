const express = require ('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

//init app
const app = express()
app.use(express.json())

//db connection
let db

connectToDb(()=> {
   /* if (!err) {
        app.listen(8000, () => {
            console.log('app listening port 8000')
        })
        db = getDb()
    }*/

    db = getDb()

})



//route
app.get('', (req,res) => {
    let parts = []

    db.collection('parts')
        .find()
        .sort({part_description: 1})
        .forEach(part => parts.push(part))
        .then(() => {
            res.status(200).json(parts)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the documents'})
        })

 //res.json({mssg: "welcome to the parts internet"})     
}) 

app.get('/:id', (req, res) =>{

    if (ObjectId.isValid(req.params.id)){
        db.collection('parts')
        .findOne({_id: ObjectId(req.params.id)})
        .then(doc=>{
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: 'could not fetch documents'})
        })
    } else {
        res.status(500).json({error: 'Not a valid doc Id'})
    }
    
})

app.post('',(req, res) => {
 const part = req.body

 db.collection('parts')
    .insertOne(part)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'could not create a new doc'})
    })
})

module.exports = app;