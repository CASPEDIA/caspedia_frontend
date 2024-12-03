import http from "api/http";

/**
 * 로그인 로직 처리
 * @param {아이디} id 
 * @param {비밀번호} password 
 * @param {쿠키 설정을 위한 메소드} setCookie 
 */
export async function userLogin (id,password,setCookie) {
  try {
    const { data } = await http
      .post('/user/login', {
        "id" : id,
        "password" : password
      });
    setCookie("jwtToken", data.token, { path: "/", secure: true, sameSite: "strict"})
    setCookie("nanoid", data.nanoid, { path: "/", secure: true, sameSite: "strict"})
    // localStorage.setItem("jwtToken", data.token);
    // localStorage.setItem("nanoid",data.nanoid);
    window.location.href="/";
  } catch (e) {
    // console.log(e);
    throw e;
  }
}

/**
 * 로그아웃
 * @param {쿠키 삭제를 위한 메소드} removeCookie 
 */
export function userLogout (removeCookie){
  http
  .post('/user/logout')
  .then(({data}) => {
    console.log("logout");
    removeCookie("jwtToken", { path: "/" });
    removeCookie("nanoid", { path: "/" });
    // localStorage.removeItem('jwtToken');
    // localStorage.removeItem('nanoid'); 
    window.location.href='/signin';
  })
  .catch((e) => {
    console.log(e);
  })
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

/**
 * 로그인 상태 확인
 * @param {쿠키 상태 확인} cookies 
 * @returns 
 */
export function hasAuth (cookies) {
  const token = cookies.jwtToken;
  const nanoid = cookies.nanoid;
  if (token && nanoid) return true;
  else return false;
}


/**
 * 내 정보인지 확인
 * @param {쿠키} cookies 
 * @param {확인하고자 하는 유저 } nanoid 
 * @returns 
 */
export function isMyInfo (cookies, nanoid) {
  if (cookies.nanoid === nanoid) return true;
  else return false;
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

export async function autoFillUser(query) {
  try {
    const { data } = await http
      .get(`/user/autofill?q=${query}`)
    return data;
  } catch (e) {
    throw e
  }  
}