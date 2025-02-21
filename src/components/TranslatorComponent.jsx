'use client'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { BsSend } from 'react-icons/bs';
import translateLang from '../libs/translator';
import languageDetectorInitializer from '../libs/detector'
import Spinner from '../components/Spinner'
import summarizeText from '../libs/summarizer';

export default function TranslatorComponent() {
    
  const [userText, setUserText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [translatedLanguage, setTranslatedLanguage] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [source, setSource] = useState('')
  const [target, setTarget] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const text = 'Butterfield Color® manufactures and distributes a complete line of decorative concrete products. Our concrete coloring, texturing, sealing, staining and stamping products are used in variety of applications, including commercial, residential, institutional development to historic parks, museums and public area renovation projects throughout the US and Canada. Our Uni-Mix®, Perma-Cast®, Select Grade®, Clear Guard®, Elements® and T1000® brand names are synonymous with quality, and are supported by service and technical personnel to ensure high quality installations.'
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

        // check if there is result and set loading status
        let result = null;
        if(target === '' || userText === ''){
            return false
        }

        result = await translateLang(translatedLanguage, target, userText)
        
        if(result === null) return setIsLoading(true)

        setTranslatedText(result)
        console.log(result, isLoading)
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
    
    const summarize = async () =>{
        const result = await summarizeText(text)
        console.log(result)
    }

    summarize()

  return (
    <section 
        className='content w-full h-full md:w-4/12 flex flex-col justify-between border-l border-r p-3'
        aria-labelledby='translator-title'
    >

        {/* translator content */}
        <div className='max-w-full h-fit'>

            <div className='w-full h-fit'>
                {/*display  text content */}
                <h2 className='text-xl text-blue-500'>Text:</h2>
                <p 
                    className='w-full text-left' 
                    style={{wordWrap: 'break-word'}}
                    aria-live='polite'
                >
                    {source}
                </p>
            </div>

            <div className='w-full h-fit mt-4'>
                {/*output  text content */}
                <div className='w-full h-fit flex justify-between items-center'>
                    
                    <h2 className='text-xl text-blue-500'>Output:</h2>

                    {
                        // spinner
                        (isLoading === true) && <Spinner aria-label='Loading translation...'/>
                    }

                </div>

                <p 
                    className='w-full text-left' 
                    style={{wordWrap: 'break-word'}}
                    aria-live='polite'
                >
                    {translatedText && translatedText}
                </p>

                {/* detected text language */}
                <p 
                    className='mt-6'
                    aria-live='polite'
                >
                    {source && `Text is ${translatedLanguage}, I am ${confidence.toFixed(2)}% confident`}
                </p>
            </div>

            {/* text operations */}
            <div className='w-full h-fit flex justify-between items-center'>

                {/* translate options */}
                <div>
                    {/* Translated language language */}
                    <Form.Select 
                        onClick={(e) => setTarget(e.target.value)}
                        aria-label='Select language to translate to'
                    >
                        <option aria-label='Translate to' aria-live='polite'>Translate to...</option>
                        <option value="en" aria-label='English'>English</option>
                        <option value="pt" aria-label='Portugese'>Portugese</option>
                        <option value="es" aria-label='Spanish'>Spanish</option>
                        <option value="ru" aria-label='Russian'>Russian</option>
                        <option value="tr" aria-label='Turkish'>Turkish</option>
                        <option value="fr" aria-label='French'>French</option>
                    </Form.Select>
                </div>
            
                {/* Translate button */}
                <Button 
                    type='button'
                    onClick={translate}
                    className='text-xl rounded-md bg-blue-500  hover:bg-blue-700 p-2 text-white'aria-label='Translate text'
                >
                    <span>
                        Translate
                    </span>
                </Button>

            </div>

        </div>

        {/* form input section */}
        <div className='w-full h-fit flex justify-center items-end'>
            
            <div className='w-full'>

                {/* form input */}
                <Form className='flex flex-col justify-between' aria-labelledby='input-label'>

                    <div>
                        {/* error message */}
                        <span className='text-lg text-red-500'>{errorMessage && errorMessage}</span>
                    </div>

                    <div className=' w-full  h-fit flex justify-between items-center'>
                        <Form.Group controlId="exampleForm.ControlTextarea1" className='w-10/12'>
                            <Form.Control 
                                type="text" 
                                required
                                className='w-full p-3 text-normal border border-gray-300 !rounded-full text-wrap'
                                value={userText}
                                placeholder='Enter text here...'
                                onChange={(e) => {
                                    setUserText(e.target.value)
                                }}
                            />
                        </Form.Group>

                        <div className='w-2/12 ml-2 h-full flex justify-end'>
                            <Button 
                                type='button' 
                                className='!rounded-full p-3'
                                onClick={handleValidate}
                                aria-label='Submit text for traanslation'
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
