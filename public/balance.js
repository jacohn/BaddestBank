function Balance() {
    const ctx = React.useContext(UserContext); 
    const [data, setData] = React.useState('');
    const [status, setStatus]     = React.useState(true);

    React.useEffect(() => {
        fetchAccount(); // Automatically fetch balance when the component mounts
    }, [ctx.user]);

    function fetchAccount() {
        console.log("Fetching balance for email:", ctx.email); 
        if (ctx.auth) { 
            fetch(`/account/balance/${ctx.email}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty("balance")) {
                    ctx.setName(data[0].name);
                    ctx.setBalance(data[0].balance);
                    setData('$' + data[0].balance);
                } else if (Array.isArray(data) && data.length === 0) {
                    console.error("No account found for the given email:", ctx.email);
                    setData("No account found");
                } else {
                    console.error("Unexpected data structure:", data);
                    setData("Error fetching balance");
                }
            })
            .catch(error => {
                console.error("Error fetching balance:", error);
                setData("Error fetching balance");
            });
        } else {
            setStatus('Login to see account balance');
            setTimeout(() => setStatus(''),3000);
        }
    }
    
  
    return (
        <Card
            bgcolor="info"
            header={ctx.auth ? `${ctx.name}'s Balance` : "Balance"}
            text={ctx.auth ? data : "Please log in to view your balance."}
            body={
                <>
                {ctx.auth && 
                    <>
                        <button type="submit" className="btn btn-light" onClick={fetchAccount}>See Balance</button>
                    </>
                }
                </>
            }
        />
    )
}