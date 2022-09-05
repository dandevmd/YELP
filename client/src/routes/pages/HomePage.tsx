import Header from "../../components/Header";
import AddRestaurant from "../../components/AddRestaurant";
import RestaurantList from "../../components/RestaurantList";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/typedHooks";
import { logoutUser } from "../../store/reducers/user/userReducer";

const HomePage = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  return (
    <div className="container-xl mb-3">
      {user ? (
        <h4
          className="d-flex justify-content-end mt-2 "
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "blue",
          }}
          onClick={() => dispatch(logoutUser())}
        >
          Logout
        </h4>
      ) : (
        <div className="d-flex justify-content-end mt-2 ">
          <h4
            className="ml-2"
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "blue",
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </h4><h4
            className="ml-2"
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "blue",
            }}
            onClick={() => navigate('/register')}
          >
            Register
          </h4>
        </div>
      )}
      <Header />
      {user ? (
        <AddRestaurant />
      ) : (
        <h3 className="d-flex justify-content-center">
          {" "}
          Login to add a new Restaurant
        </h3>
      )}
      <RestaurantList />
    </div>
  );
};

export default HomePage;
