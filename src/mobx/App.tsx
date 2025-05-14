import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

const store = makeAutoObservable({
  count: 0,
  increment() {
    this.count += 1;
  },
  decrement() {
    this.count -= 1;
  },
});

const Count = observer(() => {
  return (
    <div>
      <p>Count: {store.count}</p>
      <button onClick={() => store.increment()}>Increment</button>
      <button onClick={() => store.decrement()}>Decrement</button>
    </div>
  );
});
export default function App() {
  return (
    <div>
      <h1>Hello, mobx!</h1>
      <Count />
    </div>
  );
}
