import PropTypes from "prop-types";

export default function GridPattern({ className }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

GridPattern.propTypes = {
  className: PropTypes.string,
};
