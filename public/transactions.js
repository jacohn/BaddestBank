function Transactions() {
    const ctx = React.useContext(UserContext);
    const [transactions, setTransactions] = React.useState([]);
    const authContext = React.useContext(AuthContext);

    React.useEffect(() => {
        if (isUserLoggedIn) {
            fetch(`/account/transactions/${userEmail}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched Transactions:', data);  // <-- Added this log
                    setTransactions(data);
                });
        }
    }, [isUserLoggedIn, userEmail]);

    return (
        <div>
            <div className="card">
                <div className="card-header">Transactions</div>
                <div className="card-body">
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Balance After</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.type}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.balanceAfter}</td>
                                    <td>{new Date(transaction.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
