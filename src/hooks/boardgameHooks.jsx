import http from "api/http"

export async function getBoardgameBasicInfo (boardgameKey) {
  try {
    const {data} = await http
      .get(`/boardgame/basicinfo?id=${boardgameKey}`);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function checkBoardgameLike(boardgameKey) {
  try {
    const {data} = await http
      .get(`/boardgame/like?id=${boardgameKey}`);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function addBoardgameLike(boardgameKey) {
  try {
    const {data} = await http
    .post(`/boardgame/like?id=${boardgameKey}`);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function removeBoardgameLike(boardgameKey) {
  try {
    const {data} = await http
      .delete(`/boardgame/like?id=${boardgameKey}`);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getBoardgameLikedUsers(boardgameKey) {
  try {
    const {data} = await http
      .get(`/boardgame/likelist?id=${boardgameKey}`);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getBoardgameRatings(boardgameKey) {
  try {
    const {data} = await http
      .get(`/boardgame/rating?id=${boardgameKey}`);
    return data;
  } catch (e) {
    throw e;
  }
  
}