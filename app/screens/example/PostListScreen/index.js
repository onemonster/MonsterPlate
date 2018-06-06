import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { actions, reducer, sagas } from './redux';
import injectRedux from '../../../services/injectRedux';

import Post from './Post';
import {
  Wrapper,
  PostWrapper,
} from './index.styles';

class PostListScreen extends React.PureComponent {
  componentDidMount() {
    this.props.getPosts();
  }

  handlePress(id) {
    this.props.navigation.navigate('PostDetailScreen', { postId: id });
  }

  render() {
    return (
      <Wrapper>
        {this.props.posts.map((post) => (
          <PostWrapper key={post.id}>
            <TouchableOpacity onPress={() => this.handlePress(post.id)}>
              <Post post={post} />
            </TouchableOpacity>
          </PostWrapper>
        ))}
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.PostListScreen.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(actions.getPostsRequest()),
});

const withRedux = injectRedux('PostListScreen', reducer, sagas);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRedux,
  withConnect
)(PostListScreen);
