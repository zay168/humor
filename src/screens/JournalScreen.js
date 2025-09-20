import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, CaretLeft, CaretRight } from 'phosphor-react-native';

import { useThemeColors } from '../contexts/ThemeContext';
import { SPACING } from '../theme/colors';

const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAYS_IN_MONTH = 30;
const FIRST_DAY_OFFSET = 3;

function JournalScreen() {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState(5);
  const [entry, setEntry] = useState('');

  const calendarCells = useMemo(() => {
    const blanks = Array.from({ length: FIRST_DAY_OFFSET }, (_, index) => `blank-${index}`);
    const days = Array.from({ length: DAYS_IN_MONTH }, (_, index) => index + 1);
    return [...blanks, ...days];
  }, []);

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
          <Text style={[styles.title, { color: colors.text }]}>Journal</Text>
        </View>

        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Pressable style={styles.calendarNavButton}>
              <CaretLeft size={18} color={colors.text} weight="regular" />
            </Pressable>
            <Text style={[styles.monthLabel, { color: colors.text }]}>Juillet 2024</Text>
            <Pressable style={styles.calendarNavButton}>
              <CaretRight size={18} color={colors.text} weight="regular" />
            </Pressable>
          </View>

          <View style={styles.weekHeader}>
            {WEEK_DAYS.map((day) => (
              <Text key={day} style={[styles.weekDay, { color: colors.text }]}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarCells.map((value) => {
              if (typeof value === 'string') {
                return <View key={value} style={styles.calendarCell} />;
              }

              const isSelected = selectedDay === value;
              return (
                <Pressable
                  key={value}
                  onPress={() => setSelectedDay(value)}
                  style={styles.calendarCell}
                >
                  <View
                    style={[
                      styles.dayBadge,
                      {
                        backgroundColor: isSelected ? colors.accent : 'transparent',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayLabel,
                        { color: isSelected ? colors.text : colors.text },
                      ]}
                    >
                      {value}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.editorContainer}>
          <TextInput
            multiline
            placeholder="Comment s'est passée votre journée ?"
            placeholderTextColor={colors.subtext}
            value={entry}
            onChangeText={setEntry}
            style={[styles.textArea, { backgroundColor: colors.inputBackground, color: colors.text }]}
          />
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
  calendarContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SPACING.sm,
  },
  calendarNavButton: {
    height: 40,
    width: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  weekHeader: {
    flexDirection: 'row',
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    paddingBottom: SPACING.xs,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: '14.2857%',
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  dayBadge: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  editorContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  textArea: {
    borderRadius: 18,
    padding: SPACING.md,
    minHeight: 144,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 22,
  },
});

export default JournalScreen;
