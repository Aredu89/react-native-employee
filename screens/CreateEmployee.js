import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { TextInput, Button } from 'react-native-paper';

const CreateEmployee = () => {
  const [ name, setName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ salary, setSalary ] = useState('');
  const [ picture, setPicture ] = useState('');
  const [ modal, setModal ] = useState(false);

  const pickFromGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    }
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [ 1, 1 ],
      quality: 0.5,
    })
    if(!data.cancelled){
      cloudUpload({
        uri: data.uri,
        type: `test/${data.uri.split('.')[1]}`,
        name: `test.${data.uri.split('.')[1]}`,
      });
    };
  };

  const pickFromCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    }
    const data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [ 1, 1 ],
      quality: 0.5,
    })
    if(!data.cancelled){
      cloudUpload({
        uri: data.uri,
        type: `test/${data.uri.split('.')[1]}`,
        name: `test.${data.uri.split('.')[1]}`,
      });
    };
  };

  const cloudUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'employee-app-r-native');
    data.append('cloud_name', 'ariel-react-native');

    fetch('https://api.cloudinary.com/v1_1/ariel-react-native/image/upload', {
      method: 'POST',
      body: data,
    }).then(res=>res.json())
      .then(data=>{
        setPicture(data.url);
        setModal(false);
      })
  };
  
  return (
    <View style={styles.root}>
      <TextInput
        label="Name"
        mode='outlined'
        onChangeText={text => setName(text)}
        style={styles.input}
        theme={theme}
        value={name}
      />
      <TextInput
        label="Email"
        mode='outlined'
        onChangeText={text => setEmail(text)}
        style={styles.input}
        theme={theme}
        value={email}
      />
      <TextInput
        keyboardType='number-pad'
        label="Phone"
        mode='outlined'
        onChangeText={text => setPhone(text)}
        style={styles.input}
        theme={theme}
        value={phone}
      />
      <TextInput
        keyboardType='number-pad'
        label="Salary"
        mode='outlined'
        onChangeText={text => setSalary(text)}
        style={styles.input}
        theme={theme}
        value={salary}
      />
      <Button
        icon={ picture ? 'check' : 'upload'}
        mode="contained"
        onPress={() => setModal(true)}
        style={styles.button}
        theme={theme}
      >
        Upload image
      </Button>
      <Button
        icon="content-save"
        mode="contained"
        onPress={() => console.log("Save---")}
        style={styles.button}
        theme={theme}
      >
        Save
      </Button>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalButtons}>
            <Button
              icon='camera'
              mode="contained"
              onPress={() => pickFromCamera()}
              theme={theme}
            >
              Camera
            </Button>
            <Button
              icon='image-area'
              mode="contained"
              onPress={() => pickFromGallery()}
              theme={theme}
            >
              Gallery
            </Button>
          </View>
          <Button
            onPress={() => setModal(false)}
            theme={theme}
            style={styles.button}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </View>
  )
};

const theme = {
  colors: {
    primary: '#006aff'
  }
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  input: {
    margin: 5,
  },
  button: {
    margin: 5,
    height: 40,
    alignItems: 'center',
  },
  modal: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default CreateEmployee;