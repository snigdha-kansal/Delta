import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LogIn from "./pages/login";
import Board from "./pages/bulletinboard/board";
import ArchiveSearch from './pages/archive';
import Tracker from "./pages/tracker";
import Journal from "./pages/journal";
import Settings from "./pages/settings";
import SleepTracker from './pages/sleeptracker';
import SleepTrackerSearch from './pages/sleeptrackersearch';
import WaterTracker from "./pages/watertracker";
import WaterTrackerSearch from "./pages/watertrackersearch";
import MoodTracker from "./pages/moodtracker";
import MoodTrackerSearch from './pages/moodtrackersearch';
import SearchImages from './pages/bulletinboard/imageboxes/images1';
import SearchImages2 from './pages/bulletinboard/imageboxes/images2';
import SearchImages3 from './pages/bulletinboard/imageboxes/images3';
import SearchImages4 from './pages/bulletinboard/imageboxes/images4';
import '../styles/appstyle.css'

function App()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path = "/" element={<LogIn />} />
                <Route path = "/board" element={<Board />} />
                <Route path = "/archive" element={<ArchiveSearch />} />
                <Route path = "/tracker" element={<Tracker />} />
                <Route path = "/sleeptracker" element={<SleepTracker />} />
                <Route path = "/SleepTrackerSearch" element={<SleepTrackerSearch/>}/>
                <Route path = "/journal" element={<Journal />} />
                <Route path = "/settings" element={<Settings />} />
                <Route path = "/WaterTracker" element={<WaterTracker />} />
                <Route path = "/WaterTrackerSearch" element={<WaterTrackerSearch/>}/>
                <Route path = "/MoodTracker" element={<MoodTracker />} />
                <Route path = "/MoodTrackerSearch" element={<MoodTrackerSearch/>}/>
                <Route path='/searchImages' element={<SearchImages/>}/>
                <Route path='/searchImages2' element={<SearchImages2/>}/>
                <Route path='/searchImages3' element={<SearchImages3/>}/>
                <Route path='/searchImages4' element={<SearchImages4/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;