import React, { useEffect, useState } from 'react'
import {db} from '../firebase-config'
import {collection, getDocs} from "firebase/firestore";

const User = () => {
    const [info, setInfo] = useState([]);
    const userCollection = collection(db, "users");

    useEffect(() => {
        const getUsers = async () => {
        const data = await getDocs(userCollection)
        console.log(data)

        }
        getUsers();
    },[])

    return (

        
        <div>
            <form>
                <input type="text" />
                <input type="text" />
                <button>Log in</button>
            </form>
            
        </div>
    )
}

export default User