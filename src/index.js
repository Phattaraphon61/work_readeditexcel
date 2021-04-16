// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { useRoutes, BrowserRouter } from "react-router-dom";
import ExcelPage from "./components/excelPage";
import LoginDemo from "./components/login"


function App() {


  return(
    <LoginDemo/>
  )
  // const routes = [
  //   {
  //     path: "/",
  //     element: <LoginDemo />,
  //   },
  //   {
  //     path: "home",
  //     element: <ExcelPage />,
  //   }
  // ];

  // const routing = useRoutes(routes);
  // return <div>{routing}</div>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  
    <App />
 ,
  document.getElementById("root"))
