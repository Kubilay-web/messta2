"use client"
interface SelectType {
  value: string;
  label: string;
}

export const Data: SelectType[] = [
  { value: 'All Categories', label: 'All Categories' },
  { value: 'Software Dveloper', label: 'Software Dveloper' },
  { value: 'Web Developer', label: 'Web Developer' },
  { value: 'Software Architect', label: 'Software Architect' },
  { value: 'IT Hardware', label: 'IT Hardware' },
  { value: 'Network Engineer', label: 'Network Engineer' },
  { value: 'React Developer', label: 'React Developer' },
];
export const Data2: SelectType[] = [
  { value: 'Fresher', label: 'Fresher' },
  { value: '1 Year Exp', label: '1 Year Exp' },
  { value: '2 Year Exp', label: '2 Year Exp' },
  { value: '3 Year Exp', label: '3 Year Exp' },
  { value: '4 Year Exp', label: '4 Year Exp' },
  { value: '5+ Year Exp', label: '5+ Year Exp' },
];



import { Fragment, useState } from "react";
import { Range, getTrackBackground } from "react-range";

interface DataType {
  rtl: any
}

const LabeledTwoThumbs = ({ rtl }: DataType) => {
  const STEP = 0.1;
  const MIN = 0;
  const MAX = 100;

  const [values, setValues] = useState([20, 40]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(newValues) => setValues(newValues)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              className="rangeslider-thumb"
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#5c67f7', '#ccc'],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <Fragment key={Math.random()}>
            <div
              {...props}

              key={index}

              style={{
                ...props.style,
                top: "14px",
                height: '20px',
                width: '24px',
                borderRadius: '4px',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
              }}

            >
              <Fragment key={Math.random()}>
                <div
                  style={{
                    position: 'absolute',
                    top: '-28px',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
                    padding: '4px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--primary-color)',
                  }}
                >
                  {values[index].toFixed(1)}
                </div>
                <div
                  style={{
                    height: '16px',
                    width: '5px',
                    backgroundColor: isDragged ? '#5c67f7' : '#CCC',
                  }}
                />
              </Fragment>
            </div>
          </Fragment>
        )}
      />
    </div>
  );
};

export default LabeledTwoThumbs;

export const Searchcandidate = [
  {
    id: 1,
    name: "Charlotte",
    jobTitle: "UI Developer",
    location: "Kondapur, Hyderabad",
    image: "../../../assets/images/faces/1.jpg",
    ratingCount: '(142)',
    current: "$2,300",
    expected: " - $3,678",
    lang: "English, Hindi, Telugu",
    ratings: (
      <>

        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-half"></i></span>
      </>
    ),
    labels: [{ label: "Graduate", labelIcon: "bi bi-mortarboard text-textmuted dark:text-textmuted/50 me-1" },
    { label: "flexible-shift", labelIcon: "bi bi-moon-stars text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Immediate Joinee", labelIcon: "bi bi-clock text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Good at English", labelIcon: "bi bi-broadcast text-textmuted dark:text-textmuted/50 me-1" }],
    skillbdg: ["HTML", "CSS", "Javascript"],
    exp: "Exp : 2 Years",
    bond: 1,
  },
  {
    id: 2,
    name: "Isabella",
    jobTitle: "Web Developer",
    location: "Gachibowli, Hyderabad",
    image: "../../../assets/images/faces/3.jpg",
    ratingCount: '(35)',
    current: "$3,600",
    expected: " - $4,700",
    lang: "English, Telugu",
    ratings: (
      <>

        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>            </>
    ),
    labels: [{ label: "Post Graduate", labelIcon: "bi bi-mortarboard text-textmuted dark:text-textmuted/50 me-1" },
    { label: "flexible-shift", labelIcon: "bi bi-moon-stars text-textmuted dark:text-textmuted/50 me-1" },
    { label: " Within 10 Days", labelIcon: "bi bi-clock text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Good at English", labelIcon: "bi bi-broadcast text-textmuted dark:text-textmuted/50 me-1" }],
    skillbdg: ["React", "React Navtive"],
    exp: "Exp : 4 Years",
    bond: 2
  },
  {
    id: 3,
    name: "Abigail",
    jobTitle: "Python Developer",
    location: "Gachibowli, Chennai",
    image: "../../../assets/images/faces/21.jpg",
    ratingCount: '(56)',
    current: "$4,300",
    expected: " - $5,000",
    lang: "English, Hindi",
    ratings: (
      <>

        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
      </>
    ),
    labels: [{ label: "MBA", labelIcon: "bi bi-mortarboard text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Day-shift", labelIcon: "bi bi-moon-stars text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Within 30 Days", labelIcon: "bi bi-clock text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Avg at English", labelIcon: "bi bi-broadcast text-textmuted dark:text-textmuted/50 me-1" }],
    skillbdg: ["Python", "React", "Java",],
    exp: "Exp : 5 Years"
  },
  {
    id: 4,
    name: "Abigail",
    jobTitle: "Java Developer",
    location: "Gachibowli,  Banglore",
    image: "../../../assets/images/faces/5.jpg",
    ratingCount: '(13)',
    current: "$3,678",
    expected: "",
    lang: "English, Hindi, Telugu",
    ratings: (
      <>

        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
      </>
    ),
    labels: [{ label: "MBA", labelIcon: "bi bi-mortarboard text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Day-shift", labelIcon: "bi bi-moon-stars text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Within 30 Days", labelIcon: "bi bi-clock text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Avg at English", labelIcon: "bi bi-broadcast text-textmuted dark:text-textmuted/50 me-1" }],
    skillbdg: ["Java", "Core Java",],
    exp: "Fresher",
    bond: 2
  },
  {
    id: 5,
    name: "Jack Miller",
    jobTitle: "Angular Developer",
    location: "Gachibowli, Nellore",
    image: "../../../assets/images/faces/13.jpg",
    ratingCount: '(18)',
    current: "$3,600",
    expected: " - $4,700",
    lang: "English, Telugu",
    ratings: (
      <>

        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
      </>
    ),
    labels: [{ label: "Graduate", labelIcon: "bi bi-mortarboard text-textmuted dark:text-textmuted/50 me-1" },
    { label: "flexible-shift", labelIcon: "bi bi-moon-stars text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Within 15 Days", labelIcon: "bi bi-clock text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Good at English", labelIcon: "bi bi-broadcast text-textmuted dark:text-textmuted/50 me-1" }],
    skillbdg: ["Angular", "Advanced Java ",],
    exp: "Exp : 5 Years",
    bond: 2,
  },
  {
    id: 6,
    name: "Abigail",
    jobTitle: "Python Developer",
    location: "Gachibowli, Chennai",
    image: "../../../assets/images/faces/21.jpg",
    ratingCount: '(56)',
    current: "$4,300",
    expected: " - $5,000",
    lang: "English, Hindi, Telugu",
    ratings: (
      <>

        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
      </>
    ),
    labels: [{ label: "MBA", labelIcon: "bi bi-mortarboard text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Day-shift", labelIcon: "bi bi-moon-stars text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Within 30 Days", labelIcon: "bi bi-clock text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Avg at English", labelIcon: "bi bi-broadcast text-textmuted dark:text-textmuted/50 me-1" }],
    skillbdg: ["Python", "React", "Java",],
    exp: "Exp : 5 Years"
  },
  {
    id: 7,
    name: "Charlotte",
    jobTitle: "UI Developer",
    location: "Kondapur, Hyderabad",
    image: "../../../assets/images/faces/1.jpg",
    ratingCount: '(142)',
    current: "$2,300",
    expected: " - $3,678",
    lang: "English, Hindi, Telugu",
    ratings: (
      <>

        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-half"></i></span>
      </>
    ),
    labels: [{ label: "Graduate", labelIcon: "bi bi-mortarboard text-textmuted dark:text-textmuted/50 me-1" },
    { label: "flexible-shift", labelIcon: "bi bi-moon-stars text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Immediate Joinee", labelIcon: "bi bi-clock text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Good at English", labelIcon: "bi bi-broadcast text-textmuted dark:text-textmuted/50 me-1" }],
    skillbdg: ["HTML", "CSS", "Javascript"],
    exp: "Exp : 2 Years",
    bond: 1,
  },
  {
    id: 8,
    name: "Abigail",
    jobTitle: "Java Developer",
    location: "Gachibowli,  Banglore",
    image: "../../../assets/images/faces/5.jpg",
    ratingCount: '(13)',
    current: "$3,678",
    expected: "",
    lang: "English, Hindi, Telugu",
    ratings: (
      <>

        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
      </>
    ),
    labels: [{ label: "MBA", labelIcon: "bi bi-mortarboard text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Day-shift", labelIcon: "bi bi-moon-stars text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Within 30 Days", labelIcon: "bi bi-clock text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Avg at English", labelIcon: "bi bi-broadcast text-textmuted dark:text-textmuted/50 me-1" }],
    skillbdg: ["Java", "Core Java",],
    exp: "Fresher",
    bond: 2
  },
  {
    id: 9,
    name: "Abigail",
    jobTitle: "Python Developer",
    location: "Gachibowli, Chennai",
    image: "../../../assets/images/faces/21.jpg",
    ratingCount: '(56)',
    current: "$4,300",
    expected: " - $5,000",
    lang: "English, Hindi",
    ratings: (
      <>

        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
      </>
    ),
    labels: [{ label: "MBA", labelIcon: "bi bi-mortarboard text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Day-shift", labelIcon: "bi bi-moon-stars text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Within 30 Days", labelIcon: "bi bi-clock text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Avg at English", labelIcon: "bi bi-broadcast text-textmuted dark:text-textmuted/50 me-1" }],
    skillbdg: ["Python", "React", "Java",],
    exp: "Exp : 5 Years"
  },
  {
    id: 10,
    name: "Abigail",
    jobTitle: "Java Developer",
    location: "Gachibowli,  Banglore",
    image: "../../../assets/images/faces/5.jpg",
    ratingCount: '(13)',
    current: "$3,678",
    expected: "",
    lang: "English, Hindi, Telugu",
    ratings: (
      <>

        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
        <span className="text-warning me-1"><i className="bi bi-star"></i></span>
      </>
    ),
    labels: [{ label: "MBA", labelIcon: "bi bi-mortarboard text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Day-shift", labelIcon: "bi bi-moon-stars text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Within 30 Days", labelIcon: "bi bi-clock text-textmuted dark:text-textmuted/50 me-1" },
    { label: "Avg at English", labelIcon: "bi bi-broadcast text-textmuted dark:text-textmuted/50 me-1" }],
    skillbdg: ["Java", "Core Java",],
    exp: "Fresher",
    bond: 2
  },
];
