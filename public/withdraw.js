function Withdraw() {
    const ctx = React.useContext(UserContext); 
    const [status, setStatus] = React.useState('');

    function handleWithdraw() {
        if(!ctx.auth){
            setStatus("Please log in to make a withdrawal.");
            return;
        }

        // Assuming ctx.balance is a number, converting it to string for further processing (if needed).

        setStatus(`$${ctx.update} withdrawal successful!`);
        setTimeout(() => setStatus(''), 2000);

        const url = `/account/withdraw/${ctx.email}/${ctx.update}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                ctx.setBalance(prevBalance => parseFloat(prevBalance) + parseFloat(ctx.update));
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
