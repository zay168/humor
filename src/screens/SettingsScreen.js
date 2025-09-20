import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'phosphor-react-native';

import { useTheme, useThemeColors } from '../contexts/ThemeContext';
import { SPACING } from '../theme/colors';

function SettingsRow({ title, description, children, colors }) {
  return (
    <View style={[styles.row, { backgroundColor: colors.settingsCard }]}> 
      <View style={styles.rowTextWrapper}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        {description ? (
          <Text style={[styles.rowDescription, { color: colors.subtext }]}>{description}</Text>
        ) : null}
      </View>
      <View style={styles.rowAccessory}>{children}</View>
    </View>
  );
}

function SettingsScreen() {
  const colors = useThemeColors();
  const { theme, setTheme } = useTheme();
  const navigation = useNavigation();
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const isMidnight = theme === 'midnight';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.settingsBackground }]}> 
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.header, { backgroundColor: colors.settingsBackground }]}> 
          <Pressable
            accessibilityLabel="Revenir à l'accueil"
            onPress={() => navigation.navigate('Accueil')}
            style={styles.headerAction}
          >
            <ArrowLeft size={24} color={colors.text} weight="regular" />
          </Pressable>
          <Text style={[styles.title, { color: colors.text }]}>Paramètres</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Apparence</Text>
          <SettingsRow
            title="Thème"
            description="Choisissez entre un thème clair et sombre"
            colors={colors}
          >
            <Switch
              value={isMidnight}
              onValueChange={() => setTheme(isMidnight ? 'dark' : 'midnight')}
              trackColor={{ false: colors.switchTrack, true: colors.switchActive }}
              thumbColor={colors.switchThumb}
            />
          </SettingsRow>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
          <SettingsRow
            title="Rappels quotidiens"
            description="Recevez des rappels pour enregistrer votre humeur"
            colors={colors}
          >
            <Switch
              value={reminderEnabled}
              onValueChange={setReminderEnabled}
              trackColor={{ false: colors.switchTrack, true: colors.switchActive }}
              thumbColor={colors.switchThumb}
            />
          </SettingsRow>
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
  section: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTextWrapper: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  rowAccessory: {
    justifyContent: 'center',
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  rowDescription: {
    fontSize: 14,
    marginTop: SPACING.xs,
  },
});

export default SettingsScreen;
