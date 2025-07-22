import React, { useEffect, useState } from "react";
import { useRegistryCleaner } from "./hooks/useRegistryCleaner";
import { Shield, RotateCcw, Wrench } from "lucide-react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import EmptyState from "./components/EmptyState";
import type { RegistryBackup, RegistryItem } from "./types";
import LoadingIndicator from "./components/LoadingIndicator";
import PageHeader from "./components/PageHeader";
import { Results } from "./components/RegistryCleaner/Results";

export const RegistryCleanerView: React.FC = () => {
  const {
    scanning,
    issues,
    backups,
    scanRegistry,
    cleanRegistry,
    restoreBackup,
  } = useRegistryCleaner();
  const [restoring, setRestoring] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [ignoredIssues, setIgnoredIssues] = useState<string[]>([]);
  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    if (!hasScanned) {
      scanRegistry();
      setHasScanned(true);
    }
  }, [scanRegistry, hasScanned]);

  const handleClean = async (itemsToClean: RegistryItem[]) => {
    if (itemsToClean.length === 0) return;

    try {
      await cleanRegistry(itemsToClean);
    } finally {
      setShowResults(false);
    }
  };

  const handleRestore = async (backup: RegistryBackup) => {
    setRestoring(true);
    try {
      await restoreBackup(backup);
      await scanRegistry(); // Refresh the issues list
    } finally {
      setRestoring(false);
    }
  };

  const handleIgnore = (item: RegistryItem) => {
    setIgnoredIssues((prev) => [...prev, item.path]);
  };

  return (
    <div className="registry-cleaner">
      <div className="registry-cleaner-header">
        <PageHeader title="Registry Cleaner" />
        <div className="header-actions">
          <Button
            onClick={() => scanRegistry()}
            disabled={scanning || restoring}
            variant="primary"
          >
            {scanning ? "Scanning..." : "Scan Registry"}
          </Button>
        </div>
      </div>

      {scanning || restoring ? (
        <LoadingIndicator
          message={
            scanning
              ? "Scanning registry for issues..."
              : "Restoring registry from backup..."
          }
        />
      ) : showResults ? (
        <Results
          issues={issues.filter((issue) => !ignoredIssues.includes(issue.path))}
          onClean={handleClean}
          onBack={() => setShowResults(false)}
          onIgnore={handleIgnore}
        />
      ) : hasScanned &&
        issues.filter((issue) => !ignoredIssues.includes(issue.path)).length >
          0 ? (
        <>
          <Button onClick={() => setShowResults(true)}>
            View{" "}
            {
              issues.filter((issue) => !ignoredIssues.includes(issue.path))
                .length
            }{" "}
            Issues
          </Button>
          {backups.length > 0 && (
            <Card className="registry-backups">
              <h3>Backup History</h3>
              <div className="backups-list">
                {backups.map((backup) => (
                  <div key={backup.timestamp} className="backup-item">
                    <div className="backup-info">
                      <Shield size={16} />
                      <span>
                        Backup from{" "}
                        {new Date(backup.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleRestore(backup)}
                      disabled={restoring || scanning}
                      variant="secondary"
                    >
                      <RotateCcw size={16} />
                      {restoring ? "Restoring..." : "Restore"}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      ) : (
        <EmptyState
          icon={<Wrench size={48} />}
          message={
            hasScanned
              ? "No registry issues found. Your system is optimized!"
              : 'Click "Scan Registry" to find and fix registry issues.'
          }
          callToAction={
            !hasScanned && (
              <Button onClick={() => scanRegistry()} variant="primary">
                Scan Registry
              </Button>
            )
          }
        />
      )}
    </div>
  );
};
