import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Home = () => {

    const navigate = useNavigate()

    const [img, setImg] = useState(0)

    const slide = () => {
        const len = images.length

    }

    setInterval(slide, 4000)

    const images = ["https://deepdreamgenerator.com/storage/fast_queue/temp_images/9d86e36bdfad8f4e5ab8a8bdfb91533524a18a22.jpg",
        "https://deepdreamgenerator.com/storage/fast_queue/temp_images/cf7bc9f51374da055ec0aeaa849965f06c7266aa.jpg",
        "https://deepdreamgenerator.com/storage/fast_queue/temp_images/b96c0f1097f16db0238a40cb9674aa54b5cffa24.jpg",
        "https://deepdreamgenerator.com/storage/fast_queue/temp_images/61b05c3ad7fdcc7471b508562e3ac78695886a38.jpg",
        "https://deepdreamgenerator.com/storage/fast_queue/temp_images/46d2dd665bdaec902f89f91c1859911b5440e66d.jpg"
    ]

    const homeTextRef = useRef(null);

    const scrollToHomeText = () => {
        homeTextRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <div  >

            <Header />



            <div className="home-image">
                <Slide>

                    {images.map((item, index) => (

                        <div key={index} className="each-slide-effect">

                            <div style={{ 'backgroundImage': `url(${images[index]})` }}>

                            </div>
                        </div>
                    ))}

                </Slide>
                <i onClick={scrollToHomeText} className="iconDown bi bi-arrow-down"></i>
            </div>

            <div className="home-text " ref={homeTextRef} style={{paddingTop: "20vh"}}>
                        <div className="d-flex justify-content-center" >
                <div className="card w-75 p-5 ">
                    <h2>THIS IS A DEMO PROJECT</h2>
                    <h6>----------------------</h6>
                    <br/>
                    <p>The names of artists and artworks are entirely fictional and created for
                        demonstration purposes only. Any resemblance to real individuals or existing
                        artworks is purely coincidental.
                        The images are linked in my GitHub repository (GITHUB LINK INSERT) for demonstration purposes only.
                        All artworks are made with an free AI Tool (https://deepdreamgenerator.com/)

                        Please note that the artworks displayed are for demonstration and testing purposes
                        only, and they may not represent real commercial products or licensed artworks.

                        The items available for sale on this platform are also for demonstration purposes
                        only.
                    </p>
                </div>
                </div>
            </div>




        </div>
    )
}

export default Home