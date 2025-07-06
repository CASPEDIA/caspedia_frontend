import React, { useRef, useState } from 'react'
import './Reply.css'
import { addReplyImpressed, removeReply, removeReplyImpressed } from 'hooks/ratingHooks';
import { useNavigate } from 'react-router-dom';
import { useIsMyInfo } from 'hooks/userHooks';
import CancelButton from 'components/common/CancelButton';
import CommonModal from 'components/modal/CommonModal';
import CustomButton from 'components/common/CustomButton';

export default function Reply({
  nanoid,
  replyKey=1,
  nickname="guest",
  userImageKey=1,
  impressedCount=0,
  content="good",
  isImpressed=false,
}) {
  const navigate = useNavigate();
  const isMyInfo = useIsMyInfo();
  const [isIImpressed, setIsIImpressed] = useState(isImpressed);
  const [ReplyImpressedCount, setReplyImpressedCount] = useState(impressedCount)

  const [isReplyRemoveModalOpen, setIsReplyRemoveModalOpen] = useState(false);
  const replyRemoveModalRef = useRef(null);

  const openReplyRemoveModal = () => {
    setIsReplyRemoveModalOpen(true);
    if (replyRemoveModalRef.current) {
      replyRemoveModalRef.current.handleResize();
    }
  }

  const closeReplyRemoveModal = () => {
    setIsReplyRemoveModalOpen(false);
  }

  const pressImpressed = () => {
    if (isIImpressed) {
      removeReplyImpressed(replyKey)
        .then((data) => {
          setIsIImpressed(false);
          setReplyImpressedCount((prev) => prev-1)
        })
        .catch((e) => {
          console.log(e);
        })
      } else {
        addReplyImpressed(replyKey)
        .then((data) => {
          setIsIImpressed(true);
          setReplyImpressedCount((prev) => prev+1)
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }

  const handleRemoveReply = () => {
    removeReply(replyKey)
      .then((data) => {
        closeReplyRemoveModal();
        navigate(0);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  return (
    <div className='div-reply-container'>
      <div className='div-reply-left'>
        <img className='custom-link' src={`/user_profile/profile_${userImageKey < 10 ? "0" : ""}${userImageKey}.png` || "/user_profile/profile_01.png"} style={{"borderRadius": "50%", "width" : "4em", "height" : "4em"}} alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
        <div style={{"marginLeft" : "1em"}}>
          <strong className='custom-link'onClick={() => navigate("/user/" + nanoid)}>{nickname}</strong>
          <div>{content}</div>
        </div>
      </div>
      <div className='div-reply-right'>
        {
          isIImpressed ?
            <img 
              className='custom-link'
              onClick={pressImpressed}
              src="/img/impressed_fill.svg" 
              alt="impressed" 
              width="20em" />        
            :
            <img 
              className='custom-link'
              onClick={pressImpressed}
              src="/img/impressed_empty.svg" 
              alt="impressed" 
              width="20em" /> 
        }
        <div style={{"padding" : "0% 1em"}}>
          {ReplyImpressedCount}
        </div>
        <div>
          {isMyInfo(nanoid) ? 
            <CancelButton
              onClick={openReplyRemoveModal}
              text='삭제'
            />
            :
            <></>
          }
        </div>
      </div>
      <CommonModal
        isModalOpen={isReplyRemoveModalOpen}
        closeMOdal={closeReplyRemoveModal}
        ref={replyRemoveModalRef}
        option="hidden"
      >
        <div>
          <div>댓글을 삭제하시겠습니까?</div>
        </div>
        <div className='div-modal-button-container'>
          <CancelButton 
            onClick={closeReplyRemoveModal}
            text="취소"
            />
          <div></div>
          <CustomButton 
            onClick={handleRemoveReply}
            text="예"
            />
        </div>
      </CommonModal>
    </div>
  )
}
