"use client";
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import Category from './Category';
import styles from './MainContent.module.css';

const MainContent = ({ data, setData, onSaveItem, onDeleteItem }: { data: any, setData: any, onSaveItem: (item: any) => void, onDeleteItem: (item: any) => void }) => {

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      const activeItems = data[activeContainer];
      const overItems = data[overContainer];
      const activeIndex = activeItems.findIndex((item: any) => item.id === active.id);
      const overIndex = overItems.findIndex((item: any) => item.id === over.id);

      const newActiveItems = [...activeItems];
      const [movedItem] = newActiveItems.splice(activeIndex, 1);
      const newOverItems = [...overItems];
      newOverItems.splice(overIndex, 0, movedItem);

      setData({
        ...data,
        [activeContainer]: newActiveItems,
        [overContainer]: newOverItems,
      });
    } else {
      const items = data[activeContainer];
      const activeIndex = items.findIndex((item: any) => item.id === active.id);
      const overIndex = items.findIndex((item: any) => item.id === over.id);

      if (activeIndex !== overIndex) {
        setData({
          ...data,
          [activeContainer]: arrayMove(items, activeIndex, overIndex),
        });
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={styles.mainContent}>
        <div className={styles.grid}>
          <SortableContext items={Object.keys(data)}>
            {Object.keys(data).map(key => (
              <Category key={key} id={key} title={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} items={data[key]} onSaveItem={onSaveItem} onDeleteItem={onDeleteItem} />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default MainContent;
