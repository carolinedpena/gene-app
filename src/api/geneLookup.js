import axios from 'axios';

import resolve from './resolve'

export async function geneLookup(geneName) {
    // 1st API call to Gene Network 
    const resGene = await resolve(axios({
        method: 'get',
        url: 'https://www.genenetwork.nl/api/v1/gene/' + geneName
    }))

    // If error is returned, return function
    if (resGene.error) {
        return resGene
    }

    // Grabbing ENSEMBL ID from returned object
    const ensemblID = resGene.parsed.data.gene.id;

    // 2nd API call to ensembl, using ENSEMBL ID
    const resEnsembl = await resolve(axios({
        method: 'get',
        url: 'http://rest.ensembl.org/lookup/id/' + ensemblID + '?expand=1;content-type=application/json'
    }))
    
    // If error is returned, return function
    if (resEnsembl.error) {
        return resEnsembl
    }

    // Parsing data into constants
    const assembly = resEnsembl.parsed.data.assembly_name;
    const species = resEnsembl.parsed.data.species;
    const sequence = resEnsembl.parsed.data.seq_region_name;
    const descript = resEnsembl.parsed.data.description;
    const transcriptions = resEnsembl.parsed.data.Transcript;

    // Returning object with constants
    return {
        geneName,
        ensemblID,
        assembly,
        species,
        sequence,
        descript,
        transcriptions
    }
}