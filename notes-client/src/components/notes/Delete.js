import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class NotesDelete extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            notes:[]
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id 
        axios.get(`http://localhost:3005/notes/view/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => this.setState(() => ({ notes: response.data })))
    }


    handleRemove = () => {
        const confirm = window.confirm("Are you sure?")
        if(confirm) {
            const id = this.props.match.params.id 
            axios.delete(`http://localhost:3005/notes/delete/${id}`, {
                headers: {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            .then(response => {
                this.props.history.push('/notes/view')
            })
        }
    }

    render()
    {
        return(
            <div>
                    <h3>Delete</h3>
                <Link to="/notes/view">back</Link>
                
                <button onClick={() => {
                    this.handleRemove()
                }}>remove</button>
            </div>
        )
    }
}
export default NotesDelete