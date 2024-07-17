import { SettingsProvider, useSettings } from "./context/SettingsContext";

import Timer from "./components/timer/Timer";
import "./App.css";
import Settings from "./components/Settings";

function Inter() {
  const { showSettings } = useSettings();
  return (
    <>
    {showSettings ? <Settings /> : <Timer />}
    </>
  )
}

function App() {
  

  return (
    <main>
      <SettingsProvider>
        <Inter />
      </SettingsProvider>
    </main>
  )
}

export default App