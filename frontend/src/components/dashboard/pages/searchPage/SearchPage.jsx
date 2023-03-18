import './search.css';

import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {SearchBar, Event} from "../../elements";
import httpClient from "../../../../httpClient";

const SearchPage = (props) => {
    const user = props.user;
    const [events, setEvents] = useState([]);
    const setCurrentEvent = props.setCurrentEvent;

    const navigate = useNavigate();
    
    let query = new URLSearchParams(useLocation().search);
    const searchValue = query.get("searchParams")

    const searchData = {
        "event_name" : searchValue
    }

    useEffect(() => {
        if (user == null) {
            navigate("/")
        }
    }, [user])


    useEffect(() => {
        httpClient.post('/event/search', searchData)
        .then(response => {
            setEvents(response)
        })
        .catch(error => {
            console.log(error)
            if (error.response && error.response.status === 401) {
                alert(error.response.data.msg);
            }
        });
    }, [])

    const eventsList = events.map((item, index) =>
        <Event key={`event${index}`}
               id={item.event_id}
               item={item}
               setCurrenteEvent={setCurrentEvent}
        />)

    return (
        <div className={'contentContainer'}>
            <SearchBar />

            <h1 className={'dashboardTitle'}>SEARCH RESULTS</h1>
            <h1>Search value: {searchValue}</h1>
            <div className={'eventsListContainer'}>
                {eventsList}
            </div>
            
        </div>
    )

}

export default SearchPage;