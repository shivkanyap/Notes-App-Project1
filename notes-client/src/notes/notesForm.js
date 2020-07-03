import React from 'react'

class Form extends React.Component
{
    constructor()
    {
        super()
        this.state={
            title:'',
            body:'',
            category:''
        }
    }
    handleChange=(e)=>{
        e.persist()
      this.setState(()=>({
          [e.target.name]:e.target.value
      }))
    }
    handleSubmit=(e)=>
    {
        e.preventDefault()
       const  formData={
            title:this.state.title,
            body:this.state.body,
            category:this.state.category

        }
        // axios.post('')
        console.log(formData)
        this.props.handleSubmit(formData)
    }
    render()
    {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                    <label>Title
                        <input type="text" placeholder="Enter Title" name="title" value={this.state.title}  onChange={this.handleChange}/>
                    </label>
                    </div>

                    <div>
                    <label>
                        Body
                       <textarea name="body" value={this.state.body} onChange={this.handleChange}></textarea>
                    </label>
                    </div>
                    <div>
                    <select name="category" value={this.state.category} onChange={this.handleChange}>
                        <option value=""></option>
                        {this.state.category.map((category)=>{
                            return <option key={category._id}
                        value={category._id}>{category.name}</option>
                        })}

                    </select>
                    </div>

                    <input type="button" >Submit</input>
                </form>
            </div>
        )
    }
}
 export default  Form