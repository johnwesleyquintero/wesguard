import React, { useEffect, useState } from 'react';
import { useRegistryCleaner } from './hooks/useRegistryCleaner';
import { Shield, RotateCcw, Check } from 'lucide-react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import type { RegistryBackup, RegistryItem } from './types';
import PageHeader from './components/PageHeader';
import { Results } from './components/RegistryCleaner/Results';

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

  useEffect(() => {
    scanRegistry();
  }, [scanRegistry]);

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

  return (
    <div className="registry-cleaner">
      <div className="registry-cleaner-header">
        <PageHeader title="Registry Cleaner" />
        <div className="header-actions">
          <Button
            onClick={() => scanRegistry()}
            disabled={scanning}
            variant="primary"
          >
            {scanning ? 'Scanning...' : 'Scan Registry'}
          </Button>
        </div>
      </div>

      {showResults ? (
        <Results
          issues={issues}
          onClean={handleClean}
          onBack={() => setShowResults(false)}
        />
      ) : (
        <>
          {issues.length > 0 && (
            <Button onClick={() => setShowResults(true)}>
              View {issues.length} Issues
            </Button>
          )}

          {backups.length > 0 && (
            <Card className="registry-backups">
              <h3>Backup History</h3>
              <div className="backups-list">
                {backups.map((backup) => (
                  <div key={backup.timestamp} className="backup-item">
                    <div className="backup-info">
                      <Shield size={16} />
                      <span>
                        Backup from{' '}
                        {new Date(backup.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleRestore(backup)}
                      disabled={restoring}
                      variant="secondary"
                    >
                      <RotateCcw size={16} />
                      {restoring ? 'Restoring...' : 'Restore'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {!scanning && issues.length === 0 && (
            <div className="no-issues">
              <Check size={24} className="success-icon" />
              <p>No registry issues found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
