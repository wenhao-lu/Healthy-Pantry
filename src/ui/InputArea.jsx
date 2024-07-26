function InputArea({ style, placeholder, defaultValue }) {
  const base = 'rounded-md border border-gray-300 px-2 py-1.5';

  const styles = {
    primary: base + ' w-32',
    small: base + ' py-4',
    secondary: base + ' w-32 bg-yellow-50',
  };

  return (
    <input
      value={defaultValue}
      type="text"
      placeholder={placeholder}
      className={styles[style]}
    ></input>
  );
}

export default InputArea;
