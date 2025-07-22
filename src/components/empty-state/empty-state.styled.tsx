import styled from 'styled-components';

export const EmptyStateContainer = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border || "#e2e8f0"};
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background || "#f8fafc"};
  border-radius: 8px;
  padding: 2rem;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  max-width: 500px;
`;

export const MessageText = styled.p`
  color: ${({ theme }) => theme.colors.muted || "#64748b"};
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 1.5rem;
`;
