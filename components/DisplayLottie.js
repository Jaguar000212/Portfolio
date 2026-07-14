import React from "react";
import Lottie from "lottie-react";

// animationPath loads the JSON at runtime via fetch instead of bundling it
// into the page's JS, keeping the multi-hundred-KB animation files out of
// the initial script payload.
const DisplayLottie = ({animationPath}) => {
    return (
        <div className="w-full h-full max-w-md mx-auto">
            {animationPath && (
                <Lottie path={animationPath} loop={true} autoplay={true}/>
            )}
        </div>
    );
};

export default DisplayLottie;
