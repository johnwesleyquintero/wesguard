import React from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import PageHeader from "../PageHeader";
import {
  CLEANER_CLEANING_COMPLETE_TITLE,
  CLEANER_CLEAN_AGAIN_BUTTON,
} from "../../constants";

interface CleaningCompleteProps {
  recoverableSpace: number;
  formatBytes: (bytes: number) => string;
  onCleanAgain: () => void;
}

const CleaningComplete: React.FC<CleaningCompleteProps> = ({
  recoverableSpace,
  formatBytes,
  onCleanAgain,
}) => {
  return (
    <>
      <PageHeader title={CLEANER_CLEANING_COMPLETE_TITLE} />
      <Card>
        <p>Successfully recovered {formatBytes(recoverableSpace)} of space.</p>
        <Button onClick={onCleanAgain}>{CLEANER_CLEAN_AGAIN_BUTTON}</Button>
      </Card>
    </>
  );
};

export default CleaningComplete;
