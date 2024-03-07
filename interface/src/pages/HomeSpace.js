import CourseActivity from "../components/Features/CourseActivity";
import ProfileCard from "../components/Features/ProfileCard";
import { useState } from "react";
import { baseUrl } from "../Share";
import useFetch from "../components/hook/useFetch";

export default function HomeSpace(){
    

    const url = baseUrl + 'api/profile/';
    const { data , loading, error } =  useFetch(url, {
        method:'GET', 
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),}
    });
    
    
        
    const [profile, setProfile] = useState(data);
    console.log(data, "data from profile", error, loading);


    

    return(
        <div className="grid grid-cols-7">
            <div className="col-span-4" id="COURSE ACTIVITY">
                
                {!loading && <CourseActivity profileData={data} /> }
            </div>
            <div className="col-span-3">
                {!loading && <ProfileCard profileData={data} /> }

                
            </div>
        </div>
        //<CourseDisplay/>

    )
}