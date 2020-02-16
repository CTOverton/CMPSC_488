import React from "react";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {createUser} from "../../redux/actions/authActions";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 600,
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const SignUp = ({auth, createUser}) => {
    const classes = useStyles();
    const [inputs, setInputs] = React.useState({
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        username: null
    })

    const handleChange = prop => event => {
        const value = event.target.value;
        setInputs({ ...inputs, [prop]: value === "" ? null : value })
    }

    const handleSignUp = () => {
        const credentials = {
            email: inputs.email,
            password: inputs.password
        }

        const profile = {
            email: inputs.email,
            username: inputs.username,
            firstName: inputs.firstName,
            lastName: inputs.lastName
        }

        createUser(credentials, profile)
    }

    return(
        <Container maxWidth="md">
            <h1>Sign Up</h1>
            <form className={classes.root} noValidate autoComplete="on">
                <TextField
                    id="firstName-input"
                    label="First Name"
                    autoComplete="given-name"
                    variant="filled"
                    onChange={handleChange('firstName')}
                />
                <TextField
                    id="lastName-input"
                    label="Last Name"
                    autoComplete="family-name"
                    variant="filled"
                    onChange={handleChange('lastName')}
                />
                <TextField
                    id="username-input"
                    label="Username"
                    autoComplete="username"
                    variant="filled"
                    onChange={handleChange('username')}
                    required
                />
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
{/*                <TextField
                    id="confirm-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    onChange={handleChange('password')}
                    required
                />*/}
                <div>
                    <Button className={classes.margin} variant="contained" disableElevation color="primary" onClick={handleSignUp}>Sign Up</Button>
                    <Button className={classes.margin} variant="contained" disableElevation>Login</Button>
                </div>


            </form>
            <Typography variant="subtitle1">{auth.authError}</Typography>
        </Container>
    )
}

const mapState = state => {return {auth: state.auth}}
const mapDispatch = {createUser: createUser}

export default connect(mapState, mapDispatch)(SignUp)