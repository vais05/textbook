// Header.jsx
import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div className="academy-name">Raju Educational Academy</div>
      <div>
        Date and Time:
        <input type="datetime-local" id="manualDateInput" />
      </div>
    </div>
  );
};

export default Header;
