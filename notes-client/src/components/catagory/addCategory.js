import React from 'react'
import CategoryForm from './catagoryForm'
import axios from 'axios'

class AddCategory extends React.Component{

    // constructor(props){
    //     super(props)
    // }
    handleSubmit=(formData)=>{
        // console.log(FormData)
        axios.post('http://localhost:3005/category/add',formData,{
            headers:{
                'x-auth':localStorage.getItem('token')

            }
        })
       
        .then(response=>{
            this.props.history.push(`/category/viewall`)
        })
    }
    render()
    {
        return(
            <div>
                <h3>Add Category</h3>
                <CategoryForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
export default AddCategory