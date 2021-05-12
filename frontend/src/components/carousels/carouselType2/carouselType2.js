import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"


import styles from './carouselType2.module.css';

import SwiperCore, { EffectCube, Pagination, Navigation } from 'swiper/core';
import api from '../../../service/api';

SwiperCore.use([EffectCube, Pagination, Navigation]);


const CarouselType2 = ({ setMusicId }) => {

  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    api.get('/music', {
      headers: {Authorization: localStorage.getItem("jwt")}
    })
      .then((res) => {
        setMusicData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
  },[]);


  const choiceMusic = (musicId) => {
    setMusicId(musicId);
  };



  return (
    <>
      {
        musicData.length > 0
        ?
        <Swiper 
          effect={'cube'} 
          grabCursor={true} 
          cubeEffect={{
            "shadow": true,
            "slideShadows": true,
            "shadowOffset": 50,
            "shadowScale": 0.94,
          }}        
          pagination={{ "clickable": true }}
          navigation={{ "clickable": true }}
          loop={true}
          speed={3000}
          className={styles['swiper-container']}>
          <div className={styles['swiper-wrapper']}>
          {
            musicData.map((data) => {
              return (
                <SwiperSlide
                  className={styles['swiper-slide']}
                  key={data.id}
                >
                  <img 
                    src={data.albumImgUrl} 
                    className={styles['album-img']}
                    onClick={() => {choiceMusic(data.id)}}
                  />
                  <audio src={data.musicUrl} controls></audio>
                </SwiperSlide>
              );
            })
          }
          </div>
        </Swiper>
        :
        <p>목록이 비어있습니다.</p>
      }
    </>
  );
};

export default CarouselType2;