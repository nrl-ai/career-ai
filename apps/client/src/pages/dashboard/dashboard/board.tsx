import Board from "./components/Board/Board";
import Header from "./components/Header";
import { useState } from "react";

export function BoardView() {
  const [displayedSideMenu, setDisplayedSideMenu] = useState(false);

  return (
    <div className="Wrapper">
      <main className="AppContainer">
        <Header displayedSideMenu={displayedSideMenu} />
        <Board displayedSideMenu={displayedSideMenu} />
      </main>
    </div>
  );
}
