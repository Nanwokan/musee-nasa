import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPlayableMediaUrl } from "../services/nasaApi";

export default function MediaInfos({ media }) {

  const navigate = useNavigate();
  // Garde l'adresse du lecteur et l'éventuel message d'erreur.
  const [player, setPlayer] = useState({ mediaId: "", url: "", error: "" });
  const mediaId = media.id;
  const mediaType = media.mediaType;

  useEffect(() => {
    // Les images utilisent leur vignette ; seuls les sons et vidéos ont besoin d'un fichier à lire.
    if (mediaType !== "video" && mediaType !== "audio") return;

    let active = true;
    getPlayableMediaUrl({ id: mediaId, mediaType })
      .then((url) => {
        if (active) setPlayer({ mediaId, url, error: "" });
      })
      .catch((error) => {
        console.error("Impossible de charger le média :", error);
        if (active) {
          setPlayer({
            mediaId,
            url: "",
            error: "Le lecteur de ce média est indisponible.",
          });
        }
      });

    return () => {
      // Ignore la réponse si on a quitté cette fiche avant la fin du chargement.
      active = false;
    };
  }, [mediaId, mediaType]);

  const currentPlayer = player.mediaId === media.id ? player : null;

  return (
    <section>
      {/* Affiche le lecteur adapté, ou garde l'image pour les médias image. */}
      {media.mediaType === "image" ? (
        <img className="img-media" src={media.thumbUrl} alt={media.title} />
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
