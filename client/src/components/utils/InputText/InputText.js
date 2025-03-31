function InputText({
  id,
  required,
  valueText,
  onChangeText,
  autoComplete,
  placeholder,
  labelText,
  minLength,
  maxLength,
  containerStyle,
  labelStyle,
  inputStyle,
}) {
  const autoCompleteModifiers = autoComplete == null ? "off" : autoComplete;
  const placeHolderModifiers = placeholder == null ? "" : placeholder;
  const requiredModifers = required == null ? false : required;
  return (
    <div className={containerStyle}>
      {labelText !== null && labelText !== "" && (
        <label htmlFor={id} className={labelStyle}>
          {labelText}:{" "}
        </label>
      )}
      <input
        type="text"
        name={id}
        id={id}
        required={requiredModifers}
        value={valueText}
        onChange={onChangeText}
        autoComplete={autoCompleteModifiers}
        placeholder={placeHolderModifiers}
        minLength={minLength}
        maxLength={maxLength}
        className={inputStyle}
      />
    </div>
  );
}

export default InputText;
