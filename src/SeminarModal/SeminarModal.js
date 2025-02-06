import React, { useState, useEffect } from 'react';
import './SeminarModal.css'; 

const SeminarModal = ({ seminar, onSave, onClose }) => {
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [date, setDate] = useState(seminar.date);
  const [time, setTime] = useState(seminar.time);

  useEffect(() => {
    if (seminar) {
      setTitle(seminar.title);
      setDescription(seminar.description);
      setDate(seminar.date);
      setTime(seminar.time);
    }
  }, [seminar]);
  


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...seminar, title, description, date, time });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Редактировать семинар</h2>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Название" 
        />
        <input 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Описание" 
        />
        <input 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          placeholder="Дата" 
        />
        <input 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          placeholder="Время" 
        />
        <button type="submit">Сохранить</button>
        <button type="button" onClick={onClose}>Закрыть</button>
      </form>
    </div>
  );
};

export default SeminarModal;
