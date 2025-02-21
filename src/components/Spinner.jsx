import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function SpinnerComponent() {
  return (
    <Spinner 
      animation="border" 
      role="status" 
      variant="primary" 
      className='text-xl'
      aria-live='polite'
      aria-label='Loading...'
    >
      <span
        className="visually-hidden"
      >
        Loading...
      </span>
    </Spinner>
  )
}


