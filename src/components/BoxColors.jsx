import React from "react";
import colors from "../contexts/colors"

function BoxColors({handleChange}) {
    return(
        <div className="boxColors">
            {colors.map((color) => {
                return(
                    <div
                        key={color.name}
                        className="containerColor"
                        name="userColor"
                        style={{backgroundColor: color.hex}}
                        onClick={() => handleChange(color.hex)}
                    >
                        {color.hex}
                    </div>
                );
            })}
        </div>
    );
};

export default BoxColors;