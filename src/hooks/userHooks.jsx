import http from "api/http";

export function userLogin (id,password,setCookie) {
  http
  .post('/user/login', {
    "id" : id,
    "password" : password
  })
  .then(({data}) => {
    setCookie("jwtToken", data.token, { path: "/", secure: true, sameSite: "strict"})
    setCookie("nanoid", data.nanoid, { path: "/", secure: true, sameSite: "strict"})
    // localStorage.setItem("jwtToken", data.token);
    // localStorage.setItem("nanoid",data.nanoid);
    window.location.href="/";
  })
  .catch((e) => {
    console.log(e);
  })
}

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

export function hasAuth (cookies) {
  const token = cookies.jwtToken;
  const nanoid = cookies.nanoid;
  if (token && nanoid) return true;
  else return false;
}