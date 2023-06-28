import { CommandList } from "./command-list/CommandList"
import { SearchBar } from "./search-bar/SearchBar"
import styles from './CommandView.module.scss';
import { useContext } from "react";
import { CommandLauncherContext } from "../CommandLauncherContext";

export const CommandView = () => {

    const { selectedCommand } = useContext(CommandLauncherContext);

    //if no command is selected, the command view is focused
    const isFousedView = selectedCommand == null;

    return (
        <div className={styles.commandView}>
            <div className={styles.searchBarWrapper}>
                <SearchBar isFocused={isFousedView}/>
            </div>
            <div className={styles.commandListWrapper}>
                <CommandList isFocused={isFousedView}/>
            </div>
        </div>
    )
}