import React, { useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

const UnderTheSkyPressable = ({
  children,
  style,
  onPressIn,
  onPressOut,
  disabled,
  pressScale = 0.97,
  ...restProps
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = event => {
    if (!disabled) {
      Animated.spring(scale, {
        toValue: pressScale,
        speed: 30,
        bounciness: 0,
        useNativeDriver: true,
      }).start();
    }
    onPressIn?.(event);
  };

  const handlePressOut = event => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
    onPressOut?.(event);
  };

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}>
      <TouchableOpacity
        {...restProps}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default UnderTheSkyPressable;
