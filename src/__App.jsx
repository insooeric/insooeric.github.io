import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <header>
        <h1>Header</h1>
      </header>
      <main>
        <Outlet /> {/* Renders child routes here */}
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
};

export default App;
