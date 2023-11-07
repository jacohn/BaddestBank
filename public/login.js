function Login() {
    const ctx = React.useContext(UserContext);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(""); 
    const authContext = React.useContext(AuthContext);
    const [status, setStatus] = React.useState(null);

    function login() {
        handleLogin(ctx.email, ctx.password);
    }

    function handleLogin(email, password) {
        if (email !== '' && password !== '') {
            const url = `/account/login/${email}/${password}`;
            console.log("Attempting to login with email:", email, "and password:", password);
    
            (async () => {
                try {
                    var res = await fetch(url);
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
    
                    var data = await res.json();
                    console.log("Login response data:", data);
    
                    if (data && data.email) { // Make sure data contains the email field
                        authContext.login(email); // Use login function from AuthContext
                        ctx.setBalance(data.balance);
                        ctx.setName(data.name);
                        ctx.setEmail(data.email);
                        console.log("hi "+ data);
    
                        setStatus('Login successful');
                        
                    } else {
                        setStatus('Login failed: incorrect email or password');
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                    setStatus('Login failed: ' + error.message);
                }
            })();
        } else {
            setStatus('Please enter an email and password');
        }
    }


    function logout() {
        authContext.logout(); // Use logout function from AuthContext
        setStatus('You have been logged out');
        // Redirect to home or any other page
    }

    function testAuth(success) {
        if (success) {
          console.log('Logged in!');
          // Redirect to balance page after successful login
          window.location.href = "#/balance/";
        } else {
          setStatus('Login failed: please enter a valid username and password');
          setTimeout(() => setStatus(null),3000);          
        }
    }
    

    return (
        <div className="container">
          <div className="card">
            <div className="card-header text-center">
              Log in to account
            </div>
            <div className="card-body">
              {status && <div className="alert alert-danger" role="alert">{status}</div>}
              
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">Email address</label>
                <input type="email" className="form-control" id="emailInput" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input type="password" className="form-control" id="passwordInput" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="d-grid gap-2">
                {authContext.isUserLoggedIn ? 
                  <button type="button" className="btn btn-primary" onClick={logout}>Logout</button> :
                  <button type="button" className="btn btn-primary" onClick={() => handleLogin(email, password)}>Login</button>
                }
              </div>
            </div>
          </div>
        </div>
      );
            }