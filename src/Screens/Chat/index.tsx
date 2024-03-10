import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';

import Utils from '../../Utils';

import Message from './Components/Message';

import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import BubbleChatIcon from './Components/BubbleChatIcon';

interface MyComponentProps {
  id: string;
  text?: string;
  image?: string;
  video?: string;
  isMyMessage: boolean;
  customType?: () => React.ReactNode;
}

type ExclusiveProps =
  | {
      image?: string;
      video?: never;
      audio?: never;
      customType?: never;
      text?: string;
    }
  | {
      image?: never;
      video?: string;
      customType?: never;
      text?: string;
    }
  | {
      image?: never;
      text?: string;
      video?: never;
      customType?: never;
    }
  | {
      image?: never;
      text?: string;
      video?: never;
      customType?: MyComponentProps['customType'];
    };

export type MessageType = MyComponentProps & ExclusiveProps;

interface ChatBubbleProps {
  messages: MessageType[];
}

const ChatBubble: React.FC<ChatBubbleProps> = ({messages}) => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [_messages, setMessages] = useState<MessageType[]>([]);

  const [isChatVisible, setIsChatVisible] = useState(false);

  const setChatVisible = useCallback(() => {
    setIsChatVisible(true);
  }, []);

  useEffect(() => {
    setMessages(messages.reverse());
  }, [messages]);

  const animatedStyles = useAnimatedStyle(() => ({
    width: withTiming(isChatVisible ? '100%' : 0),
    height: withTiming(isChatVisible ? '100%' : 0),
  }));

  const setNewMessage = useCallback(
    (
      key: keyof ExclusiveProps,
      value: string | MyComponentProps['customType'],
    ) => {
      setMessages(prevMessages => {
        return [
          {
            id: (prevMessages.length + 1).toString(),
            [key]: typeof value === 'function' ? value() : value,
            isMyMessage: true,
          },
          ...prevMessages,
        ];
      });
    },
    [],
  );

  const openGallery = useCallback(() => {
    const options: ImageLibraryOptions = {
      mediaType: 'mixed',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0]?.uri;
        setNewMessage(
          Utils.isPhotoOrVideo(imageUri!) === 'Photo' ? 'image' : 'video',
          imageUri,
        );
      }
    });
  }, [setNewMessage]);

  const handleSend = useCallback(() => {
    setNewMessage('text', inputMessage);
    setInputMessage('');
  }, [inputMessage, setNewMessage]);

  return (
    <>
      {!isChatVisible && <BubbleChatIcon onIconPress={setChatVisible} />}

      {isChatVisible && (
        <Animated.View style={[styles.container, animatedStyles]}>
          <FlatList
            data={_messages}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Message {...item} />}
            contentContainerStyle={styles.contentContainerStyle}
            inverted
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={openGallery}
              style={styles.galleryButton}>
              <Text style={styles.sendButtonText}>openGallery</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Type your message..."
              value={inputMessage}
              onChangeText={text => setInputMessage(text)}
              style={styles.input}
            />
            <TouchableOpacity
              disabled={!inputMessage}
              onPress={handleSend}
              style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  galleryButton: {
    padding: 8,
    backgroundColor: 'orange',
    borderRadius: 5,
    marginEnd: 5,
  },
  sendButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
  },
});

export default ChatBubble;
