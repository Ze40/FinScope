import { SearchIcon } from "lucide-react";

import * as style from "./style";

interface SearchProps {
  className?: string;
}

const Search = ({ className }: SearchProps) => {
  return (
    <div className={`${style.search()} ${className}`}>
      <SearchIcon />
      <input type="text" placeholder="Поиск" className={style.searchInput()} />
    </div>
  );
};

export default Search;
