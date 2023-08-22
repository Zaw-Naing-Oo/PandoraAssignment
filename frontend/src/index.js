import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { themeSetting } from './theme';
import { QueryClientProvider, QueryClient} from "@tanstack/react-query"
import { Provider } from "react-redux"
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme(themeSetting())
const queryClient = new QueryClient();


root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
          </QueryClientProvider>
        </React.StrictMode>
      </BrowserRouter>

    </ThemeProvider>
</Provider>
);

reportWebVitals();
