import { css } from "~/styled-system/css";
import { hstack } from "~/styled-system/patterns";

import { DbTools, Filter, Search } from "@/features";
import type { IFilter } from "@/features";
import { useFilterStore } from "@/stores";

interface DataSearchProps {
  className?: string;
}

const DataSearch = ({ className }: DataSearchProps) => {
  const filters = useFilterStore((state) => state.filters);
  const selectedFilters = useFilterStore((state) => state.selectedFilters);
  const { toggle } = useFilterStore((state) => state.actions);

  const handleToggle = (filter: IFilter) => {
    toggle(filter);
  };

  return (
    <div className={`${hstack({ gap: "30px", justifyContent: "space-between" })} ${className}`}>
      <Search className={css({ shadow: "around" })} />
      <Filter
        label="Столбцы"
        filters={filters}
        className={css({ shadow: "around" })}
        onToggle={handleToggle}
        selectedFilters={selectedFilters}
      />
      <DbTools />
    </div>
  );
};

export default DataSearch;
