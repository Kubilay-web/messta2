export const border1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<span className="border dark:border-defaultborder/10 border-defaultborder border-container"></span>
<span className="border-t dark:border-defaultborder/10 border-container"></span>
<span className="border-e dark:border-defaultborder/10 border-container"></span>
<span className="border-b dark:border-defaultborder/10 border-container"></span>
<span className="border-s dark:border-defaultborder/10 border-container"></span>
// End Prism Code//`;

export const border2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <span className="border-0 border-container"></span>
<span className="border dark:border-defaultborder/10 border-defaultborder border-t-0 border-container"></span>
<span className="border dark:border-defaultborder/10 border-defaultborder border-e-0 border-container"></span>
<span className="border dark:border-defaultborder/10 border-defaultborder border-b-0 border-container"></span>
<span className="border dark:border-defaultborder/10 border-defaultborder border-s-0 border-container"></span>
// End Prism Code//`;

export const border3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <span className="border border-container !border-primary"></span>
<span className="border border-container !border-secondary"></span>
<span className="border border-container !border-success"></span>
<span className="border border-container !border-danger"></span>
<span className="border border-container !border-warning"></span>
<span className="border border-container !border-info"></span>
<span className="border border-container !border-light"></span>
<span className="border border-container !border-black"></span>
<span className="border border-container !border-white"></span>
// End Prism Code//`;

export const border4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <span className="border-1 dark:border-defaultborder/10 border-defaultborder border-container"></span>
<span className="border-container dark:border-defaultborder/10 border-defaultborder border-2"></span>
<span className="border-container dark:border-defaultborder/10 border-defaultborder border-4"></span>
<span className="border-container dark:border-defaultborder/10 border-defaultborder border-8"></span>
// End Prism Code//`;

export const border5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-md" alt="..."/>
<Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-t-md" alt="..."/>
<Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-e-md" alt="..."/>
<Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-b-md" alt="..."/>
<Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-s-md" alt="..."/>
<Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-full" alt="..."/>
<Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img  rounded-full" alt="..."/>
// End Prism Code//`;

export const border6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-none" alt="..."/>
<Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-sm" alt="..."/>
<Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-md" alt="..."/>
<Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-lg" alt="..."/>
<Image fill src="/assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-xl" alt="..."/>
// End Prism Code//`;

export const border7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="border border-success p-2 mb-2">This is default success border</div>
<div className="border border-success/75 p-2 mb-2">This is 75%
    opacity
    success border
</div>
<div className="border border-success/50 p-2 mb-2">This is 50%
    opacity
    success border
</div>
<div className="border border-success/25 p-2 mb-2 ">This is 25%
    opacity
    success border
</div>
<div className="border border-success/10 p-2">This is 10% opacity
    success
    border
</div>
// End Prism Code//`;

export const border8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="mb-4">
<label htmlFor="exampleFormControlInput1" className="form-label">Email
    address</label>
<input type="email" className="form-control w-full !rounded-md !border-success"
    id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
<div className="h4 pb-4 mb-4 text-danger border-b !border-danger">
Below Shows Danger Border
</div>
<div
className="p-4 bg-info/10 border !border-info  !border-s-0 rounded-e-md mb-1">
Customizing borders with background colors
</div>
// End Prism Code//`;

//Avatars

export const avatar1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <span className="avatar me-2 avatar-radius-0">
    <Image fill src="/assets/images/faces/1.jpg" alt="img"/>
</span>
<span className="avatar me-2">
    <Image fill src="/assets/images/faces/2.jpg" alt="img"/>
</span>
<span className="avatar me-2 avatar-rounded">
    <Image fill src="/assets/images/faces/3.jpg" alt="img"/>
</span>
// End Prism Code//`;

export const avatar2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 {Avataricon.map((idx) => (
    <span className={avatar avatar-{idx.class} me-2 avatar-rounded} key={idx.id}>
        <Image fill src={idx.src} alt="img" />
        <Link aria-label="anchor" scroll={false} href="#!"  className={badge bg-{idx.color} rounded-full text-white avatar-badge}><i className={fe {idx.icon} text-[.5rem]}></i></Link>
    </span>
    ))}
// End Prism Code//`;

export const avatardata2 = `interface Icontype {
    id: number;
    class: string;
    src: string;
    icon: string;
    color: string;
}
export const Avataricon: Icontype[] = [
    { id: 1, class: "xs", src: "/assets/images/faces/2.jpg", icon: "camera", color: "success" },
    { id: 2, class: "sm", src: "/assets/images/faces/3.jpg", icon: "edit", color: "secondary" },
    { id: 3, class: "md", src: "/assets/images/faces/14.jpg", icon: "plus", color: "warning" },
    { id: 4, class: "lg", src: "/assets/images/faces/13.jpg", icon: "edit", color: "info" },
    { id: 5, class: "xl", src: "/assets/images/faces/15.jpg", icon: "camera", color: "success" },
    { id: 6, class: "xxl", src: "/assets/images/faces/9.jpg", icon: "plus", color: "danger" },
]`
export const avatardata3 = `export const Avatarsize: AvatarType[] = [
     { id: 1, class: "xs", src: "/assets/images/faces/4.jpg" },
     { id: 2, class: "sm", src: "/assets/images/faces/5.jpg" },
     { id: 3, class: "md", src: "/assets/images/faces/6.jpg" },
     { id: 4, class: "lg", src: "/assets/images/faces/7.jpg" },
     { id: 5, class: "xl", src: "/assets/images/faces/8.jpg" },
     { id: 6, class: "xxl", src: "/assets/images/faces/9.jpg" },
 ]`
export const avatar3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 {Avatarsize.map((idx)=>(
<span className={avatar avatar-{idx.class} me-2} key={idx.id}>
    <Image fill src={idx.src}  alt="img"/>
</span>
))}
// End Prism Code//`;

export const avatardata4 = `export const Avataronline: AvatarType[] = [
    { id: 1, class: "xs online", src: "/assets/images/faces/8.jpg" },
    { id: 2, class: "sm online", src: "/assets/images/faces/10.jpg" },
    { id: 3, class: "md online", src: "/assets/images/faces/12.jpg" },
    { id: 4, class: "lg online", src: "/assets/images/faces/13.jpg" },
    { id: 5, class: "xl online", src: "/assets/images/faces/14.jpg" },
    { id: 6, class: "xxl online", src: "/assets/images/faces/15.jpg" },
]`
export const avatar4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 {Avataronline.map((idx) => (
<span className={avatar avatar-{idx.class} me-2 online avatar-rounded} key={idx.id}>
    <Image fill src={idx.src} alt="img" />
</span>
))}
// End Prism Code//`;

export const avatardata5 = `export const Avataroffline: AvatarType[] = [
    { id: 1, class: "xs offline", src: "/assets/images/faces/2.jpg" },
    { id: 2, class: "sm offline", src: "/assets/images/faces/3.jpg" },
    { id: 3, class: "md offline", src: "/assets/images/faces/4.jpg" },
    { id: 4, class: "lg offline", src: "/assets/images/faces/5.jpg" },
    { id: 5, class: "xl offline", src: "/assets/images/faces/6.jpg" },
    { id: 6, class: "xxl offline", src: "/assets/images/faces/7.jpg" },
]`
export const avatar5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
{Avataroffline.map((idx) => (
<span className={avatar avatar-{idx.class} me-2 offline avatar-rounded} key={idx.id}>
<Image fill src={idx.src} alt="img" />
</span>
))}`;

export const avatardata6 = `interface avatarnumber {
    id:number;
    src:string;
    class:string;
    color:string;
    number:string;
}
export const AvatarNumber:avatarnumber[] = [
    {id:1, src:face2, class:"xs", color:"primary", number:"2"},
    {id:2, src:face3, class:"sm", color:"secondary", number:"5"},
    {id:3, src:face14, class:"md", color:"warning", number:"1"},
    {id:4, src:face13, class:"lg", color:"info", number:"7"},
    {id:5, src:face15, class:"xl", color:"success", number:"3"},
    {id:6, src:face9, class:"xxl", color:"danger", number:"9"},
]
`
export const avatar6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
{Avatarnumber.map((idx) => (
<span className={"avatar avatar-{idx.class} me-2 avatar-rounded"} key={idx.id}>
<Image fill src={idx.src} alt="img" />
<SpkBadge variant={idx.color} customClass={"rounded-full text-white avatar-badge"}>{idx.number}</SpkBadge>
</span>
))}
// End Prism Code//`;

export const avatardata7 = `interface StackType {
    id: number;
    src: string;
}
export const Avatarstack: StackType[] = [
    { id: 1, src: "/assets/images/faces/2.jpg" },
    { id: 2, src: "/assets/images/faces/8.jpg" },
    { id: 3, src: "/assets/images/faces/2.jpg" },
    { id: 4, src: "/assets/images/faces/10.jpg" },
    { id: 5, src: "/assets/images/faces/4.jpg" },
    { id: 6, src: "/assets/images/faces/13.jpg" },
]`;
export const avatar7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="avatar-list-stacked">
    {Avatarstack.map((idx)=>(
    <span className="avatar" key={idx.id}>
        <Image fill src={idx.src} alt="img" />
    </span>
    ))}
    <Link className="avatar bg-primary text-white"scroll={false} href="#!" >
        +8
    </Link>
</div>
// End Prism Code//`;
export const avatardata8 = `interface StackType {
    id: number;
    src: string;
}
export const Avatarstack: StackType[] = [
    { id: 1, src: "/assets/images/faces/2.jpg" },
    { id: 2, src: "/assets/images/faces/8.jpg" },
    { id: 3, src: "/assets/images/faces/2.jpg" },
    { id: 4, src: "/assets/images/faces/10.jpg" },
    { id: 5, src: "/assets/images/faces/4.jpg" },
    { id: 6, src: "/assets/images/faces/13.jpg" },
]`;
export const avatar8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="avatar-list-stacked">
{Avatarstack.map((idx)=>(
    <span className="avatar avatar-rounded" key={idx.id}>
        <Image fill src={idx.src} alt="img" />
    </span>
))}
<Link className="avatar bg-primary avatar-rounded text-white" href="#!" scroll={false} >
    +8
</Link>
</div>
// End Prism Code//`;
export const avatardata9 = `interface InitialType {
    id: number;
    class: string;
    color: string;
    data1: string
}
export const Avatarinitial: InitialType[] = [
    { id: 1, class: "xs", color: "primary", data1: "XS" },
    { id: 2, class: "sm", color: "secondary", data1: "SM" },
    { id: 3, class: "md", color: "warning", data1: "MD" },
    { id: 4, class: "lg", color: "danger", data1: "LG" },
    { id: 5, class: "xl", color: "success", data1: "XL" },
    { id: 6, class: "xxl", color: "info", data1: "XXL" },
]`;
export const avatar9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 {Avatarinitial.map((idx)=>(
<span className={avatar avatar-{idx.class} text-white m-2 bg-{idx.color}} key={idx.id}>
{idx.data1}
</span>
))}
// End Prism Code//`;




///uielements
//Spinners

export const reactspinner1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-spinner" role="status">
<span className="sr-only">Loading...</span>
</div>
// End Prism Code//`;
export const reusespinner1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <SpkSpinner>
<span className="sr-only">Loading...</span>
</SpkSpinner>
// End Prism Code//`;
export const Spinnerdate2 = `interface colorspinner {
    id:number;
    color:string;
}
export const Colorspinner:colorspinner[] = [
    { id: 1, color: 'primary' },
    { id: 2, color: 'secondary' },
    { id: 3, color: 'success' },
    { id: 4, color: 'danger' },
    { id: 5, color: 'warning' },
    { id: 6, color: 'info' },
    { id: 7, color: 'light' },
    { id: 8, color: 'dark' }
];`
export const reactspinner2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
{Colorspinner.map((idx) =>(
     <div className={a&#768;ti-spinner text-&#36;{idx.color}a&#769;} role="status" key={idx.id}>
     <span className="sr-only">Loading...</span>
     </div>
     ))}
// End Prism Code//`;
export const reusespinner2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkSpinner key={idx.id} customClass="text-primary">
    <span className="sr-only">Loading...</span>
</SpkSpinner>
// End Prism Code//`;

export const spinnerdata3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
interface colorspinner {
    id:number;
    color:string;
}
export const Colorspinner:colorspinner[] = [
    { id: 1, color: 'primary' },
    { id: 2, color: 'secondary' },
    { id: 3, color: 'success' },
    { id: 4, color: 'danger' },
    { id: 5, color: 'warning' },
    { id: 6, color: 'info' },
    { id: 7, color: 'light' },
    { id: 8, color: 'dark' }
];
// End Prism Code//`;
export const reactspinner3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-spinner !bg-black dark:!bg-light !animate-ping !border-transparent " role="status" aria-label="loading"><span className="sr-only">Loading...</span>
</div>
// End Prism Code//`;
export const reusespinner3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 {Colorspinner.map((idx) => (
<SpkSpinner key={idx.id} customClass={text-{idx.color}}>
    <span className="sr-only">Loading...</span>
    </SpkSpinner>
))}
// End Prism Code//`;

export const reactspinner4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="space-x-6 space-y-4 rtl:space-x-reverse">
<div className="ti-spinner !animate-ping !border-transparent  bg-primary" role="status" aria-label="loading">
<span className="sr-only">Loading...</span>
</div>
<div className="ti-spinner !animate-ping !border-transparent  bg-secondary" role="status" aria-label="loading">
<span className="sr-only">Loading...</span>
</div>
<div className="ti-spinner !animate-ping !border-transparent  bg-warning" role="status" aria-label="loading"> 
<span className="sr-only">Loading...</span></div>
<div className="ti-spinner !animate-ping !border-transparent  bg-danger" role="status" aria-label="loading">
<span className="sr-only">Loading...</span></div>
<div className="ti-spinner !animate-ping !border-transparent  bg-success" role="status" aria-label="loading">
<span className="sr-only">Loading...</span></div>
<div className="ti-spinner !animate-ping !border-transparent  bg-info" role="status" aria-label="loading">
<span className="sr-only">Loading...</span></div>
<div className="ti-spinner !animate-ping !border-transparent  bg-black/20 dark:!bg-light dark:animate-ping "  role="status" aria-label="loading">
<span className="sr-only">Loading...</span></div>
<div className="ti-spinner !animate-ping !border-transparent  bg-gray-400" role="status" aria-label="loading">
<span className="sr-only">Loading...</span>
</div>
</div>
// End Prism Code//`;
export const spinnerdata4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
export const Growingspinner = [
    { id: 1, color: 'primary'},
    { id: 2, color: 'secondary'},
    { id: 3, color: 'warning'},
    { id: 4, color: 'danger'},
    { id: 5, color: 'success'},
    { id: 6, color: 'info'},
    { id: 7, color: 'black/20 dark:!bg-light dark:animate-ping'},
    { id: 8, color: 'gray-400'}
];
// End Prism Code//`;
export const reusespinner4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="xl:col-span-12 col-span-12">
<div className="space-x-6 space-y-4 rtl:space-x-reverse">
    {Growingspinner.map((idx)=>(
        <SpkSpinner Label="loading" customClass={!animate-ping !border-transparent  bg-{idx.color}} key={idx.id}>
            <span className="sr-only">Loading...</span>
        </SpkSpinner>
    ))}
</div>
</div>
// End Prism Code//`;

export const reactspinner5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="flex justify-center mb-6">
<div className="ti-spinner" role="status"><span className="sr-only">Loading...</span>
</div></div>
<div className="flex items-center justify-between"><strong>Loading...</strong>
<div className="ti-spinner" role="status"><span className="sr-only">Loading...</span>
</div>
</div>
// End Prism Code//`;
export const reusespinner5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<Showcode title="Alignment Flex" reactCode={reactspinner5} reusableCode={reusespinner5}>
<div className="flex justify-center mb-6">
    <SpkSpinner>
        <span className="sr-only">Loading...</span>
    </SpkSpinner>
</div>
<div className="flex items-center justify-between">
    <strong>Loading...</strong>
    <SpkSpinner>
        <span className="sr-only">Loading...</span>
    </SpkSpinner>
</div>
</Showcode>
// End Prism Code//`;

export const reactspinner6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="clearfix mb-6">
<div className="ti-spinner ltr:float-right rtl:float-left" role="status">
<span className="sr-only">Loading...</span>
</div></div><div className="clearfix">
<div className="ti-spinner ltr:float-left rtl:float-right" role="status"><span className="sr-only">Loading...</span>
</div>
</div>
// End Prism Code//`;
export const reusespinner6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="clearfix mb-6">
    <div className="ti-spinner ltr:float-right rtl:float-left" role="status">
    <span className="sr-only">Loading...</span>
</div>
</div>
<div className="clearfix">
<div className="ti-spinner ltr:float-left rtl:float-right" role="status">
    <span className="sr-only">Loading...</span>
</div>
</div>
// End Prism Code//`;

export const reactspinner7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="text-center">
<div className="ti-spinner" role="status">
<span className="sr-only">Loading...</span>
</div>
</div>
// End Prism Code//`;
export const reusespinner7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="text-center">
<SpkSpinner>
    <span className="sr-only">Loading...</span>
</SpkSpinner>
</div>
// End Prism Code//`;

export const reactspinner8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-spinner m-[3rem]" role="status">
<span className="sr-only">Loading...</span>
</div>
// End Prism Code//`;
export const reusespinner8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkSpinner customClass="!w-[1rem] !h-[1rem] me-6">
<span className="sr-only">Loading...</span>
</SpkSpinner>
<SpkSpinner customClass="!w-[1rem] !h-[1rem] me-6">
    <span className="sr-only">Loading...</span>
</SpkSpinner>
<SpkSpinner customClass="!w-[1rem] !h-[1rem] !bg-black dark:!bg-white !animate-ping !border-transparent me-6">
    <span className="sr-only">Loading...</span>
</SpkSpinner>
<SpkSpinner customClass="me-6 w-12 h-12">
    <span className="sr-only">Loading...</span>
</SpkSpinner>
<SpkSpinner customClass="!bg-black dark:!bg-white !animate-ping !border-transparent w-8 h-8">
    <span className="sr-only">Loading...</span>
</SpkSpinner>
// End Prism Code//`;

export const reactspinner9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="box-body ">
<div className="ti-spinner !w-[1rem] !h-[1rem] me-6" role="status"> <span className="sr-only">Loading...</span>
</div>
<div className="ti-spinner !w-[1rem] !h-[1rem] !bg-black dark:!bg-white !animate-ping !border-transparent me-6" role="status"> 
<span className="sr-only">Loading...</span>
</div>
<div className="ti-spinner me-6 w-12 h-12" role="status"> 
<span className="sr-only">Loading...</span></div>
<div className="ti-spinner !bg-black dark:!bg-white !animate-ping !border-transparent w-8 h-8" role="status">
 <span className="sr-only">Loading...</span>
 </div>
 </div>
// End Prism Code//`;
export const reusespinner9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkSpinner customClass="m-[3rem]">
    <span className="sr-only">Loading...</span>
</SpkSpinner>
// End Prism Code//`;

export const spinnerdata10 = `interface Buttonspinner1 {
    id:number;
    color:string;
}
export const Buttonspinner:Buttonspinner1[] = [
    { id: 1, color: 'primary-full'},
    { id: 2, color: 'secondary-full'},
    { id: 5, color: 'warning-full'},
    { id: 4, color: 'info-full'},
    { id: 6, color: 'danger-full'},
    { id: 3, color: 'success-full'},
];`
export const reactspinner10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
{Buttonspinner.map((idx)=>(
    <button type="button" className={a&#768;ti-btn ti-btn-disabled ti-btn-&#36;{idx.color}a&#769;} disabled key={idx.id}>
    <span className="ti-spinner text-white" role="status" aria-label="loading">
    <span className="sr-only">Loading...</span>
    </span>
    </button>
    <button type="button" className={a&#768;ti-btn ti-btn-disabled ti-btn-&#36;{idx.color}a&#769;} disabled><span className="ti-spinner text-white" role="status" aria-label="loading"></span><span>Loading...</span>
    </button>
))}
// End Prism Code//`;
export const reusespinner10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className='flex flex-wrap gap-x-2'>
{Buttonspinner.map((idx) => (
    <div key={idx.id}>
        <SpkButton buttontype="button" variant={idx.color} disabled="disabled"  customClass="ti-btn ti-btn-disabled ti-btn me-2" >
            <SpkSpinner Label="loading" customClass="text-white">
                <span className="sr-only">Loading...</span>
            </SpkSpinner>
        </SpkButton>
        <SpkButton buttontype="button" variant={idx.color} disabled="disabled"  customClass="ti-btn ti-btn-disabled ti-btn me-2" >
                <SpkSpinner Label="loading" customClass="text-white"></SpkSpinner>
                    <span>Loading...</span>
        </SpkButton>
    </div>
))}
</div>
// End Prism Code//`;

//Toasts

export const reacttoast1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="lg:flex lg:space-x-3 rtl:space-x-reverse space-y-4 lg:space-y-0">
<div className="ti-toast bg-white dark:bg-bodybg dark:border-white/10" role="alert"><div className="flex p-4">
<div className="flex-shrink-0">
<svg className="h-4 w-4 text-primary mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
<path  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" /></svg></div> <div className="ms-3">
 <p className="text-sm text-gray-700 dark:text-[#8c9097] dark:text-white/50">  This is a normal message. </p>
 </div>
 </div>
 </div>
 </div>
// End Prism Code//`;
export const reusetoast1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="lg:flex lg:space-x-3 rtl:space-x-reverse space-y-4 lg:space-y-0">
<SpkToast customClass="bg-white dark:bg-bodybg dark:border-white/10">
    <div className="flex p-4">
        <div className="flex-shrink-0">
            <svg className="h-4 w-4 text-primary mt-0.5"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
        </div>
        <div className="ms-3">
            <p className="text-sm text-gray-700 text-textmuted dark:text-textmuted/50">
                This is a normal message.
            </p>
        </div>
    </div>
</SpkToast>

<SpkToast customClass="bg-white dark:bg-bodybg dark:border-white/10">
    <div className="flex p-4">
        <div className="flex-shrink-0">
            <svg className="h-4 w-4 text-success mt-0.5"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
        </div>
        <div className="ms-3">
            <p className="text-sm text-gray-700 text-textmuted dark:text-textmuted/50">
                This is a success message.
            </p>
        </div>
    </div>
</SpkToast>

<SpkToast customClass="bg-white dark:bg-bodybg dark:border-white/10">
    <div className="flex p-4">
        <div className="flex-shrink-0">
            <svg className="h-4 w-4 text-danger mt-0.5" xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
        </div>
        <div className="ms-3">
            <p className="text-sm text-gray-700 text-textmuted dark:text-textmuted/50">
                This is an error message.
            </p>
        </div>
    </div>
</SpkToast>

<SpkToast customClass="bg-white dark:bg-bodybg dark:border-white/10">
    <div className="flex p-4">
        <div className="flex-shrink-0">
            <svg className="h-4 w-4 text-orangemain mt-0.5"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
        </div>
        <div className="ms-3">
            <p className="text-sm text-gray text-textmuted dark:text-textmuted/50">
                This is a warning message.
            </p>
        </div>
    </div>
</SpkToast>
</div>
// End Prism Code//`;

export const reacttoast2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-toast hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-white  dark:bg-bodybg dark:border-white/10" role="alert">
<div className="flex p-4">
 <p className="text-sm text-gray-700 dark:text-[#8c9097] dark:text-white/50"> Your email has been sent</p>
 <div className="ms-auto flex items-center space-x-3 rtl:space-x-reverse">
 <button type="button"  className="inline-flex justify-center items-center gap-2 rounded-sm border-transparent font-medium text-primary hover:underline focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm">  Undo</button>
 <button type="button"  className="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-sm dark:focus:ring-white/10 dark:focus:ring-offset-white/10"><span className="sr-only">Close</span>
 <svg className="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path  d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" /></svg>
 </button>
 </div>
 </div>
// End Prism Code//`;
export const reusetoast2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <SpkToast customClass="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-white  dark:bg-bodybg dark:border-white/10">
<div className="flex p-4">
    <p className="text-sm text-gray-700 text-textmuted dark:text-textmuted/50">
        Your email has been sent
    </p>

    <div
        className="ms-auto flex items-center space-x-3 rtl:space-x-reverse">
        <SpkButton buttontype="button"
            customClass="inline-flex justify-center items-center gap-2 rounded-sm border-transparent font-medium text-primary hover:underline focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm">
            Undo
        </SpkButton>
        <SpkButton buttontype="button"
            customClass="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-sm dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
            <span className="sr-only">Close</span>
            <svg className="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                    fill="currentColor" />
            </svg>
        </SpkButton>
    </div>
</div>
</SpkToast>
// End Prism Code//`;
export const Colortoastdata = `interface colortoast {
  id:number;
  color2:string;
}
export const ColorToasts:colortoast[] =[
  {id:1, color2:'primary'},
  {id:2, color2:'secondary'},
  {id:3, color2:'warning'},
  {id:4, color2:'info'},
  {id:5, color2:'success'},
  {id:6, color2:'danger'},
  {id:7, color2:'purplemain'},
];`
export const reacttoast3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
{ColorToasts.map((idx) =>(
     <div key={idx.id}>
     <div className={a&#768;ti-toast bg-&#36;{idx.color2} text-sm text-whitea&#769;} role="alert"> 
     <div className="flex p-4"> Hello, world! This is a toast message.<div className="ms-auto">
     <button type="button"  className="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-white/[.5]  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white/10 focus:ring-gray-600 transition-all text-sm dark:focus:ring-offset-white/10 dark:focus:ring-white/10"><span className="sr-only">Close</span>
     <svg className="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none"  xmlns="http://www.w3.org/2000/svg">  <pathd="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" /></svg>
      </button>
      </div>
      </div>
      </div>
      </div> 
      ))}
// End Prism Code//`;
export const reusetoast3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkToast customClass="bg-primary text-sm text-white" Id="dismiss-solidtoast-1">
    <div className="flex p-4">
        Hello, world! This is a toast message.
        <div className="ms-auto">
            <SpkButton buttontype="button" removeelement="#dismiss-solidtoast-1"  customClass="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-white/[.5]  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white/10 focus:ring-gray-600 transition-all text-sm dark:focus:ring-offset-white/10 dark:focus:ring-white/10">
                <span className="sr-only">Close</span>
                <svg className="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                        fill="currentColor" />
                </svg>
            </SpkButton>
        </div>
    </div>
</SpkToast>
// End Prism Code//`;

export const reacttoast4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="space-y-3">
{ColorToasts.map((idx) =>(
    <div key={idx.id}>
    <div className={a&#768;ti-toast bg-&#36;{idx.color2}/10 text-sm text-&#36;{idx.color2}a&#769;} role="alert">
     <div className="flex p-4"> Hello, world! This is a toast message.<div className="ms-auto"> 
     <button type="button" className={a&#768;inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-&#36;{idx.color2}  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white/10 focus:ring-gray-600 transition-all text-sm dark:focus:ring-offset-white/10 dark:focus:ring-white/10a&#769;}><span className="sr-only">Close</span>
     <svg className="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" /></svg></button>
      </div>
      </div>
      </div>
      </div>
      ))}</div>
// End Prism Code//`;
export const reusetoast4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkToast customClass="bg-primary/10 text-sm text-primary" Id="dismiss-lighttoast-1">
<div className="flex p-4">
    Hello, world! This is a toast message.
    <div className="ms-auto">
        <SpkButton buttontype="button" removeelement="#dismiss-lighttoast-1"" customClass="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-primary  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white/10 focus:ring-gray-600 transition-all text-sm dark:focus:ring-offset-white/10 dark:focus:ring-white/10">
            <span className="sr-only">Close</span>
            <svg className="w-3.5 h-3.5" width="16" height="16"
                    viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                    fill="currentColor" />
            </svg>
        </SpkButton>
    </div>
</div>
</SpkToast>
// End Prism Code//`;

export const reacttoast5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-toast bg-white dark:bg-bodybg dark:border-white/10" role="alert">
<div className="flex items-center p-4">
<div className="ti-spinner w-4 h-4 text-primary" role="status" aria-label="loading">
 <span className="sr-only">Loading...</span>
 </div>
 <p className="ms-3 text-sm text-gray-700 dark:text-[#8c9097] dark:text-white/50"> Action in progress</p>
 </div>
 </div>
// End Prism Code//`;
export const reusetoast5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkToast className="ti-toast bg-white dark:bg-bodybg dark:border-white/10" role="alert">
    <div className="flex items-center p-4">
        <div className="ti-spinner w-4 h-4 text-primary" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
        <p className="ms-3 text-sm text-gray-700 text-textmuted dark:text-textmuted/50">
            Action in progress
        </p>
    </div>
</SpkToast>
// End Prism Code//`;

export const reacttoast6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div id="dismiss-toast" className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 ti-toast bg-white dark:bg-bodybgdark:border-white/10" role="alert">
<div className="flex p-4">
<p className="text-sm text-gray-700 dark:text-[#8c9097] dark:text-white/50"> Your email has been sent</p>
<div className="ms-auto">
<button type="button" className="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white text-sm dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-remove-element="#dismiss-toast">
<span className="sr-only">Close</span>
<svg className="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path  d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" />
</svg></button>
</div></div>
</div>
// End Prism Code//`;
export const reusetoast6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkToast  Id="dismiss-toast" customClass="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 ti-toast bg-white dark:bg-bodybg dark:border-white/10">
    <div className="flex p-4">
        <p className="text-sm text-gray-700 text-textmuted dark:text-textmuted/50">
            Your email has been sent
        </p>

        <div className="ms-auto">
            <SpkButton removeelement="#dismiss-toast" buttontype="button" customClass="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white text-sm dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
                <span className="sr-only">Close</span>
                <svg className="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                        fill="currentColor" />
                </svg>
            </SpkButton>
        </div>
    </div>
</SpkToast>
// End Prism Code//`;

//Tooltip

export const reacttooltip1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list">
    <div customClass="hs-tooltip ti-main-tooltip">
    <button type="button" className="ti-btn hs-tooltip-toggle me-1 ti-btn-primary-full">
            Tooltip on top <span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm" role="tooltip">
                Tooltip on top
            </span>
    </button>
</div>
<div customClass="hs-tooltip ti-main-tooltip [--placement:right]">
    <button type="button" className="ti-btn hs-tooltip-toggle me-1 ti-btn-primary-full">
        Tooltip on right <span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm" role="tooltip">
            Tooltip on right
            </span>
    </button>
</div>
<div customClass=" hs-tooltip ti-main-tooltip [--placement:bottom]">
    <button type="button" className="ti-btn hs-tooltip-toggle me-1 ti-btn-primary-full">
        Tooltip on bottom <span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm" role="tooltip">
            Tooltip on bottom
            </span>
    </button>
</div>
    <div customClass=" hs-tooltip ti-main-tooltip [--placement:left]">
    <button type="button" className="ti-btn hs-tooltip-toggle me-1 ti-btn-primary-full">
        Tooltip on left <span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm" role="tooltip">
            Tooltip on left
            </span>
    </button>
</div>
</div>
// End Prism Code//`;
export const reusetooltip1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list">
    <SpkOverlay customClass="">
    <SpkButton buttontype="button" customClass="ti-btn hs-tooltip-toggle me-1" variant="primary-full">
            Tooltip on top <span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm" role="tooltip">
                Tooltip on top
            </span>
    </SpkButton>
</SpkOverlay>
<SpkOverlay customClass="[--placement:right]">
    <SpkButton buttontype="button" customClass="ti-btn hs-tooltip-toggle me-1" variant="primary-full">
        Tooltip on right <span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm" role="tooltip">
            Tooltip on right
            </span>
    </SpkButton>
</SpkOverlay>
<SpkOverlay customClass="[--placement:bottom]">
    <SpkButton buttontype="button" customClass="ti-btn hs-tooltip-toggle me-1" variant="primary-full">
        Tooltip on bottom <span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm" role="tooltip">
            Tooltip on bottom
            </span>
    </SpkButton>
</SpkOverlay>
    <SpkOverlay customClass="[--placement:left]">
    <SpkButton buttontype="button" customClass="ti-btn hs-tooltip-toggle me-1" variant="primary-full">
        Tooltip on left <span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm" role="tooltip">
            Tooltip on left
            </span>
    </SpkButton>
</SpkOverlay>
</div>
// End Prism Code//`;

export const tooltipdata2 = `interface colortooltip2 {
    id:number;
    color:string;
    text:string;
    class:string;
    class1:string;
    class2:string;
}
export const colortooltip:colortooltip2[] = [
    {id:1, color:"primary-full", text:"Primary Tooltip", class:"[--placement:top]", class1:"primary", class2:"white"},
    {id:2, color:"secondary-full", text:"Secondary Tooltip", class:"[--placement:right]", class1:"secondary", class2:"white"},
    {id:3, color:"warning-full", text:"Warning Tooltip", class:"[--placement:bottom]", class1:"warning", class2:"white"},
    {id:4, color:"info-full", text:"Info Tooltip", class:"[--placement:left]", class1:"info", class2:"white"},
    {id:5, color:"success-full", text:"Success Tooltip", class:"[--placement:top]", class1:"success", class2:"white"},
    {id:6, color:"danger-full", text:"Danger Tooltip", class:"[--placement:bottom]", class1:"danger", class2:"white"},
    {id:7, color:"light", text:"Light Tooltip", class:"[--placement:bottom]", class1:"light", class2:"black"},
    {id:8, color:"dark", text:"Dark Tooltip", class:"[--placement:bottom]", class1:"black", class2:"white"},
]`
export const reacttooltip2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="ti-btn-list">
{colortooltip.map((idx)=>(
    <div className={a&#768;hs-tooltip ti-main-tooltip &#36;{idx.class}a&#769;} key={idx.id}>
    <button type="button" className={a&#768;hs-tooltip-toggle ti-btn ti-btn-&#36;{idx.color}a&#769;}>
    {idx.text}
    <span className={a&#768;hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-&#36;{idx.class1} !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700a&#769;} role="tooltip"> {idx.text}</span>
    </button>
    </div>))}
</div>
// End Prism Code//`;

export const reusetooltip2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list">
    {colortooltip.map((idx) => (
            <SpkOverlay key={idx.id} customClass={idx.class}>
            <SpkButton buttontype="button" customClass="ti-btn hs-tooltip-toggle me-1" variant={idx.color}>
                {idx.text} 
                <span className={hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-{idx.class1}  !text-xs !font-medium !text-{idx.class2} shadow-sm dark:bg-slate-700} role="tooltip">
                    {idx.text}
                </span>
            </SpkButton>
        </SpkOverlay>
    ))}
</div>
// End Prism Code//`;

export const reacttooltip3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-tooltip ti-main-tooltip [--placement:top]">
<p className="text-muted mb-0"> Hover on the link to view the <Link aria-label="anchor" href="#" title="Link Tooltip"></Link>
<span className="hs-tooltip-toggle !text-primary"> Tooltip<span  className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-1 !bg-primary !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700" role="tooltip"> Link Tooltip</span>
</span></p>
</div>
// End Prism Code//`;
export const reusetooltip3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkOverlay  customClass="[--placement:top]">
    <p className="text-muted mb-0">
        Hover on the link to view the <Link aria-label="anchor" to="#"

            title="Link Tooltip"></Link>
        <span className="hs-tooltip-toggle !text-primary">
            Tooltip
            <span
                className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-1 !bg-primary !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
                role="tooltip">
                Link Tooltip
            </span>
        </span>
    </p>
</SpkOverlay>
// End Prism Code//`;

export const reacttooltip4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="hs-tooltip ti-main-tooltip [--placement:top]">
<button type="button" className="hs-tooltip-toggle me-4">
<svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
<path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
<span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700" role="tooltip"> Home</span>
</button>
</div>
// End Prism Code//`;

export const reusetooltip4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <SpkOverlay  customClass="[--placement:top]">
<SpkButton buttontype="button" customClass="hs-tooltip-toggle me-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
    </svg>
    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700" role="tooltip">
        Home
    </span>
</SpkButton>
</SpkOverlay>
<SpkOverlay  customClass="[--placement:top]">
<SpkButton buttontype="button" customClass="hs-tooltip-toggle me-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="fill-secondary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path   d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-secondary !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700" role="tooltip">
        Message
    </span>
</SpkButton>
</SpkOverlay>
<SpkOverlay  customClass="[--placement:top]">
<SpkButton buttontype="button" customClass="hs-tooltip-toggle me-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="fill-warning" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <g>
            <rect fill="none" height="24" width="24" />
        </g>
        <g>
        <path d="M20,9V6h-2v3h-3v2h3v3h2v-3h3V9H20z M9,12c2.21,0,4-1.79,4-4c0-2.21-1.79-4-4-4S5,5.79,5,8C5,10.21,6.79,12,9,12z M9,6 c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2S7,9.1,7,8C7,6.9,7.9,6,9,6z M15.39,14.56C13.71,13.7,11.53,13,9,13c-2.53,0-4.71,0.7-6.39,1.56 C1.61,15.07,1,16.1,1,17.22V20h16v-2.78C17,16.1,16.39,15.07,15.39,14.56z M15,18H3v-0.78c0-0.38,0.2-0.72,0.52-0.88 C4.71,15.73,6.63,15,9,15c2.37,0,4.29,0.73,5.48,1.34C14.8,16.5,15,16.84,15,17.22V18z" />
        </g>
    </svg>
    <span
        className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-warning !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
        role="tooltip">
        Add User
    </span>
</SpkButton>
</SpkOverlay>
<SpkOverlay  customClass="[--placement:top]">
<SpkButton buttontype="button" customClass="hs-tooltip-toggle me-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="fill-info" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path   d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" />
    </svg>
    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-info !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700" role="tooltip">
        Send File
    </span>
</SpkButton>
</SpkOverlay>
<SpkOverlay  customClass="[--placement:top]">
<SpkButton buttontype="button" customClass="hs-tooltip-toggle me-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="fill-success" height="24px"  viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-success !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700" role="tooltip">
        Action
    </span>
</SpkButton>
</SpkOverlay>
// End Prism Code//`;

export const reacttooltip5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="hs-tooltip ti-main-tooltip">
<button type="button" className="hs-tooltip-toggle ti-btn ti-btn-primary-full opacity-[0.6]"> Disabled button<span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm " role="tooltip">  Disabled Tooltip</span>
</button>
</div>
// End Prism Code//`;

export const reusetooltip5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkOverlay  customClass="">
    <SpkButton buttontype="button" customClass="hs-tooltip-toggle ti-btn opacity-[0.6]" variant="primary-full">
        Disabled button
        <span
            className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
            role="tooltip">
            Disabled Tooltip
        </span>
    </SpkButton>
</SpkOverlay>
// End Prism Code//`;

export const reacttooltip6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-tooltip ti-main-tooltip">
<button type="button" className="hs-tooltip-toggle avatar avatar-md me-2 online avatar-rounded">
<Image fill src="/assets/images/faces/12.jpg" alt="img" /></button>
<span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-xs !font-medium !text-white shadow-sm " role="tooltip"> Alex Carey</span>
</div>
// End Prism Code//`;

export const reusetooltip6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkOverlay  customClass="">
    <SpkButton buttontype="button" customClass="hs-tooltip-toggle avatar avatar-md me-2 online avatar-rounded">
        <Image fill src={face12} alt="img" />
    </SpkButton>
    <span
        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-xs !font-medium !text-white shadow-sm "
        role="tooltip">
        Alex Carey
    </span>
</SpkOverlay>
<SpkOverlay  customClass="">
    <SpkButton buttontype="button" customClass="hs-tooltip-toggle avatar avatar-lg me-2 online avatar-rounded">
        <Image fill src={face3} alt="img" />
    </SpkButton>
    <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-1 !bg-primary !text-xs !font-medium !text-white shadow-sm" role="tooltip">
        Marina Kai
    </span>
</SpkOverlay>
<SpkOverlay  customClass="">
    <SpkButton buttontype="button" customClass="hs-tooltip-toggle avatar avatar-xl me-2 offline avatar-rounded">
        <Image fill src={face15} alt="img" />
    </SpkButton>
    <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-1 !bg-primary !text-xs !font-medium !text-white shadow-sm" role="tooltip">
        Marina Kai
    </span>
</SpkOverlay>
// End Prism Code//`;



//dropdowns

export const reactdropdown1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list flex align-center flex-wrap">
<div className="hs-dropdown ti-dropdown me-2">
<button className="ti-btn ti-btn-primary-full ti-dropdown-toggle !py-2"type="button" id="dropdownMenuButton1"aria-expanded="false">Dropdown button<iclassName="ri-arrow-down-s-line align-middle ms-2 inline-block"></i></button>
<ul className="hs-dropdown-menu ti-dropdown-menu hidden"aria-labelledby="dropdownMenuButton1">
<li><Link className="ti-dropdown-item" href="#">Action</Link></li>
<li><Link className="ti-dropdown-item" href="#">Anotheraction</Link></li>
<li><Link className="ti-dropdown-item" href="#">Something elsehere</Link></li></ul>
</div>
<div className="hs-dropdown ti-dropdown">
<Link className="ti-btn ti-btn-secondary-full ti-dropdown-toggle !py-2"href="#" id="dropdownMenuLink" aria-expanded="false">Dropdown link<iclassName="ri-arrow-down-s-line align-middle ms-2 inline-block"></i></Link>
<ul className="hs-dropdown-menu ti-dropdown-menu hidden"aria-labelledby="dropdownMenuLink">
<li><Link className="ti-dropdown-item" href="#">Action</Link></li>
<li><Link className="ti-dropdown-item" href="#">Anotheraction</Link></li>
<li><Link className="ti-dropdown-item" href="#">Something elsehere</Link></li>
</ul>
</div>
</div>
// End Prism Code//`;
export const reusedropdown1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list flex align-center flex-wrap">
    <SpkDropdown Dropdownoptions Icon={true} Toggletext="Dropdown button" arialexpand={false} Menulabel="dropdownMenuButton1" iconPosition="after" color="primary-full" Customclass="me-2" buttonid="dropdownMenuButton1" IconClass="ri-arrow-down-s-line align-middle ms-2 inline-block" CustomToggleclass="!py-2">
        <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
    </SpkDropdown>
    <SpkDropdown Icon={true} Toggletext="Dropdown link" iconPosition="after" Menulabel="dropdownMenuLink" arialexpand={false} color="secondary-full" CustomToggleclass="!py-2" buttonid="dropdownMenuLink" IconClass="ri-arrow-down-s-line align-middle ms-2 inline-block">
        <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Another  action</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
    </SpkDropdown>
</div>
// End Prism Code//`;

export const reactdropdown2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list">
{SingleButtons.map((idx)=>(
    <div className="ti-btn-group" key={idx.id}>
    <div className="hs-dropdown ti-dropdown">
    <button className={a&#768;ti-btn ti-btn-&#36;{idx.class}-full ti-dropdown-togglea&#769;} type="button"id="dropdownMenuButton2"aria-expanded="false">Action<iclassName="ri-arrow-down-s-line align-middle ms-2 inline-block"></i></button>
    <ul className="hs-dropdown-menu ti-dropdown-menu hidden"aria-labelledby="dropdownMenuButton2">
    <li><Link className="ti-dropdown-item" href="#">Action</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Anotheraction</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Somethingelse here</Link></li>
    </ul>
    </div>
    </div>
    ))}
    </div>
// End Prism Code//`;
export const reusedropdown2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list">
    {SingleButtons.map((idx) => (
        <div className="ti-btn-group" key={idx.id}>
            <SpkDropdown Arrowicon={true} Toggletext="Action" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]" Menulabel="dropdownMenuButton2" arialexpand={false} 
                    CustomToggleclass={a&#768;ti-btn ti-btn--&#36;{idx.class}-full ti-dropdown-togglea&#769;} buttonid="dropdownMenuButton2">
                <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
            </SpkDropdown>
        </div>
    ))}
</div>
// End Prism Code//`;

export const reactdropdown3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list">
{SingleButtons.map((idx)=>(
    <div className="ti-btn-group" key={idx.id}>
    <div className="hs-dropdown ti-dropdown">
    <button className={a&#768;ti-btn ti-btn-&#36;{idx.class}-full ti-dropdown-toggle !rounded-fulla&#769;} type="button"id="dropdownMenuButton2"aria-expanded="false">Action<iclassName="ri-arrow-down-s-line align-middle ms-2 inline-block"></i></button>
    <ul className="hs-dropdown-menu ti-dropdown-menu hidden"aria-labelledby="dropdownMenuButton2">
    <li><Link className="ti-dropdown-item" href="#">Action</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Anotheraction</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Somethingelse here</Link></li>
    </ul></div>
    </div>
    ))}
    </div>
// End Prism Code//`;
export const reusedropdown3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list">
    {SingleButtons.map((idx) => (
        <div className="ti-btn-group" key={idx.id}>
            <SpkDropdown Arrowicon={true} Toggletext="Action" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]" Menulabel="dropdownMenuButton3" arialexpand={false} 
                    CustomToggleclass={a&#768;ti-btn ti-btn--&#36;{idx.class}-full ti-dropdown-toggle !rounded-fulla&#769;} buttonid="dropdownMenuButton3">
                    <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
                    <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
                    <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
            </SpkDropdown>
        </div>
    ))}
</div>
// End Prism Code//`;

export const reactdropdown4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list">
{SingleButtons.map((idx)=>(
    <div className="ti-btn-group" key={idx.id}>
    <div className="hs-dropdown ti-dropdown">
    <button className={a&#768;ti-btn ti-btn-outline-&#36;{idx.class} ti-dropdown-toggle a&#769;} type="button"id="dropdownMenuButton2" aria-expanded="false">Action<i className="ri-arrow-down-s-line align-middle ms-2 inline-block"></i></button>
    <ul className="hs-dropdown-menu ti-dropdown-menu hidden" aria-labelledby="dropdownMenuButton2"><li><LinkclassName="ti-dropdown-item"href="#">Action</LinkclassName=></li>
    <li><Link className="ti-dropdown-item" href="#">Another action</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li>
    </ul>
    </div>
    </div>
    ))}
    </div>
// End Prism Code//`;
export const reusedropdown4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list">
{SingleButtons.map((idx) => (
    <div className="ti-btn-group" key={idx.id}>
        <SpkDropdown Arrowicon={true} Toggletext="Action" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]" Menulabel="dropdownMenuButton4" arialexpand={false} 
                CustomToggleclass={a&#768;ti-btn ti-btn-outline--&#36;{idx.class} ti-dropdown-toggle a&#769;} buttonid="dropdownMenuButton4">
                <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
        </SpkDropdown>
    </div>
))}
</div>
// End Prism Code//`;

export const reactdropdown5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list">
{SingleButtons.map((idx)=>(
    <div className="ti-btn-group" key={idx.id}>
     <div className="hs-dropdown ti-dropdown"> 
      <button className={a&#768;ti-btn ti-btn-outline-&#36;{idx.class} ti-dropdown-toggle !rounded-fulla&#769;} type="button"id="dropdownMenuButton2"aria-expanded="false">Action<i className="ri-arrow-down-s-line align-middle ms-2 inline-block"></i> 
       </button> 
        <ul className="hs-dropdown-menu ti-dropdown-menu hidden"aria-labelledby="dropdownMenuButton2"><li>
        <Link className="ti-dropdown-item" href="#">Action</Link></li
        ><li><Link className="ti-dropdown-item" href="#">Another action</Link></li><li><Link className="ti-dropdown-item" href="#">Something else here</Link></li>  </ul>
         </div></div>))}
        </div>
// End Prism Code//`;
export const reusedropdown5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list">
    {SingleButtons.map((idx) => (
        <div className="ti-btn-group" key={idx.id}>
            <SpkDropdown Arrowicon={true} Toggletext="Action" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]" Menulabel="dropdownMenuButton5" arialexpand={false} 
                    CustomToggleclass={a&#768;ti-btn ti-btn-outline-&#36;{idx.class} ti-dropdown-toggle !rounded-fulla&#769;} buttonid="dropdownMenuButton5">
                    <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
                    <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
                    <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
            </SpkDropdown>
        </div>
    ))}
</div>
// End Prism Code//`;

export const Dropdowndat6 = `interface SingleButtons1 {
  id:number;
  class:string;
}
export const SingleButtons:SingleButtons1[] = [
    { id: 1, class: 'primary' },
    { id: 2, class: 'secondary' },
    { id: 3, class: 'success' },
    { id: 4, class: 'info' },
    { id: 5, class: 'warning' },
    { id: 6, class: 'danger' }
  ];`
export const reactdropdown6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list">
{SingleButtons.map((idx) =>(
    <div className="ti-btn-group !m-0" key={idx.id}>
    <div className="hs-dropdown ti-dropdown">
    <buttonclassName={a&#768;ti-btn ti-btn-&#36;{idx.class}-full !me-0 !rounded-e-none ti-dropdown-togglea&#769;}type="button" id="dropdownMenuButton26"aria-expanded="false">Action</button>
    <button type="button" aria-label="button"className={a&#768;ti-btn ti-btn-&#36;{idx.class}-full opacity-[0.85] !rounded-s-nonea&#769;}><iclassName="ri-arrow-down-s-line align-middle inline-block"></iclassName=></button>
    <ul className="hs-dropdown-menu ti-dropdown-menu hidden"aria-labelledby="dropdownMenuButton26">
    <li><Link className="ti-dropdown-item" href="#">Action</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Anotheraction</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Somethingelse here</Link></li>
    </ul>
    </div>
    </div>
    ))}
 </div>
// End Prism Code//`;
export const reusedropdown6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list">
{SingleButtons.map((idx) => (
    <div className="ti-btn-group !gap-0 !m-0" key={idx.id}>
        <SpkButton 
            customClass={a&#768;ti-btn ti-btn--&#36;{idx.class}-full !rounded-tr-none !rounded-br-none rtl:!rounded-tl-none rtl:!rounded-bl-none  rtl:!rounded-tr-sm rtl:!rounded-br-sm  -me-[4px] !pt-[4.45px]a&#769;}
            buttontype="button" Id="dropdownMenuButton26"
            Expand="false">
            Action
        </SpkButton>
        <SpkDropdown Arrowicon={true} Toggletext="" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]" Menulabel="dropdownMenuButton26" arialexpand={false} 
            CustomToggleclass={a&#768;ti-btn ti-btn--&#36;{idx.class}-full opacity-[0.85] !rounded-tl-none !rounded-bl-none rtl:!rounded-tr-none rtl:!rounded-br-none  rtl:!rounded-tl-sm rtl:!rounded-bl-sm -ms-[4px] !pt-[4.45px] pb-[0.4rem]a&#769;} buttonid="dropdownMenuButton26">
                <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
        </SpkDropdown>  
    </div>
))}
</div>
// End Prism Code//`;

export const reactdropdown7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-group my-1 me-2 ti-dropdown hs-dropdown">
<button className="ti-btn-primary-full ti-btn-lg ti-dropdown-toggle" type="button" aria-expanded="false"> Large button<i className="ri-arrow-down-s-line align-middle inline-block"></i></button>
<ul className="hs-dropdown-menu ti-dropdown-menu hidden">
 <li><Link className="ti-dropdown-item" href="#">Action</Link></li> 
 <li><Link className="ti-dropdown-item" href="#">Another action</Link> </li>
  <li><Link className="ti-dropdown-item" href="#">Something else  here</Link></li>
   <li>  <hr className="dropdown-divider" /> </li>
    <li><Link className="ti-dropdown-item" href="#">Separated link</Link> </li>
    </ul>
    </div>
// End Prism Code//`;
export const reusedropdown7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkDropdown Arrowicon={true} Customclass="ti-btn-group my-1 me-2" Toggletext="Large button"   arialexpand={false}
    CustomToggleclass="ti-btn-primary-full ti-btn-lg ti-dropdown-toggle">
    <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
    <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
    <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
    <li><hr className="dropdown-divider" /></li>
    <li><Link className="ti-dropdown-item" to="#">Separated link</Link></li>
</SpkDropdown>
<div className="ti-btn-group my-1 me-2">
<div className="hs-dropdown ti-dropdown">
    <SpkButton
        customClass="ti-btn-lg !py-[0.75rem] !px-[1rem] ti-dropdown-toggle ti-btn-light !rounded-tr-none !rounded-br-none rtl:!rounded-tl-none rtl:!rounded-bl-none  rtl:!rounded-tr-sm rtl:!rounded-br-sm  -me-[4px]"
        buttontypetype="button" Id="dropdownMenuButton32"
        aria-expanded="false">
        Large split button
    </SpkButton>
        <SpkDropdown Arrowicon={true} Customclass="[--placement:bottom-left]"  buttonid="hs-split-dropdown"   arialexpand={false}
            CustomToggleclass="ti-btn-lg !py-[0.75rem] !px-[1rem] ti-btn-light hover:!bg-light !rounded-tl-none !rounded-bl-none rtl:!rounded-tr-none rtl:!rounded-br-none  rtl:!rounded-tl-sm rtl:!rounded-bl-sm ti-dropdown-toggle -ms-[4px]" 
                Menulabel="dropdownMenuButton32">
            <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
    </SpkDropdown>
</div>

</div>
<div className="ti-btn-group my-1 me-2">
<SpkDropdown Arrowicon={true} Toggletext="Small button" Customclass="ti-btn-group my-1 me-2"  buttonid="hs-split-dropdown"   arialexpand={false}
        CustomToggleclass="ti-btn ti-btn-primary-full !py-1 !px-4 !text-[0.75rem] ti-dropdown-toggle" 
            Menulabel="hs-split-dropdown">
        <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><Link className="ti-dropdown-item" to="#">Separated link</Link></li>
</SpkDropdown>
</div>
<div className="ti-btn-group my-1 me-2">
<div className="hs-dropdown ti-dropdown">
    <SpkButton
        customClass="ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-light !rounded-tr-none !rounded-br-none rtl:!rounded-tl-none rtl:!rounded-bl-none  rtl:!rounded-tr-sm rtl:!rounded-br-sm  -me-[4px]"
        buttontype="button" id="dropdownMenuButton33"
        aria-expanded="false">
        Small split button
    </SpkButton>
        <SpkDropdown Arrowicon={true} Toggletext="" Customclass="[--placement:bottom-left]"  buttonid="hs-split-dropdown"   arialexpand={false}
                CustomToggleclass="ti-btn !py-1 !px-2 hover:!bg-light  ti-btn-light opacity-[0.85] !rounded-tl-none !rounded-bl-none rtl:!rounded-tr-none rtl:!rounded-br-none  rtl:!rounded-tl-sm rtl:!rounded-bl-sm ti-dropdown-toggle -ms-[4px]  pb-[0.4rem]" 
                    Menulabel="hs-split-dropdown">
            <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
        </SpkDropdown>
</div>

</div>
// End Prism Code//`;

export const reactdropdown8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <SpkDropdown Svg={true} Toggletext="Dropup" Customclass="[--placement:top-left] rtl:[--placement:bottom-right] m-1" SvgClass="hs-dropdown-open:rotate-180 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
        Svgicon="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-split-dropright"   arialexpand={false}
    CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2" Custommenuclass="transition-none" Menulabel="hs-split-dropright">
    <Link className="ti-dropdown-item" to="#">Action</Link>
    <Link className="ti-dropdown-item" to="#">Another action</Link>
    <Link className="ti-dropdown-item" to="#">Something else here</Link>
</SpkDropdown>
<div className="ti-dropdown m-1">
    <SpkButton buttonid="button" customClass="relative ti-dropdown-toggle  ti-btn ti-btn-secondary-full !py-1 !rounded-e-none !me-0">
        Split dropup
    </SpkButton>
    <SpkDropdown Svg={true} Customclass="[--placement:top-left]" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
            Svgicon="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-split-dropright"   arialexpand={false}
            CustomToggleclass="hs-dropdown-toggle relative ti-btn ti-btn-secondary-full !opacity-[0.85]  !rounded-s-none ti-dropdown-toggle" Custommenuclass="transition-none" Menulabel="hs-split-dropright">
            <Link className="ti-dropdown-item" to="#">Action</Link>
            <Link className="ti-dropdown-item" to="#">Another action</Link>
            <Link className="ti-dropdown-item" to="#">Something else here</Link>
    </SpkDropdown>
</div>
// End Prism Code//`;
export const reusedropdown8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-dropdown ti-dropdown [--placement:top-left] m-1">
<button id="hs-dropup" type="button"className="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2">
Dropup
<svg className="hs-dropdown-open:rotate-180 ti-dropdown-caret !text-white"width="16" height="16" viewBox="0 0 16 16" fill="none"xmlns="http://www.w3.org/2000/svg">
<pathd="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
<div className="hs-dropdown-menu  mt-0 transition-none ti-dropdown-menu hidden"aria-labelledby="hs-dropup">
<Link className="ti-dropdown-item" href="#">Action</Link>
<Link className="ti-dropdown-item" href="#">Another action</Link>
<Link className="ti-dropdown-item" href="#">Something else here</Link>
</div></div>
<div className="ti-dropdown m-1">
<button type="button" className="relative ti-dropdown-toggle  ti-btn ti-btn-secondary-full !py-1 !rounded-e-none !me-0">Split dropup</button>
<div className="hs-dropdown ti-dropdown [--placement:top-left]">
<button id="hs-split-dropup" type="button"className="hs-dropdown-toggle relative ti-btn ti-btn-secondary-full !opacity-[0.85]  !rounded-s-none ti-dropdown-toggle">
<span className="sr-only">Toggle Dropdown</span>
<svg className="hs-dropdown-open:rotate-180 ti-dropdown-caret !text-white"width="16" height="16" viewBox="0 0 16 16" fill="none"xmlns="http://www.w3.org/2000/svg">
<pathd="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
<div className="hs-dropdown-menu  transition-none mt-0 ti-dropdown-menu hidden"aria-labelledby="hs-split-dropup">
<Link className="ti-dropdown-item" href="#">Action</Link>
<Link className="ti-dropdown-item" href="#">Another action</Link>
<Link className="ti-dropdown-item" href="#">Something else here</Link>
</div></div
></div>
// End Prism Code//`;


export const reactdropdown9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="hs-dropdown ti-dropdown [--placement:right-top] m-1">
<button id="hs-dropright" type="button"className="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2">Dropright
<svg className="w-auto h-2.5 ti-dropdown-caret !text-white" width="16" height="16"viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<pathd="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><svg></button>
<div className="hs-dropdown-menu  ti-dropdown-menu transition-none hidden"aria-labelledby="hs-dropright">
<Link className="ti-dropdown-item" href="#">Action</Link>
<Link className="ti-dropdown-item" href="#">Another action</Link>
<Link className="ti-dropdown-item" href="#">Something else here</Link>
<Link href="#" aria-label="anchor"><hr className="dropdown-divider" /></Link>
<Link className="ti-dropdown-item" href="#">Separated link</Link>
</div></div><div className="hs-dropdown ti-dropdown [--placement:right-top] m-1">
<button type="button"className="hs-dropdown-toggle relative ti-btn ti-btn-secondary-full  !py-2 !rounded-e-none ti-dropdown-toggle !me-0">Split dropright</button><div className="hs-dropdown ti-dropdown [--placement:right-top]"><button id="hs-split-dropright" type="button"className="hs-dropdown-toggle relative  ti-dropdown-toggle !opacity-[0.85] rounded-none  ti-btn ti-btn-secondary-full !rounded-s-none">
<span className="sr-only">Toggle Dropdown</span>
<svg className="w-auto h-2.5 ti-dropdown-caret !text-white" width="16"height="16" viewBox="0 0 16 16" fill="none"xmlns="http://www.w3.org/2000/svg"><pathd="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
<div className="hs-dropdown-menu ti-dropdown-menu transition-none hidden"aria-labelledby="hs-split-dropright">
<Link className="ti-dropdown-item" href="#">Action</Link>
<Link className="ti-dropdown-item" href="#">Another action</Link>
<Link className="ti-dropdown-item" href="#">Something else here</Link>
<Link href="#" aria-label="anchor"><hr className="dropdown-divider" /></Link>
<Link className="ti-dropdown-item" href="#">Separated link</Link>
</div>
</div>
</div>
// End Prism Code//`;
export const reusedropdown9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <SpkDropdown Svg={true} Toggletext="Dropright" Customclass="[--placement:left-top]" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
        Svgicon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-split-dropright"   arialexpand={false}
        CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2" Custommenuclass="transition-none" Menulabel="hs-split-dropright">
    <Link className="ti-dropdown-item" to="#">
        Action
    </Link>
    <Link className="ti-dropdown-item" to="#">
        Another action
    </Link>
    <Link className="ti-dropdown-item" to="#">
        Something else here
    </Link>
    <Link to="#" aria-label="anchor">
        <hr className="dropdown-divider" />
    </Link>
    <Link className="ti-dropdown-item" to="#">
        Separated link
    </Link>
</SpkDropdown>
<div className="hs-dropdown ti-dropdown [--placement:right-top] m-1">
<SpkButton buttontype="button" customClass="hs-dropdown-toggle relative ti-btn ti-btn-secondary-full  !py-2 !rounded-e-none ti-dropdown-toggle !me-0">
    Split dropright
</SpkButton>
<SpkDropdown Svg={true} Customclass=" [--placement:left-top]" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
        Svgicon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-split-dropright"   arialexpand={false}
        CustomToggleclass="hs-dropdown-toggle relative  ti-dropdown-toggle !opacity-[0.85] rounded-none  ti-btn ti-btn-secondary-full !rounded-s-none" Custommenuclass="transition-none" Menulabel="hs-split-dropright">
        <Link className="ti-dropdown-item" to="#">Action</Link>
        <Link className="ti-dropdown-item" to="#">Another action</Link>
        <Link className="ti-dropdown-item" to="#"> Something else here</Link>
        <Link to="#" aria-label="anchor"><hr className="dropdown-divider" /></Link>
        <Link className="ti-dropdown-item" to="#">  Separated link</Link>
</SpkDropdown>
</div>
// End Prism Code//`;

export const reactdropdown10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="hs-dropdown ti-dropdown [--placement:left-top] m-1">
<button id="hs-dropright3" type="button"className="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2">
<svg className="w-auto h-2.5 text-white" width="16" height="16" viewBox="0 0 16 16"fill="none" xmlns="http://www.w3.org/2000/svg"><pathd="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14"stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>Dropleft</button><div className="hs-dropdown-menu  ti-dropdown-menu transition-none hidden"aria-labelledby="hs-dropright">
<Link className="ti-dropdown-item" href="#">Action</Link>
<Link className="ti-dropdown-item" href="#">Another action</Link>
<Link className="ti-dropdown-item" href="#">Something else here</Link>
<Link href="#" aria-label="anchor"><hr className="dropdown-divider" /></Link>
<Link className="ti-dropdown-item" href="#">Separated link</Link></div>
</div
><div className="hs-dropdown ti-dropdown [--placement:left-top] m-1">
<div className="hs-dropdown ti-dropdown [--placement:left-top]">
<button id="hs-split-dropright1" type="button"className="hs-dropdown-toggle relative  ti-dropdown-toggle !opacity-[0.85] rounded-none  ti-btn ti-btn-secondary-full !rounded-e-none"><span className="sr-only">Toggle Dropdown</span><svg className="w-auto h-2.5 text-white" width="16" height="16"viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<pathd="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14"stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
<div className="hs-dropdown-menu ti-dropdown-menu transition-none hidden"aria-labelledby="hs-split-dropright">
<Link className="ti-dropdown-item" href="#">Action</Link>
<Link className="ti-dropdown-item" href="#">Another action</Link>
<Link className="ti-dropdown-item" href="#">Something else here</Link>
<Link href="#" aria-label="anchor"><hr className="dropdown-divider" /></Link>
<Link className="ti-dropdown-item" href="#">Separated link</Link>
</div>
</div>
<button type="button"className="hs-dropdown-toggle relative ti-btn ti-btn-secondary-full  !py-2 !rounded-s-none ti-dropdown-toggle !me-0">Split dropleft</button>
</div>
// End Prism Code//`;
export const reusedropdown10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <SpkDropdown Svg={true} Svgaftertext="Dropleft" Customclass="[--placement:left-top] m-1" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
        Svgicon="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-dropright3"   arialexpand={false}
        CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2" Custommenuclass="transition-none" Menulabel="hs-dropright3">
        <Link className="ti-dropdown-item" to="#">Action</Link>
        <Link className="ti-dropdown-item" to="#">Another action</Link>
        <Link className="ti-dropdown-item" to="#"> Something else here</Link>
        <Link to="#" aria-label="anchor"><hr className="dropdown-divider" /></Link>
        <Link className="ti-dropdown-item" to="#">  Separated link</Link>
</SpkDropdown>
<div className="hs-dropdown ti-dropdown [--placement:left-top] m-1">
    <SpkDropdown Svg={true} Customclass=" [--placement:left-top]" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
            Svgicon="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-split-dropright1"   arialexpand={false}
            CustomToggleclass="hs-dropdown-toggle relative  ti-dropdown-toggle !opacity-[0.85] rounded-none  ti-btn ti-btn-secondary-full !rounded-e-none" Custommenuclass="transition-none" Menulabel="hs-split-dropright1">
            <Link className="ti-dropdown-item" to="#">Action</Link>
            <Link className="ti-dropdown-item" to="#">Another action</Link>
            <Link className="ti-dropdown-item" to="#"> Something else here</Link>
            <Link to="#" aria-label="anchor"><hr className="dropdown-divider" /></Link>
            <Link className="ti-dropdown-item" to="#">  Separated link</Link>
    </SpkDropdown>
    <SpkButton buttontype="button"
        customClass="hs-dropdown-toggle relative ti-btn ti-btn-secondary-full  !py-2 !rounded-s-none ti-dropdown-toggle !me-0">
        Split dropleft
    </SpkButton>
</div>
// End Prism Code//`;

export const reactdropdown11 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-dropdown ti-dropdown">
<button type="button" className="ti-btn ti-btn-primary-full ti-dropdown-toggle !py-2" aria-expanded="false">
 Dropstart<i className="ri-arrow-down-s-line align-middle inline-block"></i></button>
 <ul className="hs-dropdown-menu ti-dropdown-menu hidden"> 
 <li><Link className="ti-dropdown-item" href="#">Regular link</Link></li> 
 <li><Link className="ti-dropdown-item active" href="#" aria-current="true">Active link</Link> </li>
  <li><Link className="ti-dropdown-item" href="#">Another link</Link></li>
  </ul>
  </div>
// End Prism Code//`;
export const reusedropdown11 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkDropdown Arrowicon={true} Toggletext="Dropstart"  arialexpand={false} 
    CustomToggleclass="ti-btn ti-btn-primary-full ti-dropdown-toggle !py-2" >
    <li><Link className="ti-dropdown-item" to="#">Regular link</Link></li>
    <li><Link className="ti-dropdown-item active" to="#" aria-current="true">Active link</Link></li>
    <li><Link className="ti-dropdown-item" to="#">Another link</Link></li>
</SpkDropdown>
// End Prism Code//`;

export const reactdropdown12 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="hs-dropdown ti-dropdown">
    <button type="button" className="ti-btn-primary-full ti-dropdown-toggle !py-2" aria-expanded="false"> Dropstart<i className="ri-arrow-down-s-line align-middle inline-block"></i></button>
     <ul className="hs-dropdown-menu ti-dropdown-menu hidden"> 
        <li><Link className="ti-dropdown-item" href="#">Regular link</Link></li>
        <li><Link className="ti-dropdown-item disabled" href="#"  aria-current="true">Active  link</Link></li>
        <li><Link className="ti-dropdown-item" href="#">Another link</Link></li>
    </ul>
 </div>
// End Prism Code//`;
export const reusedropdown12 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkDropdown Arrowicon={true} Toggletext="Dropstart" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]"   arialexpand={false} 
CustomToggleclass="ti-btn-primary-full ti-dropdown-toggle !py-2" >
    <li><Link className="ti-dropdown-item" to="#">Regular link</Link></li>
    <li><Link className="ti-dropdown-item disabled" to="#" aria-current="true">Active link</Link></li>
    <li><Link className="ti-dropdown-item" to="#">Another link</Link></li>
</SpkDropdown>
// End Prism Code//`;

export const reactdropdown13 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list"><div className="ti-btn-group"> 
<div className="hs-dropdown ti-dropdown">
 <button className="ti-btn ti-btn-primary-full ti-dropdown-toggle" type="button" id="defaultDropdown" aria-expanded="false"> Default dropdown<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button> 
 <ul className="hs-dropdown-menu ti-dropdown-menu hidden" aria-labelledby="defaultDropdown"> 
    <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
    <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
    <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
  </ul> 
  </div>
  </div>
  <div className="ti-btn-group"> 
  <div className="hs-dropdown ti-dropdown">
   <button className="ti-btn ti-btn-secondary-full ti-dropdown-toggle" type="button" id="dropdownMenuClickableOutside" aria-expanded="false"> Clickable outside<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
<ul className="hs-dropdown-menu ti-dropdown-menu hidden" aria-labelledby="defaultDropdown">
     <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
      <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
      <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
 </ul> 
    </div>
    </div>
      <div className="ti-btn-group"> 
      <div className="hs-dropdown ti-dropdown"> 
      <button className="ti-btn ti-btn-info-full ti-dropdown-toggle" type="button" id="dropdownMenuClickableInside" aria-expanded="false"> Clickable inside<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
    <ul className="hs-dropdown-menu ti-dropdown-menu hidden" aria-labelledby="dropdownMenuClickableInside"> <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
         <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
    </ul> 
         </div>
         </div>
         <div className="ti-btn-group"> <div className="hs-dropdown ti-dropdown">
          <button className="ti-btn ti-btn-warning-full ti-dropdown-toggle" type="button" id="dropdownMenuClickable" aria-expanded="false"> Manual close<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
    <ul className="hs-dropdown-menu ti-dropdown-menu hidden" aria-labelledby="dropdownMenuClickable">
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
         <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
        <ul> 
            </div>
        </div>
         </div>
// End Prism Code//`;
export const reusedropdown13 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="ti-btn-list">
<div className="ti-btn-group">
<SpkDropdown Arrowicon={true} Toggletext="Default dropdown" Customclass="hs-dropdown ti-dropdown"   arialexpand={false} 
        CustomToggleclass="ti-btn-primary-full ti-dropdown-toggle" buttonid="defaultDropdown" Menulabel="defaultDropdown" >
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
</SpkDropdown>
</div>
<div className="ti-btn-group">
<SpkDropdown Arrowicon={true} Toggletext="Clickable outside"  arialexpand={false} 
        CustomToggleclass="ti-btn-secondary-full ti-dropdown-toggle" buttonid="dropdownMenuClickableOutside" Menulabel="dropdownMenuClickableOutside" >
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
</SpkDropdown>
</div>
<div className="ti-btn-group">
<SpkDropdown Arrowicon={true} Toggletext="Clickable inside"  arialexpand={false} 
        CustomToggleclass="ti-btn-info-full ti-dropdown-toggle" buttonid="dropdownMenuClickableInside" Menulabel="dropdownMenuClickableInside" >
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
</SpkDropdown>
</div>
<div className="ti-btn-group">
<SpkDropdown Arrowicon={true} Toggletext="Manual close" Customclass=""   arialexpand={false}  buttonid="dropdownMenuClickable" Menulabel="dropdownMenuClickable"
        CustomToggleclass="ti-btn ti-btn-warning-full ti-dropdown-toggle" >
        <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Menu item</Link> </li>
</SpkDropdown>
</div>
</div>
// End Prism Code//`;

export const reactdropdown14 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="hs-dropdown ti-dropdown">
<button className="ti-btn ti-btn-secondary-full ti-dropdown-toggle !py-2" type="button" id="dropdownMenu2" aria-expanded="false"> Dropdown<i className="ri-arrow-down-s-line align-middle inline-block"></i></button>
<div className="hs-dropdown-menu ti-dropdown-menu hidden"> <form className="!px-6 !py-4"> <div className="mb-4"> 
<label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label> 
<input type="email" className="form-control w-full !rounded-md" id="exampleDropdownFormEmail1" placeholder="email@example.com" /> </div>
 <div className="mb-4">
  <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label> 
  <input type="password" className="form-control w-full !rounded-md" id="exampleDropdownFormPassword1" placeholder="Password" /> </div> 
  <div className="mb-4">
   <div className="form-check !ps-0"> <input type="checkbox" className="form-check-input" id="dropdownCheck" />
    <label className="ps-2 form-check-label" htmlFor="dropdownCheck"> Remember me </label>
     </div> 
     </div>
<button type="submit" className="ti-btn ti-btn-primary-full">Sign in</button> </form> 
<div className="dropdown-divider"></div>
<Link className="ti-dropdown-item" href="#">New around here? Sign up</Link>
<Link className="ti-dropdown-item" href="#">Forgot password?</Link>
</div>
</div>
// End Prism Code//`;
export const reusedropdown14 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkDropdown Arrowicon={true} Toggletext="Dropdown" Customclass="[--auto-close:inside]"   arialexpand={false}  buttonid="hs-dropdown-auto-close-inside" Menulabel="hs-dropdown-auto-close-inside"
CustomToggleclass="ti-btn ti-btn-secondary-full ti-dropdown-toggle !py-2" >
            <form className="!px-6 !py-4">
            <div className="mb-4">
                <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email
                    address</label>
                <input type="email" className="form-control w-full !rounded-md"
                    id="exampleDropdownFormEmail1" placeholder="email@example.com" />
            </div>
            <div className="mb-4">
                <label htmlFor="exampleDropdownFormPassword1"
                    className="form-label">Password</label>
                <input type="password" className="form-control w-full !rounded-md"
                    id="exampleDropdownFormPassword1" placeholder="Password" />
            </div>
            <div className="mb-4">
                <div className="form-check !ps-0">
                    <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                    <label className="ps-2 form-check-label" htmlFor="dropdownCheck">
                        Remember me
                    </label>
                </div>
            </div>
            <SpkButton buttontype="submit" variant="primary-full" customClass="ti-btn">Sign in</SpkButton>
        </form>
        <div className="dropdown-divider"></div>
        <Link className="ti-dropdown-item" to="#">New around here? Sign
            up</Link>
        <Link className="ti-dropdown-item" to="#">Forgot password?</Link>
</SpkDropdown>
// End Prism Code//`;

export const reactdropdown15 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="">
<div className="ti-dropdown hs-dropdown">
 <button className="ti-btn ti-btn-primary-full ti-dropdown-toggle mb-0 !py-2" type="button" id="dropdownMenuButton" aria-expanded="false"> Dropdown<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button> 
  <ul className="hs-dropdown-menu ti-dropdown-menu hidden " aria-labelledby="dropdownMenuButton"> 
    <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
    <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
    <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
  </ul>
</div>
<div className="ti-dropdown hs-dropdown">
    <button type="button" className="ti-btn ti-btn-secondary-full ti-dropdown-toggle mb-0 !py-2" aria-expanded="false"> Right-aligned menu<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
     <ul className="hs-dropdown-menu ti-dropdown-menu ti-dropdown-menu-end hidden ">
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
    </ul>
</div>
 <div className="ti-dropdown hs-dropdown" data-hs-dropdown-strategy="absolute">
     <button type="button" id="hs-dropdown-left-but-right-on-lg" className="ti-btn ti-btn-info-full ti-dropdown-toggle mb-0 !py-2" aria-expanded="false"> Left-aligned, right-aligned lg<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button> 
    <ul className="hs-dropdown-menu ti-dropdown-menu hidden lg:ti-dropdown-menu-end " aria-labelledby="hs-dropdown-left-but-right-on-lg">
            <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
            <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
            <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
     </ul>
</div>
<div className="ti-dropdown hs-dropdown" data-hs-dropdown-strategy="absolute"> 
    <button type="button" id="hs-dropdown-right-but-left-on-lg" className="ti-btn ti-btn-warning-full ti-dropdown-toggle mb-0 !py-2" aria-expanded="false"> Right-aligned, left-aligned lg<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
    <ul className="hs-dropdown-menu ti-dropdown-menu hidden  ti-dropdown-menu-end lg:ti-dropdown-menu-start" aria-labelledby="hs-dropdown-right-but-left-on-lg">
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
    </ul>
</div>
<div className="hs-dropdown ti-dropdown [--placement:left-top] m-1"> 
        <button id="hs-dropright2" type="button" className="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-success-full !py-2"> <svg className="w-auto h-2.5 text-white" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> </svg> Dropstart 
        </button>
    <ul className="hs-dropdown-menu  ti-dropdown-menu transition-none hidden" aria-labelledby="hs-dropright"> <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
    </ul>
</div>
<div className="hs-dropdown ti-dropdown [--placement:right-top] m-1">
        <button id="hs-dropright1" type="button" className="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2"> Dropend <svg className="w-auto h-2.5 ti-dropdown-caret !text-white" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> </svg> </button>
    <ul className="hs-dropdown-menu  ti-dropdown-menu transition-none hidden" aria-labelledby="hs-dropright"> 
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
        <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
    </ul>
</div>
<div className="hs-dropdown ti-dropdown [--placement:top-left] m-1"> 
        <button id="hs-dropup1" type="button" className="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-success-full !py-2"> Dropup <svg className="hs-dropdown-open:rotate-180 ti-dropdown-caret !text-white" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> </svg> </button>
        <ul className="hs-dropdown-menu  mt-0 transition-none ti-dropdown-menu hidden" aria-labelledby="hs-dropup">
            <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
            <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li> 
            <li><Link className="ti-dropdown-item" href="#">Menu item</Link> </li>
        </ul>
</div>
 </div>
// End Prism Code//`;
export const reusedropdown15 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list">
<div className='ti-btn-group' >
<SpkDropdown Arrowicon={true} Toggletext="Dropdown" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]"   arialexpand={false} 
    buttonid="dropdownMenuButton" Menulabel="dropdownMenuButton" CustomToggleclass="ti-btn ti-btn-primary-full ti-dropdown-toggle mb-0 !py-2" >
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
</SpkDropdown>
</div>
<div className='ti-btn-group' >
<SpkDropdown Arrowicon={true} Toggletext="Right-aligned menu" Customclass=""   arialexpand={false} 
    CustomToggleclass="ti-btn-secondary-full ti-dropdown-toggle mb-0 !py-2" Custommenuclass="ti-dropdown-menu-end">
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
</SpkDropdown>
</div>
<div className='ti-btn-group'>
<SpkDropdown Arrowicon={true} Toggletext=" Left-aligned, right-aligned lg" Customclass=""   arialexpand={false}  buttonid="hs-dropdown-left-but-right-on-lg"
    CustomToggleclass="ti-btn-info-full ti-dropdown-toggle mb-0 !py-2" Custommenuclass="ti-dropdown-menu-end" Menulabel="hs-dropdown-left-but-right-on-lg">
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
</SpkDropdown>
</div>
<div className='ti-btn-group' >
<SpkDropdown Arrowicon={true} Toggletext="Right-aligned, left-aligned lg" Customclass=""   arialexpand={false}  buttonid="-dropdown-right-but-left-on-lg"
    CustomToggleclass="ti-btn ti-btn-warning-full ti-dropdown-toggle mb-0 !py-2" Custommenuclass=" ti-dropdown-menu-end lg:ti-dropdown-menu-start" Menulabel="-dropdown-right-but-left-on-lg">
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
</SpkDropdown>
</div>
<div className='ti-btn-group' >
<SpkDropdown Svgaftertext="Dropstart" Svg={true} Customclass="--placement:left-top] m-1" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
        Svgicon="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-dropright"   arialexpand={false}
        CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-success-full !py-2" Custommenuclass="transition-none" Menulabel="hs-dropright">
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
</SpkDropdown>
</div>
<div className='ti-btn-group' >
<SpkDropdown Toggletext="Dropend" Svg={true} Customclass="[--placement:right-top] m-1 rtl:[--placement:bottom-right]" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
        Svgicon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-dropright"   arialexpand={false}
        CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2" Custommenuclass="mt-0 transition-none" Menulabel="hs-dropright">
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
</SpkDropdown>
</div>
<div className='ti-btn-group' >
    <SpkDropdown Toggletext="Dropup" Svg={true} Customclass="[--placement:top-left] m-1" SvgClass=" hs-dropdown-open:rotate-180 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
        Svgicon="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-dropup1"   arialexpand={false}
            CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-success-full !py-2" Custommenuclass="mt-0 transition-none" Menulabel="hs-dropup1">
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
            <li><Link className="ti-dropdown-item" to="#">Menu item</Link></li>
    </SpkDropdown>
</div>
</div>
// End Prism Code//`;

export const reactdropdown16 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-dropdown hs-dropdown">
<button className="ti-btn ti-btn-dark ti-dropdown-toggle !py-2" type="button"id="dropdownMenuButton34" aria-expanded="false">Dropdown button<i className="ri-arrow-down-s-line align-middle inline-block"></i></button>
<u className="hs-dropdown-menu ti-dropdown-menu !bg-black dark:!bg-defaulttextcolor/10 hidden">
<li><Link className="ti-dropdown-item !text-white dark:!text-defaulttextcolor" href="#">Action</Link></li>
<li><Link className="ti-dropdown-item !text-white dark:!text-defaulttextcolor" href="#">Another action</Link></li>
<li><Link className="ti-dropdown-item !text-white dark:!text-defaulttextcolor" href="#">Something else here</Link></li>
</u>
</div>
// End Prism Code//`;
export const reusedropdown16 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkDropdown Arrowicon={true} Toggletext="Dropdown button" Customclass=""   arialexpand={false}  buttonid="hs-dropdown-left-but-right-on-lg"
        CustomToggleclass="ti-btn ti-btn-dark ti-dropdown-toggle !py-2 dark:hover:!bg-white  dark:hover:!text-black" Custommenuclass="!bg-black">
    <li><Link className="ti-dropdown-item !text-white dark:!text-defaulttextcolor" to="#">Action</Link></li>
    <li><Link className="ti-dropdown-item !text-white dark:!text-defaulttextcolor" to="#">Another action</Link></li>
    <li><Link className="ti-dropdown-item !text-white dark:!text-defaulttextcolor" to="#">Something else here</Link></li>
</SpkDropdown>
// End Prism Code//`;

export const reactdropdown17 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list">
<div className="ti-dropdown hs-dropdown"> <button className="ti-btn ti-btn-primary-full ti-dropdown-toggle !py-2" type="button" aria-expanded="false"> Primary<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button> 
  <ul className="hs-dropdown-menu ti-dropdown-menu !bg-primary hidden"> 
    <li><Link className="ti-dropdown-item !text-white" href="#">Action</Link></li>
    <li><Link className="ti-dropdown-item !text-white" href="#">Another action</Link></li>
    <li><Link className="ti-dropdown-item !text-white" href="#">Something else here</Link></li> 
  </ul>
</div>
<div className="ti-dropdown hs-dropdown">
   <button className="ti-btn ti-btn-secondary-full ti-dropdown-toggle !py-2" type="button" aria-expanded="false"> secondary<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
    <ul className="hs-dropdown-menu ti-dropdown-menu !bg-secondary hidden">
        <li><Link className="ti-dropdown-item !text-white" href="#">Action</Link></li> 
        <li><Link className="ti-dropdown-item !text-white" href="#">Another action</Link></li> <li><Link className="ti-dropdown-item !text-white" href="#">Something else here</Link></li>
    </ul>
</div>
 <div className="ti-dropdown hs-dropdown"> 
    <button className="ti-btn ti-btn-warning-full ti-dropdown-toggle !py-2" type="button" aria-expanded="false"> warning<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button> 
    <ul className="hs-dropdown-menu ti-dropdown-menu dropmenu-item-warning hidden"> <li><Link className="ti-dropdown-item active" href="#">Active</Link> </li> <li><Link className="ti-dropdown-item" href="#">Action</Link></li> 
        <li><Link className="ti-dropdown-item" href="#">Another action</Link></li>
        <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li>
    </ul>
</div>
 <div className="ti-dropdown hs-dropdown"> 
        <button className="ti-btn ti-btn-info-full ti-dropdown-toggle !py-2" type="button" aria-expanded="false"> info<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
        <ul className="hs-dropdown-menu ti-dropdown-menu dropmenu-item-info hidden">
            <li><Link className="ti-dropdown-item active" href="#">Active</Link> </li>
            <li><Link className="ti-dropdown-item" href="#">Action</Link></li>
            <li><Link className="ti-dropdown-item" href="#">Another action</Link></li>
            <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li>
         </ul>
</div>
<div className="ti-dropdown hs-dropdown">
    <button className="ti-btn ti-btn-success ti-dropdown-toggle !py-2" type="button" aria-expanded="false"> success<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
        <ul className="hs-dropdown-menu ti-dropdown-menu dropmenu-light-success hidden">
            <li><Link className="ti-dropdown-item" href="#">Action</Link></li> 
            <li><Link className="ti-dropdown-item" href="#">Another action</Link></li> 
            <li><Link className="ti-dropdown-item active" href="#">Active</Link> </li> 
            <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li>
        </ul>
</div>
    <div className="ti-dropdown hs-dropdown">
        <button className="ti-btn ti-btn-danger ti-dropdown-toggle !py-2" type="button" aria-expanded="false"> danger<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
        <ul className="hs-dropdown-menu ti-dropdown-menu dropmenu-light-danger hidden">
            <li><Link className="ti-dropdown-item" href="#">Action</Link></li> 
            <li><Link className="ti-dropdown-item" href="#">Another action</Link></li>
            <li><Link className="ti-dropdown-item active" href="#">Active</Link> </li>
            <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li>
      </ul>
</div>
</div>
// End Prism Code//`;
export const reusedropdown17 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list flex flex-wrap gap-x-2">
<SpkDropdown Arrowicon={true} Toggletext="Primary" Customclass=""   arialexpand={false} Custommenuclass="!bg-primary"
    CustomToggleclass="ti-btn-primary-full ti-dropdown-toggle !py-2" >
                <li><Link className="ti-dropdown-item !text-white" to="#">Action</Link></li>
                <li><Link className="ti-dropdown-item !text-white" to="#">Another action</Link></li>
                <li><Link className="ti-dropdown-item !text-white" to="#">Something else here</Link></li>
</SpkDropdown>
<SpkDropdown Arrowicon={true} Toggletext="secondary" Customclass=""   arialexpand={false} Custommenuclass="!bg-secondary block"
    CustomToggleclass="ti-btn-secondary-full ti-dropdown-toggle !py-2" >
        <li><Link className="ti-dropdown-item !text-white" to="#!">Action</Link></li>
        <li><Link className="ti-dropdown-item !text-white" to="#!">Another action</Link></li>
        <li><Link className="ti-dropdown-item !text-white" to="#!">Something else here</Link></li>
</SpkDropdown>
<SpkDropdown Arrowicon={true} Toggletext="warning" Customclass=""   arialexpand={false} Custommenuclass="dropmenu-item-warning"
    CustomToggleclass="ti-btn-warning-full ti-dropdown-toggle !py-2" >
        <li><Link to="#" className="ti-dropdown-item active">Active</Link></li>
        <li><Link to="#" className="ti-dropdown-item">Action</Link></li>
        <li><Link to="#" className="ti-dropdown-item">Another  action</Link></li>
        <li><Link to="#" className="ti-dropdown-item">Something else here</Link></li>
</SpkDropdown> 
<SpkDropdown Arrowicon={true} Toggletext="info" Customclass=""   arialexpand={false} Custommenuclass="dropmenu-item-info block"
    CustomToggleclass="ti-btn-info-full ti-dropdown-toggle !py-2" >
        <li><Link className="ti-dropdown-item active" to="#">Active</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
</SpkDropdown>
<SpkDropdown Arrowicon={true} Toggletext="Success" Customclass=""  arialexpand={false} Custommenuclass="dropmenu-light-success block"
    CustomToggleclass="ti-btn-success ti-dropdown-toggle !py-2" >
        <li><Link className="ti-dropdown-item" to="#!">Action</Link></li>
        <li><Link className="ti-dropdown-item" to="#!">Another   action</Link></li>
        <li><Link className="ti-dropdown-item active" to="#!">Active</Link></li>
        <li><Link className="ti-dropdown-item" to="#!">Something else here</Link></li>
</SpkDropdown>
<SpkDropdown Arrowicon={true} Toggletext="Danger" Customclass=""   arialexpand={false} Custommenuclass="dropmenu-light-danger block"
    CustomToggleclass="ti-btn-danger ti-dropdown-toggle !py-2" >
        <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Another action</Link></li>
        <li><Link className="ti-dropdown-item active" to="#">Active</Link></li>
        <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
</SpkDropdown>
</div>
// End Prism Code//`;

export const reactdropdown18 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list">
<div className="ti-dropdown hs-dropdown"> 
    <button type="button" className="ti-btn ti-btn-ghost-primary ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false"> Primary<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button> 
    <ul className="hs-dropdown-menu ti-dropdown-menu hidden"> 
            <li><Link className="ti-dropdown-item" href="#">Action</Link></li>
            <li><Link className="ti-dropdown-item" href="#">Another action</Link></li>
            <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li> 
            <li> <hr className="dropdown-divider" /> </li> 
            <li><Link className="ti-dropdown-item" href="#">Separated link</Link></li>
    </ul>
</div>
<div className="ti-dropdown hs-dropdown"> 
   <button type="button" className="ti-btn ti-btn-ghost-secondary ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false"> Secondary<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button> 
        <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
            <li><Link className="ti-dropdown-item" href="#">Action</Link></li>
            <li><Link className="ti-dropdown-item" href="#">Another action</Link></li>
            <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li> 
            <li> <hr className="dropdown-divider" /> </li> <li><Link className="ti-dropdown-item" href="#">Separated link</Link></li>
        </ul>
</div>
<div className="ti-dropdown hs-dropdown">
        <button type="button" className="ti-btn ti-btn-ghost-success ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false"> Success<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
        <ul className="hs-dropdown-menu ti-dropdown-menu hidden"> 
            <li><Link className="ti-dropdown-item" href="#">Action</Link></li> 
            <li><Link className="ti-dropdown-item" href="#">Another action</Link></li> 
            <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li> 
            <li> <hr className="dropdown-divider" /> </li> 
            <li><Link className="ti-dropdown-item" href="#">Separated link</Link></li> 
        </ul>
</div>
<div className="ti-dropdown hs-dropdown"> 
         <button type="button" className="ti-btn ti-btn-ghost-info ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false"> Info<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
        <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
            <li><Link className="ti-dropdown-item" href="#">Action</Link></li>
            <li><Link className="ti-dropdown-item" href="#">Another action</Link></li>
            <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li> 
            <li> <hr className="dropdown-divider" /> </li>
            <li><Link className="ti-dropdown-item" href="#">Separated link</Link></li> 
        </ul>
</div>
<div className="ti-dropdown hs-dropdown"> 
    <button type="button" className="ti-btn ti-btn-ghost-warning ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false"> Warning<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button>
    <ul className="hs-dropdown-menu ti-dropdown-menu hidden"> 
        <li><Link className="ti-dropdown-item" href="#">Action</Link></li> 
        <li><Link className="ti-dropdown-item" href="#">Another action</Link></li>
        <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li> 
        <li> <hr className="dropdown-divider" /> </li>
        <li><Link className="ti-dropdown-item" href="#">Separated link</Link></li>
    </ul>
</div>
<div className="ti-dropdown hs-dropdown">
   <button type="button" className="ti-btn ti-btn-ghost-danger ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false"> Danger<i className="ri-arrow-down-s-line align-middle inline-block"></i> </button> 
    <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
        <li><Link className="ti-dropdown-item" href="#">Action</Link></li> 
        <li><Link className="ti-dropdown-item" href="#">Another action</Link></li>
        <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li>
        <li> <hr className="dropdown-divider" /> </li>
        <li><Link className="ti-dropdown-item" href="#">Separated link</Link></li>
    </ul>
</div>
</div>
// End Prism Code//`;
export const reusedropdown18 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="ti-btn-list flex flex-wrap gap-x-2">
<SpkDropdown Arrowicon={true} Toggletext="Primary" Customclass=""   arialexpand={false} 
    CustomToggleclass="ti-btn-ghost-primary ti-dropdown-toggle !py-2 !shadow-none">
                <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Another  action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="ti-dropdown-item" to="#">Separated link</Link></li>
</SpkDropdown>
<SpkDropdown Arrowicon={true} Toggletext="Secondary" Customclass=""   arialexpand={false} 
    CustomToggleclass="ti-btn-ghost-secondary ti-dropdown-toggle !py-2 !shadow-none">
                <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Another  action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="ti-dropdown-item" to="#">Separated link</Link></li>
</SpkDropdown>
<SpkDropdown Arrowicon={true} Toggletext="Success" Customclass=""   arialexpand={false} 
    CustomToggleclass="ti-btn-ghost-success ti-dropdown-toggle !py-2 !shadow-none">
                <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Another  action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="ti-dropdown-item" to="#">Separated link</Link></li>
</SpkDropdown>
<SpkDropdown Arrowicon={true} Toggletext="Info" Customclass=""   arialexpand={false} 
    CustomToggleclass="ti-btn-ghost-info ti-dropdown-toggle !py-2 !shadow-none">
                <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Another  action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="ti-dropdown-item" to="#">Separated link</Link></li>
</SpkDropdown>
<SpkDropdown Arrowicon={true} Toggletext="Warning" Customclass=""   arialexpand={false} 
    CustomToggleclass="ti-btn-ghost-warning ti-dropdown-toggle !py-2 !shadow-none">
                <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Another  action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="ti-dropdown-item" to="#">Separated link</Link></li>
</SpkDropdown>
<SpkDropdown Arrowicon={true} Toggletext="Danger" Customclass=""   arialexpand={false}
    CustomToggleclass="ti-btn ti-btn-ghost-danger ti-dropdown-toggle !py-2 !shadow-none" >
                <li><Link className="ti-dropdown-item" to="#">Action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Another  action</Link></li>
                <li><Link className="ti-dropdown-item" to="#">Something else here</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="ti-dropdown-item" to="#">Separated link</Link></li>
</SpkDropdown>
</div>
// End Prism Code//`;

export const reactdropdown19 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <p className=" mb-3">Use <code>.ti-dropdown-item-text.</code> to create non-interactive dropdown items.</p>
<div className="bd-example">
    <ul className="dropdown-menu border dark:border-defaultborder/10 shadow-sm"> 
    <li><span className="!py-2 !px-4 !text-[0.875rem]">Dropdown item text</span> </li> 
    <li><Link className="ti-dropdown-item" href="#">Action</Link></li> 
    <li><Link className="ti-dropdown-item" href="#">Another action</Link> </li> 
    <li><Link className="ti-dropdown-item" href="#">Something else here</Link> 
    </li>
    </ul>
</div>
// End Prism Code//`;

export const reactdropdown20 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <p className="card-titlte mb-3">Add a <code>.dropdown-header</code> to label sections of actions in any dropdown menu.</p>
<div className="bd-example">
    <ul className="dropdown-menu border dark:border-defaultborder/10 shadow-sm">
    <li><h6 className="dropdown-header">Dropdown header</h6></li>
    <li><Link className="ti-dropdown-item" href="#">Action</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Another action</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Something else here</Link></li>
    </ul>
</div>
// End Prism Code//`;

export const reactdropdown21 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="bd-example">
    <ul className="dropdown-menu border dark:border-defaultborder/10 shadow-sm">
    <li><Link className="dropdown-header" href="#">Heading</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Action</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Another action</Link></li>
    <li><Link className="ti-dropdown-item" href="#">Something elsehere</Link></li>
    <li><hr className="dropdown-divider" /></li>
    <li><Link className="ti-dropdown-item" href="#">Separated link</Link></li>
    </ul>
</div>
// End Prism Code//`;

export const reactdropdown22 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="bd-example">
    <div className="dropdown-menu border dark:border-defaultborder/10 
    shadow-sm p-6 text-[#8c9097] dark:text-white/50 text-[0.875rem] max-w-[200px]">
    <p>Some example text thats free-flowing within the dropdown menu.</p>
    <p className="mb-0"> And this is more example text.</p>
    </div>
</div>
// End Prism Code//`;

//Object Fit

export const object1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="object-fit-container">
    <Image fill src="/assets/images/media/media-28.jpg"
    className="object-contain border dark:border-defaultborder/10 !rounded-md"
    alt="..."/>
</div>
// End Prism Code//`;

export const object2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="object-fit-container">
<Image fill src="/assets/images/media/media-28.jpg"
className="object-cover border dark:border-defaultborder/10 md:!rounded-md" alt="..."/>
</div>
// End Prism Code//`;

export const object3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="object-fit-container">
    <Image fill src="/assets/images/media/media-28.jpg"
    className="object-fill border dark:border-defaultborder/10 !rounded-md" alt="..." />
</div>
// End Prism Code//`;

export const object4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="object-fit-container">
    <Image fill src="/assets/images/media/media-28.jpg"
    className="object-scale-down border dark:border-defaultborder/10 !rounded-md" alt="..." />
</div>
// End Prism Code//`;

export const object5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="object-fit-container">
    <Image fill src="/assets/images/media/media-28.jpg"
    className="object-none border dark:border-defaultborder/10 !rounded-md" alt="..." />
</div>
// End Prism Code//`;

export const object6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="object-fit-container">
    <Image fill src="/assets/images/media/media-28.jpg"
    className="sm:object-contain border dark:border-defaultborder/10 !rounded-md" alt="..." />
</div>
// End Prism Code//`;

export const object7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="object-fit-container">
    <Image fill src="/assets/images/media/media-28.jpg"
    className="md:object-contain border dark:border-defaultborder/10 !rounded-md" alt="..." />
</div>
// End Prism Code//`;

export const object8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="object-fit-container">
    <Image fill src="/assets/images/media/media-28.jpg"
    className="lg:object-contain border dark:border-defaultborder/10 !rounded-md" alt="..." />
</div>
// End Prism Code//`;

export const object9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="object-fit-container">
    <Image fill src="/assets/images/media/media-28.jpg"
    className="xl:object-contain border dark:border-defaultborder/10 !rounded-md" alt="..." />
</div>
// End Prism Code//`;

export const object10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="object-fit-container">
<Image fill src="/assets/images/media/media-28.jpg"
className="xxl:object-contain border dark:border-defaultborder/10 !rounded-md"
alt="..." />
</div>
// End Prism Code//`;

export const object11 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="object-fit-container">
    <video src="/assets/video/1.mp4"
    className="object-contain !rounded-md border dark:border-defaultborder/10"
    autoPlay loop muted></video>
</div>
// End Prism Code//`;

export const object12 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="object-fit-container">
    <video src="/assets/video/1.mp4"
    className="object-cover !rounded-md border dark:border-defaultborder/10"
    autoPlay loop muted></video>
</div>
// End Prism Code//`;

export const object13 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="object-fit-container">
    <video src="/assets/video/1.mp4"
    className="object-fill !rounded-md border dark:border-defaultborder/10"
    autoPlay loop muted></video>
</div>
// End Prism Code//`;

export const object14 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="object-fit-container">
    <video src="/assets/video/1.mp4"
    className="object-scale-down !rounded-md border dark:border-defaultborder/10"
    autoPlay loop muted></video>
</div>
// End Prism Code//`;

export const object15 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="object-fit-container">
    <video src="/assets/video/1.mp4"
    className="object-none !rounded-md border dark:border-defaultborder/10"
    autoPlay loop muted></video>
</div>
// End Prism Code//`;

//Popovers

export const reactpopover1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list">
<div className="hs-tooltip ti-main-tooltip [--trigger:click]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" href="#!" scroll={false}>Popover Top
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Top</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
      </a>
  </div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" href="#!" scroll={false}>Popover Right
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Right</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
      </a>
  </div>
  <div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:bottom]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" href="#!" scroll={false}>Popover Bottom
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Bottom</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
      </a>
  </div>
  <div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:left]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" href="#!" scroll={false}>Popover Left
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Left</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
      </a>
  </div>
</div>
// End Prism Code//`;
export const reusepopover1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkOverlay customClass="[--trigger:click] me-2">
    <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" to="#" >Popover Top
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Top</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
        </Link> 
    </SpkOverlay>
    <SpkOverlay customClass="[--trigger:click] [--placement:right] me-2">
    <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" to="#" >Popover Right
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Right</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
        </Link>
    </SpkOverlay>
    <SpkOverlay customClass="[--trigger:click] [--placement:bottom] me-2">
    <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" to="#" >Popover Bottom
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Bottom</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
        </Link>
    </SpkOverlay>
    <SpkOverlay customClass="me-2 [--trigger:click] [--placement:left]">
    <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" to="#" >Popover Left
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Left</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
        </Link>
    </SpkOverlay>
// End Prism Code//`;

export const reactpopover2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list">
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" href="#!" scroll={false}>Header Primary
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-primary !rounded-t-md !py-2  !px-4 text-white border-defaultborder text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p className="!text-defaulttextcolor  !text-[0.8rem] !py-4 !px-4 text-start">Popover With Primary Header</p>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-secondary" href="#!" scroll={false}>Header Secondary
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-secondary !py-2 !rounded-t-md !px-4 text-white border-defaultborder text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With Secondary Header</p>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:bottom]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-info" href="#!" scroll={false}>Header Info
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-info !py-2 !px-4 !rounded-t-md text-white border-defaultborder text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With Info Header</p>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:left]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-warning" href="#!" scroll={false}>Header warning
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-warning !py-2 !px-4 !rounded-t-md text-white border-defaultborder text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning Header</p>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-success" href="#!" scroll={false}>Header succuss
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-success !py-2 !px-4 text-white !rounded-t-md border-defaultborder text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With succuss Header</p>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-danger" href="#!" scroll={false}>Header danger
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-danger !py-2 !px-4 text-white border-defaultborder !rounded-t-md text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger Header</p>
        </div>
      </a>
</div>
</div>
// End Prism Code//`;
export const reusepopover2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="ti-btn-list">
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:top]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" to="#" >Header Primary
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
        <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-primary !rounded-t-md !py-2  !px-4 text-white border-defaultborder text-start w-full text-[1rem]">
        <h6>Color Header</h6>
        </div>
        <p className="!text-defaulttextcolor  !text-[0.8rem] !py-4 !px-4 text-start">Popover With Primary Header</p>
    </div>
    </Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:right]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-secondary" to="#" >Header Secondary
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
        <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-secondary !py-2 !rounded-t-md !px-4 text-white border-defaultborder text-start w-full text-[1rem]">
        <h6>Color Header</h6>
        </div>
        <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With Secondary Header</p>
    </div>
    </Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:bottom]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-info" to="#" >Header Info
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
        <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-info !py-2 !px-4 !rounded-t-md text-white border-defaultborder text-start w-full text-[1rem]">
        <h6>Color Header</h6>
        </div>
        <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With Info Header</p>
    </div>
    </Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:left]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-warning" to="#" >Header warning
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
        <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-warning !py-2 !px-4 !rounded-t-md text-white border-defaultborder text-start w-full text-[1rem]">
        <h6>Color Header</h6>
        </div>
        <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning Header</p>
    </div>
    </Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:top]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-success" to="#" >Header succuss
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
        <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-success !py-2 !px-4 text-white !rounded-t-md border-defaultborder text-start w-full text-[1rem]">
        <h6>Color Header</h6>
        </div>
        <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With succuss Header</p>
    </div>
    </Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:top]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-danger" to="#" >Header danger
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
        <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-danger !py-2 !px-4 text-white border-defaultborder !rounded-t-md text-start w-full text-[1rem]">
        <h6>Color Header</h6>
        </div>
        <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger Header</p>
    </div>
    </Link>
</SpkOverlay>
</div>
// End Prism Code//`;

export const reactpopover3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list">
<div className="hs-tooltip ti-main-tooltip  [--trigger:click] [--placement:top]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-primary-full" href="#!" scroll={false}>Primary
        <div className="hs-tooltip-content ti-main-tooltip-content !bg-primary !z-[1000] !p-0 !max-w-[276px] !border-white/10" role="tooltip">
            <div  className="!border-b !border-solid dark:border-white/10 !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Primary Color background</h6>
            </div>
            <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With primary background</p>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-secondary-full" href="#!" scroll={false}>Secondary
        <div className="hs-tooltip-content ti-main-tooltip-content !bg-secondary !p-0 !max-w-[276px] !border-white/10" role="tooltip">
            <div  className="!border-b !border-solid dark:border-white/10 !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Secondary Color background</h6>
            </div>
            <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With secondary background</p>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-info-full" href="#!" scroll={false}>Info
        <div className="hs-tooltip-content ti-main-tooltip-content !bg-secondary  !p-0 !max-w-[276px]  !border-white/10" role="tooltip">
            <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Info Color background</h6>
            </div>
            <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With info background</p>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-warning-full" href="#!" scroll={false}>Warning
        <div className="hs-tooltip-content ti-main-tooltip-content !bg-warning  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
            <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Warning Color background</h6>
            </div>
            <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning background</p>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-success-full" href="#!" scroll={false}>Success
        <div className="hs-tooltip-content ti-main-tooltip-content !bg-success  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
            <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Success Color background</h6>
            </div>
            <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With success background</p>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-danger-full" href="#!" scroll={false}>Danger
        <div className="hs-tooltip-content ti-main-tooltip-content !bg-danger  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
            <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Danger Color background</h6>
            </div>
            <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger background</p>
        </div>
      </a>
</div>
</div>
// End Prism Code//`;
export const reusepopover3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list">
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:top]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-primary-full" to="#" >Primary
<div className="hs-tooltip-content ti-main-tooltip-content !bg-primary !z-[1000] !p-0 !max-w-[276px] !border-white/10" role="tooltip">
    <div  className="!border-b !border-solid dark:border-white/10 !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
    <h6>Primary Color background</h6>
    </div>
    <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With primary background</p>
</div>
</Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:right]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-secondary-full" to="#" >Secondary
<div className="hs-tooltip-content ti-main-tooltip-content !bg-secondary !p-0 !max-w-[276px] !border-white/10" role="tooltip">
    <div  className="!border-b !border-solid dark:border-white/10 !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
    <h6>Secondary Color background</h6>
    </div>
    <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With secondary background</p>
</div>
</Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:top]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-info-full" to="#" >Info
<div className="hs-tooltip-content ti-main-tooltip-content !bg-secondary  !p-0 !max-w-[276px]  !border-white/10" role="tooltip">
    <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
    <h6>Info Color background</h6>
    </div>
    <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With info background</p>
</div>
</Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:right]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-warning-full" to="#" >Warning
<div className="hs-tooltip-content ti-main-tooltip-content !bg-warning  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
    <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
    <h6>Warning Color background</h6>
    </div>
    <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning background</p>
</div>
</Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:top]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-success-full" to="#" >Success
<div className="hs-tooltip-content ti-main-tooltip-content !bg-success  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
    <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
    <h6>Success Color background</h6>
    </div>
    <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With success background</p>
</div>
</Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:right]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-danger-full" to="#" >Danger
<div className="hs-tooltip-content ti-main-tooltip-content !bg-danger  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
    <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
    <h6>Danger Color background</h6>
    </div>
    <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger background</p>
</div>
</Link>
</SpkOverlay>
</div>
// End Prism Code//`;

export const reactpopover4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="ti-btn-list">
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top] ">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-primary" href="#!" scroll={false}>Primary
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div className="!bg-primary/10">
                <div  className="!border-b !border-solid !py-2 !px-4  text-primary !border-primary/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p className="!text-primary !text-[0.8rem] !py-4 !px-4 text-start">Popover With primary background</p>

            </div>
        </div>
    </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-secondary" href="#!" scroll={false}>Secondary
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div className="!bg-secondary/10">
                <div  className="!border-b !border-solid !py-2 !px-4  text-secondary !border-secondary/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p className="!text-secondary !text-[0.8rem] !py-4 !px-4 text-start">Popover With secondary background</p>

            </div>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-info" href="#!" scroll={false}>Info
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div className="!bg-info/10">
                <div  className="!border-b !border-solid !py-2 !px-4  text-info !border-info/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p className="!text-info !text-[0.8rem] !py-4 !px-4 text-start">Popover With info background</p>

            </div>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-warning" href="#!" scroll={false}>Warning
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div className="!bg-warning/10">
                <div  className="!border-b !border-solid !py-2 !px-4  text-warning !border-warning/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p className="!text-warning !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning background</p>
            </div>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-success" href="#!" scroll={false}>Success
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div className="!bg-success/10">
                <div  className="!border-b !border-solid !py-2 !px-4  text-success !border-success/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p className="!text-success !text-[0.8rem] !py-4 !px-4 text-start">Popover With success background</p>

            </div>
        </div>
      </a>
</div>
<div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-danger" href="#!" scroll={false}>danger
        <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div className="!bg-danger/10">
                <div  className="!border-b !border-solid !py-2 !px-4  text-danger !border-danger/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p className="!text-danger !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger background</p>

            </div>
        </div>
      </a>
</div>
</div>
// End Prism Code//`;
export const reusepopover4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="ti-btn-list">
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:top]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-primary" to="#" >Primary
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
        <div className="!bg-primary/10">
            <div  className="!border-b !border-solid !py-2 !px-4  text-primary !border-primary/20 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Color background</h6>
            </div>
            <p className="!text-primary !text-[0.8rem] !py-4 !px-4 text-start">Popover With primary background</p>

        </div>
    </div>
</Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:right]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-secondary" to="#" >Secondary
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
        <div className="!bg-secondary/10">
            <div  className="!border-b !border-solid !py-2 !px-4  text-secondary !border-secondary/20 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Color background</h6>
            </div>
            <p className="!text-secondary !text-[0.8rem] !py-4 !px-4 text-start">Popover With secondary background</p>

        </div>
    </div>
    </Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:top]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-info" to="#" >Info
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
        <div className="!bg-info/10">
            <div  className="!border-b !border-solid !py-2 !px-4  text-info !border-info/20 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Color background</h6>
            </div>
            <p className="!text-info !text-[0.8rem] !py-4 !px-4 text-start">Popover With info background</p>

        </div>
    </div>
    </Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:right]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-warning" to="#" >Warning
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
        <div className="!bg-warning/10">
            <div  className="!border-b !border-solid !py-2 !px-4  text-warning !border-warning/20 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Color background</h6>
            </div>
            <p className="!text-warning !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning background</p>
        </div>
    </div>
    </Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:top]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-success" to="#" >Success
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
        <div className="!bg-success/10">
            <div  className="!border-b !border-solid !py-2 !px-4  text-success !border-success/20 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Color background</h6>
            </div>
            <p className="!text-success !text-[0.8rem] !py-4 !px-4 text-start">Popover With success background</p>

        </div>
    </div>
    </Link>
</SpkOverlay>
<SpkOverlay customClass="me-2 [--trigger:click] [--placement:right]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-danger" to="#" >danger
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
        <div className="!bg-danger/10">
            <div  className="!border-b !border-solid !py-2 !px-4  text-danger !border-danger/20 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Color background</h6>
            </div>
            <p className="!text-danger !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger background</p>

        </div>
    </div>
    </Link>
</SpkOverlay>
</div>
// End Prism Code//`;

export const reactpopover5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="hs-tooltip ti-main-tooltip
 [--trigger:click] [--placement:top]">
    <Link className="hs-tooltip-toggle
    ti-main-tooltip-toggle ti-btn ti-btn-primary-full opacity-60" href="#"> 
    Disabled button<div className="hs-tooltip-content 
    ti-main-tooltip-content dark:bg-bodybg " role="tooltip"> 
    Diabled Popover</div>
    </Link>
</div>
// End Prism Code//`;
export const reusepopover5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkOverlay customClass="me-2 [--trigger:click] [--placement:top]">
    <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-primary-full opacity-60" to="#" >
    Disabled button
    <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg " role="tooltip">
    Disabled Popover
    </div>
    </Link>
</SpkOverlay>
// End Prism Code//`;

export const reactpopover6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="box-body flex">
<div className="hs-tooltip ti-main-tooltip me-6 !max-w-[276px] 
[--trigger:click] [--placement:top]">  
  <Link className="hs-tooltip-toggle ti-main-tooltip-toggle" href="#">
    <svg xmlns="http://www.w3.org/2000/svg" className="svg-primary" height="24px" 
    viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 
    2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 
    2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg> 
        <div className="hs-tooltip-content ti-main-tooltip-content !py-4 !px-4 !bg-primary !text-white"
        role="tooltip">
        <p>The Icon Popover</p> 
        </div>  
    </Link>
 </div>
 <div className="hs-tooltip ti-main-tooltip !max-w-[276px] [--trigger:click] [--placement:left]">
 <Link className="hs-tooltip-toggle ti-main-tooltip-toggle" href="#"> 
    <svg xmlns="http://www.w3.org/2000/svg" className="fill-secondary" 
    height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 
    2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 
    8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        <div className="hs-tooltip-content ti-main-tooltip-content !bg-secondary !text-white 
        !py-4 !px-4" role="tooltip">
        <p>The Icon Popover</p>
        </div>
 </Link>    
 </div>
 </div>
// End Prism Code//`;
export const reusepopover6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkOverlay customClass="me-6 !max-w-[276px] [--trigger:click] [--placement:top]">
    <Link className="hs-tooltip-toggle ti-main-tooltip-toggle" to="#" >
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-primary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
        <div className="hs-tooltip-content ti-main-tooltip-content !py-4 !px-4 !bg-primary !text-white" role="tooltip">
        <p>The Icon Popover</p>
        </div>
    </Link>
</SpkOverlay>
<SpkOverlay customClass="!max-w-[276px] [--trigger:click] [--placement:left]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle" to="#" >
    <svg xmlns="http://www.w3.org/2000/svg" className="fill-secondary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
    <div className="hs-tooltip-content ti-main-tooltip-content !bg-secondary !text-white !py-4 !px-4" role="tooltip">
        <p>The Icon Popover</p>
    </div>
</Link>
</SpkOverlay>
// End Prism Code//`;

export const reactpopover7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="flex justify-center gap-4">
 <div className="hs-tooltip ti-main-tooltip [--trigger:click]">
   <a className="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
     <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
       <i className="ri-arrow-up-s-line"></i>
     </span>
     <div className="hs-tooltip-content ti-main-tooltip-content" role="tooltip" data-popper-placement="top" >
       Top popover
     </div>
   </a>
 </div>

 <div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:left]">
   <a className="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
     <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
       <i className="ri-arrow-left-s-line rtl:rotate-180"></i>
     </span>
     <div className="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip" 
     data-popper-placement="left">
       Left popover
     </div>
   </a>
 </div>

 <div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
   <a className="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
     <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
       <i className="ri-arrow-right-s-line rtl:rotate-180"></i>
     </span>
     <div className="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip"
      data-popper-placement="right">
       Right popover
     </div>
   </a>
 </div>

 <div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:bottom]">
   <a className="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
     <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
       <i className="ri-arrow-down-s-line"></i>
     </span>
     <div className="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip"
      data-popper-placement="bottom">
       Bottom popover
     </div>
   </a>
 </div>

</div>
// End Prism Code//`;
export const reusepopover7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="flex justify-center gap-4">
<SpkOverlay customClass=" [--trigger:click]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle" to="#" >
    <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
    <i className="ri-arrow-up-s-line"></i>
    </span>
    <div className="hs-tooltip-content ti-main-tooltip-content" role="tooltip" data-popper-placement="top">
    Top popover
    </div>
</Link>
</SpkOverlay>
<SpkOverlay customClass=" [--trigger:click] [--placement:left]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle" to="#" >
    <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
    <i className="ri-arrow-left-s-line rtl:rotate-180"></i>
    </span>
    <div className="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip" data-popper-placement="left">
    Left popover
    </div>
</Link>
</SpkOverlay>
<SpkOverlay customClass=" [--trigger:click] [--placement:right]">
    <Link className="hs-tooltip-toggle ti-main-tooltip-toggle" to="#" >
    <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
        <i className="ri-arrow-right-s-line rtl:rotate-180"></i>
    </span>
    <div className="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip" data-popper-placement="right">
        Right popover
    </div>
    </Link>
</SpkOverlay>

<SpkOverlay customClass=" [--trigger:click] [--placement:bottom]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle" to="#" >
    <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
    <i className="ri-arrow-down-s-line"></i>
    </span>
    <div className="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip" data-popper-placement="bottom">
    Bottom popover
    </div>
</Link>
</SpkOverlay>

</div>
// End Prism Code//`;

export const reactpopover8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="flex justify-center">
  <div className="hs-tooltip ti-main-tooltip [--trigger:focus]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
      <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
        <i className="ri-arrow-up-s-line"></i>
      </span>
      <div className="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip"
        data-popper-placement="top">
        Focus me
      </div>
    </a>
  </div>
</div>
// End Prism Code//`;
export const reusepopover8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="flex justify-center">
<SpkOverlay customClass=" [--trigger:focus]">
    <Link className="hs-tooltip-toggle ti-main-tooltip-toggle" to="#" >
        <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
        <i className="ri-arrow-up-s-line"></i>
        </span>
        <div className="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip"  data-popper-placement="top">
        Focus me
        </div>
    </Link>
    </SpkOverlay>
</div>
// End Prism Code//`;

export const reactpopover9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="flex justify-center">
  <div className="hs-tooltip ti-main-tooltip [--trigger:click]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
      <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
        <i className="ri-arrow-up-s-line"></i>
      </span>
      <div className="hs-tooltip-content ti-main-tooltip-content !p-0 max-w-xs border-gray-200 text-start rounded-sm hidden" role="tooltip"
       data-popper-placement="top">
        <span className="pt-3 px-4 block text-lg font-bold text-gray-800 dark:text-white">Overview</span>
        <div className="py-2 px-3 text-sm text-gray-600 dark:text-white/70">
          <Image fill className="rounded-sm mb-3" src="/assets/images/media/media-28.jpg" alt="Image Description"/>
          <p>This is a popover body with supporting text below as a natural lead-in to additional content.</p>
          <dl className="mt-3">
            <dt className="font-bold pt-3 first:pt-0 dark:text-white">Assigned to:</dt>
            <dd className="m-0 text-gray-600 dark:text-white/70">Mark Welson</dd>
            <dt className="font-bold pt-3 first:pt-0 dark:text-white">Due:</dt>
            <dd className="m-0 text-gray-600 dark:text-white/70">December 21, 2021</dd>
          </dl>
        </div>
      </div>
    </a>
  </div>
</div>
// End Prism Code//`;
export const reusepopover9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="flex justify-center">
<SpkOverlay customClass=" [--trigger:click]">
<Link className="hs-tooltip-toggle ti-main-tooltip-toggle" to="#" >
<span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
<i className="ri-arrow-up-s-line"></i>
</span>
<div className="hs-tooltip-content ti-main-tooltip-content !p-0 max-w-xs border-gray-200 text-start rounded-sm hidden" role="tooltip" data-popper-placement="top">
<span className="pt-3 px-4 block text-lg font-bold text-gray-800 dark:text-white">Overview</span>
<div className="py-2 px-3 text-sm text-gray-600 dark:text-white/70">
    <Image fill className="rounded-sm mb-3" src={media28} alt="Image Description"/>
    <p>This is a popover body with supporting text below as a natural lead-in to additional content.</p>
    <dl className="mt-3">
    <dt className="font-bold pt-3 first:pt-0 dark:text-white">Assigned to:</dt>
    <dd className="m-0 text-gray-600 dark:text-white/70">Mark Welson</dd>
    <dt className="font-bold pt-3 first:pt-0 dark:text-white">Due:</dt>
    <dd className="m-0 text-gray-600 dark:text-white/70">December 21, 2021</dd>
    </dl>
</div>
</div>
</Link>
</SpkOverlay>
</div>
// End Prism Code//`;

export const reactpopover10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="flex justify-center">
  <div className="hs-tooltip ti-main-tooltip [--trigger:hover]">
    <a className="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
      <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
        <i className="ri-arrow-up-s-line"></i>
      </span>
      <div className="hs-tooltip-content ti-main-tooltip-content" role="tooltip"
      data-popper-placement="top">
        Hover me
      </div>
    </a>
  </div>
</div>
// End Prism Code//`;
export const reusepopover10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="flex justify-center">
<SpkOverlay customClass=" [--trigger:hover]">
    <Link className="hs-tooltip-toggle ti-main-tooltip-toggle" to="#" >
        <span className="w-10 h-10 ti-btn p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
        <i className="ri-arrow-up-s-line"></i>
        </span>
        <div className="hs-tooltip-content ti-main-tooltip-content" role="tooltip" data-popper-placement="top">
        Hover me
        </div>
    </Link>
    </SpkOverlay>
</div>
// End Prism Code//`;

export const reactpopover11 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="hs-tooltip ti-main-tooltip [--trigger:click]">
  <div className="hs-tooltip-toggle ti-main-tooltip-toggle">
    <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-primary hover:text-primary/80 disabled:opacity-50 disabled:pointer-events-none dark:text-primary dark:hover:text-primary/80 dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-primary">
      Preline review
      <i className="ri-arrow-up-s-line"></i>
    </button>

    <div className="hs-tooltip-content ti-main-tooltip-content max-w-xs w-full hidden" role="tooltip"
     data-popper-placement="top">
      <div className="p-4">
        <div className="mb-3 flex justify-between items-center gap-x-3">
          <div className="flex items-center gap-x-2">
            <h4 className="font-semibold text-gray-800 dark:text-white">
              5.0
            </h4>

            <div className="flex">
              <i className="ri-star-fill text-lg text-warning dark:text-warning"></i>
              <i className="ri-star-fill text-lg text-warning dark:text-warning"></i>
              <i className="ri-star-fill text-lg text-warning dark:text-warning"></i>
              <i className="ri-star-fill text-lg text-warning dark:text-warning"></i>
              <i className="ri-star-fill text-lg text-warning dark:text-warning"></i>
            </div>
          </div>

          <a className="inline-flex items-center gap-x-1 text-xs text-primary decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-0 dark:focus:shadow-none dark:focus:ring-primary" href="#">
            See all (4)
          </a>
        </div>
        <div className="mb-3">
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800 dark:text-white">5 star</span>
            </div>
            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-bodybg" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100">
              <div className="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" 
             
              ></div>
            </div>
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800 dark:text-white">78%</span>
            </div>
          </div>
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800 dark:text-white">4 star</span>
            </div>
            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-bodybg" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
              <div className="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" 
              
              ></div>
            </div>
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800 dark:text-white">20%</span>
            </div>
          </div>
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800 dark:text-white">3 star</span>
            </div>
            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-bodybg" role="progressbar" aria-valuenow="6" aria-valuemin="0" aria-valuemax="100">
              <div className="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600"
              
               ></div>
            </div>
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800 dark:text-white">6%</span>
            </div>
          </div>
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800 dark:text-white">2 star</span>
            </div>
            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-bodybg" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              <div className="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" 
              
              ></div>
            </div>
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800 dark:text-white">2%</span>
            </div>
          </div>
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800 dark:text-white">1 star</span>
            </div>
            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-bodybg" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <div className="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" 
              
              ></div>
            </div>
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800 dark:text-white">0%</span>
            </div>
          </div>
        </div>

        <a className="inline-flex items-center gap-x-1 text-xs text-gray-600 decoration-2 hover:underline dark:text-white/70 dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-gray-400" href="#">
          How reviews and ratings work
          <i className="ri-arrow-right-s-line"></i>
        </a>
      </div>
    </div>
  </div>
</div>
// End Prism Code//`;
export const reusepopover11 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkOverlay customClass=" [--trigger:click]">
<div className="hs-tooltip-toggle ti-main-tooltip-toggle">
<SpkButton buttontype="button" customClass="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-primary hover:text-primary/80 disabled:opacity-50 disabled:pointer-events-none dark:text-primary dark:hover:text-primary/80 dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-primary">
Preline review
<i className="ri-arrow-up-s-line"></i>
</SpkButton>

<div className="hs-tooltip-content ti-main-tooltip-content max-w-xs w-full hidden" role="tooltip"  data-popper-placement="top">
<div className="p-4">
    <div className="mb-3 flex justify-between items-center gap-x-3">
    <div className="flex items-center gap-x-2">
        <h4 className="font-semibold text-gray-800 dark:text-white">
        5.0
        </h4>

        <div className="flex">
        <i className="ri-star-fill text-lg text-warning dark:text-warning"></i>
        <i className="ri-star-fill text-lg text-warning dark:text-warning"></i>
        <i className="ri-star-fill text-lg text-warning dark:text-warning"></i>
        <i className="ri-star-fill text-lg text-warning dark:text-warning"></i>
        <i className="ri-star-fill text-lg text-warning dark:text-warning"></i>
        </div>
    </div>

    <Link className="inline-flex items-center gap-x-1 text-xs text-primary decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-0 dark:focus:shadow-none dark:focus:ring-primary" to="#" >
        See all (4)
    </Link>
    </div>
    <div className="mb-3">
    <div className="flex items-center gap-x-3 whitespace-nowrap mb-2">
        <div className="w-10 text-end">
        <span className="text-sm text-gray-800 dark:text-white">5 star</span>
        </div>
        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-light" role="progressbar" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100}>
        <div className="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" 
        style={{ width: "78%" }}
        ></div>
        </div>
        <div className="w-10 text-end">
        <span className="text-sm text-gray-800 dark:text-white">78%</span>
        </div>
    </div>
    <div className="flex items-center gap-x-3 whitespace-nowrap mb-2">
        <div className="w-10 text-end">
        <span className="text-sm text-gray-800 dark:text-white">4 star</span>
        </div>
        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-light" role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
        <div className="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" 
        style={{ width: "20%" }}
        ></div>
        </div>
        <div className="w-10 text-end">
        <span className="text-sm text-gray-800 dark:text-white">20%</span>
        </div>
    </div>
    <div className="flex items-center gap-x-3 whitespace-nowrap mb-2">
        <div className="w-10 text-end">
        <span className="text-sm text-gray-800 dark:text-white">3 star</span>
        </div>
        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-light" role="progressbar" aria-valuenow={6} aria-valuemin={0} aria-valuemax={100}>
        <div className="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600"
        style={{ width: "6%" }}
        ></div>
        </div>
        <div className="w-10 text-end">
        <span className="text-sm text-gray-800 dark:text-white">6%</span>
        </div>
    </div>
    <div className="flex items-center gap-x-3 whitespace-nowrap mb-2">
        <div className="w-10 text-end">
        <span className="text-sm text-gray-800 dark:text-white">2 star</span>
        </div>
        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-light" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
        <div className="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" 
        style={{ width: "2%" }}
        ></div>
        </div>
        <div className="w-10 text-end">
        <span className="text-sm text-gray-800 dark:text-white">2%</span>
        </div>
    </div>
    <div className="flex items-center gap-x-3 whitespace-nowrap mb-2">
        <div className="w-10 text-end">
        <span className="text-sm text-gray-800 dark:text-white">1 star</span>
        </div>
        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-light" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
        <div className="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" 
        style={{ width: "0%" }}
        ></div>
        </div>
        <div className="w-10 text-end">
        <span className="text-sm text-gray-800 dark:text-white">0%</span>
        </div>
    </div>
    </div>

    <Link className="inline-flex items-center gap-x-1 text-xs text-gray-600 decoration-2 hover:underline dark:text-white/70 dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-gray-400" to="#">
    How reviews and ratings work
    <i className="ri-arrow-right-s-line"></i>
    </Link>
</div>
</div>
</div>
</SpkOverlay>
// End Prism Code//`;



export const reactpopover12 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="hs-tooltip inline-block [--trigger:hover] sm:[--placement:right]">
   <div className="hs-tooltip-toggle max-w-xs p-3 flex items-center gap-x-3 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-bodybg dark:border-white/10">
     <Image fill className="inline-block size-9 rounded-full" src="/assets/images/faces/1.jpg" alt="Image Description"/>
     
     <div className="grow">
       <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
         Amanda Harvey
       </h4>
       <p className="text-sm text-gray-800 md:text-gray-500 dark:text-white md:dark:text-white/70">
         amanda@email.com
       </p>
     </div>
     <div className="hs-tooltip-content overflow-hidden ti-main-tooltip-content !p-0 max-w-xs w-full after:absolute after:top-0 after:-start-4 after:w-4 after:h-full hidden" role="tooltip"
       data-popper-placement="right">
      
       <div className="py-3 px-4 border-b border-gray-200 dark:border-white/10">
         <div className="flex items-center gap-x-3">
           <Image fill className="flex-shrink-0 inline-block size-10 rounded-full ring-2 ring-white dark:ring-bodybg" src="/assets/images/faces/1.jpg" alt="Image Description"/>
           <div className="grow">
             <h4 className="font-semibold text-gray-800 dark:text-white">
               Amanda Harvey
               <span className="ms-0.5 inline-flex items-center align-middle gap-x-1.5 py-0.5 px-1.5 rounded-md text-[11px] font-medium bg-gray-800 text-white dark:bg-bodybg dark:text-white">
                 PRO
               </span>
             </h4>
             <p className="text-sm text-gray-500 dark:text-white/70">
               Storyteller
             </p>
           </div>
         </div>
       </div>
       <ul className="py-3 px-4 space-y-1">
         <li>
           <div className="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-white">
             <i className="ri-building-line text-gray-600 dark:text-white/70"></i>
             Pixeel Ltd.
           </div>
         </li>
         <li>
           <div className="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-white">
             <i className="ri-smartphone-line text-gray-600 dark:text-white/70"></i>
             (892) 312-5483
           </div>
         </li>
         <li>
           <div className="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-white">
             <i className="ri-mail-line text-gray-600 dark:text-white/70"></i>
             amanda@email.com
           </div>
         </li>
       </ul>
       <div className="py-2 px-4 flex justify-between items-center bg-gray-100 dark:bg-bodybg">
         <a className="inline-flex items-center gap-x-1.5 text-xs text-gray-500 hover:text-primary disabled:opacity-50 disabled:pointer-events-none dark:text-white/70 dark:hover:text-white dark:focus:outline-none" href="#!" scroll={false}>
           <i className="ri-flag-line"></i>
           Flag
         </a>
         <button type="button" className="py-1.5 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-primary text-white hover:bg-primary/80 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary">
           Follow
         </button>
       </div>
     </div>
   </div>
 </div>
// End Prism Code//`;
export const reusepopover12 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkOverlay customClass=" inline-block [--trigger:hover] sm:[--placement:right]">
<div className="hs-tooltip-toggle max-w-xs p-3 flex items-center gap-x-3 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-bodybg dark:border-white/10">
<Image fill className="inline-block size-9 rounded-full" src={face1} alt="Image Description"/>

<div className="grow">
    <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
    Amanda Harvey
    </h4>
    <p className="text-sm text-gray-800 md:text-gray-500 dark:text-white md:dark:text-white/70">
    amanda@email.com
    </p>
</div>
<div className="hs-tooltip-content overflow-hidden ti-main-tooltip-content !p-0 max-w-xs w-full after:absolute after:top-0 after:-start-4 after:w-4 after:h-full hidden" role="tooltip"
    data-popper-placement="right">

    <div className="py-3 px-4 border-b border-gray-200 dark:border-white/10">
    <div className="flex items-center gap-x-3">
        <Image fill className="flex-shrink-0 inline-block size-10 rounded-full ring-2 ring-white dark:ring-bodybg" src={face1} alt="Image Description"/>
        <div className="grow">
        <h4 className="font-semibold text-gray-800 dark:text-white">
            Amanda Harvey
            <span className="ms-0.5 inline-flex items-center align-middle gap-x-1.5 py-0.5 px-1.5 rounded-md text-[11px] font-medium bg-gray-800 text-white dark:bg-bodybg dark:text-white">
            PRO
            </span>
        </h4>
        <p className="text-sm text-gray-500 dark:text-white/70">
            Storyteller
        </p>
        </div>
    </div>
    </div>
    <ul className="py-3 px-4 space-y-1">
    <li>
        <div className="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-white">
        <i className="ri-building-line text-gray-600 dark:text-white/70"></i>
        Pixeel Ltd.
        </div>
    </li>
    <li>
        <div className="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-white">
        <i className="ri-smartphone-line text-gray-600 dark:text-white/70"></i>
        (892) 312-5483
        </div>
    </li>
    <li>
        <div className="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-white">
        <i className="ri-mail-line text-gray-600 dark:text-white/70"></i>
        amanda@email.com
        </div>
    </li>
    </ul>
    <div className="py-2 px-4 flex justify-between items-center bg-gray-100 dark:bg-bodybg">
    <Link className="inline-flex items-center gap-x-1.5 text-xs text-gray-500 hover:text-primary disabled:opacity-50 disabled:pointer-events-none dark:text-white/70 dark:hover:text-white dark:focus:outline-none" to="#" >
        <i className="ri-flag-line"></i>
        Flag
    </Link>
    <button type="button" className="py-1.5 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-primary text-white hover:bg-primary/80 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary">
        Follow
    </button>
    </div>
</div>
</div>
</SpkOverlay>
// End Prism Code//`;
//Blackquotes

export const blackquote1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>
<div className="relative z-10">
    <p className="text-gray-800 sm:text-xl dark:text-white"><em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and
            detailed.</em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>

<div className="relative z-10">
    <p className="text-gray-800 dark:text-white">
        <em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and detailed.
        </em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>

<div className="relative z-10">
    <p className="text-gray-800 sm:text-xl dark:text-white"><em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and detailed.</em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>

<div className="relative z-10">
    <p className="text-xl text-gray-800 md:text-3xl md:leading-normal dark:text-white">
        <em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and detailed.</em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<blockquote className="relative text-center max-w-lg mx-auto">
<div className="relative z-10">
    <p className="text-xl text-gray-800">
        <em className="relative">
            <svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-8 -translate-y-8 h-16 w-16 text-gray-100 sm:h-24 sm:w-24 dark:text-white/10"
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor"></path>
            </svg>
            <span className="relative z-10 dark:text-white">I just wanted to say that
                I'm very happy with my purchase so far. The documentation is
                outstanding - clear and detailed.</span>
        </em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote className="relative text-end">
<div className="relative z-10">
    <p className="text-xl text-gray-800">
        <em className="relative">
            <svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-8 -translate-y-8 h-16 w-16 text-gray-100 sm:h-24 sm:w-24 dark:text-white/10"
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor"></path>
            </svg>
            <span className="relative z-10 dark:text-white">I just wanted to say that
                I'm very happy with my purchase so far. The documentation is
                outstanding - clear and detailed.</span>
        </em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>

<div className="relative z-10">
    <p className="text-gray-800 sm:text-xl dark:text-white"><em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and detailed.</em>
    </p>
</div>

<footer className="mt-6">
    <div className="text-base font-semibold text-gray-800 dark:text-white/70">Josh
        Grazioso</div>
</footer>
</blockquote>
// End Prism Code//`;

export const blackquote8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>

<div className="relative z-10">
    <p className="text-gray-800 sm:text-xl dark:text-white"><em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and detailed.</em>
    </p>
</div>

<footer className="mt-6">
    <div className="flex items-center">
        <div className="flex-shrink-0">
            <Image fill className="h-10 w-10 rounded-full" src={face1}
                alt="Image Description"/>
        </div>
        <div className="ltr:ml-4 rtl:mr-4">
            <div className="text-base font-semibold text-gray-800 dark:text-white/70">
                Josh Grazioso</div>
            <div className="text-xs text-gray-500 dark:text-white/70">Source title</div>
        </div>
    </div>
</footer>
</blockquote>
// End Prism Code//`;

export const blackquote9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote
className="relative ltr:border-l-4 rtl:border-r-4 ltr:pl-4 rtl:pr-4 ltr:sm:pl-6 rtl:sm:pr-6 dark:border-white/10">
<p className="text-gray-800 sm:text-xl dark:text-white"><em>
        I just wanted to say that I'm very happy with my purchase so far. The
        documentation is outstanding - clear and detailed.</em>
</p>

<footer className="mt-4">
    <div className="flex items-center">
        <div className="flex-shrink-0">
            <Image fill className="h-10 w-10 rounded-full" src={face1}
                alt="Image Description"/>
        </div>
        <div className="ltr:ml-4 rtl:mr-4">
            <div className="text-base font-semibold text-gray-800 dark:text-white/70">
                Josh Grazioso</div>
            <div className="text-xs text-gray-500 dark:text-white/70">Source title</div>
        </div>
    </div>
</footer>
</blockquote>
// End Prism Code//`;

//Typography

export const typography1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <h1 className="font-semibold text-gray-800 dark:text-white text-4xl">h1. Tailwind heading</h1>
<h2 className="font-semibold text-gray-800 dark:text-white text-3xl">h2. Tailwind heading</h2>
<h3 className="font-semibold text-gray-800 dark:text-white text-2xl">h3. Tailwind heading</h3>
<h4 className="font-semibold text-gray-800 dark:text-white text-xl">h4. Tailwind heading</h4>
<h5 className="font-semibold text-gray-800 dark:text-white text-lg">h5. Tailwind heading</h5>
<h6 className="font-semibold text-gray-800 dark:text-white text-base">h6. Tailwind heading</h6>
// End Prism Code//`;

export const typography2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <p className="text-gray-800 dark:text-white">You can use the mark tag to <mark>highlight</mark> text.</p>
<p className="text-gray-800 dark:text-white"><del>This line of text is meant to be treated as deleted text.</del></p>
<p className="text-gray-800 dark:text-white"><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p className="text-gray-800 dark:text-white"><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p className="text-gray-800 dark:text-white"><u>This line of text will render as underlined.</u></p>
<p className="text-gray-800 dark:text-white"><small>This line of text is meant to be treated as fine print.</small></p>
<p className="text-gray-800 dark:text-white"><strong>This line rendered as bold text.</strong></p>
<p className="text-gray-800 dark:text-white"><em>This line rendered as italicized text.</em></p>
// End Prism Code//`;

export const typography3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <dl className="grid sm:grid-cols-3 gap-1 sm:gap-3">
<dt className="sm:col-span-1 font-semibold dark:text-white">Description lists</dt>
<dd className="sm:col-span-2 mb-3 sm:mb-0 dark:text-white">A description list is perfect for defining terms.</dd>

<dt className="sm:col-span-1 font-semibold dark:text-white">Term</dt>
<dd className="sm:col-span-2 mb-3 sm:mb-0 dark:text-white">
  <p>Definition for the term.</p>
  <p>And some more placeholder definition text.</p>
</dd>

<dt className="sm:col-span-1 font-semibold dark:text-white">Another term</dt>
<dd className="sm:col-span-2 mb-3 sm:mb-0 dark:text-white">This definition is short, so no extra paragraphs or anything.</dd>

<dt className="sm:col-span-1 font-semibold truncate dark:text-white">Truncated term is truncated</dt>
<dd className="sm:col-span-2 mb-3 sm:mb-0 dark:text-white">This can be useful when space is tight. Adds an ellipsis at the end.</dd>

<dt className="sm:col-span-1 font-semibold dark:text-white">Nesting</dt>
<dd className="sm:col-span-2 mb-3 sm:mb-0 dark:text-white">
  <dl className="grid sm:grid-cols-5 gap-1 sm:gap-3 dark:text-white">
    <dt className="sm:col-span-2 font-semibold dark:text-white">Nested definition list</dt>
    <dd className="sm:col-span-3 mb-3 sm:mb-0 dark:text-white">I heard you like definition lists. Let me put a definition list inside your definition list.</dd>
  </dl>
</dd>
</dl>
// End Prism Code//`;

export const typography4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<p className="first-line:uppercase first-line:tracking-widest first-letter:text-slate-900 first-letter:text-7xl first-letter:leading-none first-letter:float-start first-letter:font-bold first-letter:me-3 dark:first-letter:text-white">
Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"? Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot.
</p>
<p className="">
Sure, go ahead, laugh if you want to. I've seen your type before: Flashy, making the scene, flaunting convention. Yeah, I know what you're thinking. What's this guy making such a big stink about old library books? Well, let me give you a hint, junior.
</p>
// End Prism Code//`;

export const typography5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<p className="text-gray-800 dark:text-white text-xs">text-xs</p>
<p className="text-gray-800 dark:text-white text-sm">text-sm</p>
<p className="text-gray-800 dark:text-white text-base">text-base</p>
<p className="text-gray-800 dark:text-white text-lg">text-lg</p>
<p className="text-gray-800 dark:text-white text-xl">text-xl</p>
<p className="text-gray-800 dark:text-white text-2xl">text-2xl</p>
<p className="text-gray-800 dark:text-white text-3xl">text-3xl</p>
<p className="text-gray-800 dark:text-white text-4xl">text-4xl</p>
<p className="text-gray-800 dark:text-white text-5xl">text-5xl</p>
<p className="text-gray-800 dark:text-white text-6xl">text-6xl</p>
<p className="text-gray-800 dark:text-white text-7xl">text-7xl</p>
<p className="text-gray-800 dark:text-white text-8xl">text-8xl</p>
<p className="text-gray-800 dark:text-white text-[6.5rem] leading-none sm:text-9xl">text-9xl</p>
</Showcode>
// End Prism Code//`;

export const typography6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="">
<details className="open:bg-white dark:open:bg-bodybg open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
  <summary className="text-sm leading-6 text-gray-800 dark:text-white font-semibold select-none">
    Why do they call it Ovaltine?
  </summary>
  <div className="mt-3 text-sm leading-6 text-gray-800 dark:text-gray-300">
    <p>The mug is round. The jar is round. They should call it Roundtine.</p>
  </div>
</details>
</div>
// End Prism Code//`;

export const typography7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <p className="text-gray-800 dark:text-white underline ">This line of text will render as underlined. </p>
<p className="text-gray-800 dark:text-white no-underline ">This line of text will render as Not underlined.. </p>
<p className="text-gray-800 dark:text-white overline">This line of text will render as overline..</p>
<p className="text-gray-800 dark:text-white line-through">This line of text will render as line through.</p>
// End Prism Code//`;

export const typography8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <p className="text-gray-800 dark:text-white lowercase ">Lowercased text. </p>
<p className="text-gray-800 dark:text-white uppercase ">Uppercased text</p>
<p className="text-gray-800 dark:text-white capitalize">Captalized text</p>
<p className="text-gray-800 dark:text-white normal-case">Normal Text</p>
// End Prism Code//`;

//breadcrumb

export const reactbreadcrumb1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<ol className="flex items-center whitespace-nowrap min-w-0">
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    Home
    <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Link>
</li>
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    App Center
    <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Link>
</li>
<li className="text-sm text-gray-500 dark:text-[#8c9097] dark:text-white/50 hover:text-primary truncate" aria-current="page">
  Application
</li>
</ol>
// End Prism Code//`;

export const reusebreadcrumb1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <SpkBreadcrumb
    items={[
        { label: "Home", to: "/", isActive: true},
        { label: "App Center", to: "/app-center",isActive: true},
        { label: "Application"}
    ]}
    SvgClass='flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180'
    SvgIcon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
    Svgstrokewidth="2"
    />
// End Prism Code//`;

export const reactbreadcrumb2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<ol className="flex items-center whitespace-nowrap min-w-0">
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    Home
    <i
      className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
  </Link>
</li>
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    App Center
    <i
      className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
  </Link>
</li>
<li className="text-sm text-gray-500 dark:text-[#8c9097] dark:text-white/50 hover:text-primary truncate" aria-current="page">
  Application
</li>
</ol>
// End Prism Code//`;
export const reusebreadcrumb2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkBreadcrumb
    items={[
        { label: "Home", to: "/",isActive: true, },
        { label: "App Center", to: "/app-center" ,isActive: true, },
        { label: "Application" },
    ]}
    separator={<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>}
    />
// End Prism Code//`;

export const reactbreadcrumb3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <ol className="flex items-center whitespace-nowrap min-w-0">
<li className="text-smtext-primary hover:text-primary dark:text-primary">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    Home
    <svg className="flex-shrink-0 h-5 w-5 text-gray-300 dark:text-white/10 mx-2" width="16" height="16"
      viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
    </svg>
  </Link>
</li>

<li className="text-smtext-primary hover:text-primary dark:text-primary">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    App Center
    <svg className="flex-shrink-0 h-5 w-5 text-gray-300 dark:text-white/10 mx-2" width="16" height="16"
      viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
    </svg>
  </Link>
</li>

<li className="text-sm text-gray-500 dark:text-[#8c9097] dark:text-white/50 hover:text-primary truncate" aria-current="page">
  Application
</li>
</ol>
// End Prism Code//`;
export const reusebreadcrumb3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkBreadcrumb
    items={[
    { label: "Home", to: "/",isActive: true, },
    { label: "App Center", to: "/app-center",isActive: true, },
    { label: "Application" },
    ]}
    SvgIcon="M6 13L10 3"
    SvgClass="flex-shrink-0 h-5 w-5 text-gray-300 dark:text-white/10 mx-2"
/>
// End Prism Code//`;

export const reactbreadcrumb4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<ol className="flex items-center whitespace-nowrap min-w-0">
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
      fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd"
        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
      <path fillRule="evenodd"
        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
    </svg>
    Home
    <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Link>
</li>
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    App Center
    <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Link>
</li>
<li className="text-sm text-gray-500 dark:text-[#8c9097] dark:text-white/50 hover:text-primary truncate" aria-current="page">
  Application
</li>
</ol>
// End Prism Code//`;
export const reusebreadcrumb4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkBreadcrumb
items={[
    {
    label: "Home",
    to: "/",
    isActive: true,
    icon: (
        <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
        fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd"
            d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
        <path fillRule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
        </svg>
    ),
    },
    {
    label: "App Center",
    isActive: true,
    to: "/app-center",
    },
    {
    label: "Application",
    },
]}
SvgClass='flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180'
    SvgIcon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
    Svgstrokewidth="2"
/>
// End Prism Code//`;

export const reactbreadcrumb5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<ol className="flex items-center whitespace-nowrap min-w-0 pb-2">
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
      fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd"
        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
      <path fillRule="evenodd"
        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
    </svg>
    Home
  </Link>
</li>
</ol>
<ol className="flex items-center whitespace-nowrap min-w-0 pb-2">
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
      fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd"
        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
      <path fillRule="evenodd"
        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
    </svg>
    Home
    <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Link>
</li>
<li className="text-sm">
  <Link className="flex items-center text-gray-500 dark:text-[#8c9097] dark:text-white/50 hover:text-primary" href="#" >
    Library
  </Link>
</li>
</ol>
<ol className="flex items-center whitespace-nowrap min-w-0 pb-2">
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
      fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd"
        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
      <path fillRule="evenodd"
        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
    </svg>
    Home
    <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Link>
</li>
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    Library
    <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Link>
</li>
<li className="text-sm">
  <Link className="flex items-center text-gray-500 dark:text-[#8c9097] dark:text-white/50 hover:text-primary" href="#" >
    Data
  </Link>
</li>
</ol>
// End Prism Code//`;
export const reusebreadcrumb5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkBreadcrumb
items={[
    {
    label: "Home",
    isActive: true,
    to: "/",
    icon: (
        <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
        fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd"
            d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
        <path fillRule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
        </svg>
    ),
    },

]}
SvgClass='flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180'
    SvgIcon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
    Svgstrokewidth="2"
/>
<SpkBreadcrumb
items={[
{
    label: "Home",
    isActive: true,
    to: "/",
    icon: (
    <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
        fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd"
        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
        <path fillRule="evenodd"
        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
    </svg>
    ),
},
{
    label: "Library",
    to: "/app-center",
},
]}
SvgClass='flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180'
SvgIcon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
Svgstrokewidth="2"
/>
<SpkBreadcrumb
items={[
{
    label: "Home",
    isActive: true,
    to: "/",
    icon: (
    <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
        fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd"
        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
        <path fillRule="evenodd"
        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
    </svg>
    ),
},
{
    label: "Library",
    isActive: true,
    to: "/app-center",
},
{
    label: "Data",
    to: "/app-center",
},
]}
SvgClass='flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180'
SvgIcon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
Svgstrokewidth="2"
/>
// End Prism Code//`;
