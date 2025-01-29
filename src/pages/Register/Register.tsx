import './Register.scss';

export default function Login() {
  return (
    <>
      <div className="global-page-container">
        <div className="register-container">
          <div className="register-title">Register</div>
          <div className="register-content">
            <div>
              <div>Username</div>
              <input type="text" />
            </div>
            <div>
              <div>Email</div>
              <input type="text" />
            </div>
            <div>
              <div>Password</div>
              <input type="password" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
