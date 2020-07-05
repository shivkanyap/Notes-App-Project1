import React from 'react' 
import { Link } from 'react-router-dom'
import axios from 'axios'

class CategoryList extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3005/category/viewall', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState(() => ({
                    categories: response.data
                }))
            })
    }
    render() {
        return (
            <div>
                <h2>Listing Categories - { this.state.categories.length } </h2>

                { this.state.categories.length === 0 ? (
                    <div>
                        No category found. Add your first category 
                    </div>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th> # </th>
                                <th> Name </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.categories.map((category, index) => {
                                return (
                                    <tr key={category._id}> 
                                        <td> { index + 1 } </td> 
                                        <td> {category.name}  </td> 
                            
                                        <td>
                                            <Link to={`/category/edit/${category._id}`}> 
                                                Edit
                                            </Link><br/>
                                            <Link to={`/category/delete/${category._id}`}> 
                                                Remove
                                            </Link>
                                        </td> 

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    
                ) } 

                <Link to="/category/add" className="btn btn-primary"> Add Category </Link>
            </div>
        )
    }
}

export default CategoryList