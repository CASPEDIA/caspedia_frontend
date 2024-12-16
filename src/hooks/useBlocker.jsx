// import { useEffect } from "react";
// import { useBlocker, useNavigate } from "react-router-dom";

// export function usePrompt(when, message) {
//   const blocker = useBlocker(when);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (blocker.state === "blocked") {
//       const confirm = window.confirm(message || "Are you sure you want to leave?");
//       if (confirm) {
//         blocker.proceed();
//       } else {
//         blocker.reset();
//       }
//     }
//   }, [blocker, message]);

//   return blocker;
// }
