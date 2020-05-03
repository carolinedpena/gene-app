import mockAxios from 'jest-mock-axios';

import { geneLookup } from '../api/geneLookup';

afterEach(() => {
    // cleaning up previous test
    mockAxios.reset();
});

// Returns data and data parsing is accurate
it('calls axios and returns data', async () => {
    return await geneLookup('TNMD')
    .then(res => {
        expect(res.ensemblID).toBe('ENSG00000000005')
        expect(res.species).toBe('homo_sapiens')
        expect(res.assembly).toBe('GRCh38')
        expect(res.sequence).toBe('X')
        expect(res.descript).toBe('tenomodulin [Source:HGNC Symbol;Acc:HGNC:17757]')
    })
})

// Returns error
it('calls axios and returns error', async () => {
    return geneLookup('abcd')
    .then(res => {
        expect(res.parsed).toBe(null)
        expect(res.error).toBeDefined()
    })
})