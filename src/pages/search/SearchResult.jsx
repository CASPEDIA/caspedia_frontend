import React, { useEffect, useState } from 'react'
import './SearchResult.css'
import Result from 'components/search/Result'
import { useLocation, useNavigate } from 'react-router-dom'
import CustomCard from 'components/common/CustomCard'
import { getBoardgameSearchResult } from 'hooks/boardgameHooks'

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  const page = params.get("page");
  const [total, setTotal] = useState(0);
  // const [curPage, setCurPage] = useState(0);
  const [lastPage, setLastPage ] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    if (query && !page) {
      params.set("page",'1');
      navigate(`${location.pathname}?${params.toString()}`, {replace: true});
    }
  }, [query, page, params, location, navigate]);

  useEffect(() => {
    getBoardgameSearchResult(query,page)
      .then((data) => {
        setTotal(data.pagination.total);
        // setCurPage(data.pagination.page);
        setLastPage(data.pagination.last_page);

        var tmpList = []
        for (let i = Math.max(1,data.pagination.page-3); i <= Math.min(data.pagination.last_page, data.pagination.page+3); i++){
          tmpList.push(i);
        }

        setPagination(tmpList);
      
        const resultData = data.data.map((item) => {
          return {
            boardgameKey: item.boardgame_key,
            imageUrl: item.image_url,
            nameKor: item.name_kor,
            nameEng: item.name_eng,
            likes: item.likes,
            geekScore: item.geek_score,
            castScore: item.cast_score,
          }
        });
        setSearchResult(resultData);
        // console.log(resultData);
        
      })
      .catch((e) => {
        console.log(e);
      });
  }, [query, page])

  return (
    <div className='custom-search-result'>
      <table className='table-searchresult'>
        <thead>
          <tr>
            <th>total {total}</th>
            <th className='wide-column'>이름</th>
            <th>좋아요</th>
            <th>BGG 평점</th>
            <th>CAST 평점</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.map((item,index) => {
            return (
              <Result 
              key={index}
              boardgameKey={item.boardgameKey}
              imageUrl={item.imageUrl}
              nameKor ={item.nameKor}
              nameEng ={item.nameEng}
              yearPublished = {item.yearPublished}
              likes = {item.likes}
              geekScore = {item.geekScore}
              castScore = {item.castScore}
              />
            )
          })}
        </tbody>
      </table>
      {searchResult.length === 0 ? 
        <div className='no-results'>
          <img 
            src="/img/F2_no_result.png" 
            alt="검색 결과가 없습니다." 
            className='my-5' 
            width={"35%"}
          />
          <CustomCard height="50px">
            검색에 실패했습니다. 게임 이름을 다시 확인해주세요.<br/>
            같은 상황이 계속 반복되었을 경우, 관리자에게 문의해주세요.
          </CustomCard>
        </div>
        :
        <></>  
      }
      <div className='div-pagination'>
        { page !== 1 && (
          <img src="/img/F2_first_page.svg" style={{"cursor" : "pointer"}} width="6%" alt="first" onClick={() => navigate(`/search?query=${query}&page=1`)}/>
        )}
        { page !== 1 && (
          <img src="/img/F2_prev_page.svg" width="6%" alt="prev" style={{"cursor" : "pointer"}}  onClick={() => navigate(`/search?query=${query}&page=${Number(page)-1}`)}/>
        )}
        <div className='div-pagination-numbers-container'>
          { pagination.map((item) => {
            return(
              <span 
                key={item}
                className={`span-pagination-item ${page === item ? 'current-page' : ''}`}
                style={{"cursor" : "pointer"}}
                onClick={() => navigate(`/search?query=${query}&page=${item}`)}
              >
                {item}
              </span>
            )
          })}
        </div>
        { page !== lastPage && (
          <img src="/img/F2_next_page.svg" width="6%" alt="next" style={{"cursor" : "pointer"}}  onClick={() => navigate(`/search?query=${query}&page=${Number(page)+1}`)}/>
        )}
        { page !== lastPage && (
          <img src="/img/F2_last_page.svg" style={{"cursor" : "pointer"}} width="6%" alt="last" onClick={() => navigate(`/search?query=${query}&page=${lastPage}`)}/>
        )}
      </div>
    </div>
  )
}
