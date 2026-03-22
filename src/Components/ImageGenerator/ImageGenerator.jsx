import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_Image from "../../assets/default_image.svg";

const ImageGenerator = () => {

  const [image_url, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Error:", data);
        setLoading(false);
        return;
      }

      setImageUrl(data.data[0].url);

    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className='ai-image-generator'>
      <div className='header'>
        Ai image <span>generator</span>
      </div>

      <div className='img-loading'>
        <div className='image'>
          <img
            src={image_url === "/" ? default_Image : image_url}
            alt='generated'
          />

          <div className='loading'>
            <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
            <div>{loading ? "Loading..." : ""}</div>
          </div>
        </div>
      </div>

      <div className='search-box'>
        <input
          type='text'
          ref={inputRef}
          className='search-input'
          placeholder='Describe what you want to see'
          onKeyDown={(e) => e.key === "Enter" && imageGenerator()}
        />

        <div
          className="generate-btn"
          onClick={!loading ? imageGenerator : null}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;