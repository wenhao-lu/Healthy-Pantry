function Button({ children, disabled, style, onClick }) {
  const base =
    'rounded-md border border-gray-300 px-1.5 py-1 font-[500] shadow-sm transition';

  const styles = {
    primary: base + ' bg-indigo-500 hover:bg-indigo-700 w-16',
    small: base + ' bg-indigo-400 hover:bg-indigo-600 w-12 text-xs',
    secondary: base + ' pt-6',
  };

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[style]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[style]}>
      {children}
    </button>
  );
}

export default Button;
