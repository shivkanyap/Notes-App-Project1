const express=require('express')
const router=express.Router()
const Category=require('../models/Category')
const Note=require('../models/Category')
const { authenticateUser} = require('../middleware/authentication')

//localhost:3005/category/add
router.post('/add', authenticateUser,(req,res)=>{
    const body=req.body
    const category=new Category(body)
    console.log(body)
    category.save()
    .then(category=>res.send(category))
    .catch(err=>res.send(err))
})

//localhost:3005/category/viewall
router.get('/viewall', authenticateUser,(req,res)=>{
    Category.find()
    .then(category=>res.send(category))
    .catch(err=>res.send(err))

})
// localhost:3005/category/view/:id
router.get('/view/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    Category.findById(id)
    .then((category)=>{
        if(category)
        {
            res.send(category)
        }
        else{
            res.send({ })
        }
    })
    .catch(err=>res.send(err))
})
//localhost:3005/category/edit/:id 
router.put('/edit/:id',authenticateUser,(req,res)=>{
    const id=req.params.id
    const body=req.body
    Category.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then(category=>{
        res.send(category)
    })
    .catch(err=>{
        res.send(err)
    })

    
})
// localhost:3005/category/delete/:id
router.delete('/delete/:id',authenticateUser,(req,res)=>{
    const id=req.params.id
    Category.findByIdAndDelete(id)
    .then(category=>{
        res.send({
            category,
            notice:"successfully deleted the  category"
        })

    })
    .catch(err=>res.send(err))
})


module.exports={
    categoryRouter:router
}