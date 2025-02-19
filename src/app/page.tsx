'use client'
import NavigationComponent from '../components/NavigationComponent'
import TranslatorComponent from '../components/TranslatorComponent'

export default function Home() {

  return (
    <div className='w-full h-screen flex justify-center '>
      
      <main className='w-full h-full flex flex-col items-center'>
        {/* navigation component */}
        <NavigationComponent/>
        <TranslatorComponent/>
      </main>
    </div>
  );
}
