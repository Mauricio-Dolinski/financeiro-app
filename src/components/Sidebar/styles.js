import styled from 'styled-components';

export const Container = styled.div`
  background-color: #8a8a8a;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 400px;
  animation: testAnimation .4s;

  > img {
	  width: 400px;
	  padding: 20px;
  }
  

  @keyframes testAnimation {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 400px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  color: white;
  padding: 0px;
  cursor: pointer;
  border-radius: 50px;
  margin: 0 30px;
  height: 40px;

  > svg {
	position: flex;
    margin: 0 20px;
  }

  &:hover {
    background-color: white;
    color: blue;
  }
`;
