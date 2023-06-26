
import { CommandLauncher } from "./components/command-launcher/CommandLauncher";
import { CommandLauncherProvider } from "./components/command-launcher/CommandLauncherContext";
import styles from './App.module.scss';
import { DEFAULT_COMMANDS } from "./data/test-commands";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.launcherWrapper}>
      <CommandLauncherProvider commands={DEFAULT_COMMANDS}>
        <CommandLauncher/>
      </CommandLauncherProvider>
      </div>
    </div>
  );
}

export default App;
