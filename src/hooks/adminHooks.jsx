import http from "api/http";
import { useRecoilValue } from "recoil";
import { userState } from "recoil/userstate/atom";

export async function getUsers() {
  try {
    const { data } = await http
      .get(`/admin/users`)
    return data;
  } catch (e) {
    throw e;
  }
}

export async function addUserByAdmin(newUser) {
  try {
    const { data } = await http
      .post(`/admin/join`, {
        "id" : newUser.id,
        "name" : newUser.name,
        "student_id" : newUser.studentId,
        "enabled" : newUser.enabled,
        "authority_key" : newUser.authorityKey,
      })
    return data;
  } catch (e) {
    throw e;
  }
}

export async function setUserByAdmin(userData) {
  try {
    const { data } = await http
      .put(`/admin/user`, {
        "nanoid" : userData.nanoid,
        "nickname" : userData.nickname,
        "introduction" : userData.introduction,
        "enabled" : userData.enabled,
        "authority_key" : userData.authorityKey,
      })
    return data;
  } catch (e) {
    throw e;
  }
}

export async function removeUser(nanoid) {
  try {
    const { data } = await http
      .delete(`/admin/user?nanoid=${nanoid}`)
    return data;
  } catch (e) {
    throw e;
  }  
}

export async function resetPassword(nanoid) {
  try {
    const { data } = await http
      .put(`/admin/reset?nanoid=${nanoid}`)
    return data;
  } catch (e) {
    throw e;
  }
}

export function useHasAdmin() {
  const user = useRecoilValue(userState);
  const hasAdmin = () => {
    if (user.authority === "ROLE_ADMIN") return true;
    else return false;
  }
  return hasAdmin;
}