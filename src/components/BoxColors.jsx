import React, { useState } from "react";
import colors from "../contexts/colors"

function BoxColors({handleChange}) {

    const [colorSelected, setColorSelected] = useState(null);
    const [colorsList, setColorsList] = useState(colors);
    
    const setSelectColor = (e) => {
        let colorEvent = e.target.innerText;

        let newColorsList = colorsList.map((color) => {
            if(colorEvent === color.hex) {
                return {
                    ...color,
                    selected: !color.selected
                }
                
            }else {
                return {
                    ...color,
                    selected: false
                }
            }
        })
        setColorsList(newColorsList);
        setColorSelected(colorEvent);
    }
    
return(
    <div className="boxColors">
        {colors.map((color) => {
            return(
                <div
                    key={color.name}
                    className={`containerColor ${colorSelected === color.hex && "borderSelected"}`}
                    name="userColor"
                    style={{backgroundColor: color.hex}}
                    onClick={(e) => handleChange(color, setSelectColor, e)}
                >
                    {color.hex}
                </div>
                );
            })}
        </div>
    );
};

export default BoxColors;

// ${colorSelected.hex === color.hex && colorSelected.selected && "borderSelected"}
// , border: `${colorSelected.hex === color.hex && colorSelected.selected && "2px solid #ffffff"}`