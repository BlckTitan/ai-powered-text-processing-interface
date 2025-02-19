'use client'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { BsSend } from 'react-icons/bs';
import translateLang from '../libs/translator';

export default function TranslatorComponent() {
    
  const [userText, setUserText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [source, setSource] = useState('')
  const [target, setTarget] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

    //clear error messages
    useEffect(() =>{
        setTimeout(() => {
        setErrorMessage('')
        }, 5000)
    }, [errorMessage])


    //checking if windowis loaded   
    useEffect(() =>{
        if(typeof window === 'undefined') return 'Loading...'
    }, [window])
  
    const handleValidate = () =>{

        if(userText === ''){
            setErrorMessage('Type a text to translate')
            return false
        }else{
            translate()
            handleSubmit()
        }

    }

    const handleSubmit = async () =>{
    
    }
    
    const translate = async () =>{

        const result = await translateLang(source, target, userText)
        setTranslatedText(result)

    }

  return (
    <section className='content w-full h-full md:w-4/12 flex flex-col justify-between border-l border-r p-3'>

        {/* translator content */}
        <div className='max-w-full h-fit'>

            <div className='w-full h-48'>
                {/*display  text content */}
                <p className='w-full text-left' style={{wordWrap: 'break-word'}}>
                    {userText}
                </p>
            </div>

            {/* text operations */}
            <div className='flex justify-between'>

            {/* translate options */}
            <div>

                {/* Native language */}
                <Form.Select 
                    aria-label="Default select example"
                    onClick={(e) => setSource(e.target.value)}
                >
                    <option>Translate from...</option>
                    <option value="en">English</option>
                    <option value="pt">Portugese</option>
                    <option value="es">Spanish</option>
                    <option value="ru">Russian</option>
                    <option value="tr">Turkish</option>
                    <option value="fr">French</option>
                </Form.Select>

            </div>

            {/* translate options */}
            <div>
                {/* Ttanslated language language */}
                <Form.Select 
                    aria-label="Default select example"
                    onClick={(e) => setTarget(e.target.value)}
                >
                    <option>Translate to...</option>
                    <option value="en">English</option>
                    <option value="pt">Portugese</option>
                    <option value="es">Spanish</option>
                    <option value="ru">Russian</option>
                    <option value="tr">Turkish</option>
                    <option value="fr">French</option>
                </Form.Select>
            </div>
            
            </div>

        </div>
        
        {/* firm input section */}
        <div className='w-full h-fit flex justify-center items-end relative'>
            
            <div className='w-full absolute bottom-0'>

                {/* form input */}
                <Form className='flex flex-col justify-between'>

                    <div>
                        {/* error message */}
                        <span className='text-lg text-red-500'>{errorMessage && errorMessage}</span>
                    </div>

                    <div className=' w-full  h-fit flex justify-between items-center'>
                        <Form.Group controlId="exampleForm.ControlTextarea1" className='w-10/12'>
                            <Form.Control 
                            type="text" 
                            required
                            className='w-full p-3 text-normal border border-gray-300 rounded-full text-wrap'
                            value={userText}
                            placeholder='Enter text here...'
                            onChange={(e) => setUserText(e.target.value)}
                            />
                        </Form.Group>

                        <div className='w-2/12 h-full flex justify-end'>
                            <Button 
                                type='button' 
                                className=' rounded-full p-3 bg-borderGreen hover:bg-backgroundGreen '
                                onClick={handleValidate}
                            >
                                <span className='text-xl text-white'>
                                    <BsSend />
                                </span>
                            </Button>
                        </div>
                    </div>
                </Form>

            </div>

        </div>

    </section>
  )
}
