function Login() {
    const ctx = React.useContext(UserContext); 
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
    
                    if (Array.isArray(data) && data.length !== 0) {
                        ctx.setAuth(true);           // Use setAuth to update the auth state
                        ctx.setEmail(email);         // Set the user's email in the context
                        ctx.setName(data[0].name);   // Set the user's name from server response
                        
                        // Store user's login state in localStorage
                        localStorage.setItem('loggedIn', 'true');
                        localStorage.setItem('userEmail', email);
                        testAuth(true);
                    } else {
                        console.error("Unexpected data structure from login:", data);
                        setStatus('Login failed: unexpected data from server');
                        setTimeout(() => setStatus(null), 3000);
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                    setStatus('Login failed: ' + error.message);
                    setTimeout(() => setStatus(null), 3000);
                }
            })();
        } else {
            setStatus('Please enter an email and password');
            setTimeout(() => setStatus(null), 3000);
        }
    }
    

    function logout() {
        ctx.setAuth(false); // Use setAuth to update the auth state
        ctx.setEmail(''); // Use setEmail to clear the email
        ctx.setPassword(''); // Use setPassword to clear the password
        // Clear user's login state from localStorage
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userEmail');
        // Redirect to home or any other page
        window.location.href = "#/";
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
            <h4 className="text-center">Log in to account</h4>
            <br/>
            {status}
            <CardForm showName="none" showAmount="none"/>
            {ctx.auth ? 
                <button type="button" className="btn btn-warning" onClick={logout}>Logout</button> :
                <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
            }
        </div>
    );
}
