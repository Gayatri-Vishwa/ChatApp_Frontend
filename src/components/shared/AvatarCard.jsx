// import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
// import React from 'react'
// import { transformImage } from '../../lib/featues'


// //todo transform


// function AvatarCard({avatar=[],max=4}) {


//   return <Stack direction={"row"} spacing={0.5}>
// <AvatarGroup max={max} sx={{
//   position:"relative"
// }}>

// <Box width={"5rem"} height={"2rem"}>

//   {
//     avatar.map((src,index)=>(
//       <Avatar 
//       // key={Math.random()*100}
//       key={`${src}-${index}`}
//       // src={src}
//       src={transformImage(src)}
//       alt={`Avatar ${index}`}
//       sx={{
//         width:"3rem",
//         height:"3rem",
//        position:"absolute",
//          border: "2px solid white",   // 🔥 clean separation
//         boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
//        left:{
//         // xs: `${0.5 + index}rem`,
//         xs:"0rem",
//         sm:`${index}rem`,
//         paddingRight:2
//        }
//       }}
//        />
//     ))
//   }
// </Box>
// </AvatarGroup>
//   </Stack>
// }

// export default AvatarCard





// =====================ok h======================



// import { Avatar, AvatarGroup, Box } from "@mui/material";
// import React from "react";
// import { transformImage } from "../../lib/featues";

// function AvatarCard({ avatar = [], max = 4 }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",   // 👈 vertical center fix
//         height: "100%",
//       }}
//     >
//       <AvatarGroup
//         max={max}
//         sx={{
//           alignItems: "center",  // 👈 important fix
//         }}
        
//       >
//         {avatar.map((src, index) => (
//           <Avatar
//             key={`${src}-${index}`}
//             src={transformImage(src)}
//             sx={{
//               width: "3rem",
//               height: "3rem",
//               border: "2px solid white",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
//             }}
//           />
//         ))}
//       </AvatarGroup>
//     </Box>
//   );
// }

// export default AvatarCard;

// ========================================================================

import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImage } from "../../lib/featues";

// Todo Transform
const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup
        max={max}
        sx={{
          position: "relative",
        }}
      >
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((i, index) => (
            <Avatar
              key={Math.random() * 100}
              src={transformImage(i)}
              alt={`Avatar ${index}`}
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: {
                  xs: `${0.5 + index}rem`,
                  sm: `${index}rem`,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;