import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.5rem 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ResponsiveButtonText = styled.span`
  margin-left: 0.5rem;

  @media (max-width: 480px) {
    margin-left: 0.25rem;
  }
`;

export const FiltersContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
`;

export const FiltersRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0; /* Prevents flex items from overflowing */
`;

export const ClearFilters = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  height: 40px; /* Match MUI Select height */

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

export const ResultsCount = styled.div`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
  font-weight: 500;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    font-size: 0.8rem;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.muted};

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const NoResultsTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;
