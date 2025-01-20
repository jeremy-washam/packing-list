import { createContext, useState } from "react";
import { getInitialItems } from "./lib/items";

export const ItemsContext = createContext({})

const ItemsProvider = ( {children}) => { 
  const [newItemName, setNewItemName] = useState(''); 
  const [items, setItems] = useState(getInitialItems());

  return <ItemsContext.Provider value={{
    newItemName,
    setNewItemName,
    items,
    setItems,
  }}>{children}</ItemsContext.Provider>
}

export default ItemsProvider