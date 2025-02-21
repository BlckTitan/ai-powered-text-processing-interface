'use client'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavigationComponent() {

  return (
    <Navbar 
      expand="lg" 
      role='navigation'
      aria-label='Main Navigation'
      className="w-full md:w-4/12 h-12 !bg-blue-500  flex justify-start items-center px-2"
    >
      <Container>
        <Navbar.Brand 
          href="/" 
          className='text-xl font-medium text-white' 
          aria-label='AI Text Processor Home'
        >AI Text Processor</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavigationComponent;