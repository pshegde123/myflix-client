import { createRoot } from 'react-dom/client';
import MainView from './components/main-view/main-view';
import  Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Container className="min-vh-100" style={{
      marginTop:"40px",      
      backgroundImage:'linear-gradient(to right, #ccd0ff 20%, #ffcac9 100%)'
    }}>
      <MainView/>     
    </Container>    
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);