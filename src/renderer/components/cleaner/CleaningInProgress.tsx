import React from "react";
import { Card } from "../Card";
import LoadingIndicator from "../LoadingIndicator";
import PageHeader from "../PageHeader";
import {
  CLEANER_CLEANING_TITLE,
  CLEANER_CLEANING_MESSAGE,
} from "../../constants";

interface CleaningInProgressProps {
  progress: string | null;
}

const CleaningInProgress: React.FC<CleaningInProgressProps> = ({
  progress,
}) => {
  return (
    <>
      <PageHeader title={CLEANER_CLEANING_TITLE} />
      <Card>
        <LoadingIndicator message={progress || CLEANER_CLEANING_MESSAGE} />
      </Card>
    </>
  );
};

export default CleaningInProgress;
