import React, { Component } from 'react';
import './ResetPassword.styles.css';
import SubmitButton from '../../components/CustomButton/CustomButton';
import InputField from '../../components/InputField/InputField';
import axios from 'axios';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            token: this.props.match.params.token,
        };
    }

    handleChange = (event) => {
        this.setState({ password: event.target.value });
        console.log("here is the token");
        console.log(this.state.token);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("bruh pls");
        axios.post(`/api/verifyreset`, { 'token': this.state.token, 'password': this.state.password })
            .then(res => {
                console.log("here is the API response from api/verifyreset")
                console.log(res);
            })
            .catch((err) => {
                console.log("no cap")
                console.log(err);
            })
    };

    render() {
        return (
            <div className="reset-password-container">
                <h1>Enter your new password</h1>
                <InputField
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    style={{
                        'display': 'flex',
                        'width': '30vh',
                        'margin': 'auto'
                    }}
                />
                <h1>Confirm your new password</h1>
                <InputField
                    name="password"
                    type="password"
                    placeholder="Password"
                    // onChange={this.handleChange}
                    style={{
                        'display': 'flex',
                        'width': '30vh',
                        'margin': 'auto'
                    }}
                />
                <SubmitButton className="submitButton" type="submit" onClick={this.handleSubmit} style={{
                    'display': 'flex',
                    'width': '15%',
                    'margin': 'auto',
                    'margin-top': '20px'
                }}>
                    Reset my password
                    </SubmitButton>
            </div>
        )
    }
}

export default ResetPassword;