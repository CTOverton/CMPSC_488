import React from "react";
import {loginUser} from "../../redux/actions/authActions";
import {connect, useSelector} from "react-redux";
import {Container} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {isEmpty, isLoaded} from "react-redux-firebase";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    form: {
        maxWidth: 400,
        margin: 'auto',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
    inputs: {
        margin: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        width: '100%',
        maxWidth: 300
    }
}));

const Authorized = ({children}) => {
    const auth = useSelector(state => state.firebase.auth);
    if (!isLoaded(auth)) return null;
    if (!isEmpty(auth)) return <Redirect to='/' />;
    return children
};

const Login = ({auth, login, history}) => {
    const classes = useStyles();
    const [inputs, setInputs] = React.useState({
        email: null, // TODO: Use '' instead of null
        password: null
    });

    const handleChange = prop => event => {
        const value = event.target.value;
        setInputs({ ...inputs, [prop]: value === "" ? null : value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            email: inputs.email,
            password: inputs.password
        })
    };

    return(
        <Authorized>
            <Container maxWidth="md">
                <h1>Login</h1>
                <form className={classes.form} noValidate autoComplete="on" onSubmit={handleSubmit}>
                    <div className={classes.inputs}>
                        <TextField
                            id="email-input"
                            label="Email"
                            type="email"
                            autoComplete="email"
                            variant="filled"
                            onChange={handleChange('email')}
                            required
                        />
                        <TextField
                            id="password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="filled"
                            onChange={handleChange('password')}
                            required
                        />
                    </div>

                    <Button className={classes.button} variant="contained" disableElevation color="primary" type="submit">Login</Button>
                    <Button className={classes.button} variant="contained" disableElevation onClick={() => {return history.push('/signup')}}>Sign Up</Button>
                </form>
                <Typography variant="subtitle1">{auth.authError}</Typography>
            </Container>
        </Authorized>
    )
};

const mapState = state => {return {auth: state.auth}};
const mapDispatch = {login: loginUser};

export default connect(mapState, mapDispatch)(Login)