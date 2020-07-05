import React from 'react'
// import AddCategory from '../catagory/addCategory'
import NotesForm from './Form'
import axios from 'axios'

class AddNote extends React.Component
{

    handleSubmit=(formData)=>{
        console.log(formData,'kanya formdata')
        axios.post('http://localhost:3005/notes/add',formData,{
            headers:{
                'x-auth':localStorage.getItem('token')

            }
        })
       
        .then(response=>{
            // alert(response,'in add note')
            if(response.data.hasOwnProperty('errors')){
                response.send(response.data.errors)
            }else{
                this.props.history.push(`/notes/view`)
            }
            
        })
    }
    render()
    {
        return(
            <div>
                <h2>Add note</h2>
                 <NotesForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
export default AddNote