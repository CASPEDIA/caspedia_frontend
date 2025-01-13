import http from "api/http";
import { useRecoilValue, useRecoilState } from "recoil";
import { UNLOGINED_USER, userState } from "recoil/userstate/atom";


export function useUserLogin() {
  const [user, setUser] = useRecoilState(userState);
  const userLogin = async (id, password) => {
    try {
      const { data } = await http
        .post('/user/login', {
          "id" : id,
          "password" : password
        })
      setUser({
        hasLogin: true,
        id: id,
        nanoid: data.nanoid,
        jwtToken: data.token,
        authority: data.authority,
        userImageKey: data.user_image_key,
      });
      window.location.href="/";
    } catch (e) {
      throw e;
    }
  };

  return userLogin;
}

export function useUserLogout () {
  const [user, setUser] = useRecoilState(userState);
  const userLogout = async () => {
    try {
      const { data } = await http
        .post('/user/logout');
      setUser(UNLOGINED_USER);    
      window.location.href='/signin';
    } catch (e) {
      throw e;
    }
  };

  return userLogout;
}

/**
 * 회원가입 메소드
 */
export function userJoin (){
  http
  .post('/admin/join', {
    "id":"test2",
    "name":"test",
    "password":"test",
    "student_id":12345,
    "nickname":"ssafy",
    "authority_key":2,
    "user_image_key":1
  })
  .then(({data}) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  })
}

export function useHasAuth() {
  const user = useRecoilValue(userState);
  const hasAuth = () => {
    return user.hasLogin;
  };
  return hasAuth;
}


export function useIsMyInfo() {
  const user = useRecoilValue(userState);
  
  const isMyInfo = (nanoid) => {
    if (user.nanoid === nanoid) return true;
    else return false;
  };
  return isMyInfo;
}

/**
 * 유저 페이지 기본 정보
 * @param {확인하고자 하는 유저} nanoid 
 * @returns 
 */
export async function getUserBasicInfo (nanoid) {
  try {
    const { data } = await http
      .get(`/user/${nanoid}`);
    return data;
  } catch (e) {
    // console.log(e);
    throw e;
  }
}

/**
 * 유저 소개 변경
 * @param {새 소개 내용} newIntroduction 
 * @returns 
 */
export async function setUserIntroduction (newIntroduction) {
  try {
    const { data } = await http
      .put(`/user/introduction`, {
        "new_introduction" : newIntroduction
      });
    return data;
  } catch (e) {
    // console.log(e);
    throw e;
  }
}

/**
 * 유저가 좋아하는 보드게임 리스트
 * @param {검색하고자 하는 유저} nanoid 
 * @returns 
 */
export async function getLikedBoardgames (nanoid) {
  try {
    const { data } = await http
      .get(`/user/likes?nanoid=${nanoid}`);
    return data;
  } catch (e) {
    throw e;
  }
}

/**
 * 유저가 남긴 평가목록들
 * @param {검색하고자 하는 유저} nanoid 
 * @returns 
 */
export async function getRatedBoardgames (nanoid) {
  try {
    const { data } = await http
      .get(`/user/ratings?nanoid=${nanoid}`);
    return data;
  } catch (e) {
    throw e;
  }
}

/**
 * 닉네임 중복 확인
 * @param {새 닉네임} newNickname 
 */
export async function checkMyNewNickname(newNickname) {
  try {
    const { data } = await http
      .post(`/user/nickname`, {
        "new_nickname" : newNickname
      })
    return data;
  } catch (e) {
    throw e;
  }
}

/**
 * 닉네임 변경
 * @param {새 닉네임} newNickname 
 */
export async function setMyNewNickname(newNickname) {
  try {
    const { data } = await http
      .put(`/user/nickname`, {
        "new_nickname" : newNickname
      })
    return data;
  } catch (e) {
    throw e;
  }
}

/**
 * 비밀번호 변경
 * @param {이전 비밀번호} oldPassword 
 * @param {새 비밀번호} newPassword 
 * @returns 
 */
export async function setMyNewPassword(oldPassword, newPassword) {
  try {
    const { data } = await http
      .put(`/user/password`, {
        "old_password" : oldPassword,
        "new_password" : newPassword
      })
    return data;
  } catch (e) {
    throw e;
  }
  
}

/**
 * 유저 검색 자동 완성성
 * @param {쿼리} query 
 * @returns 
 */
export async function autoFillUser(query) {
  try {
    const { data } = await http
      .get(`/user/autofill?q=${query}`)
    return data;
  } catch (e) {
    throw e
  }  
}

/**
 * 이미지 변경
 * @param {새 이미지 키} newImageKey 
 * @returns 
 */
export async function setMyNewProfile(newImageKey) {
  try {
    const { data } = await http
      .put(`/user/image`, {
        "new_image_key" : newImageKey
      })
    return data;
  } catch (e) {
    throw e;
  }
}