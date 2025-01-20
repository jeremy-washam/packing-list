import { memo, useCallback, useMemo, useState } from 'react';
import {
  createItem,
  filterItems,
  getInitialItems,
  removeItem,
  updateItem,
} from '../lib/items';
import Header from './header';
import ItemList from './item-list';
import MarkAllAsUnpacked from './mark-all-as-unpacked';
import NewItem from './new-item';

const Application = () => {
  const [items, setItems] = useState(getInitialItems());
  const [newItemName, setNewItemName] = useState('');

  const add = useCallback((name) => {
    const item = createItem(name);
    setItems(prev => [...prev, item]);
  }, []);

  const update = useCallback((id, updates) => {
    setItems(prev => updateItem(prev, id, updates));
  }, []);

  const remove = useCallback((id) => {
    setItems(prev => removeItem(prev, id));
  }, []);

  const unpackedItems = useMemo(() => filterItems(items, { packed: false }), [items]);
  const packedItems = useMemo(() => filterItems(items, { packed: true }), [items]);

  const markAllAsUnpacked = useCallback(() => {
    return setItems(prev => prev.map((item) => ({ ...item, packed: false })));
  }, []);

  return (
    <main className="flex flex-col gap-8 p-8 mx-auto lg:max-w-4xl">
      <Header items={items} />
      <NewItem
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        addItem={add}
      />
      <section className="flex flex-col gap-8 md:flex-row">
        <ItemList
          title="Unpacked Items"
          items={unpackedItems}
          update={update}
          remove={remove}
        />
        <ItemList
          title="Packed Items"
          items={packedItems}
          update={update}
          remove={remove}
        />
      </section>
      <MarkAllAsUnpacked onClick={markAllAsUnpacked} />
    </main>
  );
};

export default memo(Application);
