function InputDate({
  id,
  required,
  valueText,
  onChangeText,
  labelText,
  containerStyle,
  min,
  max,
  labelStyle,
  inputStyle,
}) {
  const requiredModifers = required == undefined ? false : required;

  return (
    <div className={containerStyle}>
      {labelText !== undefined && labelText !== "" && (
        <label htmlFor={id} className={labelStyle}>
          {labelText}:{" "}
        </label>
      )}
      <input
        type="date"
        name={id}
        id={id}
        required={requiredModifers}
        value={valueText}
        onChange={onChangeText}
        min={min}
        max={max}
        className={inputStyle}
      />
    </div>
  );
}

export default InputDate;
