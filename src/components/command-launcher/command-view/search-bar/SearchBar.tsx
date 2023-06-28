import { useContext, useEffect } from 'react';
import styles from './SearchBar.module.scss';
import { CommandLauncherContext } from '../../CommandLauncherContext';
import { AutoFocusedInput } from '../../../common/AutoFocusedInput';

interface ISearchBarProps {
    isFocused: boolean;
}

export const SearchBar = ({
    isFocused
}: ISearchBarProps) => {

    const {
        setFilter,
    } = useContext(CommandLauncherContext);

    //clear filter when component unmounts
    useEffect(() => {
        return setFilter("");
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    }

    return (
        <div className={styles.searchBar}>
            <AutoFocusedInput type="text" className={styles.textInput} onChange={handleInputChange} placeholder='Start Typing...' isFocused={isFocused} />
        </div>
    )
};