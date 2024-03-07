export default function Features(){

    const people = [
        {name: "Marques Brownlee", school:"Thpt Lam Sơn 12a1", image:"/hocsinh1.jpg"},
        {name: "Mike Mentzer", school:"Thpt Thăng Long 12a1", image:"/student2.jpg" },
        {name: "Marques Brownlees", school: "Thcs Nguyễn Trãi 12a1", image:"/student3.jpg" },
        {name: "Tom Platz", school:"Thpt Lam Sơn 12a1", image:"/student4.jpg" },
        {name: "Amelie Satzger", school:"Thcs Nguyễn Trãi 12a1", image:"/student7.jpg" },
        {name: "Marques Brownleez", school:"Thpt Thăng Long 12a1", image:"/student2.jpg" },
    ]

    
return(


    <section id="feature" className=" flex flex-col mb-1 bg-gray-100"
  
    >
        <h4 className="text-color-secondary-dark font-bold mb-1 text-center text-bold text-3xl mt-20">Vinh danh các học viên </h4>
            


        <div className="grid md:grid-cols-2 lg:grid-cols-3 px-14  py-8 gap-2 bg-gray-100 overflow-hidden">
            {people.map((person)=>{
                return <div  key={person.name} className="relative w-full h-80 px-5 bg-cover " style={{backgroundImage: `url(${person.image})`}}>
                    <div className="absolute bottom-0 w-full  left-10 ">
                        <p className="text-3xl font-extrabold text-white"> _</p>
                        <p className="text-base font-extrabold text-white"> _</p>
                    </div>
                    <div className="absolute w-full h-full top-0 left-0 bg-black/10"></div>

                </div>



            })}


            
            

        </div>

    </section>


)
}



/*
<div className="ml-4 border-4 h-[60vh]  w-full shadow-2xl bg-white  shadow-color-primary-dark border-solid border-color-gray text-center py-1 px-1 rounded-lg cursor-pointer hover:bg-color-secondary hover:text-color-secondary-dark ease-out duration-400">          
                    <div className=" flex items-center justify-center shadow-2xl shadow-color-blue ">
                        <img className ="w-auto h-[37vh] rounded-lg border-solid border-color-gray border-2 " alt="..." src="https://ippedu.com/wp-content/uploads/2024/01/thanh-mai-7.5.jpg"/>
                    </div>
                    <div className="grid grid-col-1 pl-3">
                        <p className=" ml-3 font-extrabold text-gray-800 capitalize text-lg p-0 m-0 text-left ">Ms Anh Trúc</p>
                        <p className=" pl-3 font-semi text-black   p-0 m-0 uppercase text-left">8.0 IELTS</p>
                        <div className="grid grid-cols-3 p-0 m-0 pt-3 ">
                            <div className="flex items-center flow flow-row col-span-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" class="w-6 h-6 text-blue-400 mr-1">
                                    <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                                    <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                                </svg>
                                <p className="text-sm text-blue-400 p-0 m-0">
                                    Cử nhân
                                </p>
                            </div>
                            <div className="flex items-center flow flow-row col-span-2 ml-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="w-6 h-6 text-blue-400 mr-1">
                            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                            </svg>

                                <p className="text-sm text-blue-400 p-0 m-0 ">
                                    3 năm kinh nghiệm
                                </p>
                            </div>


                        </div>           
                    </div>
            </div>

            
            <div className=" ml-4 border-4 h-[60vh]  w-full  shadow-2xl bg-white  shadow-color-primary-dark border-solid border-color-gray text-center py-1 px-1 rounded-lg cursor-pointer hover:bg-color-secondary hover:text-color-secondary-dark ease-out duration-400">          
                <div className=" flex items-center justify-center shadow-2xl shadow-color-blue ">
                    <img className ="w-auto h-[37vh] rounded-lg border-solid border-color-gray border-2 " alt="..." src="https://ippedu.com/wp-content/uploads/2023/12/BAO-KHANH-8.0.jpg"/>
                </div>
                <div className="grid grid-col-1 pl-3">
                    <p className=" ml-3 font-extrabold text-gray-800 capitalize text-lg p-0 m-0 text-left ">Ms Anh Trúc</p>
                    <p className=" pl-3 font-semi text-black   p-0 m-0 uppercase text-left">8.0 IELTS</p>
                    <div className="grid grid-cols-3 p-0 m-0 pt-3 ">
                        <div className="flex items-center flow flow-row col-span-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" class="w-6 h-6 text-blue-400 mr-1">
                                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                                <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                                <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                            </svg>
                            <p className="text-sm text-blue-400 p-0 m-0">
                                Cử nhân
                            </p>
                        </div>
                        <div className="flex items-center flow flow-row col-span-2 ml-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="w-6 h-6 text-blue-400 mr-1">
                        <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                        </svg>

                            <p className="text-sm text-blue-400 p-0 m-0 ">
                                3 năm kinh nghiệm
                            </p>
                        </div>


                    </div>           
                </div>
            </div>

            <div className=" ml-4 border-4 h-[60vh]  w-full shadow-2xl bg-white shadow-color-primary-dark border-solid border-color-gray text-center py-1 px-1 rounded-lg cursor-pointer hover:bg-color-secondary hover:text-color-secondary-dark ease-out duration-400">          
                <div className=" flex items-center justify-center shadow-2xl shadow-color-blue ">
                    <img className ="w-auto h-[37vh] rounded-lg border-solid border-color-gray border-2 " alt="..." src="https://ippedu.com/wp-content/uploads/2023/12/BAO-KHANH-8.0.jpg"/>
                </div>
                <div className="grid grid-col-1 pl-3">
                    <p className=" ml-3 font-extrabold text-gray-800 capitalize text-lg p-0 m-0 text-left ">Ms Anh Trúc</p>
                    <p className=" pl-3 font-semi text-black   p-0 m-0 uppercase text-left">8.0 IELTS</p>
                    <div className="grid grid-cols-3 p-0 m-0 pt-3 ">
                        <div className="flex items-center flow flow-row col-span-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" class="w-6 h-6 text-blue-400 mr-1">
                                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                                <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                                <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                            </svg>
                            <p className="text-sm text-blue-400 p-0 m-0">
                                Cử nhân
                            </p>
                        </div>
                        <div className="flex items-center flow flow-row col-span-2 ml-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="w-6 h-6 text-blue-400 mr-1">
                        <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                        </svg>

                            <p className="text-sm text-blue-400 p-0 m-0 ">
                                3 năm kinh nghiệm
                            </p>
                        </div>


                    </div>           
                </div>
            </div>
            <div className="ml-4 border-4 h-[60vh] bg-white w-full  shadow-2xl shadow-color-primary-dark border-solid border-color-gray text-center py-1 px-1 rounded-lg cursor-pointer hover:bg-color-secondary hover:text-color-secondary-dark ease-out duration-400">          
                <div className=" flex items-center justify-center shadow-2xl shadow-color-blue ">
                    <img className ="w-auto h-[37vh] rounded-lg border-solid border-color-gray border-2 " alt="..." src="https://ippedu.com/wp-content/uploads/2024/01/thanh-truc-7.5.jpg"/>
                </div>
                <div className="grid grid-col-1 pl-3">
                    <p className=" ml-3 font-extrabold text-gray-800 capitalize text-lg p-0 m-0 text-left ">Ms Anh Trúc</p>
                    <p className=" pl-3 font-semi text-black   p-0 m-0 uppercase text-left">8.0 IELTS</p>
                    <div className="grid grid-cols-3 p-0 m-0 pt-3 ">
                        <div className="flex items-center flow flow-row col-span-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" class="w-6 h-6 text-blue-400 mr-1">
                                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                                <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                                <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                            </svg>
                            <p className="text-sm text-blue-400 p-0 m-0">
                                Cử nhân
                            </p>
                        </div>
                        <div className="flex items-center flow flow-row col-span-2 ml-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="w-6 h-6 text-blue-400 mr-1">
                        <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                        </svg>

                            <p className="text-sm text-blue-400 p-0 m-0 ">
                                3 năm kinh nghiệm
                            </p>
                        </div>


                    </div>           
                </div>
            </div>
*/