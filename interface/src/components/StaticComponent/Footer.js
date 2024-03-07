
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const content = { 
    Company:[{name: "about", href:"#"}, 
            {name: "career", href:"#"},
            {name: "press", href:"#"},
            {name: "blog", href:"#"}, 
            {name: "Affiliates", href:"#"}, 
            {name: "Partnerships", href:"#"}, 
                    ],
    Community:[{name: "team plans", href:"#"}, 
            {name: "Refer to a friend", href:"#"},
            {name: "Membership", href:"#"},
            {name: "Scholarship", href:"#"}, 
            {name: "Free classes", href:"#"}, 
                    ],
    Teaching:[{name: "Become a Teacher", href:"#"}, 
            {name: "Teacher Help Center", href:"#"},
            {name: "Teacher Rules & Requirements", href:"#"},
                    ],
    Testing:[{name: "Help Test Center", href:"#"}, 
            {name: "Mock Test Service", href:"#"},
            {name: "Test appeal", href:"#"},
            {name: "Exercise", href:"#"}, 
            {name: "Material", href:"#"}, 
            {name: "Workshops", href:"#"}, 
                    ],
                };
    const keys= ["Company", "Community", "Teaching", "Testing"];
    const footerContent =  [{name: "Help", href:"#"}, 
                        {name: "Privacy", href:"#"},
                        {name: "Terms", href:"#"},
                        {name: "Your Privacy", href:"#"}, 
                                ];
    console.log(footerContent.map((item) =>{ return item.name}));


export default function Footer()
{

    return(
        <section className="bg-gray-900 h-[70vh] pb-20 " >
            <div className="w-full h-4 shadow-2xl bg-gray-900"></div>
            <div className="grid grid-cols-4 gap-3 mt-10 px-14">
                {keys.map((key) =>{return(
                    <div className="flex flex-col py-5 mx-3" key={key}>
                        <div className="text-white font-light text-lg mb-3"> 
                            {key}
                        </div>
                        {content[key].map((item) => { return(
                            <Link to={item.href} key={item.name} className="no-underline text-white text-sm font-semibold">
                                <p key={item.name} className="py-0 my-0"> {item.name}</p>
                            </Link>
                             )})}
                    </div> 
                )})}

            </div>
            <div className="w-full h-0.5  bg-green-900"></div>
            <div className="flex flex-row mt-4 gap-2 items-center ">
                <p  className="py-0 my-0 mx-10 text-gray-400 mr-10">@ NeuTech, Inc, 2024</p>
                {footerContent.map((item) => {
                    
                        return (
                            <Link to={item.href} key={item.name} className="no-underline mx-6 text-white text-sm font-semibold">
                                <p className="py-0 my-0 mb-10 "> {item.name}</p>
                            </Link>
                        )
                })}

            </div>

                

            
        </section>
    )
}






{/*                
{Object.keys(content).map((key) => {

                    {content[key].map((item) => { return(<div key={item.name}> itemasfdsa </div>)})}
                    
                    
                    
                    
                    })}


                <Link to={'/course'}>
                    
                        <span className="font-bold bg-color-secondary text-md no-underline p-2 rounded-md text-gray-700">
                             Course </span>
                    
                </Link>
                
                 <div className=" bg-color-primary">
                    <div className="p-1 flex flex-col ">
                        <div>
                            <p>GCN hoạt động: <strong>2190 / GCN</strong> Hà Thành</p>
                        </div>
                        <div>
                            <p>
                                Cơ sở 1: Tháp T1, Times Tower, 35 Lê Văn Lương, Q. Thanh Xuân.
                            </p>
                            <p>
                            Cơ sở 2: 33 Phạm Tuấn Tài, Q. Cầu Giấy.
                            </p>
                            <p>
                                <strong>
                                    IPA Hà Thành - Hotline: 911
                                </strong>
                            </p>
                        </div>
                    </div>           
                </div>
                 
                 */}