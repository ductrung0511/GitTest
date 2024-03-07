// ExampleComponent.js
import React, { useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import { baseUrl } from "../../Share";


function TestingUseFetch() {
    const url = baseUrl + 'api/courses/';
    

    const { data , loading, error } =  useFetch(url, {
        method:'GET', 
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),}
    });
   
    const [courses, setCourses] = useState(null);
    useEffect(() => {
        if (data) {
            setCourses(data.courses);
        }
    }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
    
    


  return (
    <div>
      {data? console.log(data): console.log("glitch")}
      {courses? console.log(courses, "lmao courses"): console.log("glitch C")}
      {data?.courses ?  console.log(data.courses, "unsere Unterrichten"): console.log("glitched courses") }
    </div>
  );
}

export default TestingUseFetch;
