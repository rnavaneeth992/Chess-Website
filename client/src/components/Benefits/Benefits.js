import React from "react";

// import features data
import { benefitsData } from "../../data";

// import icons
import { BsArrowRight } from "react-icons/bs";

const Features = () => {
  // destructure features data
  const { title, subtitle1, subtitle2, list } = benefitsData;
  return (
    <section id="whychess" className="my-6 xl:my-12">
      <div className="container mx-auto">
        {/* text */}
        <div className="text-center">
          <h2
            className="h2 mb-6 xl:mb-12"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            {title}
          </h2>

          <h3
            className="h3card text-center text-base md:text-lg lg:text-xl xl:text-2xl"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            {subtitle1}
            <br />
            {subtitle2}
          </h3>
          <br />
        </div>
        {/* feature list */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 lg:mr-20">
          {list.map((benefit, index) => {
            // destructure feature
            const { image, bgImage, title, description, linkText, delay } =
              benefit;
            // feature item
            return (
              <div
                key={index}
                className="w-full h-[auto] relative rounded-full flex flex-col items-center justify-center xl:flex-row xl:justify-start lg:ml-8" 
                data-aos="zoom-in"
                data-aos-offset="100"
                data-aos-delay={delay}
                
              >
                {/* bg image */}
                <div className="xl:flex absolute top-0 right-0 w-full h-full">
                  <img src={bgImage} className="w-full h-full object-cover" style={{ borderRadius: '50px' }} alt="Background" />
                </div>

                {/* icon image */}
                <div
                  className="w-full max-w-[120px] xl:max-w-[232px] mt-4 xl:mt-0"
                  data-aos="zoom-in-right"
                  data-aos-delay={delay}
                >
                  <img src={image} className="w-full rounded-xl" alt="Icon" />
                </div>

                {/* text */}
                <div className="w-full max-w-[220px] mt-4 xl:mt-0">
                  <h3 className="mb-2 text-base md:text-lg lg:text-xl xl:text-2xl">{title}</h3>
                  <p className="font-light italic mb-4">{description}</p>
                </div>
              </div>

            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
