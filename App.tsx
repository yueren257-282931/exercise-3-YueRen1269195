import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

type Directory = {
  id: string;
  title: string;
  emoji: string;
  color: string;
  messages: string[];
};

const directories: Directory[] = [
  {
    id: 'you',
    title: 'You',
    emoji: '👤',
    color: '#ff6b35',
    messages: [
      'Remember to submit Exercise 3 before the deadline.',
      'Review README.pdf and make sure screenshots are included.',
      'Upload the full project to a public GitHub repository.',
    ],
  },
  {
    id: 'home',
    title: 'Home',
    emoji: '🏠',
    color: '#8fd3f4',
    messages: [
      'Buy groceries after class.',
      'Call home this evening.',
      'Clean the desk before starting the next assignment.',
    ],
  },
  {
    id: 'love',
    title: 'Love',
    emoji: '❤️',
    color: '#3b82a8',
    messages: [
      'Send a kind message today.',
      'Plan something relaxing for the weekend.',
      'Be patient, grateful, and supportive.',
    ],
  },
  {
    id: 'family',
    title: 'Family',
    emoji: '👨‍👩‍👧',
    color: '#6852d8',
    messages: [
      'Family dinner reminder.',
      'Share your school progress update.',
      'Ask if anyone needs help this week.',
    ],
  },
  {
    id: 'friends',
    title: 'Friends',
    emoji: '👯',
    color: '#ff66b3',
    messages: [
      'Group project meeting at 6:00 PM.',
      'Reply to the weekend plan message.',
      'Send photos from the last hangout.',
    ],
  },
  {
    id: 'school',
    title: 'School',
    emoji: '💻',
    color: '#12bfe3',
    messages: [
      'CS5450 Exercise 3: React Native Messages Directory.',
      'Test the app on Android emulator before submitting.',
      'Keep all JS/TS files, images, and README.pdf in the ZIP.',
    ],
  },
];

export default function App() {
  const [selected, setSelected] = useState<Directory>(directories[0]);
  const { width } = useWindowDimensions();
  const cardSize = useMemo(() => Math.min((width - 64) / 2, 150), [width]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Messages Directory</Text>
          <Text style={styles.subtitle}>Tap a directory to view stored messages</Text>
        </View>

        <FlatList
          data={directories}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.directoryGrid}
          renderItem={({ item }) => {
            const active = selected.id === item.id;
            return (
              <Pressable
                onPress={() => setSelected(item)}
                style={[
                  styles.directoryCard,
                  { width: cardSize, height: cardSize, backgroundColor: item.color },
                  active && styles.activeDirectoryCard,
                ]}
              >
                <Text style={styles.directoryEmoji}>{item.emoji}</Text>
                <Text style={styles.directoryTitle}>{item.title}</Text>
              </Pressable>
            );
          }}
        />

        <View style={styles.messagesPanel}>
          <View style={styles.messagesHeader}>
            <Text style={styles.messagesTitle}>{selected.emoji} {selected.title} Messages</Text>
            <Text style={styles.countBadge}>{selected.messages.length} saved</Text>
          </View>
          {selected.messages.map((message, index) => (
            <View key={`${selected.id}-${index}`} style={styles.messageItem}>
              <Text style={styles.messageNumber}>{index + 1}</Text>
              <Text style={styles.messageText}>{message}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fbff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#273043',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#687385',
  },
  directoryGrid: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  row: {
    gap: 18,
    marginBottom: 18,
  },
  directoryCard: {
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 7,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  activeDirectoryCard: {
    borderColor: '#273043',
    transform: [{ scale: 1.03 }],
  },
  directoryEmoji: {
    fontSize: 42,
  },
  directoryTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  messagesPanel: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 18,
    marginTop: 6,
    marginBottom: 18,
    shadowColor: '#1f2937',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 6,
  },
  messagesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  messagesTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#273043',
    flex: 1,
  },
  countBadge: {
    backgroundColor: '#edf2ff',
    color: '#4f46e5',
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
    fontSize: 12,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f6f8fb',
    borderRadius: 16,
    padding: 12,
    marginTop: 8,
  },
  messageNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#273043',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '800',
    marginRight: 10,
  },
  messageText: {
    flex: 1,
    color: '#374151',
    fontSize: 15,
    lineHeight: 22,
  },
});
