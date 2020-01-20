import React from 'react';
import Menu from './Menu';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  content: {
    backgroundColor: 'white',
  },
};

const SidebarContent = () => {
  return (
    <div style={styles.content}>
      <Menu />
    </div>
  );
};
export default SidebarContent;
