
import { NavLink, useNavigate } from 'react-router-dom';
import Login from './Login&LogoutButton';
import { animate, motion } from "framer-motion"
import { Tooltip } from 'react-tooltip';
import { baseUrl } from '../../Share';
import { useLocation } from 'react-router-dom';
const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Course', href: '/course' },
    { name: 'Blog', href: '/blog' },
    { name: 'Workspace', href: '/workspace' },
  ];
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
export default function FirstView()

{
    const backgroundImageUrl = '/background.jpg';

  const containerStyle = {
    backgroundImage: `url('${backgroundImageUrl}')`,
    // Add other styles as needed
  };
    const scrollToPosition = (position) => {
        window.scrollTo({
        top: position,
        behavior: 'smooth' // This gives a smooth scrolling effect
        });
    };
    const profileImgUrl = localStorage.getItem('profile_img');
    const navigate = useNavigate();
    const location = useLocation();
    const SVGvariants = {
        hidden:{
        opacity: 0,
        rotate: -180,
        },
        visible:{
        opacity:1,
        rotate: 0,
        transition:{
            duration:1
        }
        }
    }
    const pathVariants = {
        hidden:{
        pathLength: 0,
        opacity: 0
        },
        visible:{
        pathLength:1,
        opacity:1,
        transition:{
            duration: 2,
            ease: "easeInOut",
        }
        }
    }
    const drop= {
        initial:{
        opacity: 0,
        x:'-100vw',
        },
        animate:{
        opacity:1,
        x: '0vw',
        transition:{
            duration: 2,
            ease: "easeInOut",
        }
        }

    }
    const handleSaveCourse =() =>{
        const courseID = 5;
        const putData = {
            courseSave:  localStorage.getItem("courseSave")  + courseID    + '/',
            courseAuth :  localStorage.getItem("courseAuth")  + courseID    + '/' };
        const url = baseUrl + "api/profile/";
        async function updateCourseSave() {
            try {
              const response = await fetch(url, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
                body: JSON.stringify(putData),
            });
              if(response.status === 404) console.log("Not found");
              if(response.status === 401) 
              {
                navigate("/login",{
                state:{ previousUrl : location.pathname,}
              });
              
            }
              else if (!response.ok) {
                console.error("Something went wrong");
                return;
              }
                const data = await response.json();   
                localStorage.setItem('courseSave',  data.courseSave );
                // setCourseSaveList(localStorage.getItem('courseSave').split('/'))
                navigate('/workspace/dashboard/')

                
            } catch (error) {
                console.error("Error adding data:", error);
            }
            
        }
        updateCourseSave();
    }

    return(



        <div
            className="w-screen h-screen bg-no-repeat bg-cover bg-fixed flex flex-col justify-between relative"
            style={containerStyle}
       >
            <motion.button
            drag
            dragElastic={0.8}
            initial={
                {
                    opacity:0,
                    x: '100vw',
                }
            }
            animate={{opacity:0.9, x:0,}}
            transition={{delay: 0.3, duration: 1.4}}
            whileHover={{
                scale:1.1,
                textShadow:"0px 0px 8px rgb(255,255,255)",
                boxShadow:"0px 0px 8px rgb(255,255,255)",
              }}
            exit={{
                x:'-100vw',
                transition: {ease: 'easeInOut'},
              }}
            className='bg-pink-400 p-2  rounded-lg text-md font-light absolute top-20 right-4'
            onClick={()=>{navigate('/workspace/dashboard/')}}
            >
                <p className='text-md'> Enter the workspace for Student and Teacher  </p>

            </motion.button>
            <div className="flex flex-row justify-between h-24 px-3 py-3">

                <div className="flex">
                    <motion.img
                      className="h-[10vh] w-auto rounded  bg-transparent"
                      src="/logoTransparent.png"
                      alt="Your Company"
                      variants={SVGvariants}
                        initial="hidden"
                        animate="visible"
                    />
                    {/* <motion.svg className='h-16 w-48' version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="7045.000000pt" height="1736.000000pt" viewBox="0 0 7045.000000 1736.000000"
                    preserveAspectRatio="xMidYMid meet" 
                    variants={SVGvariants}
                    initial="hidden"
                    animate="visible"
                     >

                    <g transform="translate(0.000000,1736.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                    <motion.path 
                    variants={pathVariants}

                     d="M3282 14061 c-1986 -1990 -3282 -3296 -3282 -3307 0 -18 3252 -3285
                    3276 -3292 6 -2 749 738 1650 1643 901 905 1643 1644 1649 1643 5 -2 2233
                    -2230 4949 -4951 l4940 -4948 974 973 c535 535 2017 2020 3294 3300 l2320
                    2328 -1643 1649 -1644 1650 -1651 -1650 -1650 -1650 -4940 4948 c-2716 2721
                    -4943 4949 -4949 4950 -5 2 -1487 -1477 -3293 -3286z"/>
                    <motion.path  
                    variants={pathVariants}
                    d="M18111 15705 l-1643 -1645 1643 -1650 c903 -907 1645 -1650 1648
                    -1650 6 0 2630 2626 3086 3088 l210 212 -1645 1645 c-905 905 -1648 1645
                    -1651 1645 -3 0 -745 -740 -1648 -1645z"/>
                    <motion.path 
                    variants={pathVariants}
                    d="M26910 14140 l0 -3130 715 0 715 0 2 1898 3 1898 1555 -1898 1555
                    -1898 593 0 592 0 0 3130 0 3130 -715 0 -715 0 -2 -1894 -3 -1895 -1548 1895
                    -1548 1894 -600 0 -599 0 0 -3130z"/>
                    <motion.path 
                    variants={pathVariants}
                    d="M33410 14140 l0 -3130 3659 0 3660 0 -181 533 c-99 292 -187 553
                    -196 579 l-16 48 -2745 2 -2746 3 -3 723 -2 722 2506 0 c2383 0 2506 1 2499
                    18 -4 9 -87 256 -185 547 -98 292 -181 538 -185 548 -7 16 -127 17 -2321 17
                    l-2314 0 0 680 0 680 2080 0 c1144 0 2080 3 2080 8 0 4 -85 264 -188 577
                    l-188 570 -2607 3 -2607 2 0 -3130z"/>
<path d="M39276 17248 c7 -22 1555 -4746 1885 -5751 l160 -487 772 2 772 3
705 2107 c388 1158 708 2109 711 2112 3 3 314 -945 691 -2106 l685 -2113 776
-3 776 -2 80 242 c167 507 1961 6006 1961 6012 0 3 -310 6 -689 6 l-690 0
-165 -502 c-91 -277 -417 -1272 -725 -2212 -309 -940 -562 -1711 -564 -1712
-2 -2 -791 2442 -1370 4244 l-58 182 -671 -2 -671 -3 -732 -2187 c-402 -1203
-734 -2190 -736 -2193 -3 -2 -310 946 -682 2108 -373 1161 -689 2149 -704
2195 l-27 82 -749 0 -748 0 7 -22z"/>
<path d="M26917 10273 c-4 -3 -7 -384 -7 -845 l0 -838 1897 -2 1897 -3 -1897
-1555 -1896 -1555 -1 -727 0 -728 2865 0 2865 0 0 845 0 845 -1891 2 -1890 3
1890 1555 1891 1555 0 728 0 727 -2858 0 c-1572 0 -2862 -3 -2865 -7z"/>
<path d="M33410 7150 l0 -3130 2273 0 2272 1 252 577 251 577 -1809 3 -1809 2
0 725 0 725 2137 2 2136 3 247 557 248 558 -2382 2 -2381 3 -3 677 -2 678
2687 2 2687 3 253 570 c139 314 253 576 253 583 0 9 -738 12 -3655 12 l-3655
0 0 -3130z"/>
<path d="M41401 10261 c-18 -33 -2763 -6205 -2768 -6223 -5 -17 35 -18 733
-18 l739 1 270 656 c149 361 276 668 283 682 20 38 634 1512 1068 2564 208
504 381 917 385 917 3 0 131 -303 284 -672 152 -370 476 -1152 718 -1738 242
-586 565 -1366 717 -1735 l276 -670 757 -3 c416 -1 757 1 757 5 -1 5 -628
1412 -1393 3128 l-1393 3120 -712 3 c-691 2 -712 2 -721 -17z"/>
<path d="M45630 7150 l0 -3130 2285 0 2285 0 0 590 0 590 -1565 0 -1565 0 0
2540 0 2540 -720 0 -720 0 0 -3130z"/>
<path d="M53371 10218 c-301 -674 -2751 -6187 -2751 -6192 0 -3 332 -6 738 -6
l737 0 277 668 c152 367 385 926 518 1242 133 316 458 1099 722 1740 264 641
483 1168 487 1172 3 4 100 -221 215 -500 115 -279 448 -1083 739 -1787 291
-704 645 -1561 787 -1905 l258 -625 756 -3 c416 -1 756 1 756 5 0 7 -2742
6157 -2772 6216 l-18 37 -711 0 -710 0 -28 -62z"/>
<path d="M58027 10273 c-4 -3 -7 -1412 -7 -3130 l0 -3123 715 0 715 0 2 1897
3 1896 1554 -1896 1555 -1897 593 0 593 0 0 3130 0 3130 -710 0 -710 0 -2
-1902 -3 -1902 -1554 1902 -1554 1902 -592 0 c-325 0 -595 -3 -598 -7z"/>
<path d="M64170 7150 l0 -3131 1618 4 c1441 3 1631 5 1747 20 744 96 1309 316
1815 707 115 89 372 343 464 460 441 557 657 1256 632 2040 -6 214 -17 323
-47 505 -172 1030 -844 1845 -1849 2245 -407 161 -833 247 -1340 270 -113 5
-843 10 -1622 10 l-1418 0 0 -3130z m3134 1916 c614 -86 1080 -358 1379 -803
201 -301 300 -665 300 -1108 1 -372 -56 -647 -189 -925 -240 -500 -708 -850
-1299 -970 -227 -47 -305 -50 -1117 -50 l-768 0 0 1941 0 1940 788 -4 c664 -4
806 -7 906 -21z"/>
<path d="M33430 1840 l0 -1201 113 3 112 3 3 1198 2 1197 -115 0 -115 0 0
-1200z"/>
<path d="M34331 3024 c-49 -26 -85 -85 -85 -142 1 -94 58 -153 154 -160 68 -5
107 12 147 64 22 30 27 47 28 95 0 62 -16 94 -68 133 -37 27 -130 33 -176 10z"/>
<path d="M36740 1840 l0 -1200 114 0 115 0 4 523 c4 574 3 562 68 697 44 88
143 187 229 228 80 37 195 62 293 62 242 0 406 -106 479 -310 23 -64 23 -71
28 -630 l5 -565 113 -3 113 -3 -3 588 c-4 530 -6 594 -22 653 -64 232 -223
390 -453 452 -111 29 -325 29 -438 -1 -160 -42 -307 -136 -387 -245 l-28 -39
0 496 0 497 -115 0 -115 0 0 -1200z"/>
<path d="M40663 2919 c-256 -26 -504 -134 -690 -304 -178 -161 -311 -425 -342
-680 -31 -251 6 -474 114 -690 210 -422 645 -651 1165 -614 271 20 502 117
683 288 l37 35 -77 78 -77 77 -51 -49 c-146 -138 -328 -208 -565 -217 -161 -7
-248 5 -383 51 -192 66 -358 193 -467 359 -107 162 -150 312 -150 522 0 210
45 366 150 524 173 258 428 395 760 408 271 10 461 -51 650 -208 l62 -52 74
74 74 73 -38 39 c-203 209 -568 322 -929 286z"/>
<path d="M26910 1775 l0 -1135 800 0 800 0 0 105 0 105 -680 0 -680 0 0 420 0
420 585 0 585 0 0 100 0 100 -585 0 -585 0 0 405 0 405 655 0 655 0 0 105 0
105 -775 0 -775 0 0 -1135z"/>
<path d="M46190 2530 l0 -190 -150 0 -150 0 0 -95 0 -95 150 0 150 0 0 -547
c0 -596 3 -633 57 -743 33 -68 104 -140 172 -174 175 -89 464 -69 601 42 l25
20 -39 80 -38 79 -67 -34 c-185 -94 -384 -48 -455 107 -20 44 -21 61 -24 608
l-3 562 261 0 260 0 0 95 0 95 -260 0 -260 0 0 190 0 190 -115 0 -115 0 0
-190z"/>
<path d="M29767 2350 c-93 -12 -198 -45 -282 -88 -67 -36 -178 -133 -223 -197
l-21 -30 -1 153 0 152 -110 0 -110 0 2 -847 3 -848 112 -3 112 -3 3 518 c4
570 4 567 70 703 41 85 140 184 228 227 94 46 211 67 335 60 242 -13 387 -124
447 -343 21 -76 22 -102 26 -621 l4 -543 109 0 110 0 -4 593 c-3 529 -5 598
-21 652 -68 231 -227 388 -450 445 -90 23 -244 32 -339 20z"/>
<path d="M31761 2349 c-462 -62 -766 -452 -712 -914 40 -342 250 -589 586
-691 81 -25 106 -27 250 -28 188 -1 249 11 395 81 83 40 107 58 189 140 l94
95 -6 -179 c-9 -270 -50 -396 -163 -503 -105 -99 -244 -142 -459 -143 -244 -1
-473 69 -622 189 -23 19 -45 34 -50 34 -11 -1 -115 -159 -111 -170 7 -19 117
-93 193 -130 157 -76 337 -118 535 -127 211 -9 374 20 529 94 174 83 286 229
343 443 22 84 22 91 25 943 l4 857 -106 0 -105 0 0 -155 c0 -85 -3 -155 -7
-155 -5 0 -19 16 -32 36 -75 110 -253 223 -412 263 -94 24 -259 33 -358 20z
m257 -199 c326 -42 542 -287 542 -615 0 -180 -56 -321 -175 -440 -122 -123
-267 -179 -465 -179 -135 -1 -195 12 -307 65 -188 90 -308 261 -333 475 -40
355 178 642 525 693 82 12 128 12 213 1z"/>
<path d="M35522 2350 c-150 -19 -249 -55 -348 -126 -128 -91 -191 -225 -181
-383 7 -116 28 -170 92 -239 101 -108 185 -142 537 -212 235 -48 302 -68 368
-110 60 -39 89 -83 97 -149 17 -143 -78 -247 -262 -286 -90 -19 -269 -19 -376
0 -137 24 -303 89 -386 151 l-32 24 -50 -90 c-28 -49 -51 -92 -51 -94 0 -9
127 -83 185 -108 64 -28 162 -58 260 -80 39 -8 127 -13 255 -12 168 0 206 3
275 22 166 46 301 136 358 240 89 164 69 374 -48 487 -95 94 -184 128 -497
191 -233 47 -295 62 -349 90 -103 51 -148 116 -149 212 0 134 98 230 273 266
196 41 481 -5 619 -99 20 -14 41 -25 45 -25 4 0 29 41 56 90 l47 89 -44 26
c-159 93 -482 151 -694 125z"/>
<path d="M42565 2350 c-332 -44 -582 -258 -681 -585 -25 -83 -28 -104 -28
-265 -1 -154 2 -185 22 -254 86 -298 299 -505 604 -588 71 -20 107 -23 253
-23 192 0 275 16 410 80 79 38 202 128 228 169 17 25 16 26 -44 95 l-61 70
-52 -44 c-76 -64 -160 -112 -251 -142 -70 -23 -97 -26 -215 -27 -155 -1 -222
13 -340 71 -101 49 -213 159 -264 260 -36 73 -66 173 -66 225 l0 28 708 2 707
3 3 50 c6 83 -17 233 -49 330 -125 375 -484 597 -884 545z m250 -205 c89 -19
196 -71 262 -130 98 -86 178 -239 198 -377 l7 -48 -601 0 -601 0 0 28 c0 52
30 152 66 225 50 98 163 212 257 256 124 59 272 75 412 46z"/>
<path d="M44705 2349 c-200 -27 -373 -121 -475 -258 l-40 -53 0 151 0 151
-110 0 -110 0 0 -850 0 -851 113 3 112 3 5 530 c5 476 7 536 24 585 82 249
285 390 561 390 273 0 449 -134 499 -382 13 -65 16 -163 16 -603 l0 -525 116
0 115 0 -3 577 c-4 559 -5 581 -26 657 -56 202 -167 339 -337 416 -122 56
-310 80 -460 59z"/>
<path d="M47941 2350 c-94 -13 -195 -46 -286 -93 -102 -53 -243 -189 -303
-293 -87 -150 -129 -338 -119 -523 14 -229 93 -415 242 -564 155 -155 349
-235 595 -244 217 -8 394 33 540 128 66 43 160 126 160 142 0 5 -27 40 -61 78
l-61 69 -56 -50 c-225 -200 -602 -226 -860 -58 -125 82 -221 219 -256 368 -9
36 -16 75 -16 88 l0 22 711 0 712 0 -6 123 c-3 72 -14 154 -26 202 -26 99 -95
241 -155 317 -99 125 -260 228 -418 268 -93 23 -248 32 -337 20z m300 -213
c142 -46 282 -160 347 -284 32 -61 72 -194 72 -240 l0 -23 -600 0 -600 0 0 23
c0 46 32 154 66 225 47 98 151 204 249 254 61 31 88 40 180 62 39 9 241 -3
286 -17z"/>
<path d="M50077 2349 c-89 -10 -197 -43 -271 -82 -72 -38 -165 -128 -205 -199
l-31 -53 0 163 0 162 -110 0 -110 0 0 -850 0 -850 115 0 115 0 0 485 c0 593 5
632 106 786 41 62 91 111 156 152 53 33 176 67 267 74 l91 6 0 108 0 109 -27
-1 c-16 -1 -59 -5 -96 -10z"/>
<path d="M34300 1490 l0 -850 110 0 110 0 0 850 0 850 -110 0 -110 0 0 -850z"/>
</g>
</motion.svg> */}

                    <div className="hidden sm:ml-6 sm:block   ">
                                <div className="flex space-x-4 pt-3 ">
                                {navigation.map((item) => (
                                    <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={({ isActive }) => {
                                        return ' no-underline px-3 py-2 rounded-md text-sm font-medium ' + (!isActive ?
                                        'text-gray-800 hover:bg-gray-700 hover:text-white' : 'bg-transparent text-white')
                                    }}
                                    >
                                    {}
                                    </NavLink>
                                ))}
                                </div>
                    </div>
                </div>
                <div className=' flex flex-row items-left rounded-lg py-1 mx-3 px-1  h-auto w-1/7 items-center bg-transparent'>
                    


                    {/* <div className='rounded-3xl pl-2 pr-4 py-1 flex gap-2 flex-row items-center border-gray-400 border-1' >
                        {profileImgUrl ? (
                            // If the profile image URL exists, display the image
                            <img src={profileImgUrl} alt='Profile' className='rounded-full bg-black' />
                        ) : (
                            // If the profile image URL is not found, display a placeholder or default image
                            <img src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m' alt='Profile'
                            className='rounded-full bg-black w-10 h-10' />
                        )}
                    <div className='text-base  text-gray-700'> {localStorage.getItem('username')}</div>

                    </div>
                    <Login/> */}
                    <div data-tooltip-content='Nhấn vào hình ảnh để mở Menu đăng nhập và xem các khóa học!' data-tooltip-id='my-tooltip' className='rounded-3xl pr-9 mr-10 flex gap-2 flex-row items-center border-gray-400  shadow-lg border-1' >
                      {/* {profileImgUrl ? (
                        // If the profile image URL exists, display the image
                        <img src={profileImgUrl} alt='Profile' className='rounded-full bg-black' />
                      ) : (
                        // If the profile image URL is not found, display a placeholder or default image
                        <img src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m' alt='Profile'
                         className='rounded-full bg-black w-10 h-10' /> 
                      )} */}
                      <div  className="dropdown dropdown-bottom dropdown-end">
                                <Tooltip id='my-tooltip' className='absolute z-40'/>
                                {/* <div  className="btn m-1">Click</div> */}
                                <img   tabIndex={0} role="button" className="w-12 h-12 rounded-full hover:opacity-30 duration-700" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m" alt="avatar"/>
                                <ul tabIndex={0} className="dropdown-content z-[1] items-center menu p-2 shadow bg-gray-200 text-black rounded-box w-52">
                                    <li  data-tooltip-content='Theo dõi các thống kê về khóa học của bạn' data-tooltip-id='my-tooltip' data-tooltip-place='left'  ><button onClick={()=> {navigate("/workspace/dashboard/")}} className='flex gap-1'>Dashboard<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                      </svg>
                                        </button> </li>

                                    <li data-tooltip-content='Tìm kiếm các khóa học của bạn' data-tooltip-id='my-tooltip' data-tooltip-place='left' ><button onClick={()=> {navigate("/workspace/resources/")}}>Courses<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg></button> </li>
                                    
                                    <li 
                                    data-tooltip-content='Theo dõi các các tài liệu của khóa học' data-tooltip-id='my-tooltip'  data-tooltip-place='right'
                                    ><button onClick={()=> {navigate("/workspace/resources/")}}>Material<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg></button> </li>
                                    <li
                                    data-tooltip-content='Đăng xuất hoặc đăng nhập tại đây' data-tooltip-id='my-tooltip'  data-tooltip-place='right'
                                    > <Login/> </li>
                                </ul>
                            </div>
                  <div className='text-base  text-gray-700 capitalize'> { Object.keys(localStorage).includes('username') ? localStorage.getItem('username') : <Login/> }</div>

                </div>

                    
                    
                    
                </div>
            </div>

            <div className="flex flex-col">
                <div className='w-50 pl-2 ml-14 h-72 flex flex-col pt-24 relative animate-wiggle-more animate-infinite animate-duration-1000 animate-ease-in'> 

                    {/*
                    <img src='' alt='https://www.ilsc.com/hubfs/30yrs-Logo.svg' className='text-white w-40 h-40'/>
                    */}
                    <p className='font-extrabold text-blue-800 text-3xl uppercase z-20 hover:text-4xl duration-700'> bring your  Tommorow closer </p>
                    <p className='font-extrabold text-blue-800 text-2xl ml-10 z-20 hover:text-3xl duration-700'>"Enter to learn leave to achieve" </p>
                    <p className='font-extrabold ml-10 text-white text-2xl'></p>

                    <div className='bg-white h-72 absolute  top-0 w-full z-10 left-0 filter blur-3xl'></div>

                    
  
                        
                    
                    

                    

                </div>
            
                <div className='flex flex-row justify-between h-40 px-3 py-3'>
                    <div className='flex flex-row justify-between items-end'>
                        <div>
                        <motion.button className="text-gray-900 bg-white border border-gray-300 focus:outline-none
                        hover:bg-gray-100 focus:ring-4
                        focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2
                        dark:bg-gray-800 dark:text-white dark:border-gray-600
                        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        whileHover={{
                            scale: [1.1,1],
                            textShadow:"0px 0px 8px rgb(255,255,255)",
                            boxShadow:"0px 0px 8px rgb(255,255,255)",
                          }}
                          transition={{ 
                            repeat: Infinity, // Repeat the animation indefinitely
                            repeatType: 'reverse',
                            duration: 0.7,
                            delay: 0.4
                            }}
                        initial={drop.initial}
                        animate={drop.animate}
                        onClick={()=>{ localStorage.getItem('access') ?   handleSaveCourse() : navigate('/login')}}>Language Test</motion.button>
                        <motion.button  onClick={()=>{scrollToPosition(7340)}} className="text-gray-900 bg-yellow-200 border-2 border-yellow-100 focus:outline-none
                        hover:bg-gray-100 focus:ring-4
                        focus:ring-gray-200 font-medium rounded-full text-sm pl-4 pr-2 py-2.5 me-2 mb-2
                        dark:bg-gray-800 dark:text-white dark:border-gray-600
                        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        whileHover={{
                            scale: [1.1,1],
                            textShadow:"0px 0px 8px rgb(255,255,255)",
                            boxShadow:"0px 0px 8px rgb(255,255,255)",
                          }}
                          transition={{ 
                            repeat: Infinity, // Repeat the animation indefinitely
                            repeatType: 'reverse',
                            duration: 0.7,
                            delay: 0.4
                            }}
                        
                        initial={drop.initial}
                        animate={drop.animate}
                        
                        >Aplly now 
                        
                        </motion.button>
                        </div>
                        

                    </div>
                    <div className='grid grid-cols-1 pb-2'>
                        <div className='h-10 w-full'></div>
                            <motion.button type="button" onClick={()=>{scrollToPosition(7340)}} className="text-gray-900 bg-white border-2 border-blue-200 focus:outline-none
                        hover:bg-gray-100 focus:ring-4 hover:px-7 duration-200 hover:h-17
                        focus:ring-gray-200 font-medium rounded-full text-base px-5 py-2.5 me-2 h-14
                        dark:bg-gray-800 dark:text-white dark:border-gray-600
                        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        initial={{opacity: 0, y: '100vw'}}
                        animate={{opacity:0.9, y: '0vw'}}
                        transition={{delay: 1, duration: 0.7}}
                        exit={{
                        x:'-100vw',
                        transition: {ease: 'easeInOut'},
                        }}
                        
                        >Liên hệ:   0345 578 573</motion.button>
                            
                            {/* <div className='flex flex-row px-5'>
                                <svg className="w-6 h-6 text-yellow-100 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                                    <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"/>
                                </svg>
                                
                                <span className=' ml-2 uppercase font-bold text-yellow-300 underline hover:no-underline'>
                                        Xem video
                                </span>
                            </div> */}
                    </div>
                </div>
            </div>
            

        </div>
    )
}