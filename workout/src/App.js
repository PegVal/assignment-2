import "./App.css";

import BlogProvider from "./BlogProvider";
import Blog from "./CounterContext";

import DisplayDuration from "./DisplayDuration";
import Tabata from "./Tabata";
//import Countdown from "./Countdown";

const App = () => {
  return (
    <BlogProvider>
      <DisplayDuration />
      <Blog />
      <Tabata duration={0} />
    </BlogProvider>
  );
};

export default App;
