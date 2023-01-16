import React from 'react'
import Form from 'react-bootstrap/Form';
import {useSelector} from 'react-redux'
import {changeTheme} from '../../slices/ThemeSlice'
import {useDispatch} from 'react-redux'
import './ChangeTheme.css'
function ChangeTheme() {
  let userTheme = useSelector(state=>state.theme)
  const dispatch = useDispatch()
  const changingTheme = ()=>{
    console.log("themechanged")
    console.log(userTheme)
    
      let modifiedUserTheme = ((userTheme===false)?true:false)
      let themeActionObj = changeTheme(modifiedUserTheme)
    try{
      dispatch(themeActionObj)
    } catch (error) {
      console.log(error.message)
    }
  }

  
  

  return (
    <>
    <Form>
    <Form.Check onChange={changingTheme} className={(userTheme===false)?"theme-label text-dark":"theme-label text-light"}
        type="switch"
        id="custom-switch"
        label="Change Theme"
      />
    </Form>
    </>
  )
}

export default ChangeTheme
