import React from "react";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {createUser} from "../../redux/actions/authActions";
import {connect, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Alert from "@material-ui/lab/Alert"
import Typography from "@material-ui/core/Typography";
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

const SignUp = ({auth, createUser, history}) => {
    const classes = useStyles();
    const [inputs, setInputs] = React.useState({
        email: null,
        password: null,
        passwordConfirm: null,
        username: null
    });

    const handleChange = prop => e => {
        const value = e.target.value;
        setInputs({ ...inputs, [prop]: value === "" ? null : value })
    };

    const [passwordMismatch, setPasswordMismatch] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = {
            email: inputs.email,
            password: inputs.password
        };

        const profile = {
            email: inputs.email,
            username: inputs.username
        };

        if(inputs.password===inputs.passwordConfirm){
            setPasswordMismatch(false);
            createUser(credentials, profile)
        }else{
            setPasswordMismatch(true);
        }

    };

    return(
        <Authorized>
            <Container maxWidth="md">
                <h1>Sign Up</h1>
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
                        <TextField
                            id="confirm-password-input"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            variant="filled"
                            onChange={handleChange('passwordConfirm')}
                            required
                        />
                        <TextField
                            id="username-input"
                            label="What should we call you?"
                            autoComplete="name"
                            variant="filled"
                            onChange={handleChange('username')}
                            required
                        />
                        {passwordMismatch &&
                            <Alert severity="error">Passwords do not match</Alert>
                        }
                    </div>

                    <Button className={classes.button} variant="contained" disableElevation color="primary" type="submit">Sign Up</Button>
                    <Button className={classes.button} variant="contained" disableElevation onClick={() => {return history.push('/login')}}>Login</Button>

                </form>
                <Typography variant="subtitle1">{auth.authError}</Typography>
            </Container>
        </Authorized>

    )
};

const mapState = state => {return {auth: state.auth}};
const mapDispatch = {createUser: createUser};

export default connect(mapState, mapDispatch)(SignUp)