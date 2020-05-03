import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class TranscriptTable extends Component {
    render () {
        // Transcriptions are parsed as an array of objs
        let transArr = this.props.arrOfTrans;
        
        // Helper function to sort transcriptions - Exon key contains length of exon
        function compareExonLengths(trans1, trans2) {
            const trans1Length = trans1.Exon;
            const trans2Length = trans2.Exon;

            let comparison = 0;

            // Sort function uses -1 and 1 to swap elements in an arr
            if (trans1Length > trans2Length) {
                comparison = -1;
            } else if (trans1Length < trans2Length) {
                comparison = 1;
            }

            return comparison;
        }

        // Sorting w/ helper function
        transArr.sort(compareExonLengths);

        // Function to initalize object for populating rows 
        function createData(id, is_canonical, exon_length) {
            return { id, is_canonical, exon_length }
        }

        //Initalizing row arr
        const rows = [];

        // Populating rows
        transArr.forEach(trans => rows.push(createData(trans.id, (trans.is_canonical === 1 ? '✔' : ''), trans.Exon.length)))

        // Table populated with transcription objs in rows arr
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="right">Canonical</TableCell>
                            <TableCell align="right">Exon Length</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component='th' scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell className='is_canonical' align="right">
                                    {row.is_canonical}
                                </TableCell>
                                <TableCell className='exon_length' align="right">
                                    {row.exon_length}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default TranscriptTable