import React from "react";
import Lottie from "lottie-react";

const DisplayLottie = ({ animationData, animationPath }) => {
    // Support both direct animationData or loading from path
    return (
        <div className="w-full h-full max-w-md mx-auto">
            {animationData ? (
                <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                />
            ) : animationPath ? (
                <Lottie path={animationPath} loop={true} autoplay={true} />
            ) : null}
        </div>
    );
};

export default DisplayLottie;
