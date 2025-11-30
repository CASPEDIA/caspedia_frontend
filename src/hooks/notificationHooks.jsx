import http from "api/http"
import { errorToastMessage } from "./toastHooks"

export async function getNotificationCount() {
  try {
    const { data } = await http
      .get(`/noti/count`)
    return data;
  } catch (e) {
    errorToastMessage("서버 에러가 발생하였습니다.");
  }
}

export async function getNotifications() {
  try {
    const { data } = await http
      .get(`/noti/info`)
    return data;
  } catch (e) {
    errorToastMessage("서버 에러가 발생하였습니다.");
  }
}

export async function setNotificationRead(notificationKey) {
  try {
    const { data } = await http
      .post(`/noti/read`,{
        "notification_key" : notificationKey
      })
    return data;
  } catch (e) {
    errorToastMessage("서버 에러가 발생하였습니다.");
  }
}
