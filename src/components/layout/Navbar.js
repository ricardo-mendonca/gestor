import { Link, useNavigate } from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'
import { CgLogOff } from 'react-icons/cg'

function Navbar() {

  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const token = localStorage.getItem('token');
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  async function logout() {
    try {
      localStorage.clear();
      localStorage.setItem('token', '');
      authorization.headers = '';
      navigate('/');
    } catch (error) {
      alert('não foi possível fazer o logout ' + error)
    }
  }



  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/"> </Link>
        
        <ul className={styles.list}>
        <li className={styles.item}>
        <Link to="/home">bem vindo, <strong>{email}</strong>!</Link>
          </li>
        
          <li className={styles.item}>
            <Link to="/home">Home</Link>
          </li>

          <li className={styles.item}>
            <Link to="/despesa">Despesas</Link>
          </li>
         
          <li className={styles.item}>
            <Link to="/categoria">Categoria</Link>
          </li>
          
          <li className={styles.item}>
          <button onClick={logout} >
            <CgLogOff size={15} color="black" />
          </button>
          </li>
        </ul>
        
      </Container>
    </nav>
    
  )
};

export default Navbar;
