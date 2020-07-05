import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
// import { render } from 'react-dom'

class DeleteCategory extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            category:{}
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id 
        axios.get(`http://localhost:3005/category/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => this.setState(() => ({ category: response.data })))
    }


    handleRemove = () => {
        const confirm = window.confirm("Are you sure?")
        if(confirm) {
            const id = this.props.match.params.id 
            axios.delete(`http://localhost:3005/category/delete/${id}`, {
                headers: {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            .then(response => {
                this.props.history.push('/category/viewall')
            })
        }
    }

    render()
    {
        return(
            <div>
                <h3>Delete</h3>
                <Link to="/category">back</Link>
                
                <button onClick={() => {
                    this.handleRemove()
                }}>remove</button>

            </div>
        )
    }

}
export default DeleteCategory