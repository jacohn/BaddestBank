function AllData() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(fetchedData => {
                console.log(fetchedData);
                setData(fetchedData); // set data directly without stringifying
            });
    }, []);

    return (
        <div>
            <div className="card">
                <div className="card-header">Transactions</div>
                <div className="card-body">
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.balance}</td>
                  </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}