function PasswordInput({
  id,
  valuePassword,
  onChangePassword,
  placeholder,
  containLabel,
  labelText,
  minLength,
  maxLength,
  style,
}) {
  const placeHolderModifiers = placeholder == null ? "" : placeholder;

  return (
    <div className={style}>
      {containLabel && <label htmlFor={id}>{labelText}</label>}
      <input
        type="password"
        name={id}
        id={id}
        required={true}
        value={valuePassword}
        onChange={onChangePassword}
        autoComplete="off"
        placeholder={placeHolderModifiers}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
}

export default PasswordInput;
