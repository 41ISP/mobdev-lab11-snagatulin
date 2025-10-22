import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../OtherPage/OtherPage.css"

function OtherPage(attribution, artist, profile, username, copyright) {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [artData, setArtData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImageById = async () => {
      try {
        const res = await fetch(`https://api.nekosia.cat/api/v1/getImageById/${id}`);
        if (!res.ok) throw new Error('Ошибка загрузки изображения');
        const json = await res.json();
        console.log(json);
        setImage(json.image.original.url);
        setArtData(json);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchImageById();
    }
  }, [id]);

  return (
    <section className="art-container">
      {image ? (
        <img className="art-image" src={image} alt="cat" />
      ) : (
        <p>Загрузка...</p>
      )}
      {artData && (
        <div className="info">
          <h2 className="title">{artData.anime.title || "Без названия"}</h2>
          
          <p className="category"><strong>Категория:</strong> {artData.category}</p>
          
          <p className="tags"><strong>Теги:</strong> {artData.tags.join(', ')}</p>
          
          <p className="creator">
            <strong>Автор:</strong> {artData.attribution.artist.username || "Неизвестен"}
          </p>
          
          <p className="source">
            <strong>Источник:</strong> 
            <a href={artData.source.url} target="_blank" rel="noopener noreferrer">
              Посмотреть
            </a>
          </p>
          
          <p className="rating"><strong>Рейтинг:</strong> {artData.rating?.rating}</p>
        </div>
      )}
      <button className="back-button" onClick={() => navigate(-1)}>
  &#8592; Назад
</button>
    </section>
      
  );
}

export default OtherPage;