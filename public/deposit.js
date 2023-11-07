function Deposit() {
    const ctx = React.useContext(UserContext); 
    const [status, setStatus] = React.useState('');
    const authContext = React.useContext(AuthContext);

    function handleDeposit() {
        console.log('handleDeposit called');
        if(!authContext.isUserLoggedIn){
            console.log('User not logged in');
            setStatus("Please log in to make a deposit.");
            return;
        }
        
        const depositAmount = ctx.update; // Assuming this should be the amount to deposit
        console.log(`Deposit amount: ${depositAmount}`);

        if (!depositAmount || parseFloat(depositAmount) <= 0) {
            console.log('Invalid deposit amount');
            setStatus("Please enter a valid amount to deposit.");
            return;
        }



        // Assuming you want to send the new balance to the server
        const url = `/account/deposit/${authContext.userEmail}/${parseFloat(depositAmount)}`;
        console.log(`Making fetch call to URL: ${url}`);
        
        fetch(url)
        .then(response => {
            console.log('Received response from fetch');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            ctx.setBalance(ctx.balance + parseFloat(ctx.update));
            
            setStatus(`$${ctx.update} deposit successful!`);
            setTimeout(() => setStatus(''), 2000);
        })
        .catch(error => {
            console.error("There was an error with the deposit:", error);
            setStatus("Error occurred while making deposit.");
        });
    }
    
    return (
        <Card
            username={ctx.name}
            balance={ctx.balance}
            bgcolor="warning"
            header="Deposit"
            text=""
            status={status}
            body={
                <>
                <CardForm
                    showName="none"
                    showPassword="none"
                    showEmail="none"
                />
                <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
                </>
            }
        />
    )
}
