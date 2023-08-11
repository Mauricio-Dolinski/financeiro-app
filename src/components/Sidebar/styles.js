import styled from 'styled-components';

export const Container = styled.div`
  background-color: #8a8a8a;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 400px;
  animation: testAnimation .4s;
  box-shadow: 0px 0px 0px 0px;

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
  padding: 0px;
  border: 0px;
  cursor: pointer;
  border-radius: 50px;
  margin: 0 40px;
  height: 40px;


  &:hover {
    background-color: #ddddff;
  }

  
`;
