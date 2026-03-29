import React, { useState, useEffect } from 'react';
import styles from './Tasks.module.css';
import type { Task } from '../types';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('ch30_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('ch30_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!inputValue.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: inputValue,
      checked: false
    };
    setTasks([newTask, ...tasks]);
    setInputValue('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>قائمة المهام اليومية ⚡</h1>
      
      <div className={styles.inputArea}>
        <input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="شو بدك تنجز اليوم؟"
          className={styles.taskInput}
        />
        <button onClick={addTask} className={styles.addBtn}>إضافة</button>
      </div>

      <div className={styles.taskList}>
        {tasks.map(task => (
          <div key={task.id} className={`${styles.taskItem} ${task.checked ? styles.done : ''}`}>
            <div className={styles.checkWrapper} onClick={() => toggleTask(task.id)}>
              <div className={styles.checkbox}>{task.checked && '✓'}</div>
              <span className={styles.taskText}>{task.title}</span>
            </div>
            <button onClick={() => deleteTask(task.id)} className={styles.deleteBtn}>حذف</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;