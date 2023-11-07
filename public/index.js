function Spa() {
    
    return (
        <HashRouter>
            <div>
                {/* Use UserProvider directly without import */}
                <AuthProvider>
                <UserProvider>
                    {/* Your NavBar and other components */}
                    <NavBar /> 

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
                </UserProvider>
                </AuthProvider>
            </div>
        </HashRouter>
    ); 
}

  
// render our single page application (SPA) at HTML "root"
ReactDOM.render(
    <Spa/>,
    document.getElementById('root')
);
