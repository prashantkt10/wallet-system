import { Container, Navbar, Button } from 'react-bootstrap';
import './App.css';
import Home from './components/Home';
import SetupWallet from './components/SetupWallet';

function App() {

  const logout = () => {
    localStorage.clear();
    window.location = window.location.href;
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container className='flex flex-justify-between'>
          <Navbar.Brand>Wallet - HighLevelLLC</Navbar.Brand>
          <Navbar.Brand >
            {
              localStorage.getItem('wallet_id') && <Button variant='warning' onClick={logout}>Logout</Button>
            }
          </Navbar.Brand>
        </Container>
      </Navbar>
      {
        localStorage.getItem('wallet_id') ? <Home /> : <SetupWallet />
      }
    </div>
  );
}

export default App;
