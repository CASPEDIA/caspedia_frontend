import http from "api/http"
import { errorToastMessage } from "./toastHooks";

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

export async function autoFillBoardgame(query) {
  try {
    const { data } = await http
      .get(`/boardgame/autofill?q=${query}`)
    return data;
  } catch (e) {
    throw e
  }  
}

export async function getBoardgameSearchResult(query, page) {
  try {
    const {data} = await http
      .get(`/boardgame/search?q=${query}&page=${page}`)
    return data;
  } catch (e) {
    throw e;
  }
  
}

export async function getExploreResults(page, minp, maxp, mint, maxt, ming, maxg, sort) {
  try {
    const {data} = await http
      .get(`/boardgame/explore?page=${page}&minp=${minp}&maxp=${maxp}&mint=${mint}&maxt=${maxt}&ming=${ming}&maxg=${maxg}&sort=${sort}`)
    return data;
  } catch (e) {
    errorToastMessage("서버 에러가 발생하였습니다.");
    throw e;    
  }
  
}