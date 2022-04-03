import { updateInstitution } from "./lib/manage-institution";
import { listCountryFolders, listInstitutions } from "./lib/persistent-institutions";

async function main() {

    for (const country of await listCountryFolders()) {

        for (const institution of await listInstitutions(country)) {
            
            await updateInstitution(country, institution, async (_set, unset) => {
                unset('logo');
            })
        }

        // if (countries ++ > 5) break;
    };
    
}

main().then(_ => console.log('---'));