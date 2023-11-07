function Balance() {
  const [data, setData] = React.useState("");
  const [status, setStatus] = React.useState(true);
  const authContext = React.useContext(AuthContext);
  const ctx = React.useContext(UserContext); 

  // Assuming authContext provides user email and name
  const userEmail = authContext.userEmail;
  const userName = ctx.name;

  React.useEffect(() => {
    fetchAccount();
  }, [userEmail]);  // Update this line if `authContext` has a specific dependency that indicates user changes

  function fetchAccount() {
    // Log the state of user authentication and email
    console.log("User logged in status:", authContext.isUserLoggedIn);
    console.log("User email:", userEmail);
  
    if (authContext.isUserLoggedIn) {
      if (!userEmail) {
        console.error("User is not logged in or email is not provided");
        setData("User is not logged in or email is not provided");
        return;
      }
  
      const fetchUrl = `/account/balance/${userEmail}`;
      console.log("Fetch URL:", fetchUrl);
  
      fetch(fetchUrl)
        .then(response => {
          console.log("Fetch response:", response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Balance data received:", data);
          if (data.hasOwnProperty("balance")) {
            setData("$" + data.balance);
            ctx.setBalance(parseFloat(data.balance))
          } else {
            throw new Error("Unexpected data structure from server");
          }
        })
        .catch(error => {
          console.error("Error fetching balance:", error);
          setData(`Error fetching balance: ${error.message}`);
        });
    } else {
      console.log("User is not logged in, prompting to log in to see balance.");
      setStatus("Login to see account balance");
      setTimeout(() => setStatus(""), 3000);
    }
  }
  
  

 // Use a navigation function or hook for navigation if using react-router-dom
 const navigateToDeposit = () => {
  window.location.hash = '#/deposit/';
};

const navigateToWithdraw = () => {
  window.location.hash = '#/withdraw/';
};

  return (
    <Card
      bgcolor="info"
      header={authContext.isUserLoggedIn ? `${userName}'s Balance` : "Balance"}
      text={authContext.isUserLoggedIn ? data : "Please log in to view your balance."}
      body={
        authContext.isUserLoggedIn && (
          <div>
            <button
              type="button"
              className="btn btn-success me-2"
              onClick={navigateToDeposit}
            >
              Deposit
            </button>

            <button
              type="button"
              className="btn btn-warning"
              onClick={navigateToWithdraw}
            >
              Withdraw
            </button>
          </div>
        )
      }
    />
  );
}
