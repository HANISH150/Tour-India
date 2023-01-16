import React from 'react'
import HomeLogo from './homepicture.svg'
function SideImage() {
  return (
    <div>
      <img src={HomeLogo} alt="image not found"  style={{ height: 400,width:300}} />
    </div>
  )
}

export default SideImage
