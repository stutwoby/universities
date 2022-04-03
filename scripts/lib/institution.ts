export interface Institution {
    "id": string,
    "name": string,
    "web": string,
    "logo": null, // svg logo would be so nice to add
    "approximatePopulaton": number,
    "normalisedRanking": number,
    "modesOfStudy": ("undergraduate" | "postgraduate-taught" | "postgraduate-research")[], // discriminate between postgrad-taught and postgrad-research?

    // vague position on the map where their main marker should appear (center of operations)
    "coord": coord,
    "campusType": "city" | "campus", // city or campus
    "region": string[],
    "nearestCity": string, 
    "airports": {
        "iata": string, // 3digit
        "coord": coord,
        "name": string
    }[];
    
    // data reliability
    "curated": string, // date last updated by hand
    "scraped": string, // date last updated by machine
    "primary": null, // date last updated by the university themself
    "score": number, // score to reflect the reliability of the data on this university
    
    // score the university on some arbitrary manually curated axes like weather and entry requirements
    "weatherSummary": string,
    "vibe": string,

    // interesting facts -- how to translate these?
    "facts": string[],

    "campuses": {
        "name": string,
        "type": "primary" | "secondary",
        "coord": coord
    }[];
}

type coord = [number, number];
