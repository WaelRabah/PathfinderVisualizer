import React from 'react';
import './App.css';
import Header from './components/Header';
import { Container , Box , colors } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
function App() {
  const StyledContainer = styled(Container)(
    {
      background : colors.grey['300']
    }
  )
  return (
      
      <Box>
        <Header />
        <StyledContainer>
         
</StyledContainer>
      </Box>
     
     
  );
}

export default App;
