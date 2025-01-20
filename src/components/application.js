import { memo, useCallback, useContext, useMemo } from 'react';
import {
  createItem,
  filterItems,
  removeItem,
  updateItem,
} from '../lib/items';
import Header from './header';
import ItemList from './item-list';
import MarkAllAsUnpacked from './mark-all-as-unpacked';
import NewItem from './new-item';
import { ItemsContext } from '../context';

const Application = () => {
  const { items, setItems, newItemName, setNewItemName} = useContext(ItemsContext)

  const add = useCallback((name) => {
    const item = createItem(name);
    setItems(prev => [...prev, item]);
  }, [setItems]);

  const update = useCallback((id, updates) => {
    setItems(prev => updateItem(prev, id, updates));
  }, [setItems]);

  const remove = useCallback((id) => {
    setItems(prev => removeItem(prev, id));
  }, [setItems]);

  const unpackedItems = useMemo(() => filterItems(items, { packed: false }), [items]);
  const packedItems = useMemo(() => filterItems(items, { packed: true }), [items]);

  const markAllAsUnpacked = useCallback(() => {
    return setItems(prev => prev.map((item) => ({ ...item, packed: false })));
  }, [setItems]);

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
