import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Preparations from './pages/Preparations';
import Auction from './pages/Auction';
import Compensation from './pages/Compensation';
import Episodes from './pages/Episodes'; // التاب الجديد
import Tasks from './pages/Tasks';         // التاب الجديد

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('الرئيسية');

  const renderContent = () => {
    switch (activeTab) {
      case 'الرئيسية': return <Home />;
      case 'التحضيرات': return <Preparations />;
      case 'المزاد': return <Auction />;
      case 'التعويض': return <Compensation />;
      case 'حلقات': return <Episodes />; // ربط صفحة الحلقات
      case 'تاسكات': return <Tasks />;    // ربط صفحة التاسكات
      default: return <Home />;
    }
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ minHeight: '100vh', backgroundColor: '#0a0a0c' }}>
        {renderContent()}
      </main>
    </>
  );
};

export default App;