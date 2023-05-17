import React,{useDebugValue, useEffect,useState} from 'react';
import { useRouter } from 'next/router'
import URL from 'context/url';
const Header = () => {
    const router = useRouter();
    const [loginInfo, setLoginInfo] = useState({userId:'',userMainid:'' ,userName:''});

    const goLoginFn=()=>{
      router.push({
          pathname: URL.Login
        });
  }
  const goHomeFn = () => {
    router.push({
      pathname: URL.Home,
      query: { greetingK : 'mainHome' },
    }, URL.Home+'?greetingK=mainHome');
  }
    
  const goBoardFn = () => {
    router.push({
      pathname: URL.Board,
      query: { board : 'boardList' },
    }, URL.Board+'?board=boardList');
  }

  const goLogoutFn = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userMainid')
    localStorage.removeItem('userName')
    setLoginInfo({userId:'',userMainid:'' ,userName:''});
    goHomeFn();
  }
  
  useEffect(function() {
    // if( router.query.greetingK=='mainHome'){
    // }
    if( localStorage.getItem('userId')&& localStorage.getItem('userMainid')&&localStorage.getItem('userName')){
      setLoginInfo({...loginInfo,userId: localStorage.getItem('userId') ,userMainid: localStorage.getItem('userMainid'),userName: localStorage.getItem('userName')})
    }
  }, []);

  useEffect(function() {
    console.log("loginInfo",loginInfo)
  }, [loginInfo]);
  
      return (
      <header className='header'>
        <div className='contents'>
        <img className='jjanggu1' src="image/jjanggu.png" style={{width:'40px'}} alt="로고" />
        {loginInfo.userId != '' ? 
        loginInfo.userName + '님, 반갑습니다!'
        :''}
            <nav  className='navigation'>
            <ui>
                <li  onClick={() => goHomeFn()}>홈</li>
                <li onClick={() => goBoardFn()}>게시판</li>
                {loginInfo.userId != '' ? 
                <li onClick={() => goLogoutFn()}>로그아웃</li>
                : <li onClick={() => goLoginFn()}>로그인</li>
                 }
            </ui>
            </nav>
        </div>
      </header>
        )
        
  }
   
  export default Header;