import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import { aboutStyles as styles } from '../../modules/profileScreenStyle';
import branchData from '../../assets/branch.json';
import NavigateComponent from '../../components/NavigateComponent';

const AboutUsScreen = () => {
  const branches = branchData.branches;

  return (
    <ScrollView style={styles.aboutContainer}>
      <Text style={styles.header}>Welcome to RUITEA</Text>

      <Text style={styles.paragraph}>
        At <Text style={styles.bold}>RUITEA</Text>, we believe every cup tells a story. Founded with a passion for blending tradition and innovation, we serve a wide variety of milk teas, fruit teas, smoothies, and specialty drinks crafted to delight your taste buds and warm your heart.
      </Text>

      <Text style={styles.subHeader}>🍃 Our Story</Text>
      <Text style={styles.paragraph}>
        Born in the vibrant heart of Malaysia, RUITEA was created as a local brand that puts quality, freshness, and creativity first. Every drink is carefully made with premium ingredients and a lot of love — giving you a sip of something truly special.
      </Text>

      <Text style={styles.subHeader}>🌟 Why Choose Us?</Text>
      <View style={styles.bulletList}>
        <Text style={styles.bullet}>• Freshly brewed teas, daily</Text>
        <Text style={styles.bullet}>• Friendly service in a cozy setting</Text>
        <Text style={styles.bullet}>• Affordable yet premium-quality drinks</Text>
        <Text style={styles.bullet}>• Two convenient locations — and growing!</Text>
      </View>

      <Text style={styles.subHeader}>📍 Visit Our Branches</Text>
      {Object.values(branches).map((branch, index) => (
        <View key={index} style={styles.branchCard}>
          <Text style={styles.branchName}>{branch.name}</Text>
          <Text style={styles.label}>📞 Phone:</Text>
          <Text style={styles.text}>{branch.phone}</Text>
          <Text style={styles.label}>📍 Address:</Text>
          <Text style={styles.text}>{branch.address}</Text>

          <Text style={styles.label}>🕒 Opening Hours:</Text>
          {Object.entries(branch.opening_time).map(([day, time], index) => (
            <Text key={index} style={styles.text}>{day}: {time}</Text>
          ))}

          <NavigateComponent destinationLat={branch.latitude} destinationLong={branch.longitude} destinationName={branch.name} />
        </View>
      ))}
      
      {/* Add spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};


export default AboutUsScreen;
