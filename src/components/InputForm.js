import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import GeneFields from './GeneData';

// Additional styling
const styles = theme => ({
    container: {
        margin: '20px auto',
        alignItems: 'center'
    },
    inputField: {
        margin: '10px'
    }
})

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geneName: '',
            isSubmitted: false
        }
        // Need to bind methods so they are defined when called
        this.handleGeneName = this.handleGeneName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }  

    // Parsing inputted gene name
    handleGeneName(event) {
        // Need to reset isSubmitted state before changing geneName to prevent premature API call
        this.setState({
            isSubmitted: false
        })

        // Checking that isSubmitted is reset 
        if (!this.state.isSubmitted) {
            this.setState({
                geneName: event.target.value
            })
        }

    }

    // Submitting gene name input
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isSubmitted: true
        })
    }

    render() {
        const { classes } = this.props;
        const geneName = this.state.geneName.toUpperCase();

        // isSubmitted and length of geneName checked before rendering GeneFields to validate input before rendering/prevents unnecessary API calls (i.e. empty field)
        return (
            <Container className={classes.container} fixed>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <Input className={classes.inputField} placeholder="Gene Name" inputProps={{ 'aria-label': 'description' }} onChange={this.handleGeneName} required/>
                    <Button type="submit" variant="contained">Submit</Button>
                </form>

                { this.state.isSubmitted && geneName.length ? <GeneFields geneName={geneName} /> : null }

            </Container>
        )
    }
}

export default withStyles(styles)(InputForm);