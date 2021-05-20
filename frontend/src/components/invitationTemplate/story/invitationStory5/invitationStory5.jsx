import React from "react";
import styles from "./invitationStory5.module.css";

const InvitationStory5 = ({ setModalState, modalData }) => {

  return (
    <div className={styles['invitation-story4']}>
      <button 
        className={styles['cancel-button']}
        onClick={() => {setModalState(false)}}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className={styles['text1-container']}>
        <pre>{modalData.comments[0].value}</pre>
      </div>
      <div className={styles['images-container']}>
        <div className={styles['image1-container']}>
          <img 
            src={modalData.images[0].imgUrl} 
            alt="" 
            className={styles.image1}
          />
        </div>
        <div className={styles['image2-container']}>
          <img 
            src={modalData.images[1].imgUrl} 
            alt="" 
            className={styles.image2}
          />
        </div>
        <div className={styles['image3-container']}>
          <img 
            src={modalData.images[2].imgUrl} 
            alt="" 
            className={styles.image3}
          />
        </div>
      </div>
    </div>
  );
};

export default InvitationStory5;
