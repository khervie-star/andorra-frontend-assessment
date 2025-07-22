import styled from 'styled-components';

import { Button } from '@mui/material';

interface DarkModeProps {
  $darkMode: boolean;
}

export const DashboardContainer = styled.div<DarkModeProps>`
  min-height: 100vh;
  transition: background-color 0.3s ease;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h1<DarkModeProps>`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.text : theme.colors.primary};
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p<DarkModeProps>`
  color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.muted : theme.colors.muted};
  margin: 0;
  font-size: 1rem;
`;

export const StatsGrid = styled.div`
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

export const StatCard = styled.div<StatCardProps>`
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

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const ChartsRow = styled.div`
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

export const ChartContainer = styled.div<ChartContainerProps>`
  flex: ${({ $size }) => $size};
  background-color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.card : theme.colors.background};
  border-radius: 12px;
  padding: 1.5rem;
`;

export const ChartTitle = styled.h3<DarkModeProps>`
  font-size: 1.25rem;
  margin: 0 0 1rem 0;
  color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.text : theme.colors.primary};
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h3<DarkModeProps>`
  font-size: 1.25rem;
  margin: 0;
  color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.text : theme.colors.primary};
`;

export const ViewAllButton = styled(Button)<DarkModeProps>`
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

export const TasksList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
