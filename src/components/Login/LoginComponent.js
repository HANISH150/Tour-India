import React from 'react'
import './LoginComponent.css'

import {useForm} from 'react-hook-form'
import {Form,Button} from 'react-bootstrap'
import {MdLogin} from "react-icons/md";
import {userLogin} from '../../slices/UserSlice'
import {useDispatch,useSelector} from 'react-redux' 
import {useNavigate} from 'react-router-dom'

function LoginComponent() {
    let navigate = useNavigate()
    const {register,handleSubmit,formState:{errors}} = useForm()
    const {userObj,isError,isSuccess,errMsg,isLoading} = useSelector(state=>state.user)
    let dispatch = useDispatch()
    const onFormSubmit = (loginData) =>{
        dispatch(userLogin(loginData))
        if(errMsg!=""){
          alert(errMsg)
        }
    }
    if(isSuccess===true){
      navigate('/')
    }
    let userTheme = useSelector(state=>state.theme)

  return (
    <div className='login-body'>
      <h3 className={`login-text ${userTheme && 'text-light'}`} >LOGIN</h3>
      {/* login form */}
      <Form className='w-75 mx-auto' onSubmit={handleSubmit(onFormSubmit)} >
        {/* username */}
        <Form.Group className='mt-3'>
            <Form.Label className={`login-text ${userTheme && 'text-light'}`}>UserName</Form.Label>
            <Form.Control type="text" className='change' placeholder='Enter your UserName' {...register("username",{required:true})} />
            {errors.username && <p className='login-text text-danger'>*UserName is required</p> }
        </Form.Group>
        {/* password */}
        <Form.Group className='mt-3'>
            <Form.Label className={`login-text ${userTheme && 'text-light'}`}>Password</Form.Label>
            <Form.Control type="password" placeholder='Enter password' {...register("password",{required:true})} />
            {errors.password && <p className='login-text text-danger'>*Password is required</p> }
        </Form.Group>

        {/* login button */}
        <Button className={`login-text text-center login-button w-75 mt-4 `} variant={userTheme?'outline-light':'outline-dark'}type='submit' ><MdLogin/>{' '}LOGIN</Button>
      </Form>
    </div>
  )
}

export default LoginComponent
