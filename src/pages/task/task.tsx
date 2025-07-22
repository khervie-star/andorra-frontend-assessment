import { Plus, SearchIcon, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, useMediaQuery, useTheme
} from '@mui/material';

import { EmptyState, TaskCard } from '../../components';
import { AppButton } from '../../components/button';
import { useThemeMode } from '../../context';
import { useTaskStore } from '../../store/store';
import { darkTheme, lightTheme } from '../../styles';
import {
    ClearFilters, Container, FilterGroup, FiltersContainer, FiltersRow, Header,
    ResponsiveButtonText, ResultsCount, SearchContainer, Subtitle, TasksGrid, Title
} from './tasks.styled';

import type { TTaskStatus, TTaskPriority } from "../../types";
export const TasksPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { darkMode } = useThemeMode();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TTaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TTaskPriority | "all">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"dueDate" | "createdAt" | "priority">(
    "dueDate"
  );

  const tasks = useTaskStore((state) => state.tasks);

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
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
          <Plus size={18} />
          <ResponsiveButtonText>
            {isSmallScreen ? "New" : "Create new task"}
          </ResponsiveButtonText>
        </AppButton>
      </Header>

      <FiltersContainer>
        <SearchContainer>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    size={20}
                    color={
                      darkMode ? darkTheme.colors.text : lightTheme.colors.text
                    }
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: darkMode
                  ? darkTheme.colors.card
                  : lightTheme.colors.card,
                color: darkMode
                  ? darkTheme.colors.text
                  : lightTheme.colors.text,
                "& fieldset": {
                  borderColor: darkMode
                    ? darkTheme.colors.border
                    : lightTheme.colors.border,
                },
                "&:hover fieldset": {
                  borderColor: darkMode
                    ? darkTheme.colors.border
                    : lightTheme.colors.border,
                },
                "&.Mui-focused fieldset": {
                  borderColor: darkMode
                    ? darkTheme.colors.border
                    : lightTheme.colors.border,
                  boxShadow: (theme) =>
                    `0 0 0 3px ${theme.palette.primary.main}20`,
                },
              },
            }}
          />
        </SearchContainer>

        <FiltersRow>
          <FilterGroup>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                sx={{
                  color: darkMode
                    ? darkTheme.colors.text
                    : lightTheme.colors.text,
                }}
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as TTaskStatus | "all")
                }
                label="Status">
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </FilterGroup>

          <FilterGroup>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priorityFilter}
                sx={{
                  color: darkMode
                    ? darkTheme.colors.text
                    : lightTheme.colors.text,
                }}
                onChange={(e) =>
                  setPriorityFilter(e.target.value as TTaskPriority | "all")
                }
                label="Priority">
                <MenuItem value="all">All Priority</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </FilterGroup>

          <FilterGroup>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                sx={{
                  color: darkMode
                    ? darkTheme.colors.text
                    : lightTheme.colors.text,
                }}
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "dueDate" | "createdAt" | "priority"
                  )
                }
                label="Sort by">
                <MenuItem value="dueDate">Due Date</MenuItem>
                <MenuItem value="createdAt">Created Date</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
              </Select>
            </FormControl>
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
        <EmptyState
          text={
            searchTerm || hasActiveFilters
              ? "No tasks match your filters"
              : "No task created yet"
          }
          btnText="Create"
          btnFxn={goToCreateTask}
        />
      )}
    </Container>
  );
};
