import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div>
      <img src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2024/07/nss.png" alt="Logo" style={{ width }} />
    </div>
  );
}

export default Logo;
