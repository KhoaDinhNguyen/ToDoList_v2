function InputCheckBox({
  id,
  required,
  onChangeHandler,
  labelText,
  containerStyle,
  labelStyle,
  inputStyle,
  checked,
}) {
  const requiredModifers = required == undefined ? false : required;

  return (
    <div className={containerStyle}>
      {labelText !== undefined && labelText !== "" && (
        <label htmlFor={id} className={labelStyle}>
          {labelText}
        </label>
      )}
      <input
        type="checkbox"
        name={id}
        id={id}
        required={requiredModifers}
        checked={checked}
        onChange={onChangeHandler}
        className={inputStyle}
      />
    </div>
  );
}

export default InputCheckBox;
