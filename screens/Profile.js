import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { Title, Card, Button } from 'react-native-paper';

const Profile = () => {
  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('tel:3513511111');
    } else {
      Linking.openURL('telprompt:3513511111')
    }
  };
  return(
    <View style={styles.root}>
      <View style={styles.gradientSection} />
      <View style={styles.imageContainer}>
        <Image
          style={{
            width: 140,
            height: 140,
            borderRadius: 140/2,
          }}
          source={{
            uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Title style={{ fontSize: 25 }}>Ariel Rosales</Title>
        <Text style={styles.subTitle}>Developer</Text>
      </View>
      <Card style={styles.card} onPress={() => {
        Linking.openURL('mailto:aarr@hotmail.com')
      }}>
        <View style={styles.cardSection}>
          <MaterialIcons name='email' size={30} color='#006aff' />
          <Text style={styles.infoText}>aarr@hotmail.com</Text>
        </View>
      </Card>
      <Card style={styles.card} onPress={() => openDial()}>
        <View style={styles.cardSection}>
          <Entypo name='old-phone' size={30} color='#006aff' />
          <Text style={styles.infoText}>351 351 3311</Text>
        </View>
      </Card>
      <Card style={styles.card}>
        <View style={styles.cardSection}>
          <MaterialIcons name='attach-money' size={30} color='#006aff' />
          <Text style={styles.infoText}>5.000</Text>
        </View>
      </Card>
      <View style={styles.buttonsContainer}>
        <Button
          icon="account-edit"
          mode="contained"
          onPress={() => console.log("Save---")}
          style={styles.button}
          theme={theme}
        >
          Edit
        </Button>
        <Button
          icon="delete"
          mode="contained"
          onPress={() => console.log("Save---")}
          style={styles.button}
          theme={theme}
        >
          Delete
        </Button>
      </View>
    </View>
  )
};

const theme = {
  colors: {
    primary: '#006aff'
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  gradientSection: {
    backgroundColor: '#006aff',
    height: '20%',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: -140/2,
  },
  infoContainer: {
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    marginLeft: 10
  },
  card: {
    margin: 10,
  },
  cardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  }
});

export default Profile;