import http from "api/http"

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
export async function removeRating(boardgameKey) {
  try {
    const { data } = await http
      .remove(`/rating/${boardgameKey}`)
    return data;
  } catch (e) {
    throw e;
  }
}

