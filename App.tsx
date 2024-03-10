import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ChatBubble, {MessageType} from './src/Screens/Chat';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App: React.FC = () => {
  const mockMessages: MessageType[] = [
    {
      id: '1',
      text: 'Hello there!',
      isMyMessage: true,
    },
    {
      id: '2',
      text: 'Hello there!',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
      isMyMessage: true,
    },
    {
      id: '3',
      isMyMessage: false,
      image:
        'https://images.unsplash.com/photo-1542379653-b928db1b4956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    },
    {
      id: '4',
      isMyMessage: false,
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: '5',
      isMyMessage: false,
      text: 'Hello there!',
      image:
        'https://images.unsplash.com/photo-1542379653-b928db1b4956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ChatBubble messages={mockMessages} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
