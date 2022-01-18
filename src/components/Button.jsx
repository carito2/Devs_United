import React from "react";

function Button ({
    classNameBtn,
    onClick,
    imgClassName,
    imgSrc,
    imgTextAlt,
    content,
    contentClassName
}) {
    return  (
        <button className={classNameBtn} onClick={onClick}>
            {imgSrc &&
                <img 
                    className={imgClassName} 
                    src={imgSrc} 
                    alt={imgTextAlt} 
                />
            }
            <p className={contentClassName}>{content}</p>
        </button>
    )
};

export default Button;