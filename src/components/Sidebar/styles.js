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
	  animation: testAnimation .4s;
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
