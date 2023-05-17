import React,{useEffect,useState} from 'react';
import { useRouter } from 'next/router'
import URL from 'context/url';
import Header from '../component/Header';
import Footer from '../component/Footer';

function boardInpt() {
    const [boardInpt, setBoardInpt] = useState({boardTitle:'',boardContent:'',boardName:'' , userId:''});

    const router = useRouter();

    // const pageSet =()=>{
    //     fetch('/boardList', { method : "POST",  //메소드 지정
    //     headers : {               //데이터 타입 지정
    //         "Content-Type":"application/json; charset=utf-8"
    //       },
    //       body: JSON.stringify(condition)   //실제 데이터 파싱하여 body에 저장
    //    })
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((data) => {
    //       setBoardList(data.result.list);
    //       console.log("boardList controller",data)
    //     });
    // }

    //  게시판 등록
    const fn_save =()=>{
      fetch('/boardInpt', { method : "POST",  //메소드 지정
      headers : {               //데이터 타입 지정
          "Content-Type":"application/json; charset=utf-8"
        },
        body: JSON.stringify(boardInpt)   //실제 데이터 파싱하여 body에 저장
     })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert('등록되었습니다')
        goBoardFn();
      });
  }

      //  게시판 유효성 검사
    const fn_ValidCheck =()=>{
        if(boardInpt.boardTitle==''){
          alert('제목을 적어주세요')
          return;
        }
        if(boardInpt.boardContent==''){
          alert('내용을 적어주세요')
          return;
        }

        console.log('localStorage.getItem(userId)',localStorage.getItem('userId'))
        console.log('localStorage.getItem(userName)',localStorage.getItem('userName'))
        fn_save();
    }
    const goBoardFn = () => {
      router.push({
        pathname: URL.Board,
        query: { board : 'boardList' },
      }, URL.Board+'?board=boardList');
    }


  
  
    useEffect(function() {
      }, []);


    return (
      <div>
        <Header />
        <div>
          <div>
              <h2>
                게시판 등록
              </h2>
          </div>
          <div style={{textAlign: 'center'}}>   
            <div>
              <label>제목</label>  
            <input className='input'  onChange={e =>  setBoardInpt({...boardInpt,boardTitle:e.target.value})} />
            </div>
            <div>
              <label>내용</label>  
              <textarea className='textarea'  onChange={e =>  setBoardInpt({...boardInpt,boardContent:e.target.value,userId:localStorage.getItem('userId'),boardName:localStorage.getItem('userName')})} />
            </div>
            <div   style={{ textAlign: 'right',  margin:'60px'}} >
            <button onClick={() => fn_ValidCheck()}>저장</button>
            </div>
              
          </div>
        </div>
        <Footer />
      </div>
    );
  }
   
  export default boardInpt;