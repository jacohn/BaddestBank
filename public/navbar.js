function NavBar({ auth }) {
  const ctx = React.useContext(UserContext);
  const authContext = React.useContext(AuthContext); // Now using AuthContext


  function logout(event) {
    event.preventDefault();
    authContext.logout(); // Use logout function from AuthContext
    // Redirect to home or any other page
    window.location.href = "#/";
  }

  /*
  React.useEffect(() => {
    // Function to fetch balance from the server
    async function fetchBalance(email) {
      try {
        const response = await fetch(`/account/balance/${email}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Check what is received from the server
        
        // Since the data is an array, let's log the first item to see its structure
        if (Array.isArray(data) && data.length > 0) {
          console.log("First item in fetched data array:", data[0]);
          // If the balance is a property of the objects in the array
          if (data[0].balance !== undefined) {
            ctx.setBalance(data[0].balance);
          } else {
            console.error("Balance property is not found in the first item of the array:", data[0]);
          }
        } else {
          console.error("Fetched data is not an array or is empty:", data);
        }
      } catch (error) {
        console.error("Fetch balance failed:", error);
      }
    }
 

    // If the user is authenticated, fetch their balance
    if (authContext.isUserLoggedIn) {
      fetchBalance(authContext.email);
    } else {
      console.log("User is not authenticated or email is not set.");
    }
  }, [authContext.isUserLoggedIn, authContext.email]);
   */

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
          {authContext.isUserLoggedIn ? 
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={logout}>Logout</a>
            </li> :
            <li className="nav-item">
              <a className="nav-link" href="#/login/">Login</a>
            </li>
          }
          {authContext.isUserLoggedIn && (
        <span className="navbar-text ml-auto">
          Balance: ${ctx.balance}
        </span>
      )}
        </ul>
      </div>
    </nav>
  );
}
