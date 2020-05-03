import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { geneLookup } from '../api/geneLookup';
import TranscriptTable from './TranscriptTable';

class GeneData extends Component {
    state = {
        geneName: this.props.geneName,
        ensemblID: '', 
        species: '', 
        assembly: '', 
        sequence: '', 
        descript: '', 
        transcriptions: null,
        isLoading: true,
        error: ''
    }

    // geneLookup is async function - using componentDidMount to ensure component is rendered properly with returned data points
    componentDidMount() {
        geneLookup(this.state.geneName)
        .then(res => {
            // Error handling - 2 main possibilities: invalid entry by user or server problem.
            // Parsing error if return to determine which possibility an returning message on screen
            if (res.error) {
                const errorString = res.error.toString()
                if (errorString.includes('404')) {
                    this.setState({
                        error: "Gene could not be found. Please try again.",
                        isLoading: false
                    })
                } else if (errorString.includes('500')) {
                    this.setState({
                        error: "Something went wrong with processing your request. Please try again.",
                        isLoading: false
                    })
                }
            }

            // Parsing data returned
            this.setState({
                ensemblID: res.ensemblID,
                species: res.species,
                assembly: res.assembly,
                sequence: res.sequence,
                descript: res.descript,
                transcriptions: res.transcriptions,
                isLoading: false,
            })
        }).catch(err => {
            // Additional error catching if promise is not resolved
            this.setState({
                error: "Something went wrong. Please try again.",
                isLoading: false
            })
        })
    }

    render() { 
        // If error was returned show error message on screen, else show parsed data
        // Transcriptions further parsed in additional TranscriptTable
        const data = ( this.state.error ?
            <Typography> { this.state.error } </Typography>
            : 
            <Container>
                <List>
                    <ListItem><ListItemText>Gene Name: {this.state.geneName}</ListItemText></ListItem>
                    <ListItem><ListItemText>Ensembl ID: {this.state.ensemblID}</ListItemText></ListItem>
                    <ListItem><ListItemText>Species: {this.state.species}</ListItemText></ListItem>
                    <ListItem><ListItemText>Assembly: {this.state.assembly}</ListItemText></ListItem>
                    <ListItem><ListItemText>Sequence Region Name: {this.state.sequence}</ListItemText></ListItem>
                    <ListItem><ListItemText>Description: {this.state.descript}</ListItemText></ListItem>
                    <ListItem><ListItemText>Transcriptions: </ListItemText></ListItem>
                </List>


                <TranscriptTable arrOfTrans={this.state.transcriptions} />
            </Container>
        )
        
        const loadingMessage = <Typography>Loading...</Typography>
        
        // Loading message shown until promise is resolved and data is returned
        return (
            <Container>
                { this.state.isLoading ? loadingMessage : data }
            </Container>
        )
    }
}

export default GeneData;