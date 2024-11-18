import React from 'react'
import './BoardGameDetail.css'
import BoardgameRating from '../../components/boardgame/BoardgameRating'

export default function BoardGameDetail() {
  return (
    <div className='div-boardgame-detail'>
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
            <img src="/img/F3_heart_fill.png" width="45%" alt="캐스트 점수" />
            <div>
              <span>37</span>
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
          <td className='td-weight-info'>
            <table className='table-inner-info'>
              <tr>
                <td><img src="/img/F3_geek_logo.png" alt="logo" width="30%" /></td>
                <td style={{textAlign: 'left'}}>긱 평점&nbsp;&nbsp;&nbsp;&nbsp;  6.7 / 5</td>
              </tr>
              <tr>
                <td><img src="/img/F3_geek_logo.png" alt="logo" width="30%" /></td>
                <td style={{textAlign: 'left'}}>긱 웨이트&nbsp;  2.47 / 5</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <div className='div-boardgame-best-tags'>
        <div className='div-title-tag'>
          CAST가 고른 태그
        </div>
        <Tag text='4인베스트🖖'/>
        <Tag text='3인 베스트🤟'/>
        <Tag text='숙련자들이 즐기는👨🏻‍🎓'/>
        <Tag text='또 해보고 싶은💘'/>
        <Tag text='구성물이 예쁜💎'/>
      </div>
      <div className='div-boardgame-ratings'>
        <BoardgameRating/>
        <BoardgameRating/>
        <BoardgameRating/>
        <BoardgameRating/>
        <BoardgameRating/>
        <BoardgameRating
          comment="언더테일 아시는구나! 혹시 모르시는분들에 대해 설명해드립니다 샌즈랑 언더테일의 세가지 엔딩루트중 몰살엔딩의 최종보스로 진.짜.겁.나.어.렵.습.니.다 공격은 전부다 회피하고 만피가 92인데 샌즈의 공격은 1초당 60이 다는데다가 독뎀까지 추가로 붙어있습니다.. 하지만 이러면 절대로 게임을 깰 수 가없으니 제작진이 치명적인 약점을 만들었죠. 샌즈의 치명적인 약점이 바로 지친다는것입니다. 패턴들을 다 견디고나면 지쳐서 자신의 턴을 유지한채로 잠에듭니다. 하지만 잠이들었을때 창을옮겨서 공격을 시도하고 샌즈는 1차공격은 피하지만 그 후에 바로날아오는 2차 공격을 맞고 죽습니다."
        />
      </div>
      <img src="/img/F3_create_review.png" alt="리뷰작성" className='create-rating-btn'/>
    </div>
  )
}

function Tag({
  text="text"
}){
  return(
    <div className='div-selected-tag'>
      {text}
    </div>
  )
}