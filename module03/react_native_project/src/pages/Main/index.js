import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
// using Material Icons, but you can choose another

import { Container,
          SubmitButton,
          Input,
          Form,
          List,
          User,
          Avatar,
          Name,
          Bio,
          ProfileButton,
          ProfileButtonText } from './styles';


export default class Main extends Component {

  state = {
    newUser: '', // it will store what the user is typing in field
    users: [],
    loading: false
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };
    this.setState({
      users: [...users, data],
      newUser: '',
    });

    // hidening keyboard
    Keyboard.dismiss();

    // Hidden loading
    this.setState({ loading: false });
  }

  render() {
    const { users, newUser, loading } = this.state;

    return (
    <Container>
      <Form>
        {/* autoCorrect={false} -> Setting to not fix words automatically */}
        {/* autoCapitalize  ="none" -> Setting to not capitalize automatically */}
        {/* onChangeText -> It is like onChange from ReactJS */}
        {/* onPress -> It is like onClick from ReactJS */}
        {/* returnKeyType="send" -> <enter> key with special highlight */}
        {/* onSubmitEditing={this.handleAddUser} -> when press <enter> on keyboard will send */}
        <Input
          autocCorrect={false}
          autoCapitalize="none"
          placeholder="Add user"
          onChangeText={text => this.setState({ newUser: text })}
          returnKeyType="send"
          onSubmitEditing={this.handleAddUser}
          value={newUser}
        />
        <SubmitButton loading={loading} onPress={this.handleAddUser}>
          { loading ? (<ActivityIndicator color="#FFF" />)
          :
          (<Icon name="add" size={20} color="#FFF" />) }

        </SubmitButton>
      </Form>

      {/*
        Usage of FlatList component:
         - data={array}: Array of content
         - keyExtractor: similar to key from ReactJS, we need set the unique ID from each item from Array.
         - renderItem: it wll render our list and we are desustructuring and get 'item', that is the element of Array
      */}
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={( {item} ) => (
          <User>
            {/* source -> like src from <img>, and we need to pass an object */}
            <Avatar source={ { uri: item.avatar } } />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={()=>{}}>
              <ProfileButtonText>View profile</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
         />
    </Container>
  );
  }

}

// Using createStackNavigator we can set the header of the current page
Main.navigationOptions = {
  title: 'Users',
}
