import React from 'react'
import './NewPlace.css'

import {useForm} from 'react-hook-form'
import {Form,Button,FloatingLabel} from 'react-bootstrap'

function NewPlace() {
  
  const {register,handleSubmit,formState:{errors}} = useForm()
  let descriptionText='Give a short description about that place like location,best things to not miss out...(Minimum 250 characters)'

  const onFormSubmit = (data) =>{
    console.log(data)
  }

  return (
    <>
        <h1 className='text-center mt-2' >Add a new place</h1>
        <div className="container mt-5 ">
          <div className="row">
            <div className= "col-md-6 col-11 mx-auto new-place-area text-center mb-5" style={{height:"50%"}}>
              <h3 className='mt-3'>Add Details.</h3>
              <Form className='w-100 m-5 mx-auto' onSubmit={handleSubmit(onFormSubmit)} >
                <Form.Group className=' mb-3 mt-3'>
                <Form.Label className='float-start'>PLACE NAME</Form.Label>
                  <Form.Control size="sm" style={{background:"none",border:"1px solid black"}} className="w-100 w-md-75 w-lg-50 shadow-none " type="text" placeholder='Enter name of Place' {...register("placename",{required:true})} />
                </Form.Group>

                <Form.Group className='mb-3'>
                <Form.Label  className='float-start'>DESCRIPTION</Form.Label>
                  <Form.Control size="sm" style={{background:"none",border:"1px solid black"}} className="w-100 w-md-75 w-lg-50 shadow-none "  as="textarea" rows="5" placeholder={descriptionText} {...register("description",{required:true})} />
                </Form.Group>

                {/* destination type */}
                <Form.Group className='mb-3'>
                  <Form.Label className='float-start'>DESTINATION TYPE</Form.Label>
                  <Form.Select size="sm" style={{background:"none",border:"1px solid black"}} className="w-100 w-md-75 w-lg-50 shadow-none " htmlSize={3} {...register("destinationtype",{required:true})} >
                    <option>City</option>
                    <option>Pilgrimage</option>
                    <option>Hill Station</option>
                    <option>Historical & Heritage</option>
                    <option>Beach</option>
                    <option>WildLife</option>
                    <option>WaterFall</option>
                    <option>Nature & Scenic</option>
                    <option>Adventure / Trekking</option>
                    <option>Lake & Backwater</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                 <Form.Label className='float-start'>STATE</Form.Label>
                  <Form.Control size="sm" style={{background:"none",border:"1px solid black"}} className="w-100 w-md-75 w-lg-50 shadow-none " type="text" placeholder='Enter State' {...register("state",{required:true})} />
                </Form.Group>

                <Form.Group className='mb-3'>
                 <Form.Label className='float-start'>IMAGE URL</Form.Label>
                  <Form.Control size="sm" style={{background:"none",border:"1px solid black"}} className="w-100 w-md-75 w-lg-50 shadow-none " type="text" placeholder='Enter image URL' {...register("imageurl",{required:true})} />
                </Form.Group>

                <Button variant="outline-dark" type="submit" className='w-50 mt-3' >SUBMIT</Button>

              </Form>
            </div>
          </div>
        </div>
    </>
  )
}

export default NewPlace
