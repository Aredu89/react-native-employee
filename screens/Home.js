import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Card, FAB } from 'react-native-paper';

const profilePicture = 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';

const Home = ({ navigation }) => {
  const data = [
    {
      id: '1',
      name: 'karen',
      position: 'web developer',
      email: 'karen@hotmail.com',
      salary: '$5.000',
      picture: profilePicture,
      phone: '3511234455',
    },
    {
      id: '2',
      name: 'eduardo',
      position: 'android developer',
      email: 'eduardo@hotmail.com',
      salary: '$5.000',
      picture: profilePicture,
      phone: '3511234455',
    },
    {
      id: '3',
      name: 'edgar',
      position: 'react developer',
      email: 'edgar@hotmail.com',
      salary: '$5.000',
      picture: profilePicture,
      phone: '3511234455',
    },
    // {
    //   id: '4',
    //   name: 'enzo',
    //   position: 'ios developer',
    //   email: 'edgar@hotmail.com',
    //   salary: '$5.000',
    //   picture: profilePicture,
    //   phone: '3511234455',
    // },
    // {
    //   id: '5',
    //   name: 'ariel',
    //   position: 'web developer',
    //   email: 'edgar@hotmail.com',
    //   salary: '$5.000',
    //   picture: profilePicture,
    //   phone: '3511234455',
    // },
    // {
    //   id: '6',
    //   name: 'eduardo',
    //   position: 'android developer',
    //   email: 'edgar@hotmail.com',
    //   salary: '$5.000',
    //   picture: profilePicture,
    //   phone: '3511234455',
    // },
  ];

  const renderList = ({ item }) => (
    <Card
      key={item.id}
      style={styles.mycard}
      onPress={() => navigation.navigate('Profile', { item })}
    >
      <View style={styles.cardView}>
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 60/2, 
          }}
          source={{
            uri: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
          }}
        />
        <View style={{
          marginLeft: 10,
        }}>
          <Text style={styles.text}>{ item.name }</Text>
          <Text>{ item.position }</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        renderItem={renderList}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Create')}
        theme={{
          colors: {
            accent: '#006aff',
          },
        }}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mycard: {
    margin: 5,
  },
  cardView: {
    flexDirection: 'row',
    padding: 6,
  },
  text: {
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;