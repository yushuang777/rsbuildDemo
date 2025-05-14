import { observer, useLocalStore } from 'mobx-react-lite';
import { createContext, useContext } from 'react';

interface Store {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const MyContext = createContext<Store | null>(null);

const Count = observer(() => {
  const store = useContext(MyContext)!;

  return (
    <div>
      <p>Count: {store.count}</p>
      <button onClick={() => store.increment()}>Increment</button>
      <button onClick={() => store.decrement()}>Decrement</button>
    </div>
  );
});

export default function App() {
  const store = useLocalStore(() => ({
    count: 0,
    increment() {
      this.count += 1;
    },
    decrement() {
      this.count -= 1;
    },
  }));

  return (
    <div>
      <h1>Hello, mobx!</h1>
      <MyContext.Provider value={store}>
        <Count />
      </MyContext.Provider>
    </div>
  );
}
