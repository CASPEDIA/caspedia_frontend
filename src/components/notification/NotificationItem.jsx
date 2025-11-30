import React, { useEffect, useState } from 'react'
import './NotificationItem.css'
import { getNotificationFlag} from 'recoil/notification/atom';
import { useNavigate } from 'react-router-dom';
import { setNotificationRead } from 'hooks/notificationHooks';

export default function NotificationItem({
  notificationKey=1,
  code="RATING_ON_RATED_BOARDGAME",
  ratingKey=1,
  replyKey=1,
  boardgameKey=1,
  isRead=false,
  createdAt="2024-11-16T15:47:37.450685",
  updatedAt="2024-11-16T15:47:37.450685",
  description="알림 내용"
}) {
  const navigate = useNavigate();
  const [notificationType, setNotificationType] = useState("RATING_ON_RATED_BOARDGAME");

  const clickedNotification = (flag) => {
    setNotificationRead(notificationKey)
      .then(() => {
        if (flag === 1 || flag === 2 || flag === 3) {
          navigate(`/ratingdetail/${ratingKey}`);
          return
        }
        else {
          navigate(`/boardgame/${boardgameKey}`);
          return
        }
      })
  }

  const getNotificationIcon = (flag) => {
    if (flag === 1) return "/img/F7_reply.svg";        // 댓글 알림
    if (flag === 2 || flag === 3) return "/img/F7_heart.png";   // 감탄/좋아요 알림
    if (flag === 4 || flag === 5) return "/img/F7_star.png";  // 새 리뷰 알림

    return "/img/noimage.png"; // 혹시 없을 경우 대비 (선택)
  };

  useEffect(() => {
    console.log(isRead)
    setNotificationType(getNotificationFlag(code));
  },[])

  return (
    <div 
      className={`div-notification-info-container ${isRead ? 'read' : ''}`}
      onClick={() => clickedNotification(notificationType)}
    >
      <img 
        src={getNotificationIcon(notificationType)}
        className="notification-inner-icon"
        alt="알림"
      />
      <div className="notification-inner-description">
        {description}
      </div>
    </div>
  )
}
