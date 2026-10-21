import MediaCard from "./mediaCard";

export default function Galerie ({medias = []}) {
   // if (medias.length === 0 ) return <p>aucun medias trouve</p>
    return (
        <ul className="galerie">
            {medias.map((media) => (
                <MediaCard key={media.id} media={media}/>
            ))}
        </ul>
    )
}