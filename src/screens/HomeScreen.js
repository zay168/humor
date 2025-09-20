import React, { useMemo, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { GearSix } from 'phosphor-react-native';

import { useThemeColors } from '../contexts/ThemeContext';
import { SPACING } from '../theme/colors';

const MOOD_OPTIONS = [
  'Très heureux',
  'Heureux',
  'Neutre',
  'Triste',
  'Très triste',
];

const HERO_IMAGE = {
  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFtcBt2_0cINJ1zDWEgWmwiYX2NTA1c0W0f3vHL8CXVSEB15keICMCkO7lTNKeBz_ZehW5uiznJ1iYW3gxo-uGk0732M_A4RdOSWxKR3rUcQEFjawoHbyg9YU96LZoNvNXSYmnrM4hcyC43msDWyjlevRB58NKjQsxMjjcs1UGvwHDoSO0vB6j4tg-GdUsA9FV9CSQJMgt94-wzdCtLSYvsFSKnQ5JUFH4h3X1zq48sF3nBs4ZZbF1-DsNnF4wDJm4v1bq9KQXPvPG',
};

function HomeScreen() {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState(null);

  const moodButtons = useMemo(
    () =>
      MOOD_OPTIONS.map((label) => {
        const isSelected = selectedMood === label;
        return (
          <Pressable
            key={label}
            onPress={() => setSelectedMood(label)}
            style={[
              styles.moodButton,
              {
                borderColor: isSelected ? colors.accent : colors.border,
                backgroundColor: isSelected ? `${colors.accent}22` : 'transparent',
              },
            ]}
          >
            <Text style={[styles.moodLabel, { color: colors.text }]}>{label}</Text>
          </Pressable>
        );
      }),
    [colors.accent, colors.border, colors.text, selectedMood],
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.header, { backgroundColor: colors.header }]}> 
          <Text style={[styles.title, { color: colors.text }]}>Accueil</Text>
          <TouchableOpacity
            accessibilityLabel="Ouvrir les paramètres"
            onPress={() => navigation.navigate('Paramètres')}
            style={styles.headerAction}
          >
            <GearSix size={24} color={colors.text} weight="regular" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroWrapper}>
          <ImageBackground
            source={HERO_IMAGE}
            style={styles.hero}
            imageStyle={styles.heroImage}
          >
            <View style={[styles.heroOverlay, { backgroundColor: colors.overlay }]} />
          </ImageBackground>
        </View>

        <Text style={[styles.question, { color: colors.text }]}>Comment vous sentez-vous aujourd'hui ?</Text>

        <View style={styles.moodContainer}>{moodButtons}</View>

        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.accent }]}> 
          <Text style={[styles.primaryButtonLabel, { color: colors.text }]}>Enregistrer</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAction: {
    position: 'absolute',
    right: SPACING.md,
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
  heroWrapper: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
  },
  hero: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroImage: {
    borderRadius: 20,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  question: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  moodButton: {
    paddingHorizontal: SPACING.md,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    marginHorizontal: SPACING.md,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default HomeScreen;
