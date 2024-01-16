import React from 'react'
import "./Home.css"
import { FaUserAlt} from 'react-icons/fa'
function Home() {
  return (
    
        <div className='content container mt-3'>
            <div className='row'>
                <div className='col-md-3 text-white col bg-success d-flex 
                    justify-content-around px-1 py-3 rounded'>
                    <p>Users</p>
                    <FaUserAlt />
                </div>
                <div className='col-md-3 text-white col bg-warning d-flex 
                    justify-content-around px-1 py-3 rounded'>
                    <p>Support Agents</p>
                    <FaUserAlt />
                </div>
                
            </div>
          

          <h2>Users</h2>  
            <table class="table w-50">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Update</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1,001</td>
                        <td>John</td>
                        <td>
                            <button class="btn btn-danger">Remove</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Sam</td>
                        <td>
                        <button class="btn btn-danger">Remove</button> </td>
                    </tr>
                    <tr>
                        <td>1,001</td>
                        <td>Robert</td>
                        <td>
                        <button class="btn btn-danger">Remove</button> </td>
                    </tr>
                    
                </tbody>
            </table>

        </div>
    
  )
}

export default Home