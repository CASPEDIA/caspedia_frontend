import React, { useEffect, useState } from 'react'
import './ExploreGames.css'
import CustomButton from 'components/common/CustomButton'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getExploreResults } from 'hooks/boardgameHooks';
import ExploreResultItem from 'components/explore/ExploreResultItem';

export default function ExploreGames() {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [playerValue, setPlayerValue] = useState([1,9])
  const [playtimeValue, setPlaytimeValue] = useState([10,180])
  const [weightValue, setWeightValue] = useState([1,5])
  const [total, setTotal] = useState(0);
  const [sortType, setSortType] = useState('castdesc'); // 기본값
  const [exploreResult, setExploreResult] = useState([]);
  const [pagination, setPagination] = useState([]);

  const handlePlayerSliderChange = (value) => {
    setPlayerValue([...value])
  }

  const handlePlaytimeSliderChange = (value) => {
    setPlaytimeValue([...value])
  }

  const handleWeightSliderChange = (value) => {
    setWeightValue([...value])
  }

  const handleClick = (type) => {
    setSortType((prev) => {
      if (type === 'cast') {
        return prev === 'castasc' ? 'castdesc' : 'castasc';
      } else {
        return prev === 'likeasc' ? 'likedesc' : 'likeasc';
      }
    });
  };

  const handleGetResult = (pageValue, isButton) => {
    getExploreResults(pageValue,playerValue[0],playerValue[1],playtimeValue[0],playtimeValue[1],weightValue[0],weightValue[1],sortType)
      .then((data) => {
        setTotal(data.pagination.total);
        setLastPage(data.pagination.last_page);
        var tmpList = []
        for (let i = Math.max(1,pageValue-3); i <= Math.min(data.pagination.last_page, pageValue+3); i++){
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
            geekScore: item.geek_score.toFixed(2),
            castScore: item.cast_score.toFixed(1),
          }
        });
        setExploreResult(resultData)
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const handleChangePage = (pageValue) => {
    setPage(pageValue);
    handleGetResult(pageValue, false);
  }

  const renderLabel = (type) => {
    const isSelected = sortType.includes(type);
    if (!isSelected) {
      // 선택 안 된 항목은 화살표 없이 텍스트만
      return type === 'cast' ? 'CAST 평점' : '좋아요';
    }

    // 선택된 항목만 화살표 표시
    if (type === 'cast') {
      return sortType === 'castasc' ? 'CAST 평점▲' : 'CAST 평점▼';
    } else {
      return sortType === 'likeasc' ? '좋아요 ▲' : '좋아요▼';
    }
  };

  useEffect(() => {
    
  }, [])
  
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
        <CustomButton
          onClick={() => handleGetResult(1, true)} 
          text="찾기"
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
            defaultValue={playerValue}
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
            defaultValue={playtimeValue}
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
            defaultValue={weightValue}
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
                color: sortType.includes('cast') ? 'black' : 'lightgray',
              }}
            >
              {renderLabel('cast')}
            </span>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <span
              onClick={() => handleClick('like')}
              style={{
                cursor: 'pointer',
                color: sortType.includes('like') ? 'black' : 'lightgray',
              }}
            >
              {renderLabel('like')}
            </span>
          </div>
        </div>
      </div>
      <div className='div-explore-result-header'>
        <h4>
          탐방 결과 <span style={{"color":"#30"}}>{'('}{total}{')'}</span>
        </h4>
      </div>
      <div className='div-explore-result'>
        <table>
          <tbody>
            {exploreResult.map((item,index) => {
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
        { page == 1 || total == 0 ?
          <></>
          :
          <img className='custom-link pagination-button' src="/img/F2_first_page.svg" alt="first" onClick={() => handleChangePage(1)}/>
        }
        { page == 1 || total == 0 ?
          <></>
          :
          <img className='custom-link pagination-button' src="/img/F2_prev_page.svg" alt="prev" onClick={() => handleChangePage(Number(page)-1)}/>
        }
        <div className='div-pagination-numbers-container'>
          { pagination.map((item) => {
            return(
              <span 
                key={item}
                className={`custom-link span-pagination-item ${page === item ? 'current-page' : ''}`}
                onClick={() => handleChangePage(item) }
              >
                {item}
              </span>
            )
          })}
        </div>
        { page == lastPage || total == 0 ?
          <></>
          :
          <img className='custom-link pagination-button' src="/img/F2_next_page.svg" alt="next" onClick={() => handleChangePage(Number(page)+1)}/>
        }
        { page == lastPage || total == 0 ?
          <></>
          :
          <img className='custom-link pagination-button' src="/img/F2_last_page.svg" alt="last" onClick={() => handleChangePage(lastPage)}/>
        }
      </div>
    </div>
  )
}
