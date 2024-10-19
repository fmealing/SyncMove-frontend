import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const fetchCityFromCoordinates = async (lat: number, lon: number) => {
  const apiKey = "EuEEXiZPUfAnhCjbdPyNfECOF69--PEgF_A0TyLnqxw";
  // console.log("API Key: ", apiKey); // Debugging
  const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lon}&lang=en-US&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log("Data: ", data); // Debugging

    // City under
    // items.[].address.city

    if (data && data.items && data.items.length > 0) {
      const city =
        data.items[0].address.city ||
        data.items[0].address.town ||
        data.items[0].address.village;
      return city;
    } else {
      throw new Error("No city found in the response");
    }
  } catch (error) {
    console.error("Error fetching the city: ", error);
    return null;
  }
};

export { fetchCityFromCoordinates };
