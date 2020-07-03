const express=require('express')
const router=express.Router()
const {usersRouter}=require('../app/controllers/UsersController')
const {notesRouter}=require('../app/controllers/NotesController')
const {categoryRouter}=require('../app/controllers/CategoryController')

router.use('/users',usersRouter)
router.use('/notes',notesRouter)
router.use('/category',categoryRouter)

module.exports={
    routes:router
}