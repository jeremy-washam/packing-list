# Packing List

Sample app to demonstrate how different React memoization tools affect component re-renders. 

Forked from https://github.com/stevekinney/packing-list  

Be sure to open the [React Dev Tools](https://react.dev/learn/react-developer-tools) Profiler and check `Highlight updates when components render` to visualize re-renders:

<img width="414" alt="Screenshot 2025-01-20 at 10 38 13 AM" src="https://github.com/user-attachments/assets/ced0b36a-2ac3-46a2-8175-48bb6762fe3c" />

Examples:
1. **main**: nothing is memoized
2. **use-callback-and-memo**: callback functions and arrays are memoized with `useCallback` and `useMemo`. Components are not wrapped in `memo`.
3. **fully-memoized**: same as above, but components are now wrapped in `memo`.
4. **fully-memoized-with-updater-functions**: same as above, but we now use updater functions when we update state, which removes a dependency from our callbacks, e.g. `setItems(prev => [...prev, item])` instead of `setItems([...items, item])`.

Each example produces fewer re-renders.

Run `npm start` to play around with these examples yourself.
