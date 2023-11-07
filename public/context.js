const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;

const UserContext = React.createContext({
  user: {},
  balance: 0,
  setUser: () => {},
  setBalance: () => {},
  setName: () => {},
  setEmail: () => {},
  setPassword: () => {},
  setUpdate: () => {},
});

const AuthContext = React.createContext(null);

// Define AuthProvider component
function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  // The context value that will be supplied to any descendants of this provider
  const authContextValue = {
    isUserLoggedIn,
    login: (email) => {
      setIsUserLoggedIn(true);
      setUserEmail(email);
    },
    logout: () => {
      setIsUserLoggedIn(false);
      setUserEmail('');
    },
    userEmail
  };
   // Return the provider component with the context value
   return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}



function UserProvider({ children }) {
  const [user, setUser] = React.useState({});
  const [balance, setBalance] = React.useState(0);
  // Additional states can be added as necessary
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [update, setUpdate] = React.useState('');
  const [auth, setAuth] = React.useState('false');

  const contextValue = {
    user,
    setUser,
    balance,
    setBalance,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    update,
    setUpdate,
    auth, 
    setAuth
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}


function Card(props){

    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }
  
    return (
      <div className={classes()} style={{maxWidth: "18rem"}}>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>  
      </div>      
    );    
}
  
function CardForm(props) {
  const ctx = React.useContext(UserContext);  

  return (
    <>
    <div style={{maxWidth: "18rem"}}>
    <div className="name-field" style={{display: props.showName}}>
      Name<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter name" 
        onChange={e => ctx.setName(e.currentTarget.value)} /><br/>
    </div>

    <div className="email-field" style={{display: props.showEmail}}>
      Email address<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        onChange={e => ctx.setEmail(e.currentTarget.value)}/><br/>
    </div>

    <div className="password-field" style={{display: props.showPassword}}>
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        onChange={e => ctx.setPassword(e.currentTarget.value)}/><br/>
    </div>

    <div className="amount-field" style={{display: props.showAmount}}>
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        onChange={e => ctx.setUpdate(e.currentTarget.value)}/><br/>
    </div>
    </div>
    </>
  )
}



