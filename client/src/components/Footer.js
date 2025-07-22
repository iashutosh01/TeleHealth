import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-auto">
      <div>
        <small>&copy; {new Date().getFullYear()} TeleHealth. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
