export default function MediaCard({media}) {
    return (
        <li className="card">
            <img className="img-media" src={media.thumbUrl} alt={media.title} />
            <div>
                <h4 className="title-media">Titre : {media.title}</h4>
                <p className="date-media">Date : {media.date}</p>
                <p className="type-media">Type : {media.mediaType}</p>
            </div>
        </li>
    )
}
//chaque carte affiche une vignette, le titre, la date et le type de média
