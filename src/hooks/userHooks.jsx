import http from "api/http";

export function userLogin (id,password) {
  http
    .post('/user/login', {
      "id" : id,
      "password" : password
    })
    .then(({data}) => {
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("nanoid",data.nanoid);
      window.location.href="/";
    })
    .catch((e) => {
      console.log(e);
    })
}

export function userLogout (){
  http
    .post('/user/logout')
    .then(({data}) => {
      console.log("logout");
      localStorage.removeItem('jwtToken'); // JWT 토큰 삭제
      localStorage.removeItem('nanoid'); // 현재 로그인 유저 nanoid 삭제
      window.location.href='/signin';
    })
    .catch((e) => {
      console.log(e);
    })
}

export function userJoin (){
  http
    .post('/api/admin/join', {
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

export function hasAuth () {
  const token = localStorage.getItem('jwtToken');
  const nanoid = localStorage.getItem('nanoid');
  if (token && nanoid) return true;
  else return false;
}