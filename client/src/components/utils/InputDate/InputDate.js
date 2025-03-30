function InputDate({
  id,
  required,
  valueText,
  onChangeText,
  labelText,
  style,
  min,
  max,
}) {
  const requiredModifers = required == null ? false : required;

  return (
    <div className={style}>
      {labelText !== null && labelText !== "" && (
        <label htmlFor={id}>{labelText}: </label>
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
      />
    </div>
  );
}

export default InputDate;
