import { useEffect, useState } from "react";
import MediaInfos from "../components/mediaInfos";
import { getMediaById } from "../services/nasaApi";
import { useParams } from "react-router";

export default function MediaDetails() {
  const { id } = useParams();
  const [media, setMedia] = useState(null);

  useEffect(() => {
    getMediaById(id)
      .then(setMedia)
      .catch((error) => console.error("Failed to load NASA media:", error));
  }, [id]);

  if (!media) return <h2>Vous possédez visiblement des informations que même la NASA n’a pas. 👀</h2>;

  return <MediaInfos media={media} />;
}
