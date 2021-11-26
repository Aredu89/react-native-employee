import React, { useState } from 'react';
import { StyleSheet, View, Alert, Modal, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { TextInput, Button } from 'react-native-paper';
import { uri } from './Consts';

const CreateEmployee = ({
  navigation,
  route
}) => {

  const getDetails = (attribute) => {
    if(route.params) {
      return route.params[attribute]
    };
    return ''
  };

  const [ name, setName ] = useState(getDetails('name'));
  const [ phone, setPhone ] = useState(getDetails('phone'));
  const [ email, setEmail ] = useState(getDetails('email'));
  const [ salary, setSalary ] = useState(getDetails('salary'));
  const [ picture, setPicture ] = useState(getDetails('picture'));
  const [ position, setPosition ] = useState(getDetails('position'));
  const [ modal, setModal ] = useState(false);
  const [ enableShift, setEnableShift ] = useState(false);

  const saveData = () => {
    fetch(`${uri}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        picture,
        salary,
        position,
      }),
    })
    .then(res=>res.json())
    .then(data=>{
      Alert.alert(`Employee ${data.name} created`);
      navigation.navigate('Home');
    })
    .catch(error=>{
      Alert.alert('Error creating employee')
    })
  };

  const updateData = () => {
    fetch(`${uri}/employees`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: route.params._id,
        name,
        email,
        phone,
        picture,
        salary,
        position,
      }),
    })
    .then(res=>res.json())
    .then(data=>{
      Alert.alert(`Employee ${data.name} updated`);
      navigation.navigate('Home');
    })
    .catch(error=>{
      Alert.alert('Error updating employee')
    })
  }

  const submitData = () => {
    if(route.params?._id) {
      updateData();
    } else {
      saveData();
    };
  };

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
    })
    .then(res=>res.json())
    .then(data=>{
      setPicture(data.url);
      setModal(false);
    })
    .catch(error=>{
      Alert.alert('Error uploading image')
    })
  };
  
  return (
    <KeyboardAvoidingView
      behavior='position'
      style={styles.root}
      enabled={enableShift}
    >
      <View>
        <TextInput
          label="Name"
          mode='outlined'
          onChangeText={text => setName(text)}
          onFocus={()=>setEnableShift(false)}
          style={styles.input}
          theme={theme}
          value={name}
        />
        <TextInput
          label="Email"
          mode='outlined'
          onChangeText={text => setEmail(text)}
          onFocus={()=>setEnableShift(false)}
          style={styles.input}
          theme={theme}
          value={email}
        />
        <TextInput
          keyboardType='number-pad'
          label="Phone"
          mode='outlined'
          onChangeText={text => setPhone(text)}
          onFocus={()=>setEnableShift(false)}
          style={styles.input}
          theme={theme}
          value={phone}
        />
        <TextInput
          keyboardType='number-pad'
          label="Salary"
          mode='outlined'
          onChangeText={text => setSalary(text)}
          onFocus={()=>setEnableShift(true)}
          style={styles.input}
          theme={theme}
          value={salary}
        />
        <TextInput
          label="Position"
          mode='outlined'
          onChangeText={text => setPosition(text)}
          onFocus={()=>setEnableShift(true)}
          style={styles.input}
          theme={theme}
          value={position}
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
          onPress={() => submitData()}
          style={styles.button}
          theme={theme}
        >
          { route.params?._id ? 'Update' : 'Save' }
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
    </KeyboardAvoidingView>
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