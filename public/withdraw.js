function Withdraw() {
    const ctx = React.useContext(UserContext); 
    const [status, setStatus] = React.useState('');
    const authContext = React.useContext(AuthContext);

    function handleWithdraw() {
        if(!authContext.isUserLoggedIn){
            setStatus("Please log in to make a withdrawal.");
            return;
        }

        const depositAmount = ctx.update;

        if (!depositAmount || parseFloat(depositAmount) <= 0 || parseFloat(depositAmount) > ctx.balance) {
            console.log('Invalid deposit amount');
            setStatus("Please enter a valid amount to deposit.");
            return;
        }

        // Assuming ctx.balance is a number, converting it to string for further processing (if needed).

        

        const url = `/account/withdraw/${authContext.userEmail}/${parseFloat(ctx.update)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                ctx.setBalance(ctx.balance - parseFloat(ctx.update));
                
                setStatus(`$${ctx.update} withdrawal successful!`);
                setTimeout(() => setStatus(''), 2000);
            })
            .catch(error => {
                console.error("There was an error with the withdrawal:", error);
                setStatus("Error occurred while making withdrawal.");
            });
    }

    return (
        <Card
            username={ctx.name}
            balance={ctx.balance}
            bgcolor="success"
            header="Withdraw"
            text=""
            status={status}
            body={
                <>
                <CardForm
                    showName="none"
                    showPassword="none"
                    showEmail="none"
                />
                <button type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
                </>
            }
        />
    )
}
