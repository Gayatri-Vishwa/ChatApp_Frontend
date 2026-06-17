import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";
import {BouncingSkeleton} from '../../components/styles/StyledComponents'

 const LayoutLoaders = () => {
  return (
    <div>
      <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
        <Grid
          item
          size={{ sm: 6, md: 3 }}
          display={{ xs: "none", sm: "block" }}
          height={"100%"}
        >
          <Skeleton variant="rectangular" width={""} height={"100vh"} />
        </Grid>
        <Grid
          item
          size={{ xs: 12, sm: 8, md: 5, lg: 6 }}
          // display={{ xs: "none", sm: "block" }}
          height={"100%"}
        >
       {Array.from({length:10})
       .map((_,index)=><Skeleton key={index} variant="rounded" width={""} height={"5rem"} sx={{mb:"1rem"}} />)
  }
        </Grid>
        <Grid
          item
          size={{ md: 4, lg: 3 }}
          display={{ xs: "none", md: "block" }}
          height={"100%"}
          // sx={{padding:"2rem",
          //     bgcolor:"rgba(0,0,0,0.85)"
          // }}
        >
          <Skeleton variant="rectangular" width={""} height={"100vh"} />
        </Grid>
      </Grid>
    </div>
  );
};

const TypingLoader = () => {
  return (
    <Stack 
    spacing={"0.5rem"} direction={"row"} padding={"0.5rem"} justifyContent={"center"}>

<BouncingSkeleton variant="circular" width={15} height={15} style={{
  animatinDelay:"0.1s"
}} />
<BouncingSkeleton variant="circular" width={15} height={15} style={{
  animatinDelay:"0.1s"
}} />
<BouncingSkeleton variant="circular" width={15} height={15} style={{
  animatinDelay:"0.1s"
}} />
<BouncingSkeleton variant="circular" width={15} height={15} style={{
  animatinDelay:"0.1s"
}} />



    </Stack>
  )
};

export {TypingLoader,LayoutLoaders}