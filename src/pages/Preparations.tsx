import React, { useState } from 'react';
import styles from './Preparations.module.css';
import worldCupData from '../data/worldcup.json'; // استدعاء البيانات

const categories = [
  'كأس العالم', 'دوري أبطال أوروبا', 'الدوريات الخمس الكبرى',
  'الدوري الأوروبي', 'دوري المؤتمرات الأوروبي', 'اليورو',
  'كوبا أمريكا', 'كأس العالم للأندية', 'الدوريات الأخرى',
  'البطولات القارية الأخرى', 'كأس القارات'
];

const Preparations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedCategory === 'كأس العالم') {
    return (
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => setSelectedCategory(null)}>→ عودة</button>
        <h1 className={styles.title}>تاريخ كأس العالم</h1>
        <div className={styles.grid}>
          {worldCupData.map(wc => (
            <div key={wc.year} className={styles.card}>
              <div className={styles.cardTitle}>{wc.year}</div>
              <p style={{color: '#8d99ae'}}>البطل: {wc.winner}</p>
              <p style={{color: '#8d99ae'}}>المستضيف: {wc.host}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>التحضيرات</h1>
      <div className={styles.grid}>
        {categories.map((cat, index) => (
          <div key={index} className={styles.card} onClick={() => setSelectedCategory(cat)}>
            <div className={styles.cardTitle}>{cat}</div>
            {cat !== 'كأس العالم' && <div className={styles.comingSoon}>قريباً</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preparations;