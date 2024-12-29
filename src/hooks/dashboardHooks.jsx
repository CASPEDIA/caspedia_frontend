import http from "api/http";

export async function getRecentBoardgameRatings() {
  try {
    const { data } = await http
      .get(`/dashboard/boardgame/recent`)
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getRecentUserRatings() {
  try {
    const { data } = await http
      .get(`/dashboard/user/recent`)
    return data;
  } catch (e) {
    throw e;
  }
}