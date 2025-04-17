import React, { useId } from 'react';
import PropTypes from 'prop-types';

const Select = React.forwardRef(function SelectComponent({
  options,
  label,
  name,
  className = '',
  ...props
}, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name} // ✅ Needed for accessibility and autofill
        ref={ref}
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired, // ✅ mark as required
  className: PropTypes.string,
};

Select.defaultProps = {
  label: '',
  className: '',
};

export default Select;
