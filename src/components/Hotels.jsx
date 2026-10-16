import { useState } from "react";
import useFetch from "../useFetch";

const Hotels = () => {

    const [ successMessage, setSuccessMessage ] = useState("")
    const { data, loading, error } = useFetch(`http://localhost:3000/hotels`);


    // console.log(data);

    const handleDelete = async (hotelId) => {

        try {
            const response = await fetch(`http://localhost:3000/hotels/${hotelId}`,{
                method: "DELETE"
            },);

            if(!response.ok) {
                throw "Failed to delete Hotel.";
            };

            const data = await response.json();

            if(data) {
                setSuccessMessage("Hotel deleted successfully.");
                window.location.reload();

            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const hotels = data?.data;
    
    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Error: {error} </p>
    }

    if(!hotels || hotels.length === 0) {
        return <p>No Hotels</p>
    }
// 1. Fetch and display all the hotel names present in your database.
    return (
        <div>
            <h2>All Hotels</h2>
            <ul>
                {
                    hotels.map((hotel) => (
                        <li key={hotel._id}>{hotel.name} <button onClick={() => handleDelete(hotel._id)} >Delete</button></li>
                    ))
                }
            </ul>
        </div>
    )

}

export default Hotels;