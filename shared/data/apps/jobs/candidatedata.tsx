import SpkCandidateDetails from "@/shared/@spk-reusable-components/apps/spk-candidatedetails";

interface Label {
    label: string;
    labelIcon: string;
}

interface SwiperData {
    id: number;
    name: string;
    jobTitle: string;
    location: string;
    image: string;
    ratingCount: string;
    ratings: object; // This is the JSX content for the ratings
    labels: Label[]; // Array of labels
    skillbdg: string[]; // Array of skills
    exp: number;
    bond?: number; // Optional, as bond might be missing in some cases
}

const Swiperdata: SwiperData[] = [
    {
        id: 1,
        name: "Brenda Simpson",
        jobTitle: "Software Developer",
        location: "Kondapur, Hyderabad",
        image: "../../../assets/images/faces/1.jpg",
        ratingCount: '(142)',
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
        skillbdg: ["HTML", "CSS", "Javascript", "Angular"],
        exp: 2,
        bond: 1,
    },
    {
        id: 2,
        name: "Dwayne Stort",
        jobTitle: "Web Developer",
        location: "Gachibowli, Hyderabad",
        image: "../../../assets/images/faces/3.jpg",
        ratingCount: '(35)',
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
        skillbdg: ["React", "JavaScript", "React Navtive"],
        exp: 4,
        bond: 2
    },
    {
        id: 3,
        name: "Jasmine Kova",
        jobTitle: "Python Developer",
        location: "Gachibowli, Chennai",
        image: "../../../assets/images/faces/21.jpg",
        ratingCount: '(56)',
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
        exp: 5
    },

];

export const SwiperComponent = Swiperdata.map((candidate, index) => (
    <SpkCandidateDetails key={index} object={candidate} />

))

export default SwiperComponent;
