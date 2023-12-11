import React from 'react'
import Lottie from 'lottie-react';
import animationData from '../assets/lottie/loading.json';
import { Box } from '@mui/material';
 
const Loading = () => {

    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //         preserveAspectRatio: "xMidYMid slice"
    //     }
    // };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                justifyItems: "center",
                height: "100vh",
                width: "100vw",
                backgroundColor: "rgba(0, 0, 0, 0.50)",
            }}
        >
            <Lottie animationData={animationData} loop={true} style={{height: 500, width: 500}}/>
            {/* <Typography
                sx={{ fontFamily: "Inter", marginTop: "10px", color: "#ffffff" }}
                variant="h5"
            >
                Thanks for waiting. Loading...
            </Typography> */}
        </Box>
    )
}

export default Loading