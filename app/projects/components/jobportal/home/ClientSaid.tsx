"use client";
import Image from "next/image";
import { useEffect } from "react";
import Slider from "react-slick";
const profiles = [
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg", // Replace with the path to your profile photo
  },

  // Add more profile objects as needed
];

export default function ClientSaid() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    focusOnSelect: true,

    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
    import(
      "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
    );
  }, []);

  return (
    <div className="sliderContainer-job slider-container m-5">
      <h3 className="text-center">our happy client</h3>
      <Slider {...settings}>
        {profiles.map((profile) => (
          // eslint-disable-next-line react/jsx-key
          <div className="p-4">
            <div key={profile.id} className="profileCard-job">
              <Image
                className="profilePhoto-job"
                layout="fixed"
                src={profile.photo}
                alt={profile.name}
                width={100}
                height={100}
              />
              <h2 className="profileName-job">{profile.name}</h2>
              <p className="profileOccupation-job">{profile.occupation}</p>
              <p className="profileDescription-job">{profile.description}</p>
              <div className="rating-job">
                {[...Array(profile.rating)].map((_, index) => (
                  <span key={index} className="star-job">
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
