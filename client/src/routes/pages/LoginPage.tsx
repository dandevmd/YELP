import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/typedHooks";
import { loginUser } from "../../store/reducers/user/userReducer";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isSuccess } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/");
    }
  }, [user, isSuccess]);

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    dispatch(loginUser(formData));
  };

  return (
    <div className="container ">
      <Link to="/" className="d-flex justify-content-end h5 mt-2">
        Go to home page...
      </Link>
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="form-control my-3"
            required
          />
        </>
        <>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="form-control my-3"
            required
          />
        </>
        <button type="submit" className="btn btn-success btn-block">
          Submit
        </button>
      </form>
      <Link to="/register" className="d-flex justify-content-center h5 mt-3">
        register
      </Link>
    </div>
  );
};

export default LoginPage;
