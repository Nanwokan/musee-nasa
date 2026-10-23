import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAssetMedia, getPlayableMediaUrl } from "../services/nasaApi";

export default function MediaInfos({ media }) {

  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  // Garde l'adresse du lecteur et l'éventuel message d'erreur.
  const [player, setPlayer] = useState({ mediaId: "", url: "", error: "" });
  const mediaId = media.id;
  const mediaType = media.mediaType;

useEffect(() => {
  if (mediaType === "image") {
    getAssetMedia(media)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Impossible de charger l'image :", error);
        setImageUrl(media.thumbUrl);
      });
  }

  if (mediaType === "video" || mediaType === "audio") {
    getPlayableMediaUrl({ id: mediaId, mediaType })
      .then((url) => {
        setPlayer({ mediaId, url, error: "" });
      })
      .catch((error) => {
        console.error("Impossible de charger le média :", error);
        setPlayer({
          mediaId,
          url: "",
          error: "Le lecteur de ce média est indisponible.",
        });
      });
  }
}, [mediaId, mediaType]);

  const currentPlayer = player.mediaId === media.id ? player : null;

  return (
    <section>
      <button
        className="back-button media-detail__back"
        type="button"
        onClick={() => navigate(location.key === "default" ? "/" : -1)}
      >
        ← Retour
      </button>
      {}
      {media.mediaType === "image" ? (
        <img
  className="img-media"
  src={imageUrl || media.thumbUrl}
  alt={media.title}
/>
      ) : currentPlayer?.url && media.mediaType === "video" ? (
        // controls affiche les commandes de lecture ; poster montre la vignette avant le démarrage.
        <video
          className="img-media"
          controls
          preload="metadata"
          poster={media.thumbUrl}
        >
          <source src={currentPlayer.url} type="video/mp4" />
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
      ) : currentPlayer?.url ? (
        // Le lecteur audio fournit les commandes de lecture du son.
        <audio className="img-media" controls preload="metadata">
          <source src={currentPlayer.url} />
          Votre navigateur ne prend pas en charge la lecture audio.
        </audio>
      ) : (
        // Informe l'utilisateur pendant la recherche du fichier ou si elle échoue.
        <p role={currentPlayer?.error ? "alert" : undefined}>
          {currentPlayer?.error || "Chargement du lecteur..."}
        </p>
      )}
      <div>
        <h4 className="title-media">Titre : {media.title}</h4>
        <h5 className="date-media">Date : {media.date}</h5>
        <h5 className="type-media">Type : {media.mediaType}</h5>
        <h5 className="center-media">Centre : {media.center}</h5>
        <p className="description-media">{media.description}</p>
        {
            // Chaque mot-clé permet de lancer une nouvelle recherche sur ce thème.
            media.keywords.map((keyword)=>
              (<button key={keyword} onClick={()=> navigate(`/?q=${keyword}`)}>{keyword}</button>)
            )
        }
      </div>
    </section>
  );
}
