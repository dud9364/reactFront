import React,{useEffect,useState} from 'react';
import { useRouter } from 'next/router'
import URL from 'context/url';
import Header from './component/Header';
import Footer from './component/Footer';

function Login() {
    const [message, setMessage] = useState([]);
    const [logInput, setLogInput] = useState({id:'',password:''});

    const router = useRouter();

    const loginFn = () => {
        fetch('/login', {
          method : "POST",          //메소드 지정
          headers : {               //데이터 타입 지정
              "Content-Type":"application/json; charset=utf-8"
          },
          body: JSON.stringify(logInput)   //실제 데이터 파싱하여 body에 저장
      }) .then((res) => {
          return res.json();
        })
        .then((data) => {
          //setMessage(data);
          if(data.result.cnt == 1){
            localStorage.setItem('userId',data.result.loginInfo.userId);
            localStorage.setItem('userMainid',data.result.loginInfo.userMainid);
            localStorage.setItem('userName',data.result.loginInfo.userName);
            goHomeFn();
          }else{
            alert('해당 id가 없습니다.')
          }
        })
      .catch(err => {
          console.log(err) // Handle errors
      });
    }
    
    /* 유효성 검사*/ 
  const goLogValFn = ()=>{
    if(!logInput.id){
      alert("ID를 입력하세요."); 
      return;
    } 
    if(!logInput.password){
      alert("Password를 입력하세요.");
      return;
    } 
    loginFn();
  }

  const goHomeFn = () => {
    router.push({
      pathname: URL.Home,
      query: { greetingK : 'mainHome' },
    }, URL.Home+'?greetingK=mainHome');
  }
  
  
  useEffect(function() {
      console.log("로그인 화면 in  : ");
    }, []);



      return (
        <div>
          <Header />
              <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              width: '100%', height: '100vh'
              }}>
              <img className='jjanggu1' src="image/jjanggu.png" alt="이미지가 안나온다" />
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                  <label>ID</label>
                  <input type='id' value={logInput.id} 
                  onChange={(e) =>  setLogInput({...logInput,id:e.target.value})}
                  />
                  <label>Password</label>
                  <input type='password' value={logInput.password}
                  onChange={(e) => setLogInput({...logInput,password:e.target.value})}
                  />
                  <br />
                  <button onClick={() => goLogValFn()}>
                  Login
                  </button>
                </div>
              <img className='jjanggu1' src="image/jjanggu.png" alt="이미지가 안나온다" />
              </div>
          <Footer />
        </div>
        )
        
  }
   
  export default Login;