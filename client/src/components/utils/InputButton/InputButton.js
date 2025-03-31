function InputButton({
  id,
  valueText,
  onClickHandler,
  labelText,
  containerStyle,
  type,
  labelStyle,
  inputStyle,
}) {
  return (
    <div className={containerStyle}>
      {labelText !== null && labelText !== "" && (
        <label htmlFor={id} className={labelStyle}>
          <span>{labelText}</span>
        </label>
      )}
      <input
        type={type}
        name={id}
        id={id}
        value={valueText}
        onClick={onClickHandler}
        className={inputStyle}
      />
    </div>
  );
}

export default InputButton;
