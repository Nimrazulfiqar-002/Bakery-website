import React from "react";
import AboutImg from "../assets/images/about-img.jpg";
const About = () => {
  return (
    <>
      <section className="about" id="about">
        <h1 className="heading">
          <span>about</span> us
        </h1>

        <div className="row">
          <div className="image">
            <img src={AboutImg} alt="" />
          </div>

          <div className="content">
            <h3>what makes our food special?</h3>
            <p>
            "Every slice from Cake Bliss embodies our commitment to excellence. We meticulously select premium ingredients, infusing each creation with passion and creativity. From the delicate layers to the heavenly frosting, our cakes are crafted to delight your senses and leave a lasting impression."
            </p>
            <a href="#" className="btn">
              learn more
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
