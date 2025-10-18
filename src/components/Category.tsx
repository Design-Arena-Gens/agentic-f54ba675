"use client";
import { useState } from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ItemCard from './ItemCard';
import styles from './Category.module.css';

const Category = ({ id, title, items, onSaveItem, onDeleteItem }: { id: string, title: string, items: any[], onSaveItem: (item: any) => void, onDeleteItem: (item: any) => void }) => {
  const {
    setNodeRef,
  } = useSortable({ id });

  const [filter, setFilter] = useState('all');

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div ref={setNodeRef} className={styles.category}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <div className={styles.filters}>
          <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.active : ''}>All</button>
          <button onClick={() => setFilter('movie')} className={filter === 'movie' ? styles.active : ''}>Movies</button>
          <button onClick={() => setFilter('tv')} className={filter === 'tv' ? styles.active : ''}>TV Shows</button>
        </div>
      </div>
      <div className={styles.itemsGrid}>
        <SortableContext items={filteredItems.map(i => i.id)}>
          {filteredItems.map(item => (
            <SortableItem key={item.id} id={item.id} item={item} onSaveItem={onSaveItem} onDeleteItem={onDeleteItem} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

const SortableItem = ({ id, item, onSaveItem, onDeleteItem }: { id: any, item: any, onSaveItem: (item: any) => void, onDeleteItem: (item: any) => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ItemCard item={item} onSaveItem={onSaveItem} onDeleteItem={onDeleteItem} />
    </div>
  );
}


export default Category;
