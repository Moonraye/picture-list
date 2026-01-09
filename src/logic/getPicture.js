export default async function getPictureAPI(query = "funny-cat") {
    const ACCESS_KEY = "xV14xSBgv75iUWGjvPpil5ELfDulPToNtxxQK1POOuM";
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}&per_page=30`;
    try {
        console.log('Fetching picture from API...');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Something went wrong while fetching the picture.");
        }

        const data = await response.json();
        console.log("Data fetched!");
        console.table(data);
        return data.results;

    } catch (error){
        console.error("Error fetching picture:", error.message);
    }
}
