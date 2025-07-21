import React from 'react';
import styled from 'styled-components';
import { theme, ThemeMode } from '../styles/theme';
import { useSystemInfoContext } from '../context/SystemInfoContext';

// Define the props for the styled card
interface StyledCardProps {
  themeMode: ThemeMode;
  variant: 'default' | 'flat';
}

// Create the styled card component
const StyledCard = styled.div<StyledCardProps>`
  background-color: ${(props) =>
    props.variant === 'flat'
      ? theme[props.themeMode].colors.tertiaryBg || theme.dark.colors.tertiaryBg
      : theme[props.themeMode].colors.secondaryBg ||
        theme.dark.colors.secondaryBg};

  border-radius: ${(props) => theme[props.themeMode].borderRadius};
  padding: ${(props) => theme[props.themeMode].spacing.md};
  box-shadow: ${(props) =>
    props.variant === 'flat' ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.3)'};
  color: ${(props) =>
    theme[props.themeMode].colors.primaryText || theme.dark.colors.primaryText};
  border: ${(props) =>
    props.variant === 'flat'
      ? `1px solid ${theme[props.themeMode].colors.borderColor || theme.dark.colors.borderColor}`
      : 'none'};
`;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'flat';
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  variant = 'default',
  ...props
}) => {
  const { themeMode } = useSystemInfoContext();

  return (
    <StyledCard
      className={className}
      variant={variant}
      themeMode={themeMode || 'light'}
      {...props}
    >
      {children}
    </StyledCard>
  );
};
