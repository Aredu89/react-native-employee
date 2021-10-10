import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { uri } from './Consts';

const Home = ({ navigation }) => {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const fetchData = () => {
    fetch(`${uri}/employees`)
    .then(res=>res.json())
    .then(results=>{
      setData(results);
      setLoading(false)
    })
    .catch(error=>{
      Alert.alert('Error getting employees')
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = ({ item }) => (
    <Card
      key={item._id}
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
            uri: item.picture
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
        keyExtractor={item => item._id}
        refreshing={loading}
        onRefresh={() => fetchData()}
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