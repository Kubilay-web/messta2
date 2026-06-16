
//Background Colored Cards

interface Background1 {
  id:number;
  src:string;
  text1:string;
  text2:string;
  color:string;
  class:string;
}
export const Backgroundcards:Background1[] = [
    { id: 1, src: '../../assets/images/faces/11.jpg', text1: 'Adam Smith', text2: 'Finished by today', color: 'primary', class: 'white' },
    { id: 2, src: '../../assets/images/faces/12.jpg', text1: 'Elisha Corner', text2: 'Completed 24 days back', color: 'secondary', class: 'white' },
    { id: 3, src: '../../assets/images/faces/1.jpg', text1: 'Sarah Alina', text2: 'Completed today', color: 'warning', class: 'white' },
    { id: 4, src: '../../assets/images/faces/8.jpg', text1: 'Monica Karen', text2: 'Pending from 4 days', color: 'info', class: 'white' },
    { id: 5, src: '../../assets/images/faces/5.jpg', text1: 'Samantha sid', text2: 'In leave for 1 month', color: 'success', class: 'white' },
    { id: 6, src: '../../assets/images/faces/14.jpg', text1: 'Sebastien steyn', text2: 'Completed by Tomorrow', color: 'danger', class: 'white' },
    { id: 7, src: '../../assets/images/faces/13.jpg', text1: 'Jacob Smith', text2: 'Finished by 24,Nov', color: 'light', class: '[.9375rem]' },
    { id: 8, src: '../../assets/images/faces/16.jpg', text1: 'Pope Adam', text2: 'Completed on 24,may', color: 'black', class: 'white' }
  ];

  //Grids Cards

  interface Gridcards1 {
    id:number;
    src:string;
    text1:string;
  }
  export const Gridcards :Gridcards1[]= [
    { id: 1, src: "../../assets/images/media/media-44.jpg", text1: 'Morphology of a typical fruit.' },
    { id: 2, src: "../../assets/images/media/media-43.jpg", text1: 'Research improves ability & agility !' },
    { id: 3, src: "../../assets/images/media/media-44.jpg", text1: 'Most tropical areas are suitable' },
    { id: 4, src: "../../assets/images/media/media-46.jpg", text1: 'Are They seasonal fruits ?' },
  ];

  export const Bordercarddata = [
    {
      id:1,
      title: "Home Page Design",
      badges: [
        { text: 'Framework', className: 'bg-primary/10 text-primary' },
        { text: 'Angular', className: 'bg-secondary/10 text-secondary' },
        { text: 'Php', className: 'bg-info/10 text-info' },
      ],
      images: [
        '../../assets/images/faces/2.jpg',
        '../../assets/images/faces/8.jpg',
        '../../assets/images/faces/2.jpg',
      ],
      Class: 'primary',
      cardclass:'border-primary !rounded-md'
  
    },
    {
      id:2,
      title: "Landing Page Design",
      badges: [
        { text: 'Laravel', className: 'bg-danger/10 text-danger' },
        { text: 'Codeignitor', className: 'bg-teal-transparent' },
        { text: 'Php', className: 'bg-success/10 text-success' },
      ],
      images: [
        '../../assets/images/faces/4.jpg',
        '../../assets/images/faces/6.jpg',
      ],
      Class: 'secondary',
      cardclass:'border-primary !rounded-md'
    },
    {
      id:3,
      title: "Update New Project",
      badges: [
        { text: 'Html', className: 'bg-warning/10 text-warning' },
        { text: 'Bootstrap', className: 'bg-secondary/10 text-secondary' },
        { text: 'React', className: 'bg-info/10 text-info' },
      ],
      images: [
        '../../assets/images/faces/1.jpg',
        '../../assets/images/faces/12.jpg',
        '../../assets/images/faces/10.jpg',
       '../../assets/images/faces/16.jpg',
      ],
      Class: 'warning',
      cardclass:'border-primary !rounded-md'
    },
    {
      id:4,
      title: "New Project Discussion",
      badges: [
        { text: 'React', className: 'bg-info/10 text-info' },
        { text: 'Typescript', className: 'bg-primary/10 text-primary' },
      ],
      images: [
        '../../assets/images/faces/3.jpg',
        '../../assets/images/faces/14.jpg',
        '../../assets/images/faces/11.jpg',
      ],
      Class: 'info',
      cardclass:'border-primary !rounded-md'
    },
    {
      id:5,
      title: "Recent Projects Testing",
      badges: [
        { text: 'Ui', className: 'bg-primary/10 text-primary' },
        { text: 'Angular', className: 'bg-secondary/10 text-secondary' },
        { text: 'Java', className: 'bg-info/10 text-info' },
      ],
      images: [
        '../../assets/images/faces/15.jpg',
      ],
      Class: 'danger',
      cardclass:'border-primary !rounded-md'
    },
    {
      id:6,
      title: "About Us Page redesign",
      badges: [
        { text: 'Html', className: 'bg-danger/10 text-danger' },
        { text: 'Symphony', className: 'bg-warning/10 text-warning' },
        { text: 'Php', className: 'bg-success/10 text-success' },
      ],
      images: [
        '../../assets/images/faces/6.jpg',
        '../../assets/images/faces/9.jpg',
      ],
      Class: 'success',
      cardclass:'border-primary !rounded-md'
    },
    {
      id:7,
      title: "New Employees",
      badges: [
        { text: 'Html', className: 'bg-warning/10 text-warning' },
        { text: 'Cake Php', className: 'bg-info/10 text-info' },
        { text: 'React', className: 'bg-success/10 text-success' },
      ],
      images: [
        '../../assets/images/faces/5.jpg',
        '../../assets/images/faces/6.jpg',
        '../../assets/images/faces/7.jpg',
      ],
      Class: 'default',
      cardclass:'border-primary !rounded-md'
    },
    {
      id:8,
      title: "Terminated Employees",
      badges: [
        { text: 'Angular', className: 'bg-primary/10 text-primary' },
      ],
      images: [
        '../../assets/images/faces/9.jpg',
        '../../assets/images/faces/11.jpg',
        '../../assets/images/faces/12.jpg',
        '../../assets/images/faces/15.jpg',
      ],
      Class: 'dark',
      cardclass:'border-primary !rounded-md'
    }
  ]

 export const Cardgroupdata=[
  {id:1, customclass:"w-full h-auto rounded-t-xl sm:rounded-se-none", src:"../../assets/images/media/media-40.jpg", title:'Delecious food is a blessing!', text:' This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'},
  {id:2, customclass:"w-full h-auto", src:"../../assets/images/media/media-42.jpg", title:'Writing is an art.', text:'This card has supporting text below as a natural lead-in to additional content.'},
  {id:3, customclass:"w-full h-auto sm:rounded-se-xl", src:"../../assets/images/media/media-41.jpg", title:'Writing is an art.', text:'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.'},
 ]