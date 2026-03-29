import React, { useState } from 'react';
import styles from './Home.module.css';
import type { Task } from '../types';
const initialTasks: Task[] = [
  { id: '1', title: 'مراجعة مزاد قائمة ليفربول 2005 (أبطال أوروبا)', checked: false },
  { id: '2', title: 'هدافين كوبا أمريكا بالترتيب', checked: false },
  { id: '3', title: 'دراسة مسيرة بيب غوارديولا', checked: true },
];

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>تاسكات اليوم</h1>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.taskItem} onClick={() => toggleTask(task.id)}>
            <div className={`${styles.checkbox} ${task.checked ? styles.checkedBox : ''}`}>
              {task.checked && <span style={{ color: '#fff' }}>✓</span>}
            </div>
            <span className={`${styles.taskTitle} ${task.checked ? styles.checkedText : ''}`}>
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;