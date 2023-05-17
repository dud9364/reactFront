import React,{useEffect,useState} from 'react';
import { useRouter } from 'next/router'
import URL from 'context/url';
import Header from './component/Header';
import Footer from './component/Footer';
function mainHome() {
    const [message, setMessage] = useState([]);
    const router = useRouter();
    const pageSet =()=>{
        fetch('/hello', { method : "GET" })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setMessage(data);
          console.log("hello controller")
        });
    }
    // const goLoginFn=()=>{
    //     console.log("로그인 화면으로 고고싱",URL.Login)
    //     router.push({
    //         pathname: URL.Login
    //       });
    // }
  
  
    useEffect(function() {
        console.log("메인화면 in  : ", router.query.greetingK);
        // if( router.query.greetingK=='mainHome'){
        // }
        pageSet();

      }, []);


    return (
      <div>
        <Header />
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          width: '100%', height: '90vh'
          }}>
          <div>
            <h2>
            메인화면 입니다
            </h2>
            <ul>
              {message.map((v, idx) => (
                <li key={`${idx}-${v}`}>{v}</li>
              ))}
            </ul>
            {/* <button  style={{width: '100%', height: '100%'}} onClick={() => goLoginFn()}>Login page</button> */}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
   
  export default mainHome;