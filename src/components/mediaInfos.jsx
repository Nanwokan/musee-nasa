export default function MediaInfos({ media }) {
  return (
    <section>
      <img className="img-media" src={media.thumbUrl} alt={media.title} />
      <div>
        <h4 className="title-media">Titre : {media.title}</h4>
        <h5 className="date-media">Date : {media.date}</h5>
        <h5 className="type-media">Type : {media.mediaType}</h5>
        <h5 className="center-media">Centre : {media.center}</h5>
        <p className="description-media">{media.description}</p>
        <span
        {
            // badge key word
        }
      </div>
    </section>
  );
}
