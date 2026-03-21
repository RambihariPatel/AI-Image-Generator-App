import React, { useRef } from 'react'
import './ImageGenerator.css'

import default_Image from "../../assets/default_image.svg";
import { useState } from 'react'

const [image_url, setImageUrl] = useState("/");
let inputRef = useRef(null);

const imageGenerator = async () => {
    if(inputRef.current.value === "") {
      return 0;
    }
    //const responce = await fetch
}


const ImageGenerator = () => {
  return (
    <div className='ai-image-generator'>
      <div className='header'>
        Ai image <span>generator</span>
      </div>

      <div className='img-loading'>
        <div className='image'>
          <img src={image_url === "/" ? default_Image: image_url} alt='default' />
        </div>  
      </div>

      <div className='search-box'>
        <input 
          type='text' 
          ref={inputRef}
          className='search-input' 
          placeholder='Describe what you want to see'
        />
        <div className="generate-btn">
          Generate
        </div>
      </div>
    </div>
  )
}

export default ImageGenerator