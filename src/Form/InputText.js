import React from 'react'

const InputText = ({name, placeholder, defaultValue, onBlur}) =>
  (
    <div className="form-group col-md-12 content form-block-holder">
      <label className="control-label col-md-4">
        {name}
      </label>
      <input
        ref={name}
        autoComplete="off"
        type="text"
        placeholder={placeholder}
        className="form-control"
        required
        defaultValue={defaultValue}
        onBlur={onBlur} />
    </div>
  )

export default InputText
