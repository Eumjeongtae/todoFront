import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
// import { legacy_createStore as createStore } from 'redux'; //스토어 라이브러리
import { Provider } from 'react-redux';
import reducer from './modules/reducer';
import Todo from './pages/Todo';
import store from './Store';

// const store = createStore(reducer);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: '/', element: <Home /> },
      { path: '/toDo', element: <Todo /> },
    ]
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
