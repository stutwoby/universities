import { readdir, readFile, writeFile } from "fs/promises";
import { Institution } from "./institution";
import { IsoAlpha3Country } from "./iso-alpha3-countries";

/**
 * Get a country for editing/analysis
 * @param country The uppercase, 3-letter country code
 * @param id The ID e.g. university-of-sussex
 * @returns Parsed university
 */
export async function load(country: IsoAlpha3Country, id: string): Promise<Partial<Institution>> {
    const json = await readFile(path(country, id));
    return JSON.parse(json.toString()) as Partial<Institution>;
}

/**
 * Save a university to storage
 * @param country The uppercase, 3-letter country code
 * @param id The ID e.g. university-of-sussex
 * @param institution What to save (the object)
 */
export async function save(country: IsoAlpha3Country, id: string, institution: Partial<Institution>){
    console.log(`Writing university: ${country}: ${id}`);
    const json = JSON.stringify(institution, null, 2);
    await writeFile(path(country, id), json);
}

/**
 * Get all country folders with known universities
 * @returns A list of 3-digit country codes for which universities are stored
 */
export async function listCountryFolders(): Promise<IsoAlpha3Country[]> {

    console.log('reading countries');
    const dirContents = await readdir('../universities/', { withFileTypes: true });

    return dirContents
        .filter(item => item.isDirectory)
        .filter(directory => !directory.name.startsWith('.'))
        .map(item => item.name as IsoAlpha3Country);
}

/**
 * Get all universities in a country
 * @param country The country (3-digit, uppercase) to search inside
 * @returns A list of institution IDs (slug form)
 */
export async function listInstitutions(country: IsoAlpha3Country): Promise<string[]> {

    const dirContents = await readdir(`../universities/${country}/`, { withFileTypes: true });

    return dirContents
        .filter(item => item.isFile)
        .filter(file => file.name.endsWith('.json'))
        .map(item => item.name)
        .map(name => name.replace('.json', ''));
}

function path(country: IsoAlpha3Country, id: string) {
    return `../universities/${country}/${id}.json`;
}