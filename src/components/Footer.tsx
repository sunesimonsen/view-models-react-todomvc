import { useModelState } from "@view-models/react";
import type { FilterType } from "../types/Todo";
import { useLink, useRouteName } from "@nano-router/react";
import classes from "obj-str";
import { memo } from "react";
import { TodoMVCModelProps } from "../types/TodoMVCModelProps";

interface FilterLinkProps {
  filter: FilterType;
  children: string;
}

const FilterLink = ({ filter, children }: FilterLinkProps) => {
  const route = useRouteName();
  const link = useLink(filter);
  const selected = route === filter;

  return (
    <a {...link} className={classes({ selected })}>
      {children}
    </a>
  );
};

const pluralize = (count: number, word: string) => {
  return count === 1 ? word : `${word}s`;
};

export const Footer = memo(({ model }: TodoMVCModelProps) => {
  const { activeCount, completedCount } = useModelState(model);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> {pluralize(activeCount, "item")} left
      </span>
      <ul className="filters">
        <li>
          <FilterLink filter="all">All</FilterLink>
        </li>
        <li>
          <FilterLink filter="active">Active</FilterLink>
        </li>
        <li>
          <FilterLink filter="completed">Completed</FilterLink>
        </li>
      </ul>
      {completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={() => model.clearCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
