"use client";
import { useState } from 'react';
import EditModal from './EditModal';
import styles from './ItemCard.module.css';

const ItemCard = ({ item, onSaveItem, onDeleteItem }: { item: any, onSaveItem: (item: any) => void, onDeleteItem: (item: any) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.card} onClick={() => setIsModalOpen(true)}>
        <img src={item.poster} alt={item.title} className={styles.poster} />
        <div className={styles.info}>
          <h3>{item.title}</h3>
          <p>Score: {item.score}</p>
        </div>
      </div>
      {isModalOpen && <EditModal item={item} onClose={() => setIsModalOpen(false)} onSave={onSaveItem} onDelete={onDeleteItem} />}
    </>
  );
};

export default ItemCard;