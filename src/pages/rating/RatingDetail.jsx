import React, { useEffect, useRef, useState } from 'react'
import './RatingDetail.css'
import { addRatingImpressed, addReply, getRatingDetail, removeRatingImpressed } from 'hooks/ratingHooks'
import { useNavigate, useParams } from 'react-router-dom'
import CustomTag from 'components/tagged/CustomTag';
import { REVIEW_TAGLIST, REVIEW_TAGLIST_ORDER } from 'recoil/tag/atom';
import { userState } from 'recoil/userstate/atom';
import { useRecoilValue } from 'recoil';
import CancelButton from 'components/common/CancelButton';
import Reply from 'components/rating/Reply';

export default function RatingDetail() {
  const {ratingkey} = useParams();
  const user = useRecoilValue(userState);

  const [gameInfo, setGameInfo] = useState({});
  const [ratingInfo, setRatingInfo] = useState({});
  const [replyInfo, setReplyInfo] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const pressImpressed = () => {
    if (ratingInfo.isImpressed) {
      removeRatingImpressed(ratingkey)
        .then((data) => {
          setRatingInfo((prev) => ({
            ...prev,
            impressedCount: prev.impressedCount - 1,
            isImpressed: false,
          }));
        })
        .catch((e) => {
          console.log(e);
        })
    } else {
      addRatingImpressed(ratingkey)
        .then((data) => {
          setRatingInfo((prev) => ({
            ...prev,
            impressedCount: prev.impressedCount + 1,
            isImpressed: true,
          }));
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }

  const handleCreateReply = () => {
    if (replyContent === "") return;
    addReply(ratingkey, replyContent)
      .then((data) => {
        setReplyContent("");
        navigate(0);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const handleReplyContentChange = (e) => {
    const query = e.target.value;
    setReplyContent(query);
  }

  const handleReplyContentKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCreateReply();
    }
  }


  useEffect(() => {
    var tmpGameInfo = {};
    var tmpRatingInfo = {};
    var tmpReplyListInfo1 = [];
    var tmpReplyListInfo2 = [];
    var tmpReplyInfo = {};
    getRatingDetail(ratingkey)
      .then((data) => {
        tmpGameInfo = {
          boardGameKey: data["game_info"].boardgame_key,
          imageUrl: data["game_info"].image_url,
          nameKor: data["game_info"].name_kor,
          nameEng: data["game_info"].name_eng,
          yearPublished: data["game_info"].year_published,
          castScore: data["game_info"].cast_score,
        }
        setGameInfo(tmpGameInfo);

        tmpRatingInfo = {
          nanoid: data["rating_info"].nanoid,
          nickname: data["rating_info"].nickname,
          userImageKey: data["rating_info"].user_image_key,
          comment: data["rating_info"].comment,
          score: data["rating_info"].score,
          createdAt: data["rating_info"].created_at,
          updatedAt: data["rating_info"].updated_at,
          tagKeys: data["rating_info"].tag_keys,
          impressedCount: data["rating_info"].impressed_count,
          replyCount: data["rating_info"].reply_count,
          isImpressed: data["rating_info"].is_Impressed,
        }
        setRatingInfo(tmpRatingInfo);

        var tmpList = []
        for (let i = 0; i < data["rating_info"].tag_keys.length; i++){
          if(data["rating_info"].tag_keys[REVIEW_TAGLIST_ORDER[i]] === '1') {
            tmpList.push({
                "index" : REVIEW_TAGLIST_ORDER[i]+1,
                "value" : REVIEW_TAGLIST[REVIEW_TAGLIST_ORDER[i]]
              }
            );
          } 
        }
        setTagList(tmpList);

        tmpReplyListInfo1 = data["reply_info"];

        tmpReplyListInfo1.forEach((item) => {
          tmpReplyInfo = {
            replyKey: item.reply_key,
            nanoid: item.nanoid,
            nickname: item.nickname,
            userImageKey: item.user_image_key,
            impressedCount: item.impressed_count,
            content: item.content,
            isImpressed: item.is_Impressed,
          }
          tmpReplyListInfo2.push(tmpReplyInfo);
        })
        setReplyInfo([...tmpReplyListInfo2]);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [])
  return (
    <div className='div-ratingdetail-detail-container'>
      <div className='div-ratingdetail-detail-boardgame-info'>
        <div className='div-ratingdetail-detail-boardgame-inner-info'>
          <img className='custom-link' src={gameInfo.imageUrl || "/img/F2_no_image.png"} width="20%" alt="noImage" onClick={() => navigate(`/boardgame/${gameInfo.boardGameKey}`)}/>
          <div className='custom-link' style={{"paddingLeft" : "5%", "textAlign" : "left"}}  onClick={() => navigate(`/boardgame/${gameInfo.boardGameKey}`)}>
            <div>
              <strong>{gameInfo.nameKor|| gameInfo.nameEng}</strong>
            </div>
            <div>
              {'('}{gameInfo.yearPublished}{')'}
            </div> 
          </div>
        </div>
        <div className='div-ratingdetail-detail-boardgame-inner-info' style={{"paddingRight" : "5%"}}>
          <div style={{"paddingRight" : "1em"}}>
            <img src="/img/F2_cast_rating_logo.png" alt="logo" width="40em" />
          </div>
          <h2>
            {gameInfo.castScore}
          </h2>
        </div>
      </div>

      <div className='div-boardgame-ratingdetail-detail'>

        <div className={`div-boardgame-ratingdetail-card`}>
          <div className='div-boardgame-ratingdetail-basic-info'>
            <div className='div-boardgame-ratingdetail'>
              <img className='custom-link' src={`/user_profile/profile_${ratingInfo.userImageKey < 10 ? "0" : ""}${ratingInfo.userImageKey}.png` || "/user_profile/profile_01.png"} style={{"borderRadius": "50%", "width" : "6em", "height" : "6em"}} alt="이미지" onClick={() => navigate("/user/" + ratingInfo.nanoid)}/>
              <div style={{"textAlign":"left", "padding":"0 1rem 0 1rem"}}>
                <strong className='custom-link' style={{"paddingRight":"0.5rem" }} onClick={() => navigate("/user/" + ratingInfo.nanoid)}>{ratingInfo.nickname}</strong>
                <br />
              </div>
            </div>
            <div className='boardgame-ratingdetail-circle'>
              {ratingInfo.score}
            </div>
          </div>
            <div className='div-tag-container'>
              {tagList.map((item, index) => {
                return(
                  <CustomTag
                  key={index}
                  text={item["value"]}
                  idx={item["index"]}
                  />
                  )
                })
              }
            </div>
            <div className='custom-whitespace' style={{"textAlign": "left", "padding" : "0% 3%"}}>
              {ratingInfo.comment}
            </div>
          <div className='div-etc-container'>
            {ratingInfo.isImpressed ?
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
            <div style={{"padding" : "0% 3%"}}>{ratingInfo.impressedCount}</div>
            <img src="/img/reply.svg" alt="impressed" width="20em" />
            <div style={{"padding" : "0% 3%"}}>{ratingInfo.replyCount}</div>
          </div>
        </div>

        <div className='div-ratingdetail-detail-reply-container'>
          <div className='div-ratingdetail-detail-replies'>
            {replyInfo.map((item,index) => {
              return (
                <Reply 
                  key={index}
                  replyKey={item.replyKey}
                  nanoid={item.nanoid}
                  nickname={item.nickname}
                  userImageKey={item.userImageKey}
                  impressedCount={item.impressedCount}
                  content={item.content}
                  isImpressed={item.isImpressed}
                />
              )
            })
            
            }
          </div>
          <div className='div-ratingdetail-detail-add-reply'>
            <img 
                src={user.userImageKey ? `/user_profile/profile_${user.userImageKey < 10 ? "0" : ""}${user.userImageKey}.png` : "/img/F5_user_menu.png" } 
                alt="User" 
                className="nav-icon"
                style={{"marginRight" : "2%" , "borderRadius":"50%"}} 
            />
            <input 
              type="text" 
              placeholder='이 한줄평에 댓글 남기기...'
              className='custom-input'
              maxLength="299"
              value={replyContent}
              onChange={handleReplyContentChange}
              onKeyDown={handleReplyContentKeyDown}
              ref={inputRef}
            />
            <CancelButton 
              onClick={() => handleCreateReply()}
              text="등록"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
