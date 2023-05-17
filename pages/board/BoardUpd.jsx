import React,{useEffect,useState} from 'react';
import { useRouter } from 'next/router'
import URL from 'context/url';
import Header from '../component/Header';
import Footer from '../component/Footer';

function boardUpd() {
 
    const [boardInpt, setBoardInpt] = useState({boardId:'',boardTitle:'',boardContent:'',boardName:'' , userId:''});

    const router = useRouter();

    const pageSet =(boardId)=>{
        fetch('/boardDetail', { method : "POST",  //메소드 지정
        headers : {               //데이터 타입 지정
            "Content-Type":"application/json; charset=utf-8"
          },
          body: JSON.stringify({'boardId':boardId})   //실제 데이터 파싱하여 body에 저장
       })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setBoardInpt({...boardInpt,boardTitle:data.result.boardDetail.boardTitle 
                                    ,boardContent:data.result.boardDetail.boardContent ,boardId:boardId })
        });
    }

    //  게시판 수정
    const fn_save =()=>{
      console.log("boardInpt,",boardInpt)
      fetch('/boardUpd', { method : "POST",  //메소드 지정
      headers : {               //데이터 타입 지정
          "Content-Type":"application/json; charset=utf-8"
        },
        body: JSON.stringify(boardInpt)   //실제 데이터 파싱하여 body에 저장
     })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert('수정되었습니다')
        goBoardFn();
      });
  }
  const fn_delete =()=>{
    fetch('/boardDel', { method : "POST",  //메소드 지정
    headers : {               //데이터 타입 지정
        "Content-Type":"application/json; charset=utf-8"
      },
      body: JSON.stringify(boardInpt)   //실제 데이터 파싱하여 body에 저장
   })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert('삭제되었습니다')
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
        fn_save();
    }
    const goBoardFn = () => {
      router.push({
        pathname: URL.Board,
        query: { board : 'boardList' },
      }, URL.Board+'?board=boardList');
    }


  
  
    useEffect(function() {
      console.log('router.query.boardId0,',router.query.boardId)
      if(router.query.boardId){
        pageSet(router.query.boardId);
      }else{
        alert('상세화면을 볼수 없습니다.');
        goBoardFn();
      }

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
            <input className='input' value={boardInpt.boardTitle}  onChange={e =>  setBoardInpt({...boardInpt,boardTitle:e.target.value})} />
            </div>
            <div>
              <label>내용</label>  
              <textarea className='textarea'value={boardInpt.boardContent}   onChange={e =>  setBoardInpt({...boardInpt,boardContent:e.target.value})} />
            </div>
            <div   style={{ textAlign: 'right',  margin:'60px'}} >
            <button onClick={() => fn_ValidCheck()}>수정</button>
            <button onClick={() => fn_delete()}>삭제</button>
            <button onClick={() => goBoardFn()}>취소</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
   
  export default boardUpd;