import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@mui/material';

import { TaskCard } from '../../components';
import { useThemeMode } from '../../context';
import { useTaskStore } from '../../store/store';
import { Chart } from './components';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useThemeMode();
  const tasks = useTaskStore((state) => state.tasks);

  // Calculate statistics
  const stats = useMemo(() => {
    const now = new Date();
    return {
      all: tasks.length,
      pending: tasks.filter((t) => t.status === "pending").length,
      completed: tasks.filter((t) => t.status === "completed").length,
      due: tasks.filter((t) => new Date(t.dueDate) < now).length,
    };
  }, [tasks]);

  // Prepare chart data
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

  // const priorityData = useMemo(
  //   () => [
  //     {
  //       name: "High",
  //       value: tasks.filter((t) => t.priority === "high").length,
  //     },
  //     {
  //       name: "Medium",
  //       value: tasks.filter((t) => t.priority === "medium").length,
  //     },
  //     { name: "Low", value: tasks.filter((t) => t.priority === "low").length },
  //   ],
  //   [tasks]
  // );

  // Get recent tasks
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
          </TasksList>
        </ChartContainer>
      </ChartsRow>
    </DashboardContainer>
  );
};

// Styled Components
interface DarkModeProps {
  $darkMode: boolean;
}

const DashboardContainer = styled.div<DarkModeProps>`
  min-height: 100vh;
  transition: background-color 0.3s ease;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1<DarkModeProps>`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.text : theme.colors.primary};
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p<DarkModeProps>`
  color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.muted : theme.colors.muted};
  margin: 0;
  font-size: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface StatCardProps extends DarkModeProps {
  $variant: "primary" | "success" | "warning" | "danger";
}

const StatCard = styled.div<StatCardProps>`
  background-color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.card : theme.colors.background};
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid ${({ theme, $variant }) => theme.colors[$variant]};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const ChartsRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

interface ChartContainerProps extends DarkModeProps {
  $size: number;
}

const ChartContainer = styled.div<ChartContainerProps>`
  flex: ${({ $size }) => $size};
  background-color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.card : theme.colors.background};
  border-radius: 12px;
  padding: 1.5rem;
`;

const ChartTitle = styled.h3<DarkModeProps>`
  font-size: 1.25rem;
  margin: 0 0 1rem 0;
  color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.text : theme.colors.primary};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3<DarkModeProps>`
  font-size: 1.25rem;
  margin: 0;
  color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.text : theme.colors.primary};
`;

const ViewAllButton = styled(Button)<DarkModeProps>`
  background: none;
  text-transform: none !important;
  font-weight: 600;
  border: none;
  color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.primary : theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme, $darkMode }) =>
      $darkMode ? theme.colors.accent : theme.colors.secondary};
  }
`;

const TasksList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
