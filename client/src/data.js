// import icons
import {
  FaEnvelope
} from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import {
  FaChessKnight,
  FaBook,
  FaChess,
  FaAward,
} from "react-icons/fa";
import {
  BsFillFileEarmarkBarGraphFill,
  BsFillTelephoneFill,
} from "react-icons/bs";

// import images
import AboutImg from "../src/assets/img/about.png";
import Benefit1Img from "../src/assets/img/benefits/benefit1.png";
import Benefit2Img from "../src/assets/img/benefits/benefit2.png";
import Benefit3Img from "../src/assets/img/benefits/benefit3.png";
import Benefit4Img from "../src/assets/img/benefits/benefit4.png";
import RathishImg from "../src/assets/img/coaches/Rathish.png";

import Testi1Img from "../src/assets/img/coaches/testi1.png";
import Logop3 from "../src/assets/img/logop3.png";
import Home from "../src/assets/img/home.png";
import Bgimg from "../src/assets/img/bg.png";
import Benefit1BgImg from "../src/assets/img/benefits/benefit1_bg.png";
import Benefit2BgImg from "../src/assets/img/benefits/benefit2_bg.png";
import Benefit3BgImg from "../src/assets/img/benefits/benefit3_bg.png";
import Benefit4BgImg from "../src/assets/img/benefits/benefit4_bg.png";

export const navigationData = [
  { name: "Home", link: "/#home", icon: AiFillHome },
  { name: "Why Chess?", link: "/#whychess", icon: FaChess },
  { name: "About Us", link: "/#about", icon: FaChessKnight },

  { name: "Courses", link: "/#courses", icon: FaBook },
  {
    name: "Coaches",
    link: "/#coaches",
    icon: BsFillFileEarmarkBarGraphFill,
  },
  { name: "Testimonials", link: "/#testimonials", icon: FaAward },
];

export const menuData = {
  parent: [
    "Profile",
    "Class History",
    "Course Progress",
    "Notifications",
    "Log Out",
  ],
  instructor: [
    "Profile",
    "My Students",
    "My Schedule",
    "Notifications",
    "Log Out",
  ],
};
export const homeData = {
  title: ` Checkmate your boredom with our Chess classes!`,
  subtitle: "Experience hybrid classes (online and offline)",
  book: "Book a free demo",
  login: "Login",
  image: Home,
  bgimg: Bgimg,
  logo: Logop3,
};

export const aboutData = {
  image: AboutImg,
  title: "Find Out A Little More About Us",
  subtitle:
    "Our platform is specifically designed to help children learn how to play chess in a fun and engaging way. Our platform offers a variety of resources to help kids learn the game, including interactive lessons, puzzles, and practice exercises. Our team is made up of experienced chess coaches who specialize in teaching children. We understand that kids learn best when they are having fun, so we have designed our platform to be both entertaining and educational.",
};

export const benefitsData = {
  title: "Why Chess?",
  subtitle1: "Chess isn't just a game, it's a brain workout!",
  subtitle2:
    "Besides being a fun game, playing chess has many benefits for the brain.",
  list: [
    {
      image: Benefit1Img,
      bgImage: Benefit1BgImg,
      title: "Improves critical thinking and problem-solving skills",
      description: "",
      linkText: "",
      delay: "400",
    },
    {
      image: Benefit2Img,
      bgImage: Benefit2BgImg,
      title: "Boosts memory and concentration",
      description: "",
      linkText: "",
      delay: "700",
    },
    {
      image: Benefit3Img,
      bgImage: Benefit3BgImg,
      title: "Enhances creativity and imagination",
      description: "",
      linkText: "",
      delay: "800",
    },
    {
      image: Benefit4Img,
      bgImage: Benefit4BgImg,
      title: "Boosts confidence and self-esteem",
      description: "",
      linkText: "",
      delay: "1000",
    },
  ],
};

export const coursesData = {
  subtitle1: "More than just moves, we teach strategy!",
  subtitle2: "We'll cover a variety of topics in the class.",
  list: [
    {
      title: "Beginner ",
      description: "Beginner level course",
      price: 450,
      currency: "USD",
      classes: "for 30 classes",
      sessionPrice: 15,
      features: [
        "Foundational Knowledge",
        "Interactive Learning",
        "Tailored Feedback",
        "PTM after 8 classes",
        "Summary after each class",
        "Tournament chess kits",
        "Anytime refund policy",
      ],
      cta: "Book a demo",
      delay: "300",
      syllabus: "syllabus.pdf",
    },
    {
      title: "Intermediate",
      description: "Intermediate level course",
      price: 600,
      currency: "USD",
      sessionPrice: 20,
      classes: "for 30 classes",
      features: [
        "Advanced Tactics",
        "Diverse Scenarios",
        "Specialized Guidance",
        "PTM after 8 classes",
        "Summary after each class",
        "Tournament chess kits",
        "Anytime refund policy",
      ],
      cta: "Book a demo",
      delay: "600",
      syllabus: "syllabus.pdf",
    },
    {
      title: "Advanced - 1",
      description: "Advanced level course",
      price: 750,
      currency: "USD",
      sessionPrice: 25,
      classes: "for 30 classes",
      features: [
        "Masterclass Sessions",
        "Competitive Edge",
        "Comprehensive Analysis",
        "PTM after 8 classes",
        "Summary after each class",
        "Tournament chess kits",
        "Anytime refund policy",
      ],
      cta: "Book a demo",
      delay: "900",
      syllabus: "syllabus.pdf",
    },
    {
      title: "Advanced - 2",
      description: "Advanced level course",
      price: 750,
      currency: "USD",
      sessionPrice: 25,
      classes: "for 30 classes",
      features: [
        "Masterclass Sessions",
        "Competitive Edge",
        "Comprehensive Analysis",
        "PTM after 8 classes",
        "Summary after each class",
        "Tournament chess kits",
        "Anytime refund policy",
      ],
      cta: "Book a demo",
      delay: "1200",
      syllabus: "syllabus.pdf",
    },
  ],
};

export const coachesData = [
  {
    image: RathishImg,
    name: "Rathish R",
    web: "International Chess Player (FIDE)",
    message: "Contact - 8637442848",
    delay: "300",
  },
  {
    image: Testi1Img,
    name: "Samaksh",
    web: "International Chess Player (FIDE)",
    message: "Contact - 7767942420",
    delay: "600",
  },
];

export const ctaData = {
  title: "Young Visionaries Chess Club",
  subtitle:
    "Address : A331, Wing 6, Innovative Oak Garden, Bhoganhalli, Bengaluru, Karnataka 560103",
  btnText1: "",
  btnText2: "Book a free Demo",
  logo: Logop3,
};

export const footerData = {
  logo: Logop3,
  address: "",
  email: "",
  phone: "",

  socialList: [
    {
      icon: <FaEnvelope />,
      href: "#",
      delay: "900",
      mailid: "brightknights05@gmail.com",
      wappnum: "919344701084",
    },
  ],
};

export const copyrightData = {
  // text: "© Product Texas, 2022. All rights reserved. Company Registration Number: 09833888.",
  icon: <BsChatDotsFill />,
};

export const testimonialData = {
  parentData: [
    {
      name: "Michael Schrute",
      title: " Student - Grade 11",
      avatar:
        "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
      comment:
        "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
    },

    {
      name: "Jenny Wilson",
      title: " Student - Grade 6",
      avatar:
        "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png",
      comment:
        "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
    },

    {
      name: "Jacob Jones",
      title: " Student - Grade 10",
      avatar:
        "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
      comment:
        "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
    },
  ],
  studentData: [
    {
      name: "Michael Schrute",
      title: " Student - Grade 11",
      avatar:
        "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
      comment:
        "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
    },

    {
      name: "Jenny Wilson",
      title: " Student - Grade 6",
      avatar:
        "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png",
      comment:
        "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
    },

    {
      name: "Jacob Jones",
      title: " Student - Grade 10",
      avatar:
        "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
      comment:
        "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
    },
  ],
};
