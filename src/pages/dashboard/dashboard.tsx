import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmptyState, TaskCard } from '../../components';
import { useThemeMode } from '../../context';
import { useTaskStore } from '../../store/store';
import { Chart } from './components';
import {
    ChartContainer, ChartsRow, ChartTitle, DashboardContainer, Header, SectionHeader, SectionTitle,
    StatCard, StatLabel, StatsGrid, StatValue, Subtitle, TasksList, Title, ViewAllButton
} from './dashboard.styled';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useThemeMode();
  const tasks = useTaskStore((state) => state.tasks);

  const stats = useMemo(() => {
    const now = new Date();
    return {
      all: tasks.length,
      pending: tasks.filter((t) => t.status === "pending").length,
      completed: tasks.filter((t) => t.status === "completed").length,
      due: tasks.filter((t) => new Date(t.dueDate) < now).length,
    };
  }, [tasks]);

  const completionData = useMemo(() => {
    const last30Days = Array(30)
      .fill(0)
      .map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return date.toISOString().split("T")[0];
      });

    return last30Days.map((date) => ({
      date,
      completed: tasks.filter(
        (t) => t.status === "completed" && t.dueDate === date
      ).length,
    }));
  }, [tasks]);

  const recentTasks = useMemo(
    () =>
      [...tasks]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 3),
    [tasks]
  );

  return (
    <DashboardContainer $darkMode={darkMode}>
      <Header>
        <Title $darkMode={darkMode}>Task Dashboard</Title>
        <Subtitle $darkMode={darkMode}>
          Overview of your tasks and productivity
        </Subtitle>
      </Header>

      <StatsGrid>
        <StatCard $darkMode={darkMode} $variant="primary">
          <StatValue>{stats.all}</StatValue>
          <StatLabel>Total Tasks</StatLabel>
        </StatCard>

        <StatCard $darkMode={darkMode} $variant="warning">
          <StatValue>{stats.pending}</StatValue>
          <StatLabel>Pending</StatLabel>
        </StatCard>

        <StatCard $darkMode={darkMode} $variant="success">
          <StatValue>{stats.completed}</StatValue>
          <StatLabel>Completed</StatLabel>
        </StatCard>

        <StatCard $darkMode={darkMode} $variant="danger">
          <StatValue>{stats.due}</StatValue>
          <StatLabel>Overdue</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartsRow>
        <ChartContainer $darkMode={darkMode} $size={7}>
          <ChartTitle $darkMode={darkMode}>Task Completion</ChartTitle>
          <Chart
            data={completionData}
            xKey="date"
            yKey="completed"
            color={darkMode ? "#818cf8" : "#6366f1"}
          />
        </ChartContainer>

        <ChartContainer $darkMode={darkMode} $size={5}>
          <SectionHeader>
            <SectionTitle $darkMode={darkMode}>Recent Tasks</SectionTitle>
            <ViewAllButton
              $darkMode={darkMode}
              onClick={() => navigate("/tasks")}>
              View All
            </ViewAllButton>
          </SectionHeader>

          <TasksList>
            {recentTasks.map((task, idx: number) => (
              <TaskCard key={idx} task={task} />
            ))}

            {recentTasks.length === 0 && (
              <EmptyState
                text={"No task found"}
                btnText="Create task"
                btnFxn={() => navigate("/tasks/create")}
              />
            )}
          </TasksList>
        </ChartContainer>
      </ChartsRow>
    </DashboardContainer>
  );
};
