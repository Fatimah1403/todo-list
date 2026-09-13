const TextInputWithLabel = ({
  elementId,
  labelText,
  value,
  onChange,
  ref,
}) => {
  return (
    // CHANGED: Wrapper keeps the label and input together
    <div className="w-full">
      <label
        htmlFor={elementId}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {labelText}
      </label>

      {/* CHANGED: Styled reusable text input */}
      <input
        type="text"
        id={elementId}
        value={value}
        onChange={onChange}
        ref={ref}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );
};

export default TextInputWithLabel;