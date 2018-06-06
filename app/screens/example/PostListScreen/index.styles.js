import styled from 'styled-components';

export const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const PostWrapper = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px;
`;
