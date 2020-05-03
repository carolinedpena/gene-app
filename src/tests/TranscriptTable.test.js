import React from 'react';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createShallow } from '@material-ui/core/test-utils';
import TableCell from '@material-ui/core/TableCell';

import TranscriptTable from '../components/TranscriptTable';

configure({ adapter: new Adapter() });

describe('testing TranscriptTable and functions', () => {
    let shallow;
    beforeEach(() => {
        shallow = createShallow({ dive: true });
    });
    
    let tnmdTranscripts = [
        {
            "biotype": "protein_coding",
            "version": 5,
            "display_name": "TNMD-201",
            "logic_name": "ensembl_havana_transcript_homo_sapiens",
            "strand": 1,
            "is_canonical": 1,
            "species": "homo_sapiens",
            "db_type": "core",
            "assembly_name": "GRCh38",
            "start": 100584936,
            "Translation": {
                "start": 100585019,
                "db_type": "core",
                "species": "homo_sapiens",
                "Parent": "ENST00000373031",
                "id": "ENSP00000362122",
                "length": 317,
                "end": 100599717,
                "object_type": "Translation"
            },
            "id": "ENST00000373031",
            "Parent": "ENSG00000000005",
            "Exon": [
                {
                    "version": 5,
                    "strand": 1,
                    "end": 100585066,
                    "seq_region_name": "X",
                    "object_type": "Exon",
                    "start": 100584936,
                    "assembly_name": "GRCh38",
                    "species": "homo_sapiens",
                    "db_type": "core",
                    "id": "ENSE00001459371"
                },
                {
                    "assembly_name": "GRCh38",
                    "start": 100585231,
                    "species": "homo_sapiens",
                    "db_type": "core",
                    "id": "ENSE00000401061",
                    "version": 1,
                    "end": 100585362,
                    "seq_region_name": "X",
                    "strand": 1,
                    "object_type": "Exon"
                },
                {
                    "assembly_name": "GRCh38",
                    "start": 100593895,
                    "db_type": "core",
                    "species": "homo_sapiens",
                    "id": "ENSE00000673400",
                    "version": 1,
                    "seq_region_name": "X",
                    "end": 100594035,
                    "strand": 1,
                    "object_type": "Exon"
                },
                {
                    "db_type": "core",
                    "species": "homo_sapiens",
                    "assembly_name": "GRCh38",
                    "start": 100594261,
                    "id": "ENSE00003504197",
                    "version": 1,
                    "object_type": "Exon",
                    "strand": 1,
                    "end": 100594362,
                    "seq_region_name": "X"
                },
                {
                    "db_type": "core",
                    "species": "homo_sapiens",
                    "start": 100597504,
                    "assembly_name": "GRCh38",
                    "id": "ENSE00000673403",
                    "version": 1,
                    "object_type": "Exon",
                    "strand": 1,
                    "end": 100597657,
                    "seq_region_name": "X"
                },
                {
                    "start": 100599016,
                    "assembly_name": "GRCh38",
                    "species": "homo_sapiens",
                    "db_type": "core",
                    "id": "ENSE00000868865",
                    "version": 1,
                    "strand": 1,
                    "end": 100599182,
                    "seq_region_name": "X",
                    "object_type": "Exon"
                },
                {
                    "strand": 1,
                    "end": 100599885,
                    "seq_region_name": "X",
                    "object_type": "Exon",
                    "version": 4,
                    "id": "ENSE00001459358",
                    "start": 100599508,
                    "assembly_name": "GRCh38",
                    "species": "homo_sapiens",
                    "db_type": "core"
                }
            ],
            "source": "ensembl_havana",
            "object_type": "Transcript",
            "end": 100599885,
            "seq_region_name": "X"
        },
        {
            "Parent": "ENSG00000000005",
            "id": "ENST00000485971",
            "assembly_name": "GRCh38",
            "start": 100593624,
            "species": "homo_sapiens",
            "db_type": "core",
            "is_canonical": 0,
            "end": 100597531,
            "seq_region_name": "X",
            "object_type": "Transcript",
            "source": "havana",
            "Exon": [
                {
                    "end": 100594035,
                    "seq_region_name": "X",
                    "strand": 1,
                    "object_type": "Exon",
                    "version": 1,
                    "id": "ENSE00001952391",
                    "start": 100593624,
                    "assembly_name": "GRCh38",
                    "species": "homo_sapiens",
                    "db_type": "core"
                },
                {
                    "id": "ENSE00003639486",
                    "assembly_name": "GRCh38",
                    "start": 100594261,
                    "species": "homo_sapiens",
                    "db_type": "core",
                    "end": 100594362,
                    "seq_region_name": "X",
                    "strand": 1,
                    "object_type": "Exon",
                    "version": 1
                },
                {
                    "start": 100597504,
                    "assembly_name": "GRCh38",
                    "species": "homo_sapiens",
                    "db_type": "core",
                    "id": "ENSE00001881546",
                    "version": 1,
                    "strand": 1,
                    "end": 100597531,
                    "seq_region_name": "X",
                    "object_type": "Exon"
                }
            ],
            "biotype": "processed_transcript",
            "strand": 1,
            "display_name": "TNMD-202",
            "logic_name": "havana_homo_sapiens",
            "version": 1
        }
    ]

    it('Ensures table renders correctly', () => {
        const wrapper = shallow(<TranscriptTable arrOfTrans={tnmdTranscripts} />)
        expect(wrapper).toMatchSnapshot();
    })

    it('Should order transcripts by exon length', () => {
        const wrapper = shallow(<TranscriptTable arrOfTrans={tnmdTranscripts} />)
        const target1 = (
            <TableCell component='th' scope="row">
                ENST00000373031
            </TableCell>
        );
        const target2 = (
            <TableCell component='th' scope="row">
                ENST00000485971
            </TableCell>
        )
        expect(wrapper.dive().containsMatchingElement(target1)).toBe(true)
        expect(wrapper.dive().containsMatchingElement(target2)).toBe(true)
    })

    it('Should label canonical transcript', () => {
        const wrapper = shallow(<TranscriptTable arrOfTrans={tnmdTranscripts} />)
        const target = (
            <TableCell component='th' scope="row">
                ENST00000373031
            </TableCell>,
            <TableCell className='is_canonical' align="right">
                ✔
            </TableCell>
        )
        expect(wrapper.dive().containsMatchingElement(target)).toBe(true)
    })
})