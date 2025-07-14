import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface StatusBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  label,
  value,
  maxValue,
  color
}) => {
  // Ensure value is within bounds
  const clampedValue = Math.max(0, Math.min(value, maxValue));
  const percentage = (clampedValue / maxValue) * 100;

  // Determine status level for styling
  const getStatusLevel = () => {
    if (percentage <= 25) return 'critical';
    if (percentage <= 50) return 'low';
    if (percentage <= 75) return 'medium';
    return 'high';
  };

  const statusLevel = getStatusLevel();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, styles[statusLevel]]}>
          {clampedValue}/{maxValue}
        </Text>
      </View>
      
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            }
          ]}
        />
        <View style={styles.barBackground} />
      </View>
      
      {/* Status indicator */}
      <View style={styles.statusIndicator}>
        {statusLevel === 'critical' && (
          <Text style={styles.warningIcon}>⚠️</Text>
        )}
        {statusLevel === 'low' && (
          <Text style={styles.warningIcon}>⚡</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  critical: {
    color: '#E74C3C',
  },
  low: {
    color: '#F39C12',
  },
  medium: {
    color: '#F39C12',
  },
  high: {
    color: '#27AE60',
  },
  barContainer: {
    height: 12,
    backgroundColor: '#ECF0F1',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  barBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ECF0F1',
  },
  statusIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  warningIcon: {
    fontSize: 12,
  },
});
