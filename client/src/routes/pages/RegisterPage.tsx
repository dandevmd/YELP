import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/typedHooks";
import { registerUser } from "../../store/reducers/user/userReducer";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { user, isSuccess } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isSuccess) {
      alert("User registered.");
      navigate('/login')
    }
  }, [user]);

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    dispatch(registerUser(formData));
  };

  return (
    <div className="container ">
      <Link to="/" className="d-flex justify-content-end h5 mt-2">
          Go to home page...
        </Link>
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="form-control my-3"
            required
          />
        </>
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
      <div className="d-flex justify-content-around mt-3">
        <h5>Have an account already?</h5>{" "}
        <Link to="/login" className="d-flex justify-content-center h5">
          Login
        </Link>
      </div>
        
    </div>
  );
};

export default RegisterPage;
