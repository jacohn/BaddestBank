function NavBar({ auth }) {
  const ctx = React.useContext(UserContext);

  function logout() {
    event.preventDefault();
    ctx.setAuth(false);
    ctx.setEmail('');
    ctx.setPassword('');
    // Clear user's login state from localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    // Redirect to home or any other page
    window.location.href = "#/";
  }

  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">{auth ? ctx.name : "BadBank"}</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>
          <li className="nav-item ml-auto">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          {auth ? 
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={logout}>Logout</a>
            </li> :
            <li className="nav-item">
              <a className="nav-link" href="#/login/">Login</a>
            </li>
          }
        </ul>
      </div>
    </nav>
  );
}
