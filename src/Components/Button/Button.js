import React from 'react';

function Button({children, variant,buttonType, handleClick,handleSubmit}) {
    return (
        <button
        className={`${variant}`} type={buttonType} onClick={handleClick} onSubmit={handleSubmit}
        >
            { children }
        </button>
    );
}

export default Button;