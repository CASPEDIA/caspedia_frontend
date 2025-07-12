import React, { useEffect, useState } from 'react'
import './ExploreGames.css'
import CustomButton from 'components/common/CustomButton'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getExploreResults } from 'hooks/boardgameHooks';
import ExploreResultItem from 'components/explore/ExploreResultItem';
import { useRecoilState } from 'recoil';
import { exploreQueryState } from 'recoil/explore/atom';
import CancelButton from 'components/common/CancelButton';

export default function ExploreGames() {
  const [queryState, setQueryState] = useRecoilState(exploreQueryState);
  // const [pagination, setPagination] = useState([]);

  const handlePlayerSliderChange = (value) => {
    setQueryState(prev => ({ ...prev, player: [...value] }));
  };

  const handlePlaytimeSliderChange = (value) => {
    setQueryState(prev => ({ ...prev, playtime: [...value] }));
  };

  const handleWeightSliderChange = (value) => {
    setQueryState(prev => ({ ...prev, weight: [...value] }));
  };

  const handleClick = (type) => {
  setQueryState(prev => {
    if (type === 'cast') {
      return { ...prev, sort: prev.sort === 'castasc' ? 'castdesc' : 'castasc' };
    } else {
      return { ...prev, sort: prev.sort === 'likeasc' ? 'likedesc' : 'likeasc' };
    }
  });
};

  const handleReset = () => {
    setQueryState(prev => ({
      ...prev,
      player: [1, 9],
      playtime: [10, 180],
      weight: [1, 5],
      sort: 'castdesc',
      page: 1,
      lastPage: 1,
      total: 0,
      exploreResult: [],
      pagination: [],
    }))
  }

  const handleGetResult = (pageValue, isButton) => {
    const { player, playtime, weight, sort } = queryState;
    const page = isButton ? 1 : pageValue;

    getExploreResults(
      page,
      player[0], player[1],
      playtime[0], playtime[1],
      weight[0], weight[1],
      sort
    )
      .then((data) => {
        const tmpList = [];
        for (let i = Math.max(1, page - 3); i <= Math.min(data.pagination.last_page, page + 3); i++) {
          tmpList.push(i);
        }

        setQueryState((prev) => ({
          ...prev,
          pagination: [...tmpList],
          exploreResult: data.data.map((item) => ({
            boardgameKey: item.boardgame_key,
            imageUrl: item.image_url,
            nameKor: item.name_kor,
            nameEng: item.name_eng,
            likes: item.likes,
            geekScore: item.geek_score.toFixed(2),
            castScore: item.cast_score.toFixed(1),
          })),
          total: data.pagination.total,
          lastPage: data.pagination.last_page,
          page: page, // 현재 페이지도 recoil에 저장
        }));
      })
      .catch((e) => console.log(e));
  };

  const handleChangePage = (pageValue) => {
    setQueryState(prev => ({ ...prev, page: pageValue }));
    handleGetResult(pageValue, false);
  };

  const renderLabel = (type) => {
    const sortType = queryState.sort;
    const isSelected = sortType.includes(type);
    if (!isSelected) {
      return type === 'cast' ? 'CAST 평점' : '좋아요';
    }

    if (type === 'cast') {
      return sortType === 'castasc' ? 'CAST 평점▲' : 'CAST 평점▼';
    } else {
      return sortType === 'likeasc' ? '좋아요 ▲' : '좋아요▼';
    }
  };

  
  return (
    <div className='div-explore-container'>
      <div className='div-explore-header'>
        <div className='div-explore-header-inner'>
          <img style={{"marginRight": "4%"}} src="/img/F5_toHome.png" alt="explore"  width="15%"/>
          <h3 style={{"whiteSpace": "nowrap"}} ><strong>보드게임 탐방하기</strong></h3>
        </div>
        <img src="/img/info.svg" alt="explore"  width="7%"/>
      </div>
      <div className='div-explore-header-comment'>
        <div>
          내가 만나고 싶은 게임은...
        </div>
        <CancelButton
          onClick={handleReset} 
          text="초기화"
        />
      </div>
      <div className='div-explore-filter'>
        <div className='div-explore-table explore-cell-left'>
          <div>인원수</div>
          <div>플레이타임</div>
          <div>긱웨이트</div>
          <div>정렬 기준</div>
        </div>
        <div className='div-explore-table explore-cell-right'>
          <Slider 
            min={1}
            max={9}
            step={null}
            dots={true}
            value={queryState.player}
            range 
            marks={{
              1:"1", 2:"2", 3:"3", 4:"4", 5:"5",  6:"6", 7:"7", 8:"8", 9:"9+",
            }}
            onChange={(val) => handlePlayerSliderChange(val)}
            />
          <Slider 
            min={10}
            max={180}
            step={null}
            dots={true}
            value={queryState.playtime}
            range 
            marks={{
              10:"10", 30:"30", 60:"60", 90:"90", 120:"120", 180:"180+",
            }}
            onChange={(val) => handlePlaytimeSliderChange(val)}
            />
          <Slider 
            min={1}
            max={5}
            step={null}
            dots={true}
            value={queryState.weight}
            range 
            marks={{
              1:"1", 2:"2", 3:"3", 4:"4", 5:"5",
            }}
            onChange={(val) => handleWeightSliderChange(val)}
            />
          <div style={{ display: 'flex', gap: '1rem', fontWeight: 'bold' }}>
            <span
              onClick={() => handleClick('cast')}
              style={{
                cursor: 'pointer',
                color: queryState.sort?.includes('cast') ? 'black' : 'lightgray',
              }}
            >
              {renderLabel('cast')}
            </span>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <span
              onClick={() => handleClick('like')}
              style={{
                cursor: 'pointer',
                color: queryState.sort?.includes('like') ? 'black' : 'lightgray',
              }}
            >
              {renderLabel('like')}
            </span>
          </div>
        </div>
      </div>
      <div className='div-explore-result-header'>
        <h4>
          탐방 결과 <span style={{ color: "#30" }}>{'('}{queryState.total}{')'}</span>
        </h4>
        <CustomButton
          onClick={() => handleGetResult(1, true)} 
          text="찾기"
        />
      </div>
      <div className='div-explore-result'>
        <table>
          <tbody>
            {queryState.exploreResult.map((item,index) => {
              return (
                  <ExploreResultItem
                    key={index}
                    boardgameKey={item.boardgameKey}
                    imageUrl={item.imageUrl}
                    nameKor ={item.nameKor}
                    nameEng ={item.nameEng}
                    likes = {item.likes}
                    geekScore = {item.geekScore}
                    castScore = {item.castScore}
                    />
                )
            })}
          </tbody>
        </table>
      </div>
      <div className='div-pagination'>
        { queryState.page === 1 || queryState.total === 0 ? null : (
          <img className='custom-link pagination-button' src="/img/F2_first_page.svg" alt="first" onClick={() => handleChangePage(1)} />
        )}
        { queryState.page === 1 || queryState.total === 0 ? null : (
          <img className='custom-link pagination-button' src="/img/F2_prev_page.svg" alt="prev" onClick={() => handleChangePage(Number(queryState.page)-1)}/>
        )}
        <div className='div-pagination-numbers-container'>
          { queryState.pagination.map((item) => {
            return(
              <span 
                key={item}
                className={`custom-link span-pagination-item ${queryState.page === item ? 'current-page' : ''}`}
                onClick={() => handleChangePage(item) }
              >
                {item}
              </span>
            )
          })}
        </div>
        { queryState.page === queryState.lastPage || queryState.total === 0 ? null : (
          <img className='custom-link pagination-button' src="/img/F2_next_page.svg" alt="next" onClick={() => handleChangePage(Number(queryState.page)+1)}/>
        )}
        { queryState.page === queryState.lastPage || queryState.total === 0 ? null : (
          <img className='custom-link pagination-button' src="/img/F2_last_page.svg" alt="last" onClick={() => handleChangePage(queryState.lastPage)} />
        )}
      </div>
    </div>
  )
}
