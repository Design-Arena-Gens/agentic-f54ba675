"use client";
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';
import styles from './page.module.css';

const initialData = {
  currentlyWatching: [
    { id: '1', title: 'Movie 1', poster: 'https://via.placeholder.com/150', score: 8, type: 'movie' },
    { id: '2', title: 'TV Show 1', poster: 'https://via.placeholder.com/150', score: 9, type: 'tv' },
  ],
  planningToWatch: [
    { id: '3', title: 'Movie 2', poster: 'https://via.placeholder.com/150', score: 0, type: 'movie' },
    { id: '4', title: 'TV Show 2', poster: 'https://via.placeholder.com/150', score: 0, type: 'tv' },
  ],
  watched: [
    { id: '5', title: 'Movie 3', poster: 'https://via.placeholder.com/150', score: 7, type: 'movie' },
    { id: '6', title: 'TV Show 3', poster: 'https://via.placeholder.com/150', score: 10, type: 'tv' },
  ],
  dropped: [
    { id: '7', title: 'Movie 4', poster: 'https://via.placeholder.com/150', score: 4, type: 'movie' },
  ],
};

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [data, setData] = useState(initialData);

  const handleAddItem = (item: any) => {
    setData(prevData => ({
      ...prevData,
      planningToWatch: [...prevData.planningToWatch, { ...item, score: 0 }],
    }));
  };

  const handleImport = (importedData: any) => {
    setData(importedData);
  };

  const handleExport = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'watchlist.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveItem = (newItem: any) => {
    const newData = { ...data };
    for (const key in newData) {
      const items = newData[key as keyof typeof newData];
      const index = items.findIndex(item => item.id === newItem.id);
      if (index !== -1) {
        items[index] = newItem;
        break;
      }
    }
    setData(newData);
  };

  const handleDeleteItem = (itemToDelete: any) => {
    const newData = { ...data };
    for (const key in newData) {
      const items = newData[key as keyof typeof newData];
      const index = items.findIndex(item => item.id === itemToDelete.id);
      if (index !== -1) {
        items.splice(index, 1);
        break;
      }
    }
    setData(newData);
  };

  return (
    <main className={styles.main}>
      <Sidebar isCollapsed={isSidebarCollapsed} onAddItem={handleAddItem} onImport={handleImport} onExport={handleExport} />
      <button 
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        className={`${styles.toggleButton} ${isSidebarCollapsed ? styles.collapsed : ''}`}
      >
        {isSidebarCollapsed ? '>' : '<'}
      </button>
      <div className={`${styles.content} ${isSidebarCollapsed ? styles.contentCollapsed : ''}`}>
        <MainContent data={data} setData={setData} onSaveItem={handleSaveItem} onDeleteItem={handleDeleteItem} />
      </div>
    </main>
  );
}