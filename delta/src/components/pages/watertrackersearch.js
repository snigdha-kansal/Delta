import React, {useEffect, useState} from 'react';
import {collection, getDocs, query, where, orderBy} from 'firebase/firestore';
import {database, author} from '../../firebase';
import {convertDateObjectToStr} from './watertracker';
import '../../styles/watertrackersearchstyle.css'
import {Link} from 'react-router-dom'

function WaterTrackerSearch()
{
    const [temp] = useState(false);
    const [invalidSearch, setInvalidSearch] = useState("");
    const [waterEntries, setWaterEntries] = useState([]);
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    useEffect(() => {
        const retrievePastWaterData = async () => {
        if (author.currentUser === null)
        {
            window.location.assign("/");
        }

        const user = author.currentUser.uid;
        const waterQ = query(collection(database, "waterData"), where("authorID", "==", user), orderBy("date"));
        const waterQRes = await getDocs(waterQ);
        const len = waterQRes.docs.length;
        let tempWaterEntries = [];

        if (len > 0)
        {
            let firstDate = waterQRes.docs[0]._document.data.value.mapValue.fields.date.timestampValue;
            firstDate = new Date(firstDate);
            let lastDate = waterQRes.docs[len-1]._document.data.value.mapValue.fields.date.timestampValue;
            lastDate = new Date(lastDate);

            setMinDate(`${firstDate.getFullYear()}-${String(firstDate.getMonth() + 1).padStart(2, '0')}-${String(firstDate.getDate()).padStart(2, '0')}`);
            setMaxDate(`${lastDate.getFullYear()}-${String(lastDate.getMonth() + 1).padStart(2, '0')}-${String(lastDate.getDate()).padStart(2, '0')}`);

            let j = len - 1;
            for (let i = lastDate; i >= firstDate; i.setDate(i.getDate() - 1))
            {
                const date = convertDateObjectToStr(i);
                const dateFromDatabse = waterQRes.docs[j]._document.data.value.mapValue.fields.dateStr.stringValue;
                if (date === dateFromDatabse)
                {
                    const amount = waterQRes.docs[j]._document.data.value.mapValue.fields.value.integerValue;
                    tempWaterEntries.push(
                        {dateEntry: dateFromDatabse, amountEntry: amount}
                    );
                    j--;
                }
                else
                {
                    tempWaterEntries.push(
                        {dateEntry: date, amountEntry: 0}
                    );
                }
            }
        }
        else
        {
            const date = new Date();
            date.setHours(0, 0, 0, 0);

            setMinDate(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`);
            setMaxDate(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`);

            const dateStr = convertDateObjectToStr(date);

            tempWaterEntries.push(
                {dateEntry: dateStr, amountEntry: 0}
            );
        }

        setWaterEntries(tempWaterEntries);
    };

    retrievePastWaterData();
    }, [temp]);

    async function handleSearch()
    {
        let start = document.getElementById("start").value + "T00:00:00";
        let end = document.getElementById("end").value + "T00:00:00";

        let startDate;
        let endDate;

        if (start !== "T00:00:00")
        {
            startDate = new Date(start);
        }
        if (end !== "T00:00:00")
        {
            endDate = new Date(end);
        }

        if (start === "T00:00:00" || end === "T00:00:00")
        {
            if (author.currentUser === null)
            {
                window.location.assign("/");
            }
            const user = author.currentUser.uid;
            const waterQ = query(collection(database, "waterData"), where("authorID", "==", user), orderBy("date"));
            const waterQRes = await getDocs(waterQ);
            const len = waterQRes.docs.length;
            if (len > 0)
            {
                if (start === "T00:00:00")
                {
                    startDate = waterQRes.docs[0]._document.data.value.mapValue.fields.date.timestampValue;
                    startDate = new Date(startDate);
                }
                if (end === "T00:00:00")
                {
                    endDate = waterQRes.docs[len-1]._document.data.value.mapValue.fields.date.timestampValue;
                    endDate = new Date(endDate);
                }
            }
            else
            {
                if (start === "T00:00:00")
                {
                    startDate = new Date();
                    startDate.setHours(0, 0, 0, 0);
                }
                if (end === "T00:00:00")
                {
                    endDate = new Date();
                    endDate.setHours(0, 0, 0, 0);
                }
            }
        }

        if (startDate > endDate)
        {
            setInvalidSearch("Invalid Range");
            return;
        }
        else
        {
            setInvalidSearch("");
        }

        if (author.currentUser === null)
        {
            window.location.assign("/");
        }
        const user = author.currentUser.uid;
        const waterQ = query(collection(database, "waterData"), where("authorID", "==", user), where("date", ">=", startDate), where("date", "<=", endDate), orderBy("date"));
        const waterQRes = await getDocs(waterQ);
        const len = waterQRes.docs.length;
        let tempWaterEntries = [];
        if (len > 0)
        {
            let j = len - 1;
            for (let i = endDate; i >= startDate; i.setDate(i.getDate() - 1))
            {
                const date = convertDateObjectToStr(i);
                let dateFromDatabase = "";
                if (j >= 0)
                {
                    dateFromDatabase = waterQRes.docs[j]._document.data.value.mapValue.fields.dateStr.stringValue;
                }
               
                if (date === dateFromDatabase)
                {
                    const amount = waterQRes.docs[j]._document.data.value.mapValue.fields.value.integerValue;
                    tempWaterEntries.push(
                        {dateEntry: dateFromDatabase, amountEntry: amount}
                    );
                    j--;
                }
                else
                {
                    tempWaterEntries.push(
                        {dateEntry: date, amountEntry: 0}
                    );
                }
            }
        }
        else
        {
            for (let i = endDate; i >= startDate; i.setDate(i.getDate() - 1))
            {
                const date = convertDateObjectToStr(i);
                tempWaterEntries.push(
                    {dateEntry: date, amountEntry: 0}
                );
            }
        }

        setWaterEntries(tempWaterEntries);
    }

    return(
        <div className='page'>
            <div className='title1'>
                Your Water Intake
            </div>
            <br/>
            <Link className='a1' to='/watertracker'>Go Back</Link>
            <div>
                <br/>
                <div className='wrap-top3'>
                <div className='box4'>
                    <div className='text'> Start Date : {' '}
                    <input className='input-search' onKeyDown={(e) => e.preventDefault()} type="date" min={minDate} max={maxDate} id="start"/>
                    </div>
                </div>
                <div className='box4'>
                    <div className='text'> End Date : {' '}
                    <input className='input-search' onKeyDown={(e) => e.preventDefault()} type="date" min={minDate} max={maxDate} id="end"/>
                    </div>
                </div>
                <div>
                <button className='button4' onClick={handleSearch}>Search</button>
                </div>
                <div className='invalid'>{invalidSearch}</div>
            </div>
            </div>
            <div>
                {waterEntries.map(({dateEntry, amountEntry}) => {
                    return (
                    <div className='data-box1' key={dateEntry}>
                        <div className='data'>
                            {dateEntry}
                        </div>
                        <div className='amounts'>
                            {amountEntry} fluid ounces
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WaterTrackerSearch;