import { CommandList } from "./command-list/CommandList"
import { SearchBar } from "./search-bar/SearchBar"

export const CommandView = () => {
    return (
        <div>
            <SearchBar/>
            <CommandList/>
        </div>
    )
}