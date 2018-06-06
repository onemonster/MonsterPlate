import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { View, Button, Text } from 'react-native';
import { actions, reducer, sagas } from './redux';
import injectRedux from '../../../services/injectRedux';

class PostDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
    };
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.getPost(this.state.id);
    this.setState({ id: this.state.id + 1 });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Button
          style={{width: 100, height: 100}}
          title="Get Examples"
          onPress={this.handlePress}
        />
        {this.props.post &&
        <View>
          <Text>
            {this.props.post.title}
          </Text>
          <Text>
            {this.props.post.body}
          </Text>
        </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.PostDetailScreen.post,
});

const mapDispatchToProps = (dispatch) => ({
  getPost: (id) => dispatch(actions.getPostRequest(id)),
});

const withLogger = injectRedux('PostDetailScreen', reducer, sagas);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withLogger,
  withConnect
)(PostDetailScreen);
