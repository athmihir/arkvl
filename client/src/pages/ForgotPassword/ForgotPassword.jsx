import React, { Component } from 'react';
import './ForgotPassword.styles.css';
import Unlock from './unlock.svg'
import SubmitButton from '../../components/CustomButton/CustomButton';
import Lock from './lock.svg'
import InputField from '../../components/InputField/InputField';

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lock: false,
            email: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            lock: true
        });
    };

    handleChange = (event) => {
        this.setState({ email: event.target.value });
    };

    render() {
        return (
            <div className="forgot-password-container">
                {this.state.lock ? (
                    <img className="lockUnlock" src={Lock} alt="Lock" />
                ) : (
                        <img className="lockUnlock" src={Unlock} alt="Unlock" />
                    )}
                {this.state.lock ? (
                    <h2>We've sent you a link to reset your password.</h2>
                ) : (
                        <div>
                            <h1>Forgot your password? No problem!</h1>
                            <p>Enter your email ID and we'll send you a password reset link.</p>
                            <InputField
                                name="email"
                                label="Email"
                                type="email"
                                placeholder=" "
                                className="inputEmailField"
                                style={{
                                    'display': 'flex',
                                    'width': '30vh',
                                    'margin': 'auto'
                                }}
                                onChange={this.handleChange}
                            // value={registerInfo.email}
                            />
                            <SubmitButton className="submitButton" type="submit" onClick={this.handleSubmit} style={{
                                'display': 'flex',
                                'width': '10%',
                                'margin': 'auto',
                                'margin-top': '20px'
                            }}>
                                Submit
                    </SubmitButton>
                        </div>
                    )
                }

            </div>
        )
    }
}

export default ForgotPassword;