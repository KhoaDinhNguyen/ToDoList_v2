function InputPassword({
  id,
  required,
  valuePassword,
  onChangePassword,
  placeholder,
  labelText,
  minLength,
  maxLength,
  containerStyle,
  labelStyle,
  inputStyle,
}) {
  const placeHolderModifiers = placeholder == undefined ? "" : placeholder;
  const requiredModifers = required == undefined ? false : required;
  return (
    <div className={containerStyle}>
      {labelText !== undefined && labelText !== "" && (
        <label htmlFor={id} className={labelStyle}>
          {labelText}
        </label>
      )}
      <input
        type="password"
        name={id}
        id={id}
        required={requiredModifers}
        value={valuePassword}
        onChange={onChangePassword}
        placeholder={placeHolderModifiers}
        minLength={minLength}
        maxLength={maxLength}
        className={inputStyle}
        autoComplete="off"
      />
    </div>
  );
}

export default InputPassword;
