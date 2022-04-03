import { readFile } from "fs/promises";
import { Institution } from "./institution";
import { IsoAlpha3Country } from "./iso-alpha3-countries";

/**
 * Get a country for editing/analysis
 * @param country The uppercase, 3-letter country code
 * @param id The ID e.g. university-of-sussex
 * @returns Parsed university
 */
export async function load(country: IsoAlpha3Country, id: string): Promise<Partial<Institution>> {
    const json = await readFile(`../universities/${country}/${id}.json`);
    return JSON.parse(json.toString()) as Partial<Institution>;
}

/**
 * Save a university to storage
 * @param country The uppercase, 3-letter country code
 * @param id The ID e.g. university-of-sussex
 * @param institution What to save (the object)
 */
export async function save(country: IsoAlpha3Country, id: string, institution: Partial<Institution>){
    console.log(country, id, institution);
}