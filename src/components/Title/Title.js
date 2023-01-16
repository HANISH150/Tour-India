import React from 'react'
import { useSelector } from 'react-redux'; 
import './Title.css'
import NavigationBar from '../NavigationBar';
function Title() {
let title="TOUR INDIA";
 let userTheme = useSelector(state=>state.theme)
  return (
    <div className='title-body'>
      <ul className='nav justify-content-center p-2'>
        <li className='nav-item'>
            <h5 className={`card-text title-text ${userTheme&&"text-light"}`}>{" "+title+" "}</h5>
        </li>
      </ul>
      <NavigationBar/>
    </div>
  )
}

export default Title
