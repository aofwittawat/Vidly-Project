import React from 'react'

const Input = ({name, label, value, onChange, autoFocus}) => {
    return (
        <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          autoFocus ={autoFocus || false}
          value={value}
          name={name}
          onChange={onChange}
          id={name}
          type="text"
          className="form-control"
        />
      </div>
    )
}

export default Input