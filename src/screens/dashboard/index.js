import React, { useEffect, useState } from 'react'
import '../../styles/index.css'
import UserData from './UserData'
import { useSelector, useDispatch } from 'react-redux'
import { setError, setErrorMessage, setLoading, setUsers, } from '../../redux/usersSlice'
import { USERS } from '../../constants/constants'

const Dashboard = () => {
    const usersList = useSelector((state) => state.users.usersList)
    const dispatch = useDispatch()

    const [type, setType] = useState("New users")
    const [page, setPage] = React.useState(1);
    const [searchBy, setSearchBy] = React.useState("");

    useEffect(() => {
        dispatch(setLoading(true))
        fetch(`${USERS}?page=${page}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(result => {
                        dispatch(setUsers(result.data))
                    });
                } else {
                    dispatch(setError(true));
                    dispatch(setErrorMessage("Something went wrong"));
                    clearError()
                }
                dispatch(setLoading(false))
            }).catch(error => {
                dispatch(setError(true));
                dispatch(setErrorMessage(error.message ? error.message : "Something went wrong"));
                clearError()
            })
    }, [page])

    const clearError = () => {
        setTimeout(() => {
            dispatch(setError(false));
            dispatch(setErrorMessage(""));
        }, 3000)
    }

    return (
        <div className='dashboard-screen-container'>
            <h1>Users</h1>
            <div className='search-list'>
                <div className='search-block'>
                    <div className='search-container'>
                        <img className='magnify' src={require('../../assets/search.png')} />
                        <input type={'search'} className="search-field" placeholder='Search Users' onChange={(e) => setSearchBy(e.target.value)} />
                    </div>
                </div>
                <div className='type-list'>
                    <div className={type === "Reputation" ? 'type-button-selected' : 'type-button'} onClick={() => setType('Reputation')}>
                        <p>Reputation</p>
                    </div>
                    <div className={type === "New users" ? 'type-button-selected' : 'type-button'} onClick={() => setType('New users')}>
                        <p>New users</p>
                    </div>
                    <div className={type === "Voters" ? 'type-button-selected' : 'type-button'} onClick={() => setType('Voters')}>
                        <p>Voters</p>
                    </div>
                    <div className={type === "Moderators" ? 'type-button-selected' : 'type-button'} onClick={() => setType('Moderators')}>
                        <p>Moderators</p>
                    </div>
                </div>
            </div>
            <div className="grid-container">
                {usersList.filter(user => `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchBy.toLowerCase())).map((item, index) => (
                    <UserData userDetails={item} key={index} />
                ))}
            </div>
            <div className="pagination">
                <a href="#">&laquo;</a>
                <a className={page === 1 ? "active" : ""} href="#" onClick={() => setPage(1)}>1</a>
                <a className={page === 2 ? "active" : ""} href="#" onClick={() => setPage(2)}>2</a>
                <a href="#">&raquo;</a>
            </div>
        </div >
    )
}

export default Dashboard