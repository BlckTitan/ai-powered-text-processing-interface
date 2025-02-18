'use client'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavigationComponent() {

  return (
    <Navbar expand="lg" className="bg-body-tertiary w-full md:w-4/12 h-12 bg-blue-500  flex justify-start p-3">
      <Container>
        <Navbar.Brand href="/" className='text-xl font-medium text-white' >AI Text Processor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationComponent;