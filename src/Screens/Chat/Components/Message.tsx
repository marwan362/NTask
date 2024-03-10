import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {MessageType} from '..';
import Video from 'react-native-video';

const Message = ({
  image,
  text,
  video,
  isMyMessage,
  customType,
}: MessageType) => {
  return (
    <View style={styles.container}>
      <View style={isMyMessage ? styles.myMessage : styles.otherMessage}>
        {text && <Text style={styles.text}>{text}</Text>}
        {image && <Image source={{uri: image}} style={styles.image} />}
        {video && <Video source={{uri: video}} style={styles.image} />}
        {customType && customType()}
      </View>
    </View>
  );
};

export default React.memo(Message);

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  container: {
    marginBottom: 20,
  },
  myMessage: {
    alignSelf: 'flex-end',
    padding: 30,
    borderRadius: 10,
    backgroundColor: '#b3b3b3',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    padding: 30,
    backgroundColor: '#cccccc',
  },

  image: {
    width: 200,
    height: 200,
  },
});
