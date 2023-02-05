import React from 'react'

const Input = React.forwardRef(({ name, label, placeholder, onChange, onBlur, errors }, ref) => {
  return (
    <div className='inputWrapper'>
      <label className='formLabel' htmlFor={name}>
        {label}
      </label>
      <input
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        ref={ref}
        className='singleLineInput'
        type='text'
        placeholder={placeholder}
      />
      {errors && (
        <span data-testid='error-option' className='formErrorMsg'>
          {errors[name]?.message}
        </span>
      )}
    </div>
  )
})

export default Input
