import { useState } from 'react';

// --- (Thème أخو مطبلة) ---
// تعريف الألوان القتالية للتحدي
const ChTheme = {
  bg: '#0a0a0c', // أسود فحمي للخلفية
  boxBg: '#16161a', // أسود رمادي للصناديق
  text: '#eaeaea', // أبيض باهت للنصوص
  accent: '#e63946', // أحمر ناري للتشيك والحواف
  muted: '#8d99ae', // رمادي للنصوص الأقل أهمية
  border: '#333', // لون الحواف
};

// --- (الهيكل الأساسي للتصميم) ---
// تصميم حاوية عامة للنص
const containerStyle = {
  fontFamily: "'Segoe UI', Roboto, sans-serif",
  backgroundColor: ChTheme.bg,
  color: ChTheme.text,
  minHeight: '100vh',
  padding: '0 0 40px 0', // padding-bottom للمساحة في الأسفل
};

// --- (كومبوننت البار - الـ Tabs) ---
// تصميم شريط التنقل
const Navbar = () => {
  const tabs = ['الرئيسية', 'التحضيرات', 'المزاد'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <nav style={{
      backgroundColor: ChTheme.boxBg,
      borderBottom: `2px solid ${ChTheme.accent}`,
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        color: ChTheme.accent,
        fontWeight: 'bold',
        fontSize: '24px',
        marginRight: 'auto', // دفع العنوان لليسار في واجهة عربية
        letterSpacing: '2px',
      }}>CHALLENGE 30</div>
      
      <div style={{ display: 'flex', gap: '5px' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? ChTheme.accent : 'transparent',
              color: activeTab === tab ? ChTheme.text : ChTheme.muted,
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
};

// --- (بيانات تاسكات اليوم - داتا وهمية للبداية) ---
const dailyTasksData = [
  { id: 1, title: 'مراجعة مزاد قائمة ليفربول 2005 (أبطال أوروبا)', checked: false },
  { id: 2, title: 'حفظ ترتيب هدافي كوبا أمريكا (أكثر من 5 أهداف)', checked: false },
  { id: 3, title: 'دراسة مسيرة "بيب غوارديولا" التدريبية في برشلونة', checked: false },
  { id: 4, title: 'حل كويز عشوائي "أين لعب هذا اللاعب" (لاعبين معتزلين)', checked: true },
];

// --- (كومبوننت التاسكات - التشيك ليست) ---
// تصميم صندوق تاسكات اليوم
const DailyChecklist = () => {
  const [tasks, setTasks] = useState(dailyTasksData);

  // دالة لتغيير حالة التشيك للتاسك
  const toggleTask = (id: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  // تنسيق عنصر التشيك بوكس
  const checkboxStyle = (isChecked: boolean) => ({
    width: '24px',
    height: '24px',
    border: `2px solid ${ChTheme.accent}`,
    borderRadius: '6px',
    backgroundColor: isChecked ? ChTheme.accent : 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  });

  return (
    <div style={{
      backgroundColor: ChTheme.boxBg,
      padding: '25px',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '800px',
      margin: '40px auto 0 auto',
      boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
      border: `1px solid ${ChTheme.border}`,
    }}>
      <h2 style={{
        color: ChTheme.text,
        fontSize: '28px',
        marginBottom: '20px',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        borderBottom: `2px solid ${ChTheme.accent}`,
        display: 'inline-block',
        paddingBottom: '10px',
      }}>تاسكات اليوم</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
        {tasks.map(task => (
          <div key={task.id} style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            padding: '15px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onClick={() => toggleTask(task.id)}>
            <div style={checkboxStyle(task.checked)}>
              {task.checked && (
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M1 6.5L6 11.5L15 1.5" stroke={ChTheme.text} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{
              marginLeft: '15px',
              fontSize: '18px',
              textDecoration: task.checked ? 'line-through' : 'none',
              color: task.checked ? ChTheme.muted : ChTheme.text,
              transition: 'all 0.2s ease',
            }}>
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- (الكومبوننت الرئيسي - الصفحة الأولى) ---
// تصميم الصفحة الرئيسية التي تجمع كل شيء
const ChallengeUI = () => {
  return (
    <div style={containerStyle}>
      <Navbar />
      
      <main style={{ padding: '0 20px' }}>
        <DailyChecklist />
      </main>
    </div>
  );
};

export default ChallengeUI;