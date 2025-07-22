import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../../assets/lottie/empty.json';
import { AppButton } from '../button';
import { ContentWrapper, EmptyStateContainer, MessageText } from './empty-state.styled';

export const EmptyState: React.FC<IEmptyStateProps> = ({
  text,
  btnFxn,
  btnText,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <EmptyStateContainer>
      <ContentWrapper>
        <div>
          <Lottie options={defaultOptions} height={200} width={200} />
          <MessageText>{text}</MessageText>
          {!!btnText && <AppButton click={btnFxn}>{btnText}</AppButton>}
        </div>
      </ContentWrapper>
    </EmptyStateContainer>
  );
};

interface IEmptyStateProps {
  text: string;
  btnText?: string;
  btnFxn?: () => void;
}
