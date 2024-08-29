import { createRoot } from 'react-dom/client';
import App from './App';
import RootApp from './components/RootApp';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <RootApp>
    <App />
  </RootApp>,
);
