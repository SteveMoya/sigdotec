import { useState } from 'react';

export const useFetch = () => {
 const [state, setState] = useState({
    data: null,
    isLoading: false,
    error: null,
 });

 const { data, isLoading, error } = state;

const fetchData = async (url, method, body = null) => {
 setState({ ...state, isLoading: true });
 try {
   const options: RequestInit = {
      method: method,
      headers: {
         'Content-Type': 'application/json',
      },
      body: null, // Add the body property to the options object
   };

   // Only include the body if the method is not GET or HEAD
   if (method !== 'GET' && method !== 'HEAD') {
      options.body = JSON.stringify(body);
   }

   const response = await fetch(url, options);
    if (!response.ok) {
      const {error} = await response.json();
       throw new Error(error);
    }
    const data = await response.json();
    setState({ data, isLoading: false, error: null });
 } catch (error) {
    setState({ data: null, isLoading: false, error });
 }
};


 return {
    data,
    isLoading,
    error,
    fetchData, // Devuelve la función fetchData para que pueda ser llamada manualmente
 };
};


/*
  Ejemplo de  uso de este HOOK
  import React from 'react';
import { useFetch } from './useFetch'; // Asegúrate de importar el hook modificado

const MyComponent = () => {
 const { data, isLoading, error, fetchData } = useFetch();

 const handleGetClick = async () => {
   await fetchData('https://api.example.com/data', 'GET');
 };

 const handlePostClick = () => {
    const newData = { key: 'value' }; // Datos para enviar en la solicitud POST
    fetchData('https://api.example.com/data', 'POST', newData);
 };

 const handleDeleteClick = async () => {
   await fetchData('https://api.example.com/data/1', 'DELETE'); // Suponiendo que quieres eliminar un recurso específico
 };

 const handlePatchClick = async () => {
    const updatedData = { key: 'updatedValue' }; // Datos para actualizar
   await fetchData('https://api.example.com/data/1', 'PATCH', updatedData);
 };

 return (
    <div>
      <button onClick={handleGetClick}>GET</button>
      <button onClick={handlePostClick}>POST</button>
      <button onClick={handleDeleteClick}>DELETE</button>
      <button onClick={handlePatchClick}>PATCH</button>
      {isLoading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Datos: {JSON.stringify(data)}</p>}
    </div>
 );
};

export default MyComponent;

*/