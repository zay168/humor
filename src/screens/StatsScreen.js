import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'phosphor-react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { useThemeColors } from '../contexts/ThemeContext';
import { SPACING } from '../theme/colors';

const PERIODS = ['Jour', 'Semaine', 'Mois'];

const WEEKLY_BARS = [
  { label: 'Lun', value: 0.5 },
  { label: 'Mar', value: 0.9 },
  { label: 'Mer', value: 0.2 },
  { label: 'Jeu', value: 0.7 },
  { label: 'Ven', value: 0.6 },
  { label: 'Sam', value: 0.9 },
  { label: 'Dim', value: 0.1 },
];

const TREND_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const TREND_PATH =
  'M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25';

function StatsScreen() {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const [period, setPeriod] = useState('Semaine');

  const segmentedOptions = useMemo(
    () =>
      PERIODS.map((item) => {
        const isActive = period === item;
        return (
          <Pressable
            key={item}
            onPress={() => setPeriod(item)}
            style={[
              styles.segment,
              {
                backgroundColor: isActive ? colors.background : colors.muted,
              },
            ]}
          >
            <Text
              style={[
                styles.segmentLabel,
                { color: isActive ? colors.text : colors.subtext },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        );
      }),
    [colors.background, colors.muted, colors.subtext, colors.text, period],
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.header, { backgroundColor: colors.header }]}> 
          <Pressable
            accessibilityLabel="Revenir à l'accueil"
            onPress={() => navigation.navigate('Accueil')}
            style={styles.headerAction}
          >
            <ArrowLeft size={24} color={colors.text} weight="regular" />
          </Pressable>
          <Text style={[styles.title, { color: colors.text }]}>Statistiques</Text>
        </View>

        <View
          style={[
            styles.segmentedControl,
            { backgroundColor: colors.muted, borderColor: colors.border },
          ]}
        >
          {segmentedOptions}
        </View>

        <View style={styles.cardsWrapper}>
          <View style={[styles.card, { backgroundColor: colors.muted }]}> 
            <Text style={[styles.cardTitle, { color: colors.text }]}>Humeur moyenne</Text>
            <Text style={[styles.cardValue, { color: colors.text }]}>4.2</Text>
            <View style={styles.cardMetaRow}>
              <Text style={[styles.cardMeta, { color: colors.subtext }]}>Cette semaine</Text>
              <Text style={[styles.cardMetaPositive, { color: colors.success }]}>+5%</Text>
            </View>
            <View style={styles.barChart}>
              {WEEKLY_BARS.map((item) => (
                <View key={item.label} style={styles.barColumn}>
                  <View
                    style={[
                      styles.bar,
                      {
                        backgroundColor: colors.card,
                        height: Math.max(16, item.value * 160),
                      },
                    ]}
                  />
                  <Text style={[styles.barLabel, { color: colors.subtext }]}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: colors.muted }]}> 
            <Text style={[styles.cardTitle, { color: colors.text }]}>Tendances de l'humeur</Text>
            <Text style={[styles.cardValue, { color: colors.text }]}>4.5</Text>
            <View style={styles.cardMetaRow}>
              <Text style={[styles.cardMeta, { color: colors.subtext }]}>Cette semaine</Text>
              <Text style={[styles.cardMetaPositive, { color: colors.success }]}>+3%</Text>
            </View>
            <View style={styles.trendChartContainer}>
              <Svg width="100%" height={160} viewBox="-3 0 478 150" preserveAspectRatio="none">
                <Defs>
                  <LinearGradient id="trendGradient" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
                    <Stop offset="0" stopColor={colors.card} stopOpacity="0.85" />
                    <Stop offset="1" stopColor={colors.card} stopOpacity="0" />
                  </LinearGradient>
                </Defs>
                <Path d={`${TREND_PATH}V149H0V109Z`} fill="url(#trendGradient)" />
                <Path d={TREND_PATH} stroke={colors.subtext} strokeWidth={3} strokeLinecap="round" fill="transparent" />
              </Svg>
              <View style={styles.trendLabels}>
                {TREND_LABELS.map((label) => (
                  <Text key={label} style={[styles.barLabel, { color: colors.subtext }]}>
                    {label}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: SPACING.xl,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerAction: {
    position: 'absolute',
    left: SPACING.md,
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    padding: SPACING.xs,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: SPACING.xs,
  },
  segment: {
    flex: 1,
    borderRadius: 16,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardsWrapper: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    gap: SPACING.lg,
  },
  card: {
    borderRadius: 24,
    padding: SPACING.lg,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: '700',
  },
  cardMetaRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
    alignItems: 'baseline',
  },
  cardMeta: {
    fontSize: 14,
  },
  cardMetaPositive: {
    fontSize: 14,
    fontWeight: '600',
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: '60%',
    borderTopWidth: 2,
    borderRadius: 10,
  },
  barLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: SPACING.xs,
  },
  trendChartContainer: {
    marginTop: SPACING.lg,
  },
  trendLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
});

export default StatsScreen;
