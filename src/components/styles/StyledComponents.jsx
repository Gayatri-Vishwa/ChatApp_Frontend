// import { keyframes, Skeleton, styled } from "@mui/material";
// import { Link as LinkComponent } from "react-router-dom";
// import { grayColor } from "../constants/Color";
//  const VisuallyHiddenInput = styled("input")( {
//     border: 0,
//     clip: "rect(0 0 0 0)",
//     height: 1,
//     margin: -1,
//     overflow: "hidden",
//     padding: 0,
//     position: "absolute",
//     width: 1,
//     whiteSpace: "nowrap",
   
//  });     



//   const Link = styled(LinkComponent)({
//   textDecoration: "none",
//   color: "black",
//   padding: "1rem",
//   "&:hover": {
//     backgroundColor: "rgba(0,0,0,0.1)"
//   }
// });

//  const InputBox=styled("input")({
//   width:"100%",
//   height:"100%",
//   border:"none",
//   outline:"none",
//   padding:"0 3rem",
//   borderRadius:"1.5rem",
//   backgroundColor:`${grayColor}`
//   //   resize: "none",

//   // wordBreak: "break-word",
//   // overflowWrap: "anywhere",`

// })

//  const SearchField=styled("input")`
//   padding: 1rem 2rem;
//   width: 20vmax;
//   border: none;
//   outline: none;
//   border-radius: 1.5rem;
 
//   font-size: 1.1rem;
//    background-color:${grayColor}
// `

//  const CurveButton =styled("button")`
// border-radius: 1.5rem ;
// padding: 1rem 2rem;
// border: none;
// outline: none;
// cursor: pointer;
// background-color: black;
// color: white;
// font-size: 1.1rem;
// &:hover{
//   background-color: rgba(0,0,0,0.8);
// }`

// const bounceAnimation=keyframes`
//   0% {transform: scale(1);}
//   50% {transform: scale(1.5);}
//   100% {transform: scale(1);}
// `

//  /* const bouncingSkeleton=styled(Skeleton)(()=>{
//   animation:`${bounceAnimation} is infinite`
// }) */

// const bouncingSkeleton = styled(Skeleton)(() => ({
//   animation: `${bounceAnimation} 1s infinite`,
// }));

// export {bouncingSkeleton ,CurveButton,SearchField,InputBox,Link ,VisuallyHiddenInput}



/* =============================== */



import { Skeleton, keyframes, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
/* import { grayColor, matBlack } from "../../constants/color"; */
import { grayColor ,matBlack} from "../constants/Color";

const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: ${grayColor};
`;

const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: ${grayColor};
  font-size: 1.1rem;
`;

const CurveButton = styled("button")`
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${matBlack};
  color: white;
  font-size: 1.1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.3); }
100% { transform: scale(1); }
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));

export {
  CurveButton,
  SearchField,
  InputBox,
  Link,
  VisuallyHiddenInput,
  BouncingSkeleton,
};
