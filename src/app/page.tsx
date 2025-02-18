'use client'

import { Button, Form } from 'react-bootstrap';
import NavigationComponent from '../components/NavigationComponent'
import { useEffect, useState } from 'react';
import { BsSend } from 'react-icons/bs';

export default function Home() {

  const [userText, setUserText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // clear error messages
  useEffect(() =>{
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }, [errorMessage])

  const handleValidate = () =>{

    if(userText === ''){
      setErrorMessage('Type a text to translate')
      return false
    }else{
      handleSubmit()
    }
  }

  const handleSubmit = () =>{

  }

  // checking for strings
  console.log(typeof(userText))

  return (
    <div className='w-full h-screen flex justify-center '>
      
      <main className='w-full h-full flex flex-col items-center'>
        
        {/* navigation component */}
        <NavigationComponent/>

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
                <Form.Select aria-label="Default select example">
                  <option>Translate from...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>

              </div>

              {/* translate options */}
              <div>
                {/* Ttanslated language language */}
                <Form.Select aria-label="Default select example">
                  <option>Translate to...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
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
      </main>
    </div>
  );
}
