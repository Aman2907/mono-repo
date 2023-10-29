import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function UpdateUser() {
    const { id } = useParams()
    const [name, setName] = useState()
    const [email, setEmail] = useState();
    const [age, setAge] = useState()
    const [city, setCity] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3010/getUser/' + id)
            .then(result => {
                console.log(result)
                setName(result.data.name)
                setEmail(result.data.email)
                setAge(result.data.age)
                setCity(result.data.city)
            })
            .catch(err => console.log(err))
    }, [id])

    const Update = (e) => {
        e.preventDefault()
        axios.put("http://localhost:3010/updateUser/" + id, { name, email, age, city })
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='d-flex vh-100 bg-warning justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2> Update User </h2>
                    <div className="mb-2">
                        <label htmlFor=""> Name </label>
                        <input type='text' placeholder='Enter Name' className='form-control' value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor=""> Email </label>
                        <input type='email' placeholder='Enter email' className='form-control' value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor=""> Age </label>
                        <input type='number' placeholder='Enter age' className='form-control' value={age}
                            onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor=""> City </label>
                        <input type='text' placeholder='Enter City' className='form-control' value={city}
                            onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <button className='btn btn-success'> Update </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser
