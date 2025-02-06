import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SeminarItem from '../SeminarItem/SeminarItem';
import SeminarModal from '../SeminarModal/SeminarModal';
import './SeminarList.css';

const SeminarList = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSeminar, setCurrentSeminar] = useState(null);

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const response = await axios.get('http://localhost:3001/seminars');
        setSeminars(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSeminars();
  }, []);

  const deleteSeminar = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить семинар?')) {
      await axios.delete(`http://localhost:3001/seminars/${id}`);
      setSeminars(seminars.filter(seminar => seminar.id !== id));
    }
  };

  const openModal = (seminar) => {
    setCurrentSeminar(seminar);
    setIsModalOpen(true);
  };
  


  const saveSeminar = async (updatedSeminar) => {
    await axios.put(`http://localhost:3001/seminars/${updatedSeminar.id}`, updatedSeminar);
    setSeminars(seminars.map(seminar => (seminar.id === updatedSeminar.id ? updatedSeminar : seminar)));
    setIsModalOpen(false);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <>
      <div className='container'>
        {seminars.map(seminar => (
          <SeminarItem key={seminar.id} seminar={seminar} onDelete={deleteSeminar} onEdit={openModal} />
        ))}
      </div>
      {isModalOpen && (
        <SeminarModal 
          seminar={currentSeminar} 
          onSave={saveSeminar} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default SeminarList;

