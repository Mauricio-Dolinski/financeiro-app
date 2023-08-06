import styled from 'styled-components';

export const Container = styled.div`
  height: 50px;
  display: flex;
  background-color: #FFFFFF; 
  box-shadow: 0 0 20px 0px;

  > svg {
    position: sticky;
    color: gray;
    width: 30px;
    height: 30px;
    margin-top: 10px;
    margin-left: 10px;
    cursor: pointer;
  }
`;