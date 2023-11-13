import styled from 'styled-components';



export const Container = styled.div`
  background-color: #8a8a8a;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: auto !important;
  height: 100%;
  width: 400px;
  animation: testAnimation .4s;
  box-shadow: 0px 0px 0px 0px;

  .icon {
	  margin: 10px;
	  width: 30px;
	  height: 30px;
  }

  > img {
    width: 400px;
    padding: 20px;
    animation: testAnimation .4s;
  }

  .typography {
      font-size: 25px;
    }

  @media screen and (max-height: 768px) {
    width: 320px;
    animation: testAnimation2 .4s;
    .icon {
      margin: 5px;
      width: 25px;
      height: 25px;
    }
    > img {
      width: 320px;
      animation: testAnimation2 .4s;
    }
    .itemButton {
      width: 300px;
      height: 30px;
    }
    .typography {
      font-size: 21px;
    }
  }

  @media screen and (max-height: 600px) {
    width: 240px;
    animation: testAnimation3 .4s;
    > img {
      width: 240px;
      display: flex;
      align-self: center;
      animation: testAnimation3 .4s;
    }
    .itemButton {
      width: 220px;
      height: 25px;
    }
    .typography {
      font-size: 16px;
    }
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

  @keyframes testAnimation2 {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 320px;
    }
  }

  @keyframes testAnimation3 {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 240px;
    }
  }
`;
