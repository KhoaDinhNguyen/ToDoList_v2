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
  const placeHolderModifiers = placeholder == null ? "" : placeholder;
  const requiredModifers = required == null ? false : required;
  return (
    <div className={containerStyle}>
      {labelText !== null && labelText !== "" && (
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
      />
    </div>
  );
}

export default InputPassword;
