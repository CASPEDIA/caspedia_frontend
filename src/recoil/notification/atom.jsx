export const NOTIFICATION_FLAG = {
  REPLY_ON_RATING: 1,
  IMPRESSED_ON_RATING: 2,
  IMPRESSED_ON_REPLY: 3,
  RATING_ON_RATED_BOARDGAME: 4,
  RATING_ON_LIKED_BOARDGAME: 5,
};

export const getNotificationFlag = (code) => {
  return NOTIFICATION_FLAG[code] ?? 0; 
}