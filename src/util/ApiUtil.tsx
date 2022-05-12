export async function getArtwork(hash: string) {
    hash = '436524'; // valid hash  
    const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + hash
    );

    if (!response.ok) {
        throw new Error("Problem fetching");
    }
    return await response.json();
}

export async function getSheet() {
    const response = await fetch(
        "https://sheet.best/api/sheets/092dc8b9-4940-4cf3-842d-ee99768e998a/0:5"
    );

    if (!response.ok) {
        throw new Error("Problem fetching on Sheet Api");
    }
    return await response.json();
}
