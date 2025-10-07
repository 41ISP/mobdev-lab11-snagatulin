import React, { useEffect, useState } from 'react';
import "../AnimePage/AnimePage.css"
import { useNavigate } from 'react-router-dom';

function AnimePage() {
  const [images, setImages] = useState([]);
  const [loadCount, setLoadCount] = useState(1);
  const [Tag, setTag] = useState('');
  const navigate = useNavigate(); 

  const fetchMultipleImages = async () => {
    const imgs = [];
    const Tag = '';
    const count = 10 * loadCount;
    for (let i = 0; i < 10; i++) {
      try {
        const res = await fetch('https://api.nekosia.cat/api/v1/images/random');
        const json = await res.json();
        console.log(json);
        imgs.push(json);
      } catch (err) {
        console.error(`Ошибка при запросе изображения ${i + 1}:`, err);
      }
    } 
    setImages(prevImages => [...prevImages, ...imgs]);

  };

  useEffect(() => {
    fetchMultipleImages();
    }, [loadCount]);

  const handleShowMore = () => {
    setLoadCount(prev => prev + 1);
  };

    const handleInputChange = (e) => {
    setTag(e.target.value.toLowerCase()); 
  };

    const filteredImages = images.filter((img) => {
    if (Tag === '') return true; 
    if (img.tags && Array.isArray(img.tags)) {
      return img.tags.some(tag => tag.toLowerCase().includes(Tag));
    }
    return false;
  });

  return (
<div className="anime-page">
      <h1>♥ Аниме Арты ♥</h1>

      <div className="nyan-search-container">
      <input className="nyan-search-input"
          type="text"
          text = "Поиск по тегам"
          placeholder="Поиск по тегам:"
          value={Tag}
          onChange={handleInputChange}/>
      </div>
      <section>
        {filteredImages.length > 0 ? (
          filteredImages.map((imageData) => (
            <div
              key={imageData.id}
              className="cat-art"
              onClick={() => navigate(`/art/${imageData.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={imageData.image.original.url}
                alt="catgirl"
                className="cat-image"
              />
            </div>
          ))
        ) : (
          <p>Загрузка изображений...</p>
        )}
      </section>
      <button onClick={handleShowMore} className="loadingmore">
        Показать еще
      </button>
    </div>
  );
}

export default AnimePage;