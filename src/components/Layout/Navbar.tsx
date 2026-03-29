import React from 'react';
import styles from './Navbar.module.css';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  // ضفنا "حلقات" و "تاسكات" للقائمة
  const tabs = ['الرئيسية', 'التحضيرات', 'المزاد', 'التعويض', 'حلقات', 'تاسكات'];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>تحدي 30</div>
      <div className={styles.links}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;