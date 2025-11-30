import React, { useEffect, useState } from 'react'
import './Notification.css'
import { getNotifications } from 'hooks/notificationHooks'
import NotificationItem from 'components/notification/NotificationItem';

export default function Notification() {
  const [myNotiList, setMyNotiList] = useState([]);

  useEffect(() => {
    getNotifications()
      .then((data) => {
        var parsedData = []

        data.forEach((item) => {
          parsedData.push({
            notificationKey: item.notification_key,
            code: item.code,
            ratingKey: item.rating_key,
            replyKey: item.reply_key,
            boardgameKey: item.boardgame_key,
            isRead: item.read,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            description: item.description
          });
        })
        setMyNotiList(parsedData);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [])

  return (
    <div className='custom-notification-list'>
      {
        myNotiList.map((item,index) => {
          return (
            <NotificationItem
              key={index}
              notificationKey= {item.notificationKey}
              code= {item.code}
              ratingKey= {item.ratingKey}
              replyKey= {item.replyKey}
              boardgameKey= {item.boardgameKey}
              isRead= {item.isRead}
              createdAt= {item.createdAt}
              updatedAt= {item.updatedAt}
              description= {item.description}
            />
          )
        })
      }
    </div>
  )
}
