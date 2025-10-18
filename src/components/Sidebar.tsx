"use client";
import { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ isCollapsed, onAddItem, onImport, onExport }: { isCollapsed: boolean, onAddItem: (item: any) => void, onImport: (data: any) => void, onExport: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      // Fetch data from APIs
      const movieRes = await fetch(`https://itunes.apple.com/search?term=${term}&media=movie&limit=5`);
      const movieData = await movieRes.json();
      
      const tvRes = await fetch(`https://api.tvmaze.com/search/shows?q=${term}`);
      const tvData = await tvRes.json();

      const results = [
        ...movieData.results.map((item: any) => ({ id: item.trackId, title: item.trackName, poster: item.artworkUrl100, type: 'movie' })),
        ...tvData.map((item: any) => ({ id: item.show.id, title: item.show.name, poster: item.show.image?.medium, type: 'tv' }))
      ];
      setSearchResults(results.slice(0, 10) as any);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddItem = (item: any) => {
    onAddItem(item);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleExport = () => {
    // This will be implemented in the parent component
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = JSON.parse(event.target?.result as string);
        onImport(data);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.content}>
        <h2>Search</h2>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
        <div className={styles.searchResults}>
          {searchResults.map((item: any) => (
            <div key={item.id} className={styles.searchResult} onClick={() => handleAddItem(item)}>
              <img src={item.poster} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <h2>Add Manually</h2>
        <form className={styles.manualForm} onSubmit={(e) => {
          e.preventDefault();
          const title = (e.target as any).title.value;
          const poster = (e.target as any).poster.value;
          if (title && poster) {
            handleAddItem({ id: Date.now().toString(), title, poster, type: 'movie' });
            (e.target as any).reset();
          }
        }}>
          <input type="text" name="title" placeholder="Title" />
          <input type="text" name="poster" placeholder="Poster URL" />
          <button type="submit">Add</button>
        </form>
        <h2>Import/Export</h2>
        <button onClick={onExport}>Export</button>
        <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} id="import-file" />
        <label htmlFor="import-file" className={styles.importLabel}>Import</label>
      </div>
    </div>
  );
};

export default Sidebar;