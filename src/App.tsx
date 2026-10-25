import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './components/CheckersGame/data';
import { Router } from './Router';
import { theme } from './theme';
import { useAutoTheme } from './hooks/useAutoTheme';

function AppContent() {
  useAutoTheme();
  return <Router />;
}

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <AppContent />
      </MantineProvider>
    </Provider>
  );
}
