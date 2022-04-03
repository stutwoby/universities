import { Institution } from "./institution";
import { IsoAlpha3Country } from "./iso-alpha3-countries";
import { load, save } from "./persistent-institutions";

/**
 * Update a university on storage
 * @param country The uppercase, 3-letter country code
 * @param id The ID e.g. university-of-sussex
 * @param edit Callback within which caller can make limited changes to the object
 */
export async function updateInstitution<T extends Institution>(
    country: IsoAlpha3Country,
    id: string,
    edit: (
        set: <K extends keyof T>(field: K, value: T[K]) => void,
        unset: <K extends keyof T>(field: K) => void
    ) => Promise<void> | void
    ) {

    // load institution
    const institution = await load(country, id) as T;

    // warning - institution will be edited by calling code by design
    // if shared, have institution be copied each time. no need while just me.
    await edit(
        (field: keyof T, value: T[keyof T]) => {
            institution[field] = value;
        },
        (field: keyof T) => {
            delete institution[field];
        }
    );

    await save(country, id, institution);
}