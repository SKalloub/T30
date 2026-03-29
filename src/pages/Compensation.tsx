import React, { useState, useEffect } from 'react';
import styles from './Compensation.module.css';
import type { PlayerCareer, CompType, CompImportance, CompStatus } from '../types';

const loadCareers = (): PlayerCareer[] => {
  const saved = localStorage.getItem('ch30_careers');
  return saved ? JSON.parse(saved) : [];
};

const Compensation: React.FC = () => {
  const [careers, setCareers] = useState<PlayerCareer[]>(loadCareers());
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'الكل' | CompImportance>('الكل');

  // Form State
  const [name, setName] = useState('');
  const [clubsText, setClubsText] = useState('');
  const [type, setType] = useState<CompType>('لاعب حالي');
  const [importance, setImportance] = useState<CompImportance>('عادي');
  const [status, setStatus] = useState<CompStatus>('لسا');
  const [isPartial, setIsPartial] = useState(false);

  useEffect(() => {
    localStorage.setItem('ch30_careers', JSON.stringify(careers));
  }, [careers]);

  const handleSave = () => {
    if (!name || !clubsText) return;
    const newEntry: PlayerCareer = {
      id: Date.now().toString(),
      name,
      type,
      importance,
      status,
      isPartial,
      clubs: clubsText.split('\n').filter(c => c.trim() !== '')
    };
    setCareers([newEntry, ...careers]);
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false); setName(''); setClubsText('');
    setIsPartial(false); setImportance('عادي'); setStatus('لسا');
  };

  const cycleStatus = (id: string) => {
    const statusOrder: CompStatus[] = ['لسا', 'مدروسة', 'مش بحاجة'];
    setCareers(prev => prev.map(c => {
      if (c.id === id) {
        const next = statusOrder[(statusOrder.indexOf(c.status) + 1) % statusOrder.length];
        return { ...c, status: next };
      }
      return c;
    }));
  };

  const filtered = filter === 'الكل' ? careers : careers.filter(c => c.importance === filter);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>مسيرة التعويض 🔥</h1>
        <button className={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'إلغاء' : '+ إضافة مسيرة'}
        </button>
      </div>

      <div className={styles.filterBar}>
        {['الكل', 'متوقع', 'مهم', 'عادي'].map(f => (
          <button key={f} className={`${styles.filterBtn} ${filter === f ? styles.activeFilter : ''}`} onClick={() => setFilter(f as any)}>{f}</button>
        ))}
      </div>

      {showForm && (
        <div className={styles.formCard}>
          <input className={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="اسم اللاعب / المدرب" />
          <textarea className={styles.textarea} rows={8} value={clubsText} onChange={e => setClubsText(e.target.value)} placeholder="رص الأندية هون (كل نادي بسطر)..." />
          
          <div className={styles.optionsGrid}>
            <select value={type} onChange={e => setType(e.target.value as CompType)}>
              <option value="لاعب حالي">لاعب حالي</option>
              <option value="لاعب معتزل">لاعب معتزل</option>
              <option value="مدرب">مدرب</option>
            </select>
            <select value={importance} onChange={e => setImportance(e.target.value as CompImportance)}>
              <option value="عادي">أهمية: عادي</option>
              <option value="مهم">أهمية: مهم</option>
              <option value="متوقع">أهمية: متوقع 🎯</option>
            </select>
            <div className={styles.checkboxGroup}>
               <input type="checkbox" checked={isPartial} onChange={e => setIsPartial(e.target.checked)} id="partial" />
               <label htmlFor="partial">مسيرة جزئية (أول كم نادي)</label>
            </div>
          </div>
          <button className={styles.saveBtn} onClick={handleSave}>حفظ المسيرة في السجل</button>
        </div>
      )}

      <div className={styles.list}>
        {filtered.map(c => (
          <div key={c.id} className={styles.careerCard} data-importance={c.importance}>
            <div className={styles.cardHeader}>
               <div className={styles.mainInfo}>
                  <h3>{c.name} <small>({c.type})</small></h3>
                  <div className={styles.tags}>
                    <span className={styles.tag}>{c.importance}</span>
                    {c.isPartial && <span className={styles.partialTag}>جزئية</span>}
                  </div>
               </div>
               <div className={styles.statusBox} data-status={c.status} onClick={() => cycleStatus(c.id)}>
                  {c.status}
               </div>
            </div>

            <div className={styles.timeline}>
               {c.clubs.map((club, idx) => (
                 <div key={idx} className={styles.timelineItem}>
                    <div className={styles.dot}></div>
                    <span className={styles.clubName}>{club}</span>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compensation;