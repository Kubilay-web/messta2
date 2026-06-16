// pages/index.js
"use client";
import Image from "next/image";
import { useEffect } from "react";

const dummyData = [
  {
    location: "New York",
    vacancies: 10,
    number: 30,
    companies: [
      { name: "Company A", image: "/assets/images/jobportal/de.jpg" },
    ],
  },
  {
    location: "New York",
    vacancies: 10,
    number: 30,
    companies: [
      { name: "Company A", image: "/assets/images/jobportal/de.jpg" },
    ],
  },
  {
    location: "New York",
    vacancies: 10,
    number: 30,
    companies: [
      { name: "Company A", image: "/assets/images/jobportal/de.jpg" },
    ],
  },
  {
    location: "New York",
    vacancies: 10,
    number: 30,
    companies: [
      { name: "Company A", image: "/assets/images/jobportal/de.jpg" },
    ],
  },
  {
    location: "New York",
    vacancies: 10,
    number: 30,
    companies: [
      { name: "Company A", image: "/assets/images/jobportal/de.jpg" },
    ],
  },
  {
    location: "New York",
    vacancies: 10,
    number: 30,
    companies: [
      { name: "Company A", image: "/assets/images/jobportal/de.jpg" },
    ],
  },
  {
    location: "New York",
    vacancies: 10,
    number: 30,
    companies: [
      { name: "Company A", image: "/assets/images/jobportal/de.jpg" },
    ],
  },
  {
    location: "New York",
    vacancies: 10,
    number: 30,
    companies: [
      { name: "Company A", image: "/assets/images/jobportal/de.jpg" },
    ],
  },
];

export default function Home() {
  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
    import(
      "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
    );
  }, []);
  return (
    <div>
      {" "}
      <h2 className="text-center">job by locations</h2>
      <p className="text-center">job by locations</p>
      <div className="containers-job m-5">
        {dummyData.map((item, index) => (
          <div className="locationContainers-job" key={index}>
            <h2>{item.location}</h2>
            <span className="m-4">Vacancies: {item.vacancies}</span>
            <span>available company: {item.number}</span>
            <div className="companyList-job">
              {item.companies.map((company, idx) => (
                <div className="companyItem-job" key={idx}>
                  <Image
                    src={company.image}
                    alt={company.name}
                    width={200}
                    height={200}
                  />
                  <p>{company.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
