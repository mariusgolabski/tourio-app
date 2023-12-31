import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    try {
      const placeData = request.body;
      await Place.findByIdAndUpdate(id, placeData);
      return response
        .status(200)
        .json({ message: "Place successfully updated." });
    } catch (error) {
      console.error("Error updating place:", error);
      return response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "DELETE") {
    try {
      const deletedPlace = await Place.findByIdAndDelete(id);

      if (!deletedPlace) {
        return response.status(404).json({ error: "Place not found" });
      }

      return response.status(200).json({ message: "Place deleted" });
    } catch (error) {
      console.error("Error deleting place:", error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
