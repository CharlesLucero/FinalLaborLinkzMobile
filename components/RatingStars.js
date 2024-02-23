import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

const RatingStars = ({ rating }) => {
  const renderStars = () => {
    const filledStars = Math.floor(rating);
    const outlineStars = 5 - filledStars;

    const stars = [];

    // Render filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FontAwesome key={i} name="star" size={24} color="yellow" />);
    }

    // Render outline stars
    for (let i = 0; i < outlineStars; i++) {
      stars.push(<Feather key={filledStars + i} name="star" size={24} color="yellow" />);
    }

    return stars;
  };

  return (
    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
      {renderStars()}
      <Text style={{ color: "#e4e4e4", fontSize: 13, marginLeft: 5 }}>
        Ratings: {rating}
      </Text>
    </View>
  );
};

export default RatingStars;
