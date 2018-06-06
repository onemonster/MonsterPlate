import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, reducer, sagas } from './redux';
import injectRedux from '../../../services/injectRedux';

import Post from './Post';
import {
  Wrapper
} from './index.styles';

class PostDetailScreen extends React.PureComponent {
  componentDidMount() {
    const postId = this.props.navigation.getParam('postId');
    if (postId) {
      this.props.getPost(postId);
    }
  }

  render() {
    return (
      <Wrapper>
        {this.props.post &&
          <Post post={this.props.post} />
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.PostDetailScreen.post,
});

const mapDispatchToProps = (dispatch) => ({
  getPost: (id) => dispatch(actions.getPostRequest(id)),
});

const withRedux = injectRedux('PostDetailScreen', reducer, sagas);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRedux,
  withConnect
)(PostDetailScreen);
