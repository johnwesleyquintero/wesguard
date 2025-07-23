import React from "react";
import { Card } from "../Card";
import LoadingIndicator from "../LoadingIndicator";
import PageHeader from "../PageHeader";
import {
  CLEANER_CLEANING_TITLE,
  CLEANER_CLEANING_MESSAGE,
} from "../../constants";
import type { CleaningProgress } from "../../hooks/useJunkFileCleaner";

interface CleaningInProgressProps {
  progress: string | CleaningProgress;
}

const CleaningInProgress: React.FC<CleaningInProgressProps> = ({
  progress,
}) => {
  const displayMessage =
    typeof progress === "string"
      ? progress
      : `Cleaning ${progress.currentFile} (${progress.current}/${progress.total})`;

  return (
    <>
      <PageHeader title={CLEANER_CLEANING_TITLE} />
      <Card>
        <LoadingIndicator
          message={displayMessage || CLEANER_CLEANING_MESSAGE}
        />
      </Card>
    </>
  );
};

export default CleaningInProgress;
