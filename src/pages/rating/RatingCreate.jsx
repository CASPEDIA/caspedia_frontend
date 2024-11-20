import React, { useState } from 'react'
import './RatingCreate.css'
import { useParams } from 'react-router-dom'
import { REVIEW_TAGLIST } from "../../recoil/tag/atom.jsx";

export default function RatingCreate({
  review_img = "https://cf.geekdo-images.com/fEawLvevkxPv9AQ3mSiwVQ__itemrep/img/6UJpoKwtjxUm965dI017XMrgGDE=/fit-in/246x300/filters:strip_icc()/pic1747320.jpg",
  name_kor = "도미니언 : 약속된 번영",
  name_eng = "Dominion: Prosperity"
}) {
  const {boardid} = useParams();
  const default_texts = ["끔찍해요","다시는 안할 것 같아요","별로에요","나쁘지 않아요","평범해요","제법 좋았어요","인상적이에요","추천할 만 해요","정말 재밌었어요","완벽해요"];
  const [score, setScore] = useState(1);
  const [scoreText, setScoreText] = useState("별로에요");
  const [comment, setComment] = useState("");
  const empty_star = "/img/F4_rating_star_empty.png";
  const fill_star = "/img/F4_rating_star_fill.png";
  const tags = REVIEW_TAGLIST;
  const [tagSelected, setTagSelected] = useState("000000000000000000000000");
  const [tagSelectedCount, setTagSelectedCount] = useState(0);

  const commentChange = (e) => {
    setComment(e.target.value);
  }

  const modifyTagSelected = (index, newChar) => {
    setTagSelected((prev) => prev.slice(0, index) + newChar + prev.slice(index + 1));
  }

  const tagClicked = (e) => {
    const curElement = e.target;
    const countText = document.getElementById("currentSelectedCount");
    const idx = Number(curElement.getAttribute("idx"));

    console.log(tagSelected);
    
    if (curElement.classList.contains("div-custom-review-tag")){
      if (tagSelectedCount == 5) return
      if (tagSelectedCount == 4) {
        if (countText) {
          countText.style.color = "red";
        }
      }
      setTagSelectedCount((prev) => prev+1);
      curElement.classList.remove("div-custom-review-tag");
      curElement.classList.add("div-custom-review-tag-selected");
      modifyTagSelected(idx,"1");
    } else {
      if (tagSelectedCount == 0) return
      if (countText) {
        countText.style.color = "black";
      }
      setTagSelectedCount((prev) => prev-1);
      curElement.classList.remove("div-custom-review-tag-selected");
      curElement.classList.add("div-custom-review-tag");
      modifyTagSelected(idx,"0");
    }
    
  }

  function changeStar(num) {
    setScore(num);
    setScoreText(default_texts[num-1]);
  }

  return (
    <div className='div-rating-create'>
      <div className='div-boardgameinfo-container'>
        <img src={review_img} width="30%" alt="noImage" />
        <h2 style={{"marginLeft":"5%"}}>{name_kor}</h2>
      </div>
      <div className='div-ratingstar-container'>
        <h5 style={{"marginRight":"5%"}}><strong>평점</strong></h5>
        <div>
          <div className='div-star-continer'>
            <img src={score > 0 ? fill_star : empty_star} width="9%" style={{"marginRight" : "1%"}} alt="star" onClick={() => changeStar(1)}/>
            <img src={score > 1 ? fill_star : empty_star} width="9%" style={{"marginRight" : "1%"}} alt="star" onClick={() => changeStar(2)}/>
            <img src={score > 2 ? fill_star : empty_star} width="9%" style={{"marginRight" : "1%"}} alt="star" onClick={() => changeStar(3)}/>
            <img src={score > 3 ? fill_star : empty_star} width="9%" style={{"marginRight" : "1%"}} alt="star" onClick={() => changeStar(4)}/>
            <img src={score > 4 ? fill_star : empty_star} width="9%" style={{"marginRight" : "1%"}} alt="star" onClick={() => changeStar(5)}/>
            <img src={score > 5 ? fill_star : empty_star} width="9%" style={{"marginRight" : "1%"}} alt="star" onClick={() => changeStar(6)}/>
            <img src={score > 6 ? fill_star : empty_star} width="9%" style={{"marginRight" : "1%"}} alt="star" onClick={() => changeStar(7)}/>
            <img src={score > 7 ? fill_star : empty_star} width="9%" style={{"marginRight" : "1%"}} alt="star" onClick={() => changeStar(8)}/>
            <img src={score > 8 ? fill_star : empty_star} width="9%" style={{"marginRight" : "1%"}} alt="star" onClick={() => changeStar(9)}/>
            <img src={score > 9 ? fill_star : empty_star} width="9%" style={{"marginRight" : "1%"}} alt="star" onClick={() => changeStar(10)}/>
          </div>
          <div style={{"textAlign" : "left", "marginTop" : "2%"}}>
            {scoreText}
          </div>
        </div>
      </div>
      <h5 style={{"textAlign" : "left"}}><strong>한줄평</strong>&nbsp;&nbsp;(선택 / 300자 이내)</h5>
      <textarea 
        value={comment}
        onChange={commentChange}
        rows="5"
        placeholder="한줄평을 입력하세요."
        className='rating-textarea'
      />
      <h5 style={{"textAlign" : "left"}}><strong>태그 선택</strong>&nbsp;&nbsp;<span id="currentSelectedCount">({tagSelectedCount}/5)</span></h5>
      <div className='div-tagselect-container'>
        <div className='div-tagselect-scroll-container'>
          {tags.map((item, index) => 
            <div className='div-custom-review-tag' idx={index} key={index} onClick={tagClicked}>
              {item}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
