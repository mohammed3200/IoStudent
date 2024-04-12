import React from 'react';
import Color from 'color';
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

type DropdownItemType = {
  Code: string;
  Title: string;
  IsCompleted: boolean;
  ScheduledMark: number;
  Prerequisites: null | string;
};
type DropdownListitemProps = DropdownItemType & {
  index: number;
  dropdownItemsCount: number;
  isExpanded: Animated.SharedValue<boolean>;
};
const DropdownListItem: React.FC<DropdownListitemProps> = ({
  Code,
  Title,
  IsCompleted,
  ScheduledMark,
  Prerequisites,
  index,
  dropdownItemsCount,
  isExpanded,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const DropdownListItemHeight = 85;
  const Margin = 10;

  const fullDropdownHeight =
    dropdownItemsCount * (DropdownListItemHeight + Margin);

  const collapsedTop = fullDropdownHeight / 2 - DropdownListItemHeight;
  const expandedTop = (DropdownListItemHeight + Margin) * index

  const expandedScale = 1;
  const collapsedScale = 1 - index * 0.08;

  const expandedBackgroundColor = '#1B1B1B';
  const collapsedBackgroundColor = Color(expandedBackgroundColor).lighten(
    index * 0.25
  ).hex()

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isExpanded.value ? expandedBackgroundColor : collapsedBackgroundColor),
      top: withSpring(isExpanded.value ? expandedTop : collapsedTop),
      transform: [
        {
          translateY: fullDropdownHeight / 2,
        },
        {
          scale: withSpring(
            isExpanded.value ? expandedScale : collapsedScale,
            { duration: 300 },
          ),
        }
      ],
    };
  }, [])
  const isHeader = index === 0;
  return (
    <Animated.View
      onTouchEnd={() => {
        if (isHeader) isExpanded.value = !isExpanded.value;
      }}
      style={[{
        zIndex: dropdownItemsCount - index,
        position: 'absolute',
        width: windowWidth * 0.95,
        height: DropdownListItemHeight,
        borderRadius: 10,
      },
        rStyle,
      ]}
    >
      <View style={styles.container} />
      <View style={styles.iconContainer} >
        {IsCompleted && !isHeader ?
          <FontAwesome5 name="check-circle" size={25} color="#1B1" />
          : <FontAwesome name="close" size={25} color="#B11" />}
      </View>
      <Text style={styles.label}>
        Code : {Code},
        Title: {Title},
        Scheduled Mark : {ScheduledMark}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#D4D4D4',
    fontSize: 22,
  },
  iconContainer: {
    position: 'absolute',
    width: 45,
    aspectRatio: 1,
    backgroundColor: '#111',
    left: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


export { DropdownListItem };
export type { DropdownItemType };
