import React, { useState } from "react";
import colors from "../contexts/colors"

function BoxColors({handleChange}) {

    const [colorSelected, setColorSelected] = useState(null);
    const [colorsList, setColorsList] = useState(colors);
    
    //Se crea función setSelectColor que se encarga de cambiar propiedad selected acorde a donde se hizo click en el evento.
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
                    onClick={(e) => handleChange(color, setSelectColor(e))}
                >
                    {color.hex}
                </div>
                );
            })}
        </div>
    );
};

export default BoxColors;
