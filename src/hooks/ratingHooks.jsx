import http from "api/http"

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
    return data;
  } catch (e) {
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
    return data;
  } catch (e) {
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
    return data;
  } catch (e) {
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
