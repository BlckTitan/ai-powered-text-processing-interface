'use client'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { BsSend } from 'react-icons/bs';
import translateLang from '../libs/translator';
import languageDetectorInitializer from '../libs/detector'

export default function TranslatorComponent() {
    
  const [userText, setUserText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [translatedLanguage, setTranslatedLanguage] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [source, setSource] = useState('')
  const [target, setTarget] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
            languageDetector()
        }

    }
    
    const translate = async () =>{

        if(target === ''){
            return false
        }

        const result = await translateLang(translatedLanguage, target, userText)
        
        if(!result) return setIsLoading(true)

        setTranslatedText(result)
        console.log(isLoading)
    }

    const languageDetector = async () =>{

        const detector = await languageDetectorInitializer()

        // check if language detector is initialized
        if (!detector) {
            console.log("Language detection is not available.");
            return;
        }

        const results = await detector.detect(userText);

        // check for result
        if(results.length === 0){
            console.log('No language detected')
            return null;
        }

        // find the result with the highest confidence score
        const bestResult = results.reduce((max, result) =>
            result.confidence > max.confidence ? result : max
        )
        
        setConfidence(bestResult.confidence*100)
        setTranslatedLanguage(bestResult.detectedLanguage)
        setSource(userText)

    }
    console.log(isLoading)
  return (
    <section className='content w-full h-full md:w-4/12 flex flex-col justify-between border-l border-r p-3'>

        {/* translator content */}
        <div className='max-w-full h-fit'>

            <div className='w-full h-fit'>
                {/*display  text content */}
                <h2 className='text-semibold text-blue-500'>Text:</h2>
                <p className='w-full text-left' style={{wordWrap: 'break-word'}}>
                    {source}
                </p>
            </div>

            <div className='w-full h-fit mt-4'>
                {/*output  text content */}
                <div className='w-full h-fit flex justify-between items-center'>
                    
                    <h2 className='text-semibold text-blue-500'>Output:</h2>

                    {
                        (isLoading === true) && 
                        <span>
                            Loading...
                            {/* <Spinner animation="border" variant="primary" className='text-xl' /> */}
                        </span>
                    }

                </div>

                <p className='w-full text-left' style={{wordWrap: 'break-word'}}>
                    {translatedText && translatedText}
                </p>

                {/* detected text language */}
                <p className='mt-6'>
                    {source && `Text is ${translatedLanguage}, I am ${confidence.toFixed(2)}% confident`}
                </p>
            </div>

            {/* text operations */}
            <div className='w-full h-fit flex justify-between items-center'>

                {/* translate options */}
                <div>
                    {/* Translated language language */}
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
            
                <Button 
                    type='button'
                    onClick={translate}
                >
                    <span className='text-xl rounded-md bg-blue-500  hover:bg-blue-700 p-2 text-white'>
                        Translate
                    </span>
                </Button>

            </div>

        </div>

        <Spinner animation="border" variant="primary" className='text-xl' /> 

        {/* firm input section */}
        <div className='w-full h-fit flex justify-center items-end'>
            
            <div className='w-full'>

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
                                onChange={(e) => {
                                    setUserText(e.target.value)
                                }}
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
