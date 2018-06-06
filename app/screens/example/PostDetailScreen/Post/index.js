import * as React from 'react';
import {
  PostWrapper,
  TitleWrapper,
  TitleText,
  BodyWrapper,
  BodyText,
} from './index.styles';

export default (props) => (
  <PostWrapper>
    <TitleWrapper>
      <TitleText>
        {props.post.title}
      </TitleText>
    </TitleWrapper>
    <BodyWrapper>
      <BodyText>
        {props.post.body}
      </BodyText>
    </BodyWrapper>
  </PostWrapper>
);
