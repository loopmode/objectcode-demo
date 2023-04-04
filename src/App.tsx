import { Scene } from './components/Scene/Scene';
import './App.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { useCallback, useState } from 'react';

export default function App() {
  const [size, setSize] = useState({ width: 100, height: 100 });
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSize((current) => ({ ...current, [event.target.name]: Number(event.target.value) }));
  }, []);
  return (
    <div className="App">
      <aside>
        <Sidebar boxSize={size} onChange={handleChange} />
      </aside>
      <main>
        <Scene boxSize={size} />
      </main>
    </div>
  );
}
