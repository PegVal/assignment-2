import "./App.css";

import BlogProvider from "./BlogProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Blog from "./CounterContext";
import DisplayDuration from "./DisplayDuration";
import Tabata from "./Tabata";
import Documentation from "./DocumentationView";


const Inner = () => {
  const commonRoutes = (
    <>
      <Route path="/" element={[<DisplayDuration />, <Blog />]} />
      <Route path="/tabata" element={<Tabata duration={0} />} />
      <Route path="/document" element={<Documentation />} />
    </>
  );
  return <Routes>{commonRoutes}</Routes>;
};


const App = () => {
  return (
    <BlogProvider>
      <BrowserRouter>
        <Inner />
      </BrowserRouter>
    </BlogProvider>
  );
};

export default App;
