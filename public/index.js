function Spa() {
    const [auth, setAuth] = React.useState(localStorage.getItem('loggedIn') === 'true');
    const [email, setEmail] = React.useState(localStorage.getItem('userEmail') || '');
    const [password, setPassword] = React.useState(''); 
    const [name, setName] = React.useState('');
    const [balance, setBalance] = React.useState('0');
    const [update, setUpdate] = React.useState('0');
    
    return (
        <HashRouter>
        <div>
            

            {/*add shared context*/}
            <UserContext.Provider value={{
                email: email,
                auth: auth,
                setAuth: setAuth,
                setEmail: setEmail,
                password: password,
                setPassword: setPassword,
                name: name,
                setName: setName,
                balance: balance,
                setBalance: setBalance,
                update:update,
                setUpdate:setUpdate
            }}>
            
            {/*get our navbar from navbar.js*/}
            <NavBar auth={auth} balance={balance} /> 

            <div className="container" style={{padding: "20px"}}>
                <Route path="/" exact component={Home} />
                <Route path="/createAccount/" component={CreateAccount} />
                <Route path="/login/" component={Login} />
                <Route path="/deposit/" component={Deposit} />
                <Route path="/withdraw/" component={Withdraw} />
                {/* <Route path="/transactions/" component={Transactions} /> */}
                <Route path="/balance/" component={Balance} />
                <Route path="/alldata/" component={AllData} />
            </div>
            </UserContext.Provider>
        </div>
        </HashRouter>
    ); 
}
  
// render our single page application (SPA) at HTML "root"
ReactDOM.render(
    <Spa/>,
    document.getElementById('root')
);
