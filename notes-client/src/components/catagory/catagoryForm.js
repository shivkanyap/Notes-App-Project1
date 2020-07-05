import React from 'react'

class CategoryForm extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            name:props.notes?props.notes.name:'',
            errors:props.notes?props.notes.errors:''
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formdData={
            name:this.state.name
    
        }
        this.props.handleSubmit(formdData)
    }   
    handleChange=(e)=>{
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))

    }
    render()
    {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Category Name
                    <input type="text"   name="name" value={this.state.name} onChange={this.handleChange} placeholder="person name"/>
                </label>

                <input type="submit"/>
            </form>
          
        )
    }
}
export default CategoryForm