import React,{useEffect,useState} from 'react';
import { useRouter } from 'next/router'
import URL from 'context/url';
import Header from '../component/Header';
import Footer from '../component/Footer';

function board() {
    const [boardList, setBoardList] = useState([]);
    const [condition, setCondition] = useState({serachTitle:'',serachId:'' ,serach:'1'});

    const router = useRouter();

    const pageSet =()=>{
        fetch('/boardList', { method : "POST",  //메소드 지정
        headers : {               //데이터 타입 지정
            "Content-Type":"application/json; charset=utf-8"
          },
          body: JSON.stringify(condition)   //실제 데이터 파싱하여 body에 저장
       })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setBoardList(data.result.list);
        });
    }

    const fn_boardDetail =(boardId)=>{
      router.push({
        pathname: URL.BoardUpd,
        query: { 'boardId' : boardId },
      }, URL.BoardUpd+'?boardId='+boardId);
    }

    // 검색할 제목/id select
    const handleChangeSelect =(e)=>{
      setCondition({...condition,serach:e})
    }

    const handleChangeDiv =(e)=>{
      if(condition.serach=='1'){
        setCondition({...condition,serachTitle:e ,serachId:''})
      }else if(condition.serach=='2'){
        setCondition({...condition,serachId:e,serachTitle:''})
      }
     
    } 

    const goBoardCreateFn = () => {
    router.push({
      pathname: URL.BoardInpt,
      query: { board : 'BoardInpt' },
    }, URL.BoardInpt+'?board=BoardInpt');
  }
  
    useEffect(function() {
        console.log("게시판 in  : ",router.query.board);
        // if( router.query.board=='boardList'){
       // }
          pageSet();

      }, []);


    return (
      <div>
        <Header />
       <div>
          <h2>
            게시판 목록
          </h2>
       </div>
        <div>     
            <div  className='createboard'><button onClick={() => goBoardCreateFn()}>글쓰기</button></div>
            <table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>글쓴이</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
              { boardList != undefined && boardList != '' ?  boardList.map((d,i) => {
                return (
                  <tr key={i} onClick={() => fn_boardDetail(d.boardId)}>
                    <td>{i+1}</td>
                    <td>{d.boardTitle}</td>
                    <td>{d.inptr}</td>
                    <td>{d.inptDt}</td>
                  </tr>
                );
              }) : <tr><td colSpan={4}>조회내용이 없습니다.</td></tr>}
              </tbody>
            </table>
            <div className='selectDiv'>
              <select className="w150" onChange={e => {handleChangeSelect(e.target.value);}} >
                <option value="1" >제목</option>
                <option value="2">글쓴이</option>
              </select>
              <input className='selectInput'  onChange={e => {handleChangeDiv(e.target.value);}} />
              <button onClick={() => pageSet()}>검색</button>
            </div>
        </div>
        <Footer />
      </div>
    );
  }
   
  export default board;