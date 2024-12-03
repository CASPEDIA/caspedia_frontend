import React, { useEffect, useState } from 'react'
import './SearchResult.css'
import { Table } from 'react-bootstrap'
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
  const [pagination, setPagination] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (query && !page) {
      params.set("page",'1');
      navigate(`${location.pathname}?${params.toString()}`, {replace: true});
    }
  }, [query, page, params, location, navigate]);

  useEffect(() => {
    getBoardgameSearchResult(query,page)
      .then((data) => {
        const paginationData = {
          total: data.pagination.total,
          page: data.pagination.page,
          lastPage: data.pagination.last_page,
        };
        setPagination(paginationData);
      
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
        console.log(resultData);
        
      })
      .catch((e) => {
        console.log(e);
      });
  }, [query, page])

  return (
    <div className='custom-search-result'>
      <Table bordered hover responsive="md">
        <thead>
          <tr>
            <th></th>
            <th className='wide-column'>이름</th>
            <th>좋아요</th>
            <th>BGG<br />평점</th>
            <th>CAST<br />평점</th>
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
      </Table>
      {searchResult.length == 0 ? 
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
        페이지네이션
      </div>
    </div>
  )
}
