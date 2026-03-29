import React, { useState, useEffect } from 'react';
import styles from './Episodes.module.css';
import type { Episode } from '../types';

const Episodes: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>(() => {
    const saved = localStorage.getItem('ch30_episodes');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);

  // --- States للفورم (Manual Entry) ---
  const [opponent, setOpponent] = useState('');
  const [finalScore, setFinalScore] = useState({ me: 0, op: 0 }); // النتيجة الكلية للحلقة
  
  // نتائج الفقرات الكلية (Manual)
  const [wdykTotal, setWdykTotal] = useState({ me: 0, op: 0 });
  const [auctionTotal, setAuctionTotal] = useState({ me: 0, op: 0 });
  const [buzzerTotal, setBuzzerTotal] = useState({ me: 0, op: 0 });
  const [qnaTotal, setQnaTotal] = useState({ me: 0, op: 0 });
  const [compTotal, setCompTotal] = useState({ me: 0, op: 0 });

  // تفاصيل الجولات
  const [wdykQs, setWdykQs] = useState<any[]>([]);
  const [auctionRounds, setAuctionRounds] = useState<any[]>([]);
  const [buzzerQs, setBuzzerQs] = useState<any[]>([]);
  const [qnaQs, setQnaQs] = useState<any[]>([]);
  const [compRounds, setCompRounds] = useState<any[]>([]);

  useEffect(() => {
    localStorage.setItem('ch30_episodes', JSON.stringify(episodes));
  }, [episodes]);

  const saveEpisode = () => {
    const newEp: Episode = {
      id: Date.now().toString(),
      opponent: opponent || 'خصم مجهول',
      date: new Date().toLocaleDateString(),
      totalScore: finalScore,
      whatDoYouKnow: { total: wdykTotal, questions: wdykQs },
      auction: { totalMe: auctionTotal.me, totalOp: auctionTotal.op, rounds: auctionRounds },
      buzzer: { totalMe: buzzerTotal.me, totalOp: buzzerTotal.op, questions: buzzerQs },
      qAndA: { totalMe: qnaTotal.me, totalOp: qnaTotal.op, questions: qnaQs },
      compensation: { totalMe: compTotal.me, totalOp: compTotal.op, rounds: compRounds }
    };

    setEpisodes([newEp, ...episodes]);
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setOpponent(''); setFinalScore({ me: 0, op: 0 });
    setWdykTotal({ me: 0, op: 0 }); setAuctionTotal({ me: 0, op: 0 });
    setBuzzerTotal({ me: 0, op: 0 }); setQnaTotal({ me: 0, op: 0 });
    setCompTotal({ me: 0, op: 0 });
    setWdykQs([]); setAuctionRounds([]); setBuzzerQs([]); setQnaQs([]); setCompRounds([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>أرشفة المواجهات 🎬</h1>
        <button className={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'إلغاء' : '+ تسجيل حلقة جديدة'}
        </button>
      </div>

      {showForm && (
        <div className={styles.megaForm}>
          {/* النتيجة النهائية للمباراة */}
          <section className={styles.finalScoreSection}>
            <h2 className={styles.mainSectionTitle}>النتيجة النهائية للحلقة 🔥</h2>
            <div className={styles.scoreRow}>
              <div className={styles.scoreInputGroup}>
                <label>أنا</label>
                <input type="number" value={finalScore.me} onChange={e => setFinalScore({...finalScore, me: +e.target.value})} />
              </div>
              <span className={styles.vsLarge}>VS</span>
              <div className={styles.scoreInputGroup}>
                <label>{opponent || 'الخصم'}</label>
                <input type="number" value={finalScore.op} onChange={e => setFinalScore({...finalScore, op: +e.target.value})} />
              </div>
            </div>
            <input className={styles.hugeInput} placeholder="اسم الخصم..." value={opponent} onChange={e => setOpponent(e.target.value)} />
          </section>

          {/* 1. ماذا تعرف */}
          <section className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <h3>1. ماذا تعرف؟ (النتيجة: {wdykTotal.me}-{wdykTotal.op})</h3>
              <div className={styles.manualScoreInputs}>
                <input type="number" placeholder="أنا" onChange={e => setWdykTotal({...wdykTotal, me: +e.target.value})} />
                <input type="number" placeholder="خصم" onChange={e => setWdykTotal({...wdykTotal, op: +e.target.value})} />
                <button className={styles.miniAdd} onClick={() => setWdykQs([...wdykQs, {q:'', winner:'أنا', score:0}])}>+ سؤال</button>
              </div>
            </div>
            {wdykQs.map((q, i) => (
              <div key={i} className={styles.dynamicRow}>
                <input placeholder="السؤال" onChange={e => { const n = [...wdykQs]; n[i].q = e.target.value; setWdykQs(n); }} />
                <select onChange={e => { const n = [...wdykQs]; n[i].winner = e.target.value; setWdykQs(n); }}><option value="أنا">أنا</option><option value="الخصم">الخصم</option></select>
                <input type="number" placeholder="نقطة" className={styles.smallNum} onChange={e => { const n = [...wdykQs]; n[i].score = +e.target.value; setWdykQs(n); }} />
              </div>
            ))}
          </section>

          {/* 2. المزاد */}
          <section className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <h3>2. المزاد (النتيجة: {auctionTotal.me}-{auctionTotal.op})</h3>
              <div className={styles.manualScoreInputs}>
                <input type="number" placeholder="أنا" onChange={e => setAuctionTotal({...auctionTotal, me: +e.target.value})} />
                <input type="number" placeholder="خصم" onChange={e => setAuctionTotal({...auctionTotal, op: +e.target.value})} />
                <button className={styles.miniAdd} onClick={() => setAuctionRounds([...auctionRounds, {item:'', bidder:'أنا', bid:0, achieved:0, points:0}])}>+ مزاد</button>
              </div>
            </div>
            {auctionRounds.map((r, i) => (
              <div key={i} className={styles.auctionRow}>
                <input placeholder="الموضوع" onChange={e => { const n = [...auctionRounds]; n[i].item = e.target.value; setAuctionRounds(n); }} />
                <select onChange={e => { const n = [...auctionRounds]; n[i].bidder = e.target.value; setAuctionRounds(n); }}><option value="أنا">أنا</option><option value="الخصم">الخصم</option></select>
                <input type="number" placeholder="زاد" onChange={e => { const n = [...auctionRounds]; n[i].bid = +e.target.value; setAuctionRounds(n); }} />
                <input type="number" placeholder="حقق" onChange={e => { const n = [...auctionRounds]; n[i].achieved = +e.target.value; setAuctionRounds(n); }} />
                <input type="number" placeholder="نقطة" className={styles.smallNum} onChange={e => { const n = [...auctionRounds]; n[i].points = +e.target.value; setAuctionRounds(n); }} />
              </div>
            ))}
          </section>

          {/* 3 + 4 الجرس وسين جيم */}
          <section className={styles.formSection}>
            <div className={styles.sectionHeader}>
               <h3>3+4. الجرس وسين جيم</h3>
               <div className={styles.manualScoreInputs}>
                  <span>جرس:</span>
                  <input type="number" placeholder="أنا" onChange={e => setBuzzerTotal({...buzzerTotal, me: +e.target.value})} />
                  <input type="number" placeholder="خصم" onChange={e => setBuzzerTotal({...buzzerTotal, op: +e.target.value})} />
                  <button className={styles.miniAdd} onClick={() => setBuzzerQs([...buzzerQs, {q:'', winner:'أنا'}])}>+ جرس</button>
                  <button className={styles.miniAdd} style={{background:'#ffa500'}} onClick={() => setQnaQs([...qnaQs, {q:'', winner:'أنا'}])}>+ س/ج</button>
               </div>
            </div>
          </section>

          {/* 5. التعويض */}
          <section className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <h3>5. التعويض (النتيجة: {compTotal.me}-{compTotal.op})</h3>
              <div className={styles.manualScoreInputs}>
                <input type="number" placeholder="أنا" onChange={e => setCompTotal({...compTotal, me: +e.target.value})} />
                <input type="number" placeholder="خصم" onChange={e => setCompTotal({...compTotal, op: +e.target.value})} />
                <button className={styles.miniAdd} onClick={() => setCompRounds([...compRounds, {player:'', winner:'أنا', points:0}])}>+ لاعب</button>
              </div>
            </div>
            {compRounds.map((r, i) => (
              <div key={i} className={styles.dynamicRow}>
                <input placeholder="اسم اللاعب" onChange={e => { const n = [...compRounds]; n[i].player = e.target.value; setCompRounds(n); }} />
                <select onChange={e => { const n = [...compRounds]; n[i].winner = e.target.value; setCompRounds(n); }}><option value="أنا">أنا</option><option value="الخصم">الخصم</option></select>
                <input type="number" placeholder="نقاط" className={styles.smallNum} onChange={e => { const n = [...compRounds]; n[i].points = +e.target.value; setCompRounds(n); }} />
              </div>
            ))}
          </section>

          <button className={styles.saveBtn} onClick={saveEpisode}>تثبيت الحلقة ⚔️</button>
        </div>
      )}

      {/* عرض النتائج */}
      <div className={styles.matchList}>
        {episodes.map(ep => (
          <div key={ep.id} className={styles.matchCard}>
            <div className={styles.finalResult}>
              <div className={styles.matchInfo}>
                <span className={styles.date}>{ep.date}</span>
                <h2>أنا <span className={styles.scoreText}>{ep.totalScore.me} - {ep.totalScore.op}</span> {ep.opponent}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodes;