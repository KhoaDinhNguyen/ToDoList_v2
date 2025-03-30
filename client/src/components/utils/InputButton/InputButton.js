function InputButton({
  id,
  valueText,
  onClickHandler,
  labelText,
  style,
  type,
  labelStyle,
}) {
  return (
    <div className={style}>
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
      />
    </div>
  );
}

export default InputButton;
