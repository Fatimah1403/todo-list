// TextInputWithLabel.jsx
const TextInputWithLabel = ({
  elementId,
  labelText,
  value,
  onChange,
  inputRef,
}) => {
  return (
    <>
    <label htmlFor={elementId}> {labelText} </label>
        <input 
                type="text" 
                id={elementId}
                value={value}
                onChange={onChange}
                ref={inputRef}
        />
    </>
        
    
  )
}

export default TextInputWithLabel