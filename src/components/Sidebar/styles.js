import styled from 'styled-components';

export const Container = styled.div`
  background-color: #8a8a8a;
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 400px;
  left: ${props => props.sidebar ? '0' : '-100%'};
  animation: showSidebar .4s;

  > svg {
	position: fixed;
	left: 410px;
    color: gray;
    top: 10px;
    width: 30px;
    height: 30px;
    
    margin-top: 0px;
    margin-left: 0px;
    cursor: pointer;
  }
  
  > img {
	  width: 400px;
	  padding: 10px;
  }
  

  @keyframes showSidebar {
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
