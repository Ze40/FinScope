import { useState } from "react";

import { Check, ChevronDown } from "lucide-react";

import { text } from "@/styles/reciepts/font";

import type { IFilter } from "../model/types";
import * as style from "./style";

interface FilterProps {
  className?: string;
  label: string;
  filters: IFilter[];
  selectedFilters?: IFilter[];
  onToggle: (filter: IFilter) => void;
}

const Filter = ({ label, filters, className, selectedFilters = [], onToggle }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        className={`${style.box()} ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <p className={text()}>{label}</p>
        <ChevronDown className={style.chevron({ open: isOpen })} />
      </button>

      {isOpen && (
        <ul className={style.list({ open: isOpen })} role="listbox">
          {filters.map((filter) => {
            const isSelected = selectedFilters.some((f) => f.id === filter.id);
            return (
              <li key={filter.id} style={{ width: "100%" }}>
                <button
                  className={style.filterCard({ active: isSelected })}
                  onClick={() => {
                    onToggle(filter);
                  }}
                  role="option"
                  aria-selected={isSelected}
                >
                  <Check size={16} className={style.check({ check: isSelected })} />
                  <span>{filter.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Filter;
