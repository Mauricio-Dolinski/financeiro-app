import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #8a8a8a; 
  font-size: 14px;
  color: white;
  padding: 5px;
  cursor: pointer;
  border-radius: 50px;
  margin: 0 30px 5px;

  > svg {
    margin: 0 20px;
  }

  &:hover {
    background-color: white;
    color: blue;
  }
`;