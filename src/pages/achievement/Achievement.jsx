import React, { useEffect, useState } from 'react'
import './Achievement.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserAchievement, getUserBasicInfo } from 'hooks/userHooks';
import CancelButton from 'components/common/CancelButton';

export default function Achievement() {
  const {nanoid} = useParams();
  const [badgeGroups, setBadgeGroups] = useState({});
  const [eventGroups, setEventGroups] = useState([]);
  const [commonBadge, setCommonBadge] = useState({});
  const thresholds = [1,10,50,100,200,300,400,500];
  const translate = {
    "login" : "로그인 횟수",
    "rating" : "한줄평 수",
    "comment" : "댓글 수",
    "like" : "게임 좋아요 수",
  }

  const [introduction, setIntroduction] = useState("");
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [userImageKey, setUserImageKey] = useState('');

  const navigate = useNavigate();

  const otherImageStyle = {
    backgroundImage: `url('/user_profile/profile_${userImageKey < 10 ? "0" : ""}${userImageKey}.png` ,
    backgroundSize: 'cover',    // 이미지 크기 조정
    backgroundPosition: 'center', // 이미지 위치 조정
    backgroundRepeat: 'no-repeat', // 이미지 반복 방지
    width: '6em',
    height: '6em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  };

  useEffect(() => {
    getUserBasicInfo(nanoid)
      .then((data) => {
        setIntroduction(data.introduction);
        setName(data.name);
        setNickname(data.nickname);
        setUserImageKey(data.user_image_key);
      })
      .catch((err) => {
        console.log(err);
      });
        

    getUserAchievement(nanoid)
      .then((data) => {
        const common_badge = data["common_badge"];
        setCommonBadge(data["common_badge"]);

        const keys = ["login", "rating", "comment", "like"];
        const newGroups = {};

        keys.forEach(key => {
          const currentScore = common_badge[key];
          
          // 1. 현재 점수로 달성한 '최고' 기준값의 인덱스 찾기
          let achievedIdx = 0;
          for (let i = 0; i < thresholds.length; i++) {
            if (currentScore >= thresholds[i]) {
              achievedIdx = i;
            }
          }

          // 2. 달성한 수치가 가운데(2번째) 오도록 시작 인덱스 설정
          // 시작 인덱스 = 달성 인덱스 - 1
          let startIdx = achievedIdx - 1;

          // [예외처리] 시작 인덱스가 0보다 작아지면 0으로 고정 (1, 10, 50 출력)
          if (startIdx < 0) {
            startIdx = 0;
          }

          // [예외처리] 마지막 인덱스를 넘어가지 않도록 고정 (300, 400, 500 출력)
          if (startIdx > thresholds.length - 3) {
            startIdx = thresholds.length - 3;
          }

          const displayThresholds = thresholds.slice(startIdx, startIdx + 3);

          newGroups[key] = displayThresholds.map(t => ({
            fileName: `${key}_${t}.png`,
            isAchieved: currentScore >= t
          }));
        });

        setBadgeGroups(newGroups);

        var event_badge = data["event_badge"];
        var event_badge_src = [];

        event_badge.forEach(event => {
          event_badge_src.push(`${event}.png`);
        })

        setEventGroups(event_badge_src);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [nanoid]);

  return (
    <div className='div-achievement-user-container'>
      <div className='div-achievement-user-name-info'>
        <div style={otherImageStyle} />            
        <div className='div-achievement-user-inner-info'>
          <div className='div-achievement-nickname'>
            <strong>{nickname}&nbsp; </strong> 님의 업적
          </div>
          <div className='div-achievement-name-info'>
            {name}
          </div>
        </div>
      </div>
      <div className='div-achievement-inner-container'>
        {Object.entries(badgeGroups).map(([key, group]) => (
          <div key={key} className="badge-row" style={{ marginBottom: '20px' }}>
            <div className='div-badge-title'>{translate[key]} : {commonBadge[key]}</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {group.map((badge, index) => (
                <img
                key={`${key}-${index}`}
                src={`/img/badge/${badge.fileName}`}
                alt={badge.fileName}
                className={badge.isAchieved ? "custom-badge-normal" : "custom-badge-normal-gray"}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="badge-row" style={{ marginBottom: '20px' }}>
          <div className='div-badge-title'>
            이벤트 업적
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {eventGroups.map((src, index) => (
              <img
              key={`${src}-${index}`}
              src={`/img/badge/${src}`}
              alt={src}
              className="custom-badge-normal"
              />
            ))}
          </div>
        </div>
      </div>
      <div className='div-button-container'>
        <CancelButton
          text="뒤로 가기"
          onClick={() => navigate(-1)}
          />
      </div>
    </div>
  )
}
