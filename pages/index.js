import React from 'react';
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import URL from 'context/url';
import Header from './component/Header';
import Footer from './component/Footer';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  
  const goHomeFn = () => {
    router.push({
      pathname: URL.Home,
      query: { greetingK : '안녕' },
    }, URL.Home+'?greetingK=안녕');
  }
  return (

    <div>
      <Header />
        <main className='main'>
            <div>
                <img className='jjanggu1' src="image/jjanggu.png" alt="이미지가 안나온다" />
                <img className='jjanggu1' src="image/jjanggu.png" alt="이미지가 안나온다" />
                  <button  onClick={() => goHomeFn()}style={{textAlign:'center' }}><h2>Let'go home click </h2></button>
                <img className='jjanggu1' src="image/jjanggu.png" alt="이미지가 안나온다" />
                <img className='jjanggu1' src="image/jjanggu.png" alt="이미지가 안나온다" />
            </div>
          </main>
      <Footer />
    </div>

  )
}
