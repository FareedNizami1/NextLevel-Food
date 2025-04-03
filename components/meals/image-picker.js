"use client"

import { useRef, useState } from 'react'
import Image from 'next/image'

import classes from './image-picker.module.css'

export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState() // useState is a hook that lets you add React state to function components. It returns an array with two elements: the current state value and a function that lets you update it.
    const imageInput = useRef() // useRef is a hook that returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.

    function handlePickClick() {
        imageInput.current.click()
    }

    function handleImageChange(event) {
        const file = event.target.files[0] // event.target.files is a FileList object that contains the selected files. The [0] index accesses the first file in the list.
        
        if(!file) {
            setPickedImage(null) // If no file is selected, setPickedImage is called with null to clear the picked image state.
            return
        }
        
        const fileReader = new FileReader() // FileReader is a built-in JavaScript object that allows web applications to asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to be read.
        
        fileReader.onload = () => {
            setPickedImage(fileReader.result) // fileReader.result is a property of the FileReader object that contains the result of reading the file. It will be a data URL representing the file's data as a base64 encoded string.
        } // onload is an event handler that is called when the read operation is successfully completed. The result attribute contains the contents of the file as a data URL.

        fileReader.readAsDataURL(file) // readAsDataURL() is a method of the FileReader interface that reads the contents of the specified Blob or File. When the read operation is finished, the result attribute contains a data: URL representing the file's data as a base64 encoded string.
    } 

    return(
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} 
                        alt='The image selected by the user.'
                        fill
                        />}
                </div>
                <input
                    className={classes.input} 
                    type='file' 
                    id={name} 
                    accept='image/png, image/jpeg' 
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                />
                <button 
                    className={classes.button} 
                    type='button'
                    onClick={handlePickClick}
                >
                  Pick an Image  
                </button>
            </div>
        </div>
    )
}