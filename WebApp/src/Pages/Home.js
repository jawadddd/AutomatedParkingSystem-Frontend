import React ,{ useEffect } from "react";
import image1 from "../../assets/undraw_programming_re_kg9v 1.png";
import image2 from "../../assets/Monitor.png";
import image3 from "../../assets/carbon_application-mobile.png";
import image4 from "../../assets/eos-icons_application-outlined.png";
import image5 from "../../assets/People Working Together.png";
import image6 from "../../assets/Group 48097027.png";
import image7 from "../../assets/Combo Chart.png";
import image8 from "../../assets/Logo (1).png";
import image9 from "../../assets/Group 48097023.png";
import image10 from "../../assets/Group 277.png";
import image11 from "../../assets/Logo (2).png";
import image12 from "../../assets/Logo Alt.png";

import image13 from "../../assets/email.png";

import image14 from '../../assets//Logo (1).png';
import image15 from '../../assets//Group 14.png';
import image16 from '../../assets//Group 1273.png';
import image17 from '../../assets//15_ Macbook Pro Flying Mockup (1).png';
import image18 from '../../assets//Group 1272.png';

import image19 from '../../assets//image 25.png';
import image20 from '../../assets//Group 14.png';
import image21 from '../../assets//Group 304 (2).png';
import image22 from '../../assets//15_ Macbook Pro Flying Mockup.png';
import image23 from '../../assets//Group 303.png';

import image24 from '../../assets//iPhone 13 Mockup.png';
import image25 from '../../assets//Group 14.png';
import image26 from '../../assets//Group 48097070 (1).png';
import image27 from '../../assets//Group 48097071.png';
import image28 from '../../assets//Group 48097072 (1).png';



import image29 from '../../assets//iPhone X Mockup Front View.png';
import image30 from '../../assets//Group 14.png';
import image31 from '../../assets//Group 17.png';
import image32 from '../../assets//Group 18.png';
import image33 from '../../assets//Group 19.png';

import image34 from '../../assets//Group.png';
import image35 from '../../assets//Group 14.png';
import image36 from '../../assets//302.00.00 Login Page.png';
import image37 from '../../assets//15_ Macbook Pro Flying Mockup (2).png';
import image38 from '../../assets//Group 5 (2).png';

import image39 from '../../assets//TweeVest Logo.png';
import image40 from '../../assets//Group 14.png';
import image41 from '../../assets//15_ Macbook Pro Flying Mockup label.png';
import image42 from '../../assets//15_ Macbook Pro Flying Mockup (3).png';
import image43 from '../../assets//Group 38586.png';

import image44 from '../../assets//iPhone 13 Mockup (1).png';
import image45 from '../../assets//Group 14.png';
import image46 from '../../assets//Group 850 (1).png';
import image47 from '../../assets//Group 851.png';
import image48 from '../../assets//Group 852.png';



import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const projectDetails = [
    {images:{
      image1: image14,
      image2: image15,
      image3: image16,
      image4: image17,
      image5: image18
    },
    logo:image8,
      projectTitle: 'GoBeb',
      Industry: 'Education',
      HeadQuarters: 'Tel Aviv, IE',
      Platform: 'Web',
      Caption:'',
      one:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nemo necessitatibus debitis fugiat deleniti ipsa odit, maxime minus unde mollitia enim et, laudantium illum.',
      two: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perferendis, magni tempore aspernatur delectus fugit suscipit eligendi, magnam ut non consectetur aliquid quam nisi labore dolorem sunt facilis laudantium accusantium porro? Quia commodi impedit et doloribus at repudiandae facere velit veritatis magni quo dolor voluptatibus repellendus, iste rem ducimus voluptates ea aspernatur provident quasi temporibus non obcaecati! Modi minus recusandae ipsum esse eius iste? Voluptates quod in natus vel sit modi voluptas quia, dolorem, asperiores quibusdam consequatur quaerat possimus ea nemo repudiandae praesentium corporis sunt molestiae incidunt dolores tenetur commodi repellendus suscipit! Voluptatem, a? Magnam laboriosam et quas iusto unde!',
      three: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque dignissimos mollitia dolorem, aliquid soluta ipsa nihil illum, fugit quae, incidunt et dolor velit facere inventore? Neque accusantium magni excepturi maxime. Assumenda vitae omnis aspernatur earum illo quibusdam rerum velit culpa, iure sapiente. Aspernatur ut aliquid perspiciatis eveniet deleniti eaque temporibus eos, vitae fugit totam adipisci necessitatibus quisquam quaerat nesciunt omnis. Consequatur totam deleniti veritatis tenetur.',
      four: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam repudiandae, inventore quia culpa explicabo magnam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, eius!',
      },
      // {images:{image1: image19,
      //   image2: image20,
      //   image3: image21,
      //   image4: image22,
      //   image5: image23},
      //   logo:image10,
      //   projectTitle: 'DegenBids',
      //   Industry: 'Technology',
      //   HeadQuarters: 'Beijeng, CN',
      //   Platform: 'Web',
      //   Caption:'',
      //   one:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nemo necessitatibus debitis fugiat deleniti ipsa odit, maxime minus unde mollitia enim et, laudantium illum.',
      //   two: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perferendis, magni tempore aspernatur delectus fugit suscipit eligendi, magnam ut non consectetur aliquid quam nisi labore dolorem sunt facilis laudantium accusantium porro? Quia commodi impedit et doloribus at repudiandae facere velit veritatis magni quo dolor voluptatibus repellendus, iste rem ducimus voluptates ea aspernatur provident quasi temporibus non obcaecati! Modi minus recusandae ipsum esse eius iste? Voluptates quod in natus vel sit modi voluptas quia, dolorem, asperiores quibusdam consequatur quaerat possimus ea nemo repudiandae praesentium corporis sunt molestiae incidunt dolores tenetur commodi repellendus suscipit! Voluptatem, a? Magnam laboriosam et quas iusto unde!',
      //   three: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque dignissimos mollitia dolorem, aliquid soluta ipsa nihil illum, fugit quae, incidunt et dolor velit facere inventore? Neque accusantium magni excepturi maxime. Assumenda vitae omnis aspernatur earum illo quibusdam rerum velit culpa, iure sapiente. Aspernatur ut aliquid perspiciatis eveniet deleniti eaque temporibus eos, vitae fugit totam adipisci necessitatibus quisquam quaerat nesciunt omnis. Consequatur totam deleniti veritatis tenetur.',
      //   four: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam repudiandae, inventore quia culpa explicabo magnam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, eius!',
      //   },
        {images:{image1: image24,
          image2: image25,
          image3: image26,
          image4: image27,
          image5: image28},
          projectTitle: 'Cosafe',
          Industry: 'Security',
          Caption:'',
          HeadQuarters: 'Stockholm, SE',
          Platform: 'Android, iOS',
          logo:image9,
          one:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nemo necessitatibus debitis fugiat deleniti ipsa odit, maxime minus unde mollitia enim et, laudantium illum.',
          two: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perferendis, magni tempore aspernatur delectus fugit suscipit eligendi, magnam ut non consectetur aliquid quam nisi labore dolorem sunt facilis laudantium accusantium porro? Quia commodi impedit et doloribus at repudiandae facere velit veritatis magni quo dolor voluptatibus repellendus, iste rem ducimus voluptates ea aspernatur provident quasi temporibus non obcaecati! Modi minus recusandae ipsum esse eius iste? Voluptates quod in natus vel sit modi voluptas quia, dolorem, asperiores quibusdam consequatur quaerat possimus ea nemo repudiandae praesentium corporis sunt molestiae incidunt dolores tenetur commodi repellendus suscipit! Voluptatem, a? Magnam laboriosam et quas iusto unde!',
          three: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque dignissimos mollitia dolorem, aliquid soluta ipsa nihil illum, fugit quae, incidunt et dolor velit facere inventore? Neque accusantium magni excepturi maxime. Assumenda vitae omnis aspernatur earum illo quibusdam rerum velit culpa, iure sapiente. Aspernatur ut aliquid perspiciatis eveniet deleniti eaque temporibus eos, vitae fugit totam adipisci necessitatibus quisquam quaerat nesciunt omnis. Consequatur totam deleniti veritatis tenetur.',
          four: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam repudiandae, inventore quia culpa explicabo magnam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, eius!',
          },
          {images:{image1: image29,
            image2: image30,
            image3: image31,
            image4: image32,
            image5: image33},
            logo:image11,
            projectTitle: 'Finay',
            Industry: 'Technology',
            HeadQuarters: 'Lahore, PK',
            Platform: 'Web',
            Caption:'FINNAY MUSIC APP',
            one:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nemo necessitatibus debitis fugiat deleniti ipsa odit, maxime minus unde mollitia enim et, laudantium illum.',
            two: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perferendis, magni tempore aspernatur delectus fugit suscipit eligendi, magnam ut non consectetur aliquid quam nisi labore dolorem sunt facilis laudantium accusantium porro? Quia commodi impedit et doloribus at repudiandae facere velit veritatis magni quo dolor voluptatibus repellendus, iste rem ducimus voluptates ea aspernatur provident quasi temporibus non obcaecati! Modi minus recusandae ipsum esse eius iste? Voluptates quod in natus vel sit modi voluptas quia, dolorem, asperiores quibusdam consequatur quaerat possimus ea nemo repudiandae praesentium corporis sunt molestiae incidunt dolores tenetur commodi repellendus suscipit! Voluptatem, a? Magnam laboriosam et quas iusto unde!',
            three: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque dignissimos mollitia dolorem, aliquid soluta ipsa nihil illum, fugit quae, incidunt et dolor velit facere inventore? Neque accusantium magni excepturi maxime. Assumenda vitae omnis aspernatur earum illo quibusdam rerum velit culpa, iure sapiente. Aspernatur ut aliquid perspiciatis eveniet deleniti eaque temporibus eos, vitae fugit totam adipisci necessitatibus quisquam quaerat nesciunt omnis. Consequatur totam deleniti veritatis tenetur.',
            four: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam repudiandae, inventore quia culpa explicabo magnam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, eius!',
            },
            {images:{image1: image34,
              image2: image35,
              image3: image36,
              image4: image37,
              image5: image38},
              logo:image12,
              projectTitle: 'SC',
              Industry: 'Social Media',
              HeadQuarters: 'Oregon, US',
              Platform: 'Web',
              Caption:'SLICK COMMENTS',
              one:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nemo necessitatibus debitis fugiat deleniti ipsa odit, maxime minus unde mollitia enim et, laudantium illum.',
              two: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perferendis, magni tempore aspernatur delectus fugit suscipit eligendi, magnam ut non consectetur aliquid quam nisi labore dolorem sunt facilis laudantium accusantium porro? Quia commodi impedit et doloribus at repudiandae facere velit veritatis magni quo dolor voluptatibus repellendus, iste rem ducimus voluptates ea aspernatur provident quasi temporibus non obcaecati! Modi minus recusandae ipsum esse eius iste? Voluptates quod in natus vel sit modi voluptas quia, dolorem, asperiores quibusdam consequatur quaerat possimus ea nemo repudiandae praesentium corporis sunt molestiae incidunt dolores tenetur commodi repellendus suscipit! Voluptatem, a? Magnam laboriosam et quas iusto unde!',
              three: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque dignissimos mollitia dolorem, aliquid soluta ipsa nihil illum, fugit quae, incidunt et dolor velit facere inventore? Neque accusantium magni excepturi maxime. Assumenda vitae omnis aspernatur earum illo quibusdam rerum velit culpa, iure sapiente. Aspernatur ut aliquid perspiciatis eveniet deleniti eaque temporibus eos, vitae fugit totam adipisci necessitatibus quisquam quaerat nesciunt omnis. Consequatur totam deleniti veritatis tenetur.',
              four: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam repudiandae, inventore quia culpa explicabo magnam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, eius!',
              },
                {images:{image1: image44,
                  image2: image45,
                  image3: image46,
                  image4: image47,
                  image5: image48},
                  projectTitle: 'Dia',
                  Industry: 'Well-being and Therapy',
                  HeadQuarters: 'Riga, LV',
                  Platform: 'Android, iOS',
                  logo:image10,
                  Caption:'',
                  one:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nemo necessitatibus debitis fugiat deleniti ipsa odit, maxime minus unde mollitia enim et, laudantium illum.',
                  two: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perferendis, magni tempore aspernatur delectus fugit suscipit eligendi, magnam ut non consectetur aliquid quam nisi labore dolorem sunt facilis laudantium accusantium porro? Quia commodi impedit et doloribus at repudiandae facere velit veritatis magni quo dolor voluptatibus repellendus, iste rem ducimus voluptates ea aspernatur provident quasi temporibus non obcaecati! Modi minus recusandae ipsum esse eius iste? Voluptates quod in natus vel sit modi voluptas quia, dolorem, asperiores quibusdam consequatur quaerat possimus ea nemo repudiandae praesentium corporis sunt molestiae incidunt dolores tenetur commodi repellendus suscipit! Voluptatem, a? Magnam laboriosam et quas iusto unde!',
                  three: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque dignissimos mollitia dolorem, aliquid soluta ipsa nihil illum, fugit quae, incidunt et dolor velit facere inventore? Neque accusantium magni excepturi maxime. Assumenda vitae omnis aspernatur earum illo quibusdam rerum velit culpa, iure sapiente. Aspernatur ut aliquid perspiciatis eveniet deleniti eaque temporibus eos, vitae fugit totam adipisci necessitatibus quisquam quaerat nesciunt omnis. Consequatur totam deleniti veritatis tenetur.',
                  four: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam repudiandae, inventore quia culpa explicabo magnam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, eius!',
                  }];

  
  const navigate = useNavigate();
const options={
  loop: true,
  margin: 10,
  dots: false,
  autoplay: true,
  autoplayTimeout: 2500,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      loop: true,
    },
    600: {
      items: 3,
      loop: true,
    },
    1000: {
      items: 3,
      nav: false,
      loop: true,
    },
  }

};

const handleProjectClick = (project) => {
  // Assuming you have some project data
  
  // Use navigate to programmatically navigate to ProjectDetail page
  navigate("/ProjectDetail", { state: project });
};
const scrollHandle = (sectionId) => {
  const targetSection = document.getElementById(sectionId);

  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToSection = (sectionId) => {
  const targetSection = document.getElementById(sectionId);

  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
};
const handleEstimateProjectClick = () => {
  scrollToSection('contact');
};
  return (
    <>
     <NavBar  scrollToSection={scrollToSection} />
    <div className="mycontainer">
      <div className="container">
        <div className="heading banner">
          <h2>We bring your ideas from Inception to Completion</h2>
         <button class="btn" onClick={handleEstimateProjectClick} >Estimate Project</button>
        </div>
        <div className="illustration">
          <img src={image1} alt="" />
        </div>
      </div>
    </div>

    <div className="about" id="about">
      <div className="heading">
        <h2>About Us</h2>
      </div>
      <div className="motto">
        <p>.Transforming Code into Dreams, One Algorithm at a Time.</p>
      </div>
      <br />
      <div className="aftermotto">
        <p>
          Welcome to Bitficial—where your digital vision comes to life.
          Specializing in full-stack mobile and web development, we are your
          end-to-end partner in creating exceptional digital experiences. With
          expertise ranging from frontend design to backend architecture and
          everything in-between, Bitficial transforms your ideas into
          functional, scalable, and visually compelling applications.
        </p>
      </div>
      <p></p>
    </div>

    <div className="services" id="service">
    <div class="heading">
        <h2>Services</h2>
      </div>
      <div className="items">
        <div className="row1">
          <div className="item1">
            <img src={image2} alt="" />
            <h2>Scalable Cloud Tech</h2>
          </div>
          <div className="item2">
            <img src={image3} alt="" />
            <h2>Application Development</h2>
          </div>
          <div className="item3">
            <img src={image4} />
            <h2>Web Development</h2>
          </div>
        </div>
        <div className="row2">
          <div className="item3">
            <img src={image5} />
            <h2>Role-based Access</h2>
          </div>
          <div className="item3">
            <img src={image6} />
            <h2>Admin Panel</h2>
          </div>
          <div className="item3">
            <img src={image7} />
            <h2>Web Analytics</h2>
          </div>
        </div>
      </div>
    </div>
    <div className="projects" id="project">
      <div className="heading">
        <h2>Projects</h2>
      </div>
      
      
      
      
       {/* <div className="owl-carousel">
       </div> */}



<OwlCarousel className='owl-carousel' {...options}>
{projectDetails.map((project, index) => (
        <div className="item" id={index} >
          <a
            ><img src={project.logo} alt="" onClick={() => handleProjectClick(project)} />
            <br />
            <div className="head">
              <p>{project.Caption}</p>
            </div>
          </a>
        </div>
          ))}
        </OwlCarousel>
    </div> 
    
    <div className="contact" id="contact">
      <div className="leftside">
        <div className="head">
          <h2>Need a quote for a project? Get in touch...</h2>
        </div>
        <div className="para">
          <p>
            If you're here that means you're ready to start your journey and we
            couldn't be more thrilled. Fill out the form and we'll get back to
            you ASAP.
          </p>
        </div>
        <div className="social-menu">
          <ul>
            <li>
              <a
                className="icon"
                href="https://www.linkedin.com/company/bitficial-tecnologies"
                ><ion-icon name="logo-linkedin"></ion-icon
              ></a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className="formForEmail">
          <a href="mailto:maisam.shah@bitficial.com">
            <img className="sendemail" src={image13} />
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
  
