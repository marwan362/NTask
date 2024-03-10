import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface BubbleChatIconProps {
  onIconPress: () => void;
}

const BubbleChatIcon = ({onIconPress}: BubbleChatIconProps) => {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate(event => {
      translationX.value = event.translationX + prevTranslationX.value;
      translationY.value = event.translationY + prevTranslationY.value;
    })
    .onEnd(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: withSpring(translationX.value)},
      {translateY: withSpring(translationY.value)},
    ],
  }));
  return (
    <GestureDetector gesture={pan}>
      <AnimatedTouchableOpacity
        style={[styles.container, animatedStyles]}
        onPress={onIconPress}>
        <View style={styles.innerCircle} />
        <View style={styles.outerCircle} />
      </AnimatedTouchableOpacity>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    right: 0,
    top: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  innerCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  outerCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#00BFFF',
    position: 'absolute',
  },
});

export default BubbleChatIcon;
