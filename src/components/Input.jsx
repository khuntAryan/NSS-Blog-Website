import React, { useId } from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    name,
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name} // ✅ ensures accessibility + autofill
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired, // ✅ now required
};

export default Input;
