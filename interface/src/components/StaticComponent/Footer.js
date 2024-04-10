
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const content = { 
    Company:[{name: "About us", href:"https://www.facebook.com/anhngunewzealand"}, 
            {name: "Career", href:"https://www.facebook.com/anhngunewzealand"},
            {name: "Blog", href:"https://www.nzec.edu.vn/#/blog/"}, 
            {name: "Partnerships", href:"https://www.facebook.com/anhngunewzealand"}, 
                    ],
    Community:[{name: "Team plans", href:"#"}, 
            {name: "Share", href:"https://www.nzec.edu.vn/"},
            
                    ],
    Teaching:[{name: "Become a Teacher", href:"https://www.facebook.com/anhngunewzealand"}, 
            {name: "Teacher Help Center", href:"https://www.facebook.com/anhngunewzealand"},
            {name: "Rules & Requirements", href:"https://www.facebook.com/anhngunewzealand"},
                    ],
    Test:[{name: "Help Test Center", href:""}, 
            {name: "Mock Test Service", href:"https://www.nzec.edu.vn/#/blog/"},
            {name: "Test appeal", href:"https://www.nzec.edu.vn/#/blog/"},
            {name: "Exercise", href:"https://www.nzec.edu.vn/#/workspace/dashboard/"}, 
            {name: "Material", href:"https://www.nzec.edu.vn/#/workspace/resources/"}, 
            {name: "Workshops", href:"https://www.nzec.edu.vn/"}, 
                    ],
                };
    const keys= ["Company", "Community", "Teaching", "Test"];
    const footerContent =  [{name: "Help", href:"https://www.facebook.com/anhngunewzealand"}, 
                        {name: "Privacy", href:'https://www.facebook.com/anhngunewzealand'},
                        {name: "Terms", href:"https://www.facebook.com/anhngunewzealand"},
                        {name: "Your Privacy", href:"https://www.facebook.com/anhngunewzealand"}, 
                                ];


export default function Footer()
{

    return(
        <section className="bg-gray-900 h-[70vh] pb-20  z-40" >
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