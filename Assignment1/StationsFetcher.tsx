import Papa = require("papaparse");

export async function fetchStations() {
  try {
    // fetch data from csv
    const response = await fetch(
      "https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const csv = await response.text();
    // Parse csv data to get an array of Station objects
    const { data } = Papa.parse(csv, { header: true });

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
