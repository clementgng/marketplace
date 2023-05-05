import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsCart } from 'react-icons/bs';
import { resetUser } from '../store/features/userSlice';
import { isBuyer } from '../utils/role';
import { resetOrder } from '../store/features/orderSlice';

const Header = () => {
  const {
    name,
    role,
    loaded: userLoaded,
  } = useSelector((store) => store.userState);
  const { items, loaded: cartLoaded } = useSelector((store) => store.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    dispatch(resetUser());
    dispatch(resetOrder());
    navigate('/');
  };

  const handleClickAuth = () => {
    navigate('/auth');
  };

  const handleClickCart = () => {
    dispatch(resetOrder());
    navigate('/cart');
  };

  const handleClickOrders = () => {
    dispatch(resetOrder());
    navigate('/orders');
  };

  const renderLinks = () => {
    if (!userLoaded) {
      return null;
    }

    if (name) {
      return (
        <div className="d-flex align-items-center">
          <NavDropdown title={name} align="end">
            <NavDropdown.Item onClick={handleClickOrders}>
              My Orders
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleClickLogout}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
          {isBuyer(role) && cartLoaded && (
            <span role="button" onClick={handleClickCart}>
              <BsCart className="ms-1" size={24} />
              <Badge pill bg="primary">
                {(items || []).reduce(
                  (accumulated, current) => accumulated + current.quantity,
                  0
                )}
              </Badge>
            </span>
          )}
        </div>
      );
    } else {
      return <Nav.Link onClick={handleClickAuth}>Register/Login</Nav.Link>;
    }
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Shopping Marketplace</Navbar.Brand>
        <Nav>{renderLinks()}</Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
