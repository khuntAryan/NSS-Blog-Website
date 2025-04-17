import PropTypes from 'prop-types';

function Logo({ width = '100px' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <img
        src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2024/07/nss.png"
        alt="Logo 1"
        style={{ width }}
      />

      {/* Vertical Divider */}
      <div style={{
        width: '1px',
        height: '40px',
        backgroundColor: 'gray',
        opacity: 0.5
      }}></div>

      <img
        src="https://upload.wikimedia.org/wikipedia/en/f/fe/Srmseal.png"
        alt="Logo 2"
        style={{ width }}
      />
    </div>
  );
}

Logo.propTypes = {
  width: PropTypes.string,
};

export default Logo;
