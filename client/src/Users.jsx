import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function Users() {

  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3010')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err))
  })

  const handleDelete = (id) => {
    axios.delete('http://localhost:3010/deleteUser/' + id)
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='d-flex vh-100 bg-warning justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <Link to="/create" className='btn btn-success '>Addition +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => {
                return <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td>
                    <Link to={`/Update/${user._id}`} className='btn btn-primary'>Update</Link>
                    <button className='btn btn-primary margin-left'
                      onClick={(e) => handleDelete(user._id)}> Delete </button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
