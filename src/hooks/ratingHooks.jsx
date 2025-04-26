import http from "api/http"
import { errorToastMessage, infoToastMessage, successToastMessage, warningToastMessage } from "./toastHooks";

/**
 * 평가 추가
 * @param {보드게임키} boardgameKey 
 * @param {평점} score 
 * @param {한줄평} comment 
 * @param {선택한 태그} tagKey 
 * @returns 
 */
export async function addRating(boardgameKey, score, comment, tagKey) {
  try {
    const { data } = await http
      .post(`/rating/${boardgameKey}`,{
        "score" : score,
        "comment" : comment,
        "tag_key" : tagKey,
      })
    successToastMessage("리뷰가 생성되었습니다.");
    return data;
  } catch (e) {
    errorToastMessage("서버 에러가 발생하였습니다.");
    throw e;
  }
}

/**
 * 평가 수정
 * @param {보드게임키} boardgameKey 
 * @param {평점} score 
 * @param {한줄평} comment 
 * @param {선택한 태그} tagKey 
 * @returns 
*/
export async function setRating(boardgameKey, score, comment, tagKey) {
  try {
    const { data } = await http
    .put(`/rating/${boardgameKey}`,{
      "score" : score,
      "comment" : comment,
      "tag_key" : tagKey,
    })
    infoToastMessage("리뷰가 수정되었습니다.");
    return data;
  } catch (e) {
    errorToastMessage("서버 에러가 발생하였습니다.");
    throw e;
  }
}

/**
 * 평가 제거
 * @param {보드게임키} boardgameKey 
 * @returns 
*/
export async function removeRating(boardgameKey) {
  try {
    const { data } = await http
    .delete(`/rating/${boardgameKey}`)
    warningToastMessage("리뷰가 삭제되었습니다.");
    return data;
  } catch (e) {
    errorToastMessage("서버 에러가 발생하였습니다.");
    throw e;
  }
}

/**
 * 내평가 가져오기
 * @param {보드게임키} boardgameKey 
 * @returns 
 */
export async function getMyRating(boardgameKey) {
  try {
    const { data } = await http
      .get(`/rating/${boardgameKey}`)
    return data;
  } catch (e) {
    throw e;
  }
  
}

/**
 * 리뷰 요청 생성
 * @param {보드게임키} boardgameKey 
 * @returns 
 */
export async function addRatingRequest(boardgameKey) {
  try {
    const { data } = await http
      .post(`/rating/req/${boardgameKey}`)
    successToastMessage("리뷰를 요청하였습니다.");
    return data;
  } catch (e) {
    if (e.response?.status === 400) {
        warningToastMessage("보드게임을 찾을 수 없습니다다.");
      } else if (e.response?.status === 409) {
        warningToastMessage("이미 진행중인 리뷰 요청이 있습니다.");
      } else {
        errorToastMessage("리뷰 요청에 실패하였습니다.");
    }
    throw e;
  }
}

/**
 * 리뷰 요청 목록
 * @returns 
 */
export async function getRatingRequest() {
  try {
    const { data } = await http
      .get(`/rating/req`)
    return data;
  } catch (e) {
    throw e;
  }
}

/**
 * 평점 랭킹 상위 5개개
 * @returns 
 */
export async function getScoreRankTop5() {
  try {
    const { data } = await http
      .get(`/rating/ranking/score/top5`)
    return data;
  } catch (e) {
    throw e;
  }
}

/**
 * 평점 랭킹 전체 (100개)
 * @returns 
 */
export async function getScoreRanks() {
  try {
    const { data } = await http
    .get(`/rating/ranking/score/top100`)
    return data;
  } catch (e) {
    throw e;
  }
}

/**
 * 리뷰 수 랭킹 상위 5개개
 * @returns 
 */
export async function getRCountRankTop5() {
  try {
    const { data } = await http
      .get(`/rating/ranking/count/top5`)
    return data;
  } catch (e) {
    throw e;
  }
}

/**
 * 기간별 리뷰 수 랭킹킹
 * @param {30/90/전체} period 
 * @returns 
 */
export async function getRCountRanks(period) {
  try {
    const { data } = await http
      .get(`/rating/ranking/count/top100?period=${period}`)
    return data;
  } catch (e) {
    throw e;
  }
}

