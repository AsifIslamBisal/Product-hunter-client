import { useContext, useEffect,  useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { authContext } from '../../Provider/AuthProvider';
import GoogleLogin from '../../SocialLogin/GoogleLogin';
import loginAnimi from '../../assets/lotti/login.json'
import Lottie from 'lottie-react';

const Login = () => {

    
    const [disabled, setDisabled] = useState(true);

    const {signIn} = useContext(authContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect( () =>{
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
        signIn(email, password)
        .then(result =>{
          const user = result.user;
          console.log(user);
          Swal.fire({
  title: "User Login Successful.",
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  hideClass: {
    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
  }
});
navigate(from, {replace: true});
        })
    }

    const handleValidateCaptcha = (e) =>{
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else{
            setDisabled(true)
        }
    }

    return (
        <>
            <Helmet>
                <title>Product hunt | Sign In</title>
            </Helmet>
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center md:w-1/2 lg:text-left">
      <Lottie animationData={loginAnimi}></Lottie>
    </div>
    <div className="card bg-base-100 md:w-1/2 max-w-sm  shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <LoadCanvasTemplate />
          </label>
          <input onBlur={handleValidateCaptcha} type="text"  name='captcha' placeholder="type the captcha above" className="input input-bordered" required />
          
        </div>
        <div className="form-control mt-6">
          <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
        </div>
      </form>
      <p className='px-6'><small>New Hear? <Link to="/signup" className='text-blue-600'>Create an account</Link></small></p>
        <GoogleLogin></GoogleLogin>
    </div>
  </div>

</div>-
        </>
    );
};

export default Login;