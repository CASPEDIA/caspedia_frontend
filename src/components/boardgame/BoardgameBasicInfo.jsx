import React, { useState } from 'react'
import CommonModal from 'components/modal/CommonModal'
import BoardgameLikedUser from 'components/boardgame/BoardgameLikedUser';
import './BoardgameBasicInfo.css'

export default function BoardgameBasicInfo() {
  const [isLikedModalOpen, setIsLikedModalOpen] = useState(false);
  const openLikedModal = () => setIsLikedModalOpen(true);
  const closeLikedModal = () => setIsLikedModalOpen(false);
  const [isLikePressed, setIsLikePressed] = useState(false);
  const pressLike = () => {
    setIsLikePressed((prev) => !prev);
  }
  return (
    <div>
      <div className='div-boardgame-image pt-4 pb-3'>
        <img src="https://cf.geekdo-images.com/fEawLvevkxPv9AQ3mSiwVQ__itemrep/img/6UJpoKwtjxUm965dI017XMrgGDE=/fit-in/246x300/filters:strip_icc()/pic1747320.jpg" alt="도미니언 약속된 번영" />
      </div>
      <div className='div-boardgame-title-info px-4'>
        <div>
          <span>Dominion: Prosperity </span>
          (2010)
        </div>
        <div className='basic-boardgame-comment'>
          Have more fun with more funds in this Dominion expansion that's all about the money.
        </div>
        <div className='div-cast-info'>
          <div>
            <img src="/img/F3_cast_logo.png" width="35%" alt="캐스트 점수" />
            <div>
              <span>8.5</span>
            </div>
          </div>
          <div>
            <img 
              src={isLikePressed ? "/img/F3_heart_fill.png" : "/img/F3_heart_empty.png"} 
              width="45%" 
              alt="캐스트 점수" 
              onClick={pressLike}
            />
            <div>
              <span onClick={openLikedModal}>
                37
              </span>
            </div>
          </div>
        </div>
      </div>
      <table className='div-boardgame-more-info'>
        <tr>
          <td>2–4 Players</td>
          <td>30 Min</td>
        </tr>
        <tr>
          <td>Age: 13+</td>
          <td>
            <tr>
              <td><img src="/img/F3_geek_logo.png" alt="logo" width="30%" /></td>
              <td style={{textAlign: 'left'}} className='td-weight-info'>평점&nbsp;&nbsp;&nbsp;&nbsp;  6.7 / 5</td>
            </tr>
            <tr>
              <td><img src="/img/F3_geek_logo.png" alt="logo" width="30%" /></td>
              <td style={{textAlign: 'left'}} className='td-weight-info'>웨이트&nbsp;  2.47 / 5</td>
            </tr>
          </td>
        </tr>
      </table>
      <CommonModal 
        isModalOpen={isLikedModalOpen}
        closeModal={closeLikedModal}
      >
        <BoardgameLikedUser />
        <BoardgameLikedUser />
        <BoardgameLikedUser />
        <BoardgameLikedUser />
        <BoardgameLikedUser />
        <BoardgameLikedUser />
      </CommonModal>
    </div>
  )
}
