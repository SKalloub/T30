import React, { useState, useEffect } from 'react';
import styles from './Auction.module.css';
import type { AuctionList, AuctionStatus, Priority } from '../types';

const loadAuctions = (): AuctionList[] => {
  const saved = localStorage.getItem('ch30_auctions');
  return saved ? JSON.parse(saved) : [];
};

const Auction: React.FC = () => {
  const [auctions, setAuctions] = useState<AuctionList[]>(loadAuctions());
  const [showForm, setShowForm] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<AuctionList | null>(null);
  const [filter, setFilter] = useState<'الكل' | AuctionStatus>('الكل');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [title, setTitle] = useState('');
  const [namesText, setNamesText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('عادية');

  useEffect(() => {
    localStorage.setItem('ch30_auctions', JSON.stringify(auctions));
  }, [auctions]);

  const handleSave = () => {
    if (!title || !namesText) return;
    
    if (editingId) {
      setAuctions(prev => prev.map(auc => auc.id === editingId ? {
        ...auc,
        title,
        names: namesText.split('\n').filter(n => n.trim() !== ''),
        dueDate,
        priority
      } : auc));
      setEditingId(null);
    } else {
      const newAuction: AuctionList = {
        id: Date.now().toString(),
        title,
        names: namesText.split('\n').filter(n => n.trim() !== ''),
        checkedNames: [],
        dueDate,
        status: 'ما بدأت',
        priority,
        isCompleted: false
      };
      setAuctions([newAuction, ...auctions]);
    }
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setTitle(''); setNamesText(''); setPriority('عادية'); setDueDate(''); setEditingId(null);
  };

  const startEdit = (auc: AuctionList, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(auc.id);
    setTitle(auc.title);
    setNamesText(auc.names.join('\n'));
    setDueDate(auc.dueDate);
    setPriority(auc.priority);
    setShowForm(true);
  };

  const toggleMasterCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAuctions(prev => prev.map(auc => auc.id === id ? { ...auc, isCompleted: !auc.isCompleted } : auc));
  };

  const cycleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const statusOrder: AuctionStatus[] = ['ما بدأت', 'قيد الحفظ', 'محفوظة', 'متقنة'];
    setAuctions(prev => prev.map(auc => {
      if (auc.id === id) {
        const currentIndex = statusOrder.indexOf(auc.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        return { ...auc, status: statusOrder[nextIndex] };
      }
      return auc;
    }));
  };

  const filteredAuctions = filter === 'الكل' ? auctions : auctions.filter(a => a.status === filter);

  if (selectedAuction) {
    return (
      <div className={styles.detailWrapper}>
        <div className={styles.detailHeader}>
          <button className={styles.backBtn} onClick={() => setSelectedAuction(null)}>← رجوع</button>
          <h1 className={styles.detailTitle}>{selectedAuction.title}</h1>
        </div>
        <div className={styles.verticalNamesGrid}>
          {selectedAuction.names.map((name, i) => (
            <div key={i} className={styles.verticalNameCard}>
              <span className={styles.nameIndex}>{i + 1}</span>
              <span className={styles.nameValue}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h1 className={styles.mainTitle}>نظام المزاد القتالي</h1>
        <button className={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'إلغاء' : '+ قائمة جديدة'}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterBar}>
        {['الكل', 'ما بدأت', 'قيد الحفظ', 'محفوظة', 'متقنة'].map(f => (
          <button 
            key={f} 
            className={`${styles.filterBtn} ${filter === f ? styles.activeFilter : ''}`}
            onClick={() => setFilter(f as any)}
          >
            {f}
          </button>
        ))}
      </div>

      {showForm && (
        <div className={styles.megaForm}>
          <h2 style={{color: '#e63946'}}>{editingId ? 'تعديل القائمة' : 'قائمة جديدة'}</h2>
          <input className={styles.hugeInput} value={title} onChange={e => setTitle(e.target.value)} placeholder="اسم القائمة..." />
          <textarea className={styles.hugeTextarea} rows={12} value={namesText} onChange={e => setNamesText(e.target.value)} placeholder="الأسماء سطر بسطر..." />
          <div className={styles.formRow}>
             <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
             <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
                <option value="عادية">أولوية عادية</option>
                <option value="متوسطة">أولوية متوسطة</option>
                <option value="عالية">أولوية عالية 🔥</option>
             </select>
          </div>
          <button className={styles.saveBtn} onClick={handleSave}>{editingId ? 'تحديث التعديلات' : 'تثبيت في الداتا'}</button>
        </div>
      )}

      <div className={styles.listContainer}>
        {filteredAuctions.map(auc => (
          <div 
            key={auc.id} 
            className={`${styles.auctionCard} ${auc.isCompleted ? styles.completedCard : ''}`}
            onClick={() => setSelectedAuction(auc)}
            style={{ borderRight: `6px solid ${auc.priority === 'عالية' ? '#ff4d4d' : auc.priority === 'متوسطة' ? '#ffa500' : '#4dff4d'}` }}
          >
            <div className={styles.checkSide} onClick={(e) => toggleMasterCheck(auc.id, e)}>
               <div className={`${styles.masterCheck} ${auc.isCompleted ? styles.masterChecked : ''}`}>
                  {auc.isCompleted && '✓'}
               </div>
            </div>

            <div className={styles.cardMain}>
              <h3 className={styles.cardTitle}>{auc.title}</h3>
              <div className={styles.cardMeta}>
                <span>📅 {auc.dueDate || 'بدون تاريخ'}</span>
                <span>📋 {auc.names.length} أسماء</span>
              </div>
            </div>

            <div className={styles.actionSide}>
               <button className={styles.editBtn} onClick={(e) => startEdit(auc, e)}>تعديل</button>
               <div className={styles.statusBox} data-status={auc.status} onClick={(e) => cycleStatus(auc.id, e)}>
                  {auc.status}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auction;