import { useEffect, useState } from "react";
import MediaInfos from "../components/mediaInfos";
import { getMediaById } from "../services/nasaApi";
import { useParams } from "react-router";
import ErrorPage from "./errorPage";

export default function MediaDetails() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getMediaById(id)
    .then((media) => {
      setResult({ id, media });
    })
    .catch(() => {
      setResult({ id, media: null });
    });
  }, [id]);

  if (result?.id !== id) {
    return <div className="state" role="status">Chargement du média...</div>;
  }

  if (!result.media) {
    return <ErrorPage title="Média introuvable" message="Aucun média NASA ne correspond à cet identifiant." />;
  }

  return <MediaInfos media={result.media} />;
}
