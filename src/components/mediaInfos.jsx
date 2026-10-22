import { useNavigate } from "react-router";

export default function MediaInfos({ media }) {

  const navigate = useNavigate();

  return (
    <section>
      <img className="img-media" src={media.thumbUrl} alt={media.title} />
      <div>
        <h4 className="title-media">Titre : {media.title}</h4>
        <h5 className="date-media">Date : {media.date}</h5>
        <h5 className="type-media">Type : {media.mediaType}</h5>
        <h5 className="center-media">Centre : {media.center}</h5>
        <p className="description-media">{media.description}</p>
        {
            // badge key word
            media.keywords.map((keyword)=>
              (<button key={keyword} onClick={()=> navigate(`/?q=${keyword}`)}>{keyword}</button>)
            )
        }
      </div>
    </section>
  );
}
