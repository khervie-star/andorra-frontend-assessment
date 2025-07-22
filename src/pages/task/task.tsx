import { Plus, SearchIcon, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Select } from '@mui/material';

import { TaskCard } from '../../components';
import { AppButton } from '../../components/button';
import { useTaskStore } from '../../store/store';
import {
    ClearFilters, Container, FilterGroup, FilterLabel, FiltersContainer, FiltersRow, Header,
    NoResults, NoResultsTitle, ResultsCount, SearchContainer, SearchInput, Subtitle, TasksGrid,
    Title
} from './tasks.styled';

import type { TTaskStatus, TTaskPriority } from "../../types";
export const TasksPage = () => {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TTaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TTaskPriority | "all">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"dueDate" | "createdAt" | "priority">(
    "dueDate"
  );

  const { tasks } = useTaskStore();

  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    filtered.sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === "createdAt") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, statusFilter, priorityFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setSortBy("dueDate");
  };

  const hasActiveFilters =
    searchTerm || statusFilter !== "all" || priorityFilter !== "all";

  const goToCreateTask = () => {
    navigate("/tasks/create");
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>Tasks</Title>
          <Subtitle>Manage and track your development tasks</Subtitle>
        </div>
        <AppButton click={goToCreateTask}>
          <Plus size={18} /> Create new task
        </AppButton>
      </Header>

      <FiltersContainer>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <FiltersRow>
          <FilterGroup>
            <FilterLabel>Status</FilterLabel>
            <Select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as TTaskStatus | "all")
              }>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Priority</FilterLabel>
            <Select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value as TTaskPriority | "all")
              }>
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Sort by</FilterLabel>
            <Select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "dueDate" | "createdAt" | "priority"
                )
              }>
              <option value="dueDate">Due Date</option>
              <option value="createdAt">Created Date</option>
              <option value="priority">Priority</option>
            </Select>
          </FilterGroup>

          {hasActiveFilters && (
            <ClearFilters onClick={clearFilters}>
              <X size={14} />
              Clear Filters
            </ClearFilters>
          )}
        </FiltersRow>
      </FiltersContainer>

      <ResultsCount>
        Showing {filteredTasks.length} of {tasks.length} tasks
      </ResultsCount>

      {filteredTasks.length > 0 ? (
        <TasksGrid>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </TasksGrid>
      ) : (
        <NoResults>
          <NoResultsTitle>No tasks found</NoResultsTitle>
          <p>Try adjusting your search criteria or clearing the filters.</p>
        </NoResults>
      )}
    </Container>
  );
};
