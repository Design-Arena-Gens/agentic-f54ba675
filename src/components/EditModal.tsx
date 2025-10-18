"use client";
import { useState } from 'react';
import styles from './EditModal.module.css';

const EditModal = ({ item, onClose, onSave, onDelete }: { item: any, onClose: () => void, onSave: (newItem: any) => void, onDelete: (item: any) => void }) => {
  const [score, setScore] = useState(item.score);
  const [notes, setNotes] = useState(item.notes || '');

  const handleSave = () => {
    onSave({ ...item, score, notes });
    onClose();
  };

  const handleDelete = () => {
    onDelete(item);
    onClose();
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>{item.title}</h2>
        <div className={styles.posterContainer}>
          <img src={item.poster} alt={item.title} className={styles.poster} />
        </div>
        <div className={styles.score}>
          <h3>Score</h3>
          <div className={styles.scoreButtons}>
            {[...Array(10)].map((_, i) => (
              <button key={i + 1} onClick={() => setScore(i + 1)} className={score === i + 1 ? styles.active : ''}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.notes}>
          <h3>Notes</h3>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <button onClick={handleSave} className={styles.saveButton}>Save</button>
        <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};

export default EditModal;