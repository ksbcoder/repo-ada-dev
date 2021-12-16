import React from 'react';

const Input = ({label, name, defaultValue, type, required, isDisabled}) => {
    return (
        <label htmlFor={name} className='flex flex-col my-2'>
            <span>{label}</span>
            <input
                data-testId = 'input'
                required={required}
                type={type}
                name={name}
                className='input-usuario'
                defaultValue={defaultValue}
                disabled={isDisabled}
            />
        </label>
      
    )
}

export default Input;
