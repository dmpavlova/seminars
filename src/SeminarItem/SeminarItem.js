import React from 'react';
import './SeminarItem.css';

const SeminarItem = ({ seminar, onDelete, onEdit }) => {
  return (
    <div className='itemContainer'>
      <h3>{seminar.title}</h3>
      <p>{seminar.description}</p>
      <p>{seminar.date} в {seminar.time}</p>
      <img src={seminar.photo} alt={seminar.title} width='300px' />
      <button onClick={() => onDelete(seminar.id)}>Удалить</button>
      <button onClick={() => onEdit(seminar)}>Редактировать</button>
   

    </div>
  );
};

export default SeminarItem;
