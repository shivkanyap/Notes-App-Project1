import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ListNotes extends React.Component
{
    constructor()
    {
        super()
        this.state={
            notes:[]
        }
    }
    componentDidMount()
    {
        axios.get('http://localhost:3005/notes/view', {
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log(response.data,'in list response')
            this.setState(()=>({
                notes:response.data
            }))
        })

    }
    render()
    {
        return(
            <div>
                <h2>Listing Notes - {this.state.notes.length}</h2>
                {this.state.notes.length === 0?(
                    <div>
                        No notes found
                    </div>
                ):(
                    <ul>
                        {this.state.notes.map(note=>{
                            console.log(note,'in notes list')
                            return <li key={note._id}>
                                { <h2>Title :{note.title}</h2>}
                                {<h4>Body  :{note.body}</h4>}
                                 {<h4>category : {note.category.name}</h4>}
                                {/* <Link to ={`/notes/${note._id}`}>
                               
                            </Link> */}
                            <Link to={`/notes/delete/${note._id}`}> 
                                                Remove
                                            </Link>
                            <Link to={`/notes/edit/${note._id}`}> 
                                                Edit
                            </Link>
                            
                            </li>
                        })}
                    </ul>
                    

                )}
                <Link  to="/notes/add">Add Notes</Link>
            </div>
        )
    }
}

export default ListNotes