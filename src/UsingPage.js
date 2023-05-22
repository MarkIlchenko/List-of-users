import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com";

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    
    useEffect(() => {
        getUsers();
    }, []);
    
    const getUsers = async () => {
        try {
            const response = await axios.get(`${baseUrl}/users`);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    const getAlbums = async (userId) => {
        try {
            const response = await axios.get(`${baseUrl}/albums?userId=${userId}`);
            setAlbums(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    const getPhotos = async (albumId) => {
        try {
            const response = await axios.get(`${baseUrl}/photos?albumId=${albumId}`);
            setPhotos(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
         <div>
             <h1>Users List</h1>
             <ul>
                 {users.map((user) => (
                      <li key={user.id}>
                          <p>{user.name}</p>
                          <button onClick={() => getAlbums(user.id)}>Albums</button>
                          <ul>
                              {albums.map((album) => (
                                   <li key={album.id}>
                                       <p>{album.title}</p>
                                       <button onClick={() => getPhotos(album.id)}>Photos</button>
                                       <ul>
                                           {photos.map((photo) => (
                                                <li key={photo.id}>
                                                    <img src={photo.thumbnailUrl} alt={photo.title} />
                                                </li>
                                           ))}
                                       </ul>
                                   </li>
                              ))}
                          </ul>
                      </li>
                 ))}
             </ul>
         </div>
    );
};

export default UserListPage;
