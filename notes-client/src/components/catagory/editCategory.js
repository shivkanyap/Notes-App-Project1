import React from 'react'
import CategoryForm from './catagoryForm'
import axios from 'axios'
import {Link} from 'react-router-dom'
// import { response } from 'express'

class EditCatagory extends React.Component
{
    constructor()
    {
        super()
        this.state={
            category:{},
            isLoaded:false
        }
    }
    componentDidMount()
    {
        const id=this.props.match.params.id
        console.log(id,'me in cm')
        axios.get(`http://localhost:3005/category/view/${id}`,{
            header:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>this.setState(()=>({
            category:response.data,
            isLoaded:true
        })))
    }

    handleSubmit=(formData)=>{
        const id=this.props.match.params.id
        console.log(id,'in handleSubmit')
        console.log(formData,'in form')
        axios.put(`http://localhost:3005/category/edit/${id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log(response,'in res')
            if(response.data.hasOwnProperty('error'))
            {
                response.send(response.data.errors)
            }
            else
            {
                this.props.history.push(`/category/viewall`)
   
            }
        })

    }
    render()
    {
        return(
            <div>
                <h2>Edit category</h2>
               {this.state.isLoaded &&  <CategoryForm handleSubmit={this.handleSubmit} category={this.state.category}/> }
                <Link  to="/category/viewall">back</Link>

            </div>
        )
    }
      
    
}
export default EditCatagory