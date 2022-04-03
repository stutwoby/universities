import { updateInstitution } from "./lib/manage-institution";

async function main() {

    // test updating UOS name
    await updateInstitution('GBR', 'university-of-sussex', async (set, unset) => {
        set('name', "123");
        unset('name');
        set('name', "456");
    })
}

main().then(_ => console.log('---'));