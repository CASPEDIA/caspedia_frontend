import React, { useEffect, useRef, useState } from 'react'
import './RatingCreate.css'
// import { useParams } from 'react-router-dom'
import { REVIEW_TAGLIST } from "recoil/tag/atom.jsx";
import CancelButton from 'components/common/CancelButton';
import CustomButton from 'components/common/CustomButton';
import CommonModal from 'components/modal/CommonModal';
import { useNavigate, useParams } from 'react-router-dom';
import { addRating, getMyRating, removeRating, setRating } from 'hooks/ratingHooks';

export default function RatingCreate({
  reviewImg = "/img/F2_no_image.png",
  nameKor = "이름 없음",
  nameEng = "noName"
}) {
  const {boardid} = useParams();
  const navigate = useNavigate();
  const [reviewImgState, setReviewImgState] = useState(reviewImg);
  const [nameKorState, setNameKorState] = useState(nameKor);
  const [nameEngState, setNameEngState] = useState(nameEng);
  const default_texts = ["끔찍해요","다시는 안할 것 같아요","별로에요","나쁘지 않아요","평범해요","제법 좋았어요","인상적이에요","추천할 만 해요","정말 재밌었어요","완벽해요"];
  const [score, setScore] = useState(1);
  const [scoreText, setScoreText] = useState("별로에요");
  const [isCreateMode, setIsCreateMode] = useState(true);
  const [comment, setComment] = useState("");
  const empty_star = "/img/F4_rating_star_empty.png";
  const fill_star = "/img/F4_rating_star_fill.png";
  const tags = REVIEW_TAGLIST;
  const [tagSelected, setTagSelected] = useState("000000000000000000000000");
  const [tagSelectedCount, setTagSelectedCount] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const createModalRef = useRef(null);
  const modifyModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const cancelModalRef = useRef(null);


  const commentChange = (e) => {
    setComment(e.target.value);
  }

  const modifyTagSelected = (index, newChar) => {
    setTagSelected((prev) => prev.slice(0, index) + newChar + prev.slice(index + 1));
    // console.log(tagSelected);
  }

  const tagClicked = (e) => {
    const curElement = e.target;
    const countText = document.getElementById("currentSelectedCount");
    const idx = Number(curElement.getAttribute("idx"));

    // console.log(tagSelected);
    
    if (curElement.classList.contains("div-custom-review-tag")){
      if (tagSelectedCount === 5) return
      if (tagSelectedCount === 4) {
        if (countText) {
          countText.style.color = "red";
        }
      }
      setTagSelectedCount((prev) => prev+1);
      curElement.classList.remove("div-custom-review-tag");
      curElement.classList.add("div-custom-review-tag-selected");
      modifyTagSelected(idx,"1");
    } else {
      if (tagSelectedCount === 0) return
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

  const setReviewTagState = (tagCode) => {
    if (!tagCode || tagCode.length !== tags.length) {
      console.error("Invalid tagCode");
      return;
    }

    const tagElements = document.querySelectorAll(".div-review-tags");
    // console.log(tagElements);
    let count = 0;

    tagElements.forEach((element, index) => {
      const isActive = tagCode[index] === "1";
      if (isActive) count++;
      if (isActive && element.classList.contains("div-custom-review-tag")) {
        element.classList.remove("div-custom-review-tag");
        element.classList.add("div-custom-review-tag-selected");
      } 
      else if (!isActive && element.classList.contains("div-custom-review-tag-selected")) {
        element.classList.remove("div-custom-review-tag-selected");
        element.classList.add("div-custom-review-tag");
      }
    });

    // console.log(count);

    setTagSelectedCount(count);

    const countText = document.getElementById("currentSelectedCount");
    if (countText) {
      countText.style.color = count === 5 ? "red" : "black";
    }
  }

  // 평가 등록 확인 모달
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
    if (createModalRef.current) {
      createModalRef.current.handleResize();
    }
  }
  
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  }

  // 평가 수정 확인 모달
  const openModifyModal = () => {
    setIsModifyModalOpen(true);
    if (modifyModalRef.current) {
      modifyModalRef.current.handleResize();
    }
  }
  
  const closeModifyModal = () => {
    setIsModifyModalOpen(false);
  }

  // 평가 삭제 확인 모달
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    if (deleteModalRef.current) {
      deleteModalRef.current.handleResize();
    }
  }
  
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  // 평가 작업 취소 확인 모달
  const openCancelModal = () => {
    setIsCancelModalOpen(true);
    if (cancelModalRef.current) {
      cancelModalRef.current.handleResize();
    }
  }
  
  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  }

  const handleRatingCreate = () => {
    addRating(boardid, score, comment, tagSelected)
      .then((data) => {
        navigate(`/boardgame/${boardid}`);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
  const handleRatingModify = () => {
    setRating(boardid, score, comment, tagSelected)
      .then((data) => {
        navigate(`/boardgame/${boardid}`);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
  const handleRatingRemove = () => {
    removeRating(boardid)
      .then((data) => {
        navigate(`/boardgame/${boardid}`);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
  const handleRatingCancel = () => {
    console.log("취소");
  }

  useEffect(() => {
    getMyRating(boardid)
      .then((data) => {
        if(data.rating_exist){
          setIsCreateMode(false);
          setScore(data.score);
          setComment(data.comment);
          setReviewImgState(data.image_url);
          setNameKorState(data.name_kor);
          setNameEngState(data.name_eng);
          setScoreText(default_texts[data.score < 1 ? 0 : data.score-1]);
          setTagSelected(data.tag_key);
          setReviewTagState(data.tag_key);
        } else {
          setReviewImgState(data.image_url);
          setNameKorState(data.name_kor);
          setNameEngState(data.name_eng);
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }, [boardid])

  return (
    <div>
      <div className='div-rating-create'>
        <div className='div-boardgameinfo-container'>
          <img src={reviewImgState || "/img/F2_no_image.png"} width="30%" alt="noImage" />
          <h2 style={{"marginLeft":"5%"}}>{nameKorState || nameEngState}</h2>
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
          maxLength="299"
        />
        <h5 style={{"textAlign" : "left"}}><strong>태그 선택</strong>&nbsp;&nbsp;<span id="currentSelectedCount">({tagSelectedCount}/5)</span></h5>
        <div className='div-tagselect-container'>
          <div className='div-tagselect-scroll-container'>
            {tags.map((item, index) => 
              <div className='div-review-tags div-custom-review-tag' idx={index} key={index} onClick={tagClicked}>
                {item}
              </div>
            )}
          </div>
        </div>
        {isCreateMode ?
          <div className='div-rating-button-container'>
            <div></div>
            <CustomButton 
              text="평가 제출"
              onClick={openCreateModal}
              />
          </div>
          :
          <div className='div-rating-button-container'>
            <CancelButton 
              text="평가 삭제"
              onClick={openDeleteModal}
              />
            <CustomButton 
              text="평가 수정"
              onClick={openModifyModal}
            />
          </div>
        }
      </div>
      <CommonModal
        isModalOpen={isCreateModalOpen}
        closeModal={closeCreateModal}
        ref={createModalRef}
        option="hidden"
        >
        <div>
          <div>평가를 제출하시겠습니까?</div>
        </div>
        <div className='div-modal-button-container'>
          <CancelButton 
            onClick={closeCreateModal}
            text="취소"
            />
          <div></div>
          <CustomButton 
            onClick={handleRatingCreate}
            text="제출"
            />
        </div>
      </CommonModal>
      <CommonModal
        isModalOpen={isModifyModalOpen}
        closeModal={closeModifyModal}
        ref={modifyModalRef}
        option="hidden"
        >
        <div>
          <div>평가를 수정하시겠습니까?</div>
        </div>
        <div className='div-modal-button-container'>
          <CancelButton 
            onClick={closeModifyModal}
            text="취소"
            />
          <div></div>
          <CustomButton 
            onClick={handleRatingModify}
            text="수정"
            />
        </div>
      </CommonModal>
      <CommonModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        ref={deleteModalRef}
        option="hidden"
        >
        <div>
          <div>평가를 삭제하시겠습니까?</div>
        </div>
        <div className='div-modal-button-container'>
          <CancelButton 
            onClick={closeDeleteModal}
            text="취소"
          />
          <div></div>
          <CustomButton 
            onClick={handleRatingRemove}
            text="삭제"
            />
        </div>
      </CommonModal>
      <CommonModal
        isModalOpen={isCancelModalOpen}
        closeModal={closeCancelModal}
        ref={cancelModalRef}
        option="hidden"
        >
        <div>
          <div>현재 창에서 나가면 지금까지 작성한 내용이 사라집니다. 정말 나가시겠습니까?</div>
        </div>
        <div className='div-modal-button-container'>
          <CancelButton 
            onClick={closeCancelModal}
            text="취소"
            />
          <div></div>
          <CustomButton 
            onClick={handleRatingCancel}
            text="예"
            />
        </div>
      </CommonModal>
    </div>
  )
}
