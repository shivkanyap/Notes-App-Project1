const express=require('express')
const Notes=require('../models/Notes')
const { authenticateUser}=require('../middleware/authentication')
const router=express.Router()
const {adminAccess}=require('../middleware/acess')
// const { Router } = require('express')

//  localhost://3005/notes/add
router.post('/add', authenticateUser,(req,res)=>{
    const body=req.body
    const note =new Notes(body)
    // console.log(note,'me in note')
    // note.user=user._id
    // console.log(body)
    note.save()
    .then(note=>res.send(note))
    .catch(err=>res.send(err))
})
router.get('/allnotes',authenticateUser,adminAccess,(req,res)=>{
    // const {user}=req
    Notes.find()
    .then(notes=>{
        res.send(notes)
    })
    .catch(err=>{
        res.send(err)
    });


})
//localhost:3005/notes/view
router.get('/view',authenticateUser,(req,res)=>{
    Notes.find({user:req.user._id}).populate('category')
    .then(notes=>res.send(notes))
    .catch(err=>res.send(err))


})
//localhost:3005/notes/view/:id(show)

router.get('/view/:id',authenticateUser,(req,res)=>{
    const id=req.params.id
    Notes.findOne({user:req.user._id,_id:id}).populate('category')
    .then(note=>{
        if(note)
        {
            res.send(note)
        }
        else{
            res.send({})
        }
    })
    .catch(err=>{
        res.send(err)
    })
})
//localhost:3005/notes/edit/:id
router.put('/edit/:id',authenticateUser,(req,res)=>{
    const id=req.params.id
    const body=req.body
    Notes.findByIdAndUpdate({user:req.user._id,_id:id},body,{new:true,runValidators:true})
    .then(note=>{
        res.send(note)
    })
    .catch(err=>{
        res.send(err)
    })
    
})
//localhost:3005/notes/delete/:id
router.delete('/delete/:id',authenticateUser,(req,res)=>{
    const id=req.params.id
    Notes.findByIdAndDelete({user:req.user._id,_id:id})
    .then(note=>{
        if(note){
            res.send({note,notice:"succesfully deleted this note"})
        }
        else{
            res.send({})
        }
       
    })
    .catch(err=>{
        res.send(err)
    })
})

module.exports={
    notesRouter:router
}