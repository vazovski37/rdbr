import React from 'react';
import FilterBadge from '../../design-system/filter-badge';

interface Filter {
  label: string;
}

interface AppliedFiltersProps {
  appliedFilters: Filter[];
  onRemove: (filter: Filter) => void;
}

const AppliedFilters = ({ appliedFilters, onRemove }: AppliedFiltersProps) => {
  return (
    <div className="flex gap-2">
      {appliedFilters.map((filter: Filter, index: number) => (
        <FilterBadge key={index} label={filter.label} onClick={() => onRemove(filter)} />
      ))}
    </div>
  );
};

export default AppliedFilters;
