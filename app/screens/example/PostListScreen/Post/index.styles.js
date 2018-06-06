import styled from 'styled-components';

export const PostWrapper = styled.View`
`;

export const TitleWrapper = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
`;

export const TitleText = styled.Text`
  font-size: ${(props) => props.theme.fonts.size.title};
`;

export const BodyWrapper = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const BodyText = styled.Text`
  font-size: ${(props) => props.theme.fonts.size.body};
`;
