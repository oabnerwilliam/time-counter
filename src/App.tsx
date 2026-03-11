import { Routes, Route } from 'react-router-dom';
import { Counter } from './counter/counter';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Counter />} />
    </Routes>
  );
};

export default App;