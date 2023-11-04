function Deposit() {
    const ctx = React.useContext(UserContext); 
    const [status, setStatus] = React.useState('');

    function handleDeposit() {
        if(!ctx.auth){
            setStatus("Please log in to make a deposit.");
            return;
        }
        
        const depositAmount = ctx.update; // Use update from context as deposit amount
        const url = `/account/deposit/${ctx.email}/${ctx.update}`;
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            ctx.setBalance(prevBalance => parseFloat(prevBalance) + parseFloat(ctx.update)); 
            setStatus(`$${ctx.update} deposit successful!`);
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
