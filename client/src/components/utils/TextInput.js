function TextInput({
  id,
  required,
  valueText,
  onChangeText,
  autoComplete,
  placeholder,
  containLabel,
  labelText,
  minLength,
  maxLength,
  style,
}) {
  const autoCompleteModifiers = autoComplete == null ? "off" : autoComplete;
  const placeHolderModifiers = placeholder == null ? "" : placeholder;
  const requiredModifers = required == null ? false : required;

  return (
    <div className={style}>
      {containLabel && <label htmlFor={id}>{labelText}</label>}
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
      />
    </div>
  );
}

export default TextInput;
