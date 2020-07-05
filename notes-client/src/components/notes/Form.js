import React from 'react'
import axios from 'axios'

class NotesForm extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            title:'',
            body:'',
            category:'',
            categories:[],
            user_id:''
            // errors:''
        }
    }
    handleChange=(e)=>{
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))

    }
    handleSubmit=(e)=>{
        e.preventDefault()
        
        
        const formData={
            title:this.state.title,
            body:this.state.body,
            category:this.state.category,
            user:this.state.user_id    
        }
    //    console.log(formData)
        this.props.handleSubmit(formData)
    }
    
    componentDidMount()
    {
      axios.get('http://localhost:3005/category/viewall',{
          headers:{
              'x-auth':localStorage.getItem('token')
          }
      })

      .then((response)=>{
          console.log(response,'in category')
          this.setState(()=>({
              categories:response.data
              
          }))
      })
      axios.get('http://localhost:3005/users/account',{
          headers:{
            'x-auth':localStorage.getItem('token')
          }
      })
      .then (response=>{
        console.log(response.data._id,'mine ide')
        const user_id=response.data._id
        this.setState(()=>({
            user_id:user_id
        }) )//when our current value doesn't depend on previous value, that time 

    })
    }
    render()
    {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    title
                    <input type="text"   name="title" value={this.state.title} onChange={this.handleChange} placeholder="enter title"/>
                </label><br/>

                <label>
                    Body
                    
                    <textarea  name="body" value={this.state.body} onChange={this.handleChange}></textarea>
                </label><br/>

               
                <label>
                    category
                    <select name="category" value={this.state.category}  onChange={this.handleChange}>
                        <option value=" "> Select   </option>
                        {this.state.categories.map((category)=>{
                            return <option key={category._id}
                            value={category._id}>{category.name}</option>
                        })}


                    </select>
                </label><br/>
                    {/* <h1>{this.state.user._id}</h1> */}






                <input type="submit"/>
            </form>
          
        )
    }
}
export default NotesForm