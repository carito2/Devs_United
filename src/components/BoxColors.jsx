import React from "react";
import colors from "../contexts/colors"

function BoxColors() {
    return(
        <div className="boxColors">
            {colors.map((color) => {
                return(
                    <div
                        key={color.name}
                        className="containerColor"
                        style={{backgroundColor: color.hex}}
                    />
                )
                
            })}
        </div>
    );
};

export default BoxColors;