import React from 'react';
import { Button } from '../Button';
import { Card } from '../Card';
import PageHeader from '../PageHeader';
import {
  CLEANER_TITLE,
  CLEANER_IDLE_MESSAGE,
  CLEANER_ANALYZE_BUTTON,
} from '../../constants';

interface AnalysisIdleProps {
  onAnalyze: () => void;
  isDisabled: boolean;
}

const AnalysisIdle: React.FC<AnalysisIdleProps> = ({
  onAnalyze,
  isDisabled,
}) => {
  return (
    <>
      <PageHeader title={CLEANER_TITLE} />
      <Card>
        <p>{CLEANER_IDLE_MESSAGE}</p>
        <Button onClick={onAnalyze} disabled={isDisabled}>
          {CLEANER_ANALYZE_BUTTON}
        </Button>
      </Card>
    </>
  );
};

export default AnalysisIdle;
