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
  const autoCompleteModifiers =
    autoComplete == undefined ? "off" : autoComplete;
  const placeHolderModifiers = placeholder == undefined ? "" : placeholder;
  const requiredModifers = required == undefined ? false : required;

  return (
    <div className={containerStyle}>
      {labelText !== undefined && labelText !== "" && (
        <label htmlFor={id} className={labelStyle}>
          {labelText}:
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
