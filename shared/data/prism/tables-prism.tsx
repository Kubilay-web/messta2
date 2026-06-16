export const basictabledata = `interface Basic {
    id: number;
    name: string;
    date: string;
    number: string;
    status: string;
    color: string;
}
export const Basictable: Basic[] = [
    { id: 1, name: "Mark", date: "21,Dec 2023", number: "+1234-12340", status: "Completed", color: "primary" },
    { id: 2, name: "Monika", date: "29,April 2023", number: "+1523-12459", status: "Failed", color: "secondary" },
    { id: 3, name: "Madina", date: "30,Nov 2023", number: "+1982-16234", status: "Successful", color: "success" },
    { id: 4, name: "Bhamako", date: "18,Mar 2023", number: "+1526-10729", status: "Pending", color: "warning" },
]`
export const reacttabledata1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full">
<thead><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">Name</th>
<th scope="col" className="text-start">Created On</th>
<th scope="col" className="text-start">Number</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Mark</th>
<td>21,Dec 2021</td>
<td>+1234-12340</td>
<td><span className="badge bg-outline-primary">Completed
</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Monika</th>
<td>29,April 2022</td><td>+1523-12459</td>
<td><span className="badge bg-outline-warning">Failed</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Madina</th>
<td>30,Nov 2022</td>
<td>+1982-16234</td>
<td><span className="badge bg-outline-success">Successful</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Bhamako</th>
<td>18,Mar 2022</td>
<td>+1526-10729</td>
<td><span className="badge bg-outline-secondary">Pending</span></td>
</tr>
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="table-responsive">
  <Spktables tableClass="table whitespace-nowrap min-w-full" tableRowclass="border-b border-defaultborder" header={[{ title: 'Name' }, { title: 'Created On' }, { title: 'Number' }, { title: 'Status' }]}>
      {Basictable.map((idx) => (
          <tr key={idx.id} className='border-b border-defaultborder'>
              <th scope="row" className="text-start">{idx.name}</th>
              <td>{idx.date}</td>
              <td>{idx.number}</td>
              <td><span className={&#96;badge bg-outline-&#36;{idx.color}&#96;}>{idx.status}</span></td>
          </tr>
      ))}
  </Spktables>
</div>
// End Prism Code//`;

export const datatable2 = `export const Table1data = [
    { id: 1, src: face13, name: 'Sukuro Kim', mail: 'kimosukuro@gmail.com', color: 'success/10 ', class: '', text: 'Active', class1: 'online', color1: "success" },
    { id: 2, src: face6, name: 'Hasimna', mail: 'hasimna2132@gmail.com', color: 'light', class: 'text-default', text: 'Inactive', class1: 'offline', color1: "dark" },
    { id: 3, src: face15, name: 'Azimo Khan', mail: 'azimokhan421@gmail.com', color: 'success/10 ', class: '', text: 'Active', class1: 'online', color1: "success" },
    { id: 4, src: face5, name: 'Samantha Julia', mail: '	julianasams143@gmail.com', color: 'success/10 ', class: '', text: 'Active', class1: 'online', color1: "success" },
];`
export const reacttabledata2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap table-bordered min-w-full">
<thead>
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">User</th>
<th scope="col" className="text-start">Status</th>
<th scope="col" className="text-start">Email</th>
<th scope="col" className="text-start">Action</th>
</tr></thead><tbody>{Table1data.map((idx) => 
(<tr className="border-b border-defaultborder" 
key={idx.id}><th scope="row">
<div className="flex items-center">
<span className={&#96;avatar avatar-xs me-2
     &#36;{idx.class1} avatar-rounded&#96;}>
     <Image fill src={idx.src} alt="img" /></span>
     {idx.name}</div>
     </th>
<td><span className={&#96;badge bg-&#36;{idx.color}/10
 text-&#36;{idx.color1}&#96;}>{idx.text}</span></td>
 <td>{idx.mail}</td>
 <td>
 <div className="hstack gap-2 flex-wrap">
 <Link aria-label="anchor" href="#" 
 className="text-info text-[.875rem] leading-none">
 <iclassName="ri-edit-line"></i></Link>
 <Link aria-label="anchor" href="#" className="text-danger
  text-[.875rem] leading-none"><iclassName="ri-delete-bin-5-line">
  </i></Link></div></td></tr>))}
  </tbody>
  </table>
</div>
// End Prism Code//`;
export const reusetabledata2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
        <Spktables tableClass="table whitespace-nowrap table-bordered min-w-full" tableRowclass='border-b border-defaultborder' header={[{ title: 'User' }, { title: 'Status' }, { title: 'Email' }, { title: 'Action' }]}>
            {Table1data.map((idx) => (
                <tr className="border-b border-defaultborder" key={idx.id}>
                    <th scope="row">
                        <div className="flex items-center">
                            <span className={&#96;avatar avatar-xs me-2&#36;{idx.class1} avatar-rounded&#96;}>
                                <Image fill src={idx.src} alt="img" />
                            </span>{idx.name}
                        </div>
                    </th>
                    <td><SpkBadge variant={idx.color} customClass={&#96;text-&#36;{idx.color1}&#96;}>{idx.text}</SpkBadge></td>
                    <td>{idx.mail}</td>
                    <td>
                        <div className="hstack gap-2 flex-wrap">
                            <Link aria-label="anchor" to="#" className="text-info text-[.875rem] leading-none me-1"><i
                                className="ri-edit-line"></i></Link>
                            <Link aria-label="anchor" to="#" className="text-danger text-[.875rem] leading-none"><i
                                className="ri-delete-bin-5-line"></i></Link>
                        </div>
                    </td>
                </tr>
            ))}
        </Spktables>
    </div>
// End Prism Code//`;

export const datatable4 = `interface table4 {
    id: number
    src: any
    order: string
    date: string
    name: string
}
export const Table4data: table4[] = [
    { id: 1, src: face3, order: "#0007", date: "26-04-2022", name: "Mayor Kelly", },
    { id: 2, src: face6, order: "#0008", date: "15-02-2022", name: "Wicky Kross", },
    { id: 3, src: face1, order: "#0009", date: "23-05-2022", name: "Julia Cam", }
];`

export const reacttabledata3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="box-body">
<div className="table-responsive">
 className="table whitespace-nowrap table-bordered 
table-bordered-primary border-primary/10 min-w-full">
<thead><tr className="border-b border-primary/10">
<th scope="col" className="text-start">Order</th>
<th scope="col" className="text-start">Date</th>
<th scope="col" className="text-start">Customer</th>
<th scope="col" className="text-start">Action</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-primary/10">
<th scope="row" className="text-start">#0007
</th>
<td><span className="badge bg-light text-dark">
26-04-2022</span>
</td>
<td>
<div className="flex items-center">
<span className="avatar avatar-xs me-2 online 
avatar-rounded"><Image fill src={face3}
alt="img" /></span>Mayor Kelly</div>
</td>
<td>
<span className="badge bg-primary/10 text-primary">
Booked</span>
</td>
</tr>
<tr className="border-b border-primary/10">
<th scope="row" className="text-start">#0008
</th><td><span className="badge bg-light
 text-dark">15-02-2022</span>
 </td>
 <td><div className="flex items-center">
 <span className="avatar avatar-xs me-2 
 online avatar-rounded">
 <Image fill src={face6} 
 alt="img" /></span>Wicky Kross</div>
 </td>
 <td>
 <span className="badge bg-primary/10 text-primary">Booked</span>
 </td></tr><tr><th scope="row" className="text-start">#0009</th>
 <td><span className="badge bg-light text-dark">23-05-2022</span>
 </td><td><div className="flex items-center">
 <span className="avatar avatar-xs me-2 online avatar-rounded">
 <Image fill src={face1} alt="img" /></span>
 Julia Cam</div></td><td>
 <span className="badge bg-primary/10 text-primary">
 Booked</span></td></tr>
 </tbody>
 </table>
 </div>
</div>
// End Prism Code//`;
export const reusetabledata3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="table-responsive">
<Spktables tableRowclass='border-b border-primary/10' tableClass="table whitespace-nowrap table-bordered table-bordered-primary border-primary/10 min-w-full" header={[{ title: 'Order' }, { title: 'Date' }, { title: 'Customer' }, { title: 'Action' }]}>
    {Table4data.map((idx) => (
        <tr key={idx.id} className='border-b border-primary/10'>
            <th scope="row" className="text-start">
                {idx.order}
            </th>
            <td>
                <span className="badge bg-light text-dark">{idx.date}</span>
            </td>
            <td>
            <div className="flex items-center">
                    <span className="avatar avatar-xs me-2 online avatar-rounded">
                        <Image fill src={idx.src} alt="img" />
                    </span>{idx.name}
                </div>
            </td>
        
            <td>
            <span className="badge bg-primary/10 text-primary">Booked</span>
            </td>
        </tr>
    ))}
</Spktables>
</div>
// End Prism Code//`;

export const datatable5 = `export const Tabledata5: table4[] = [
  { id: 1, src: face10, order: "#0011", date: "07-01-2022", name: "Helsenky", },
  { id: 2, src: face14, order: "#0012", date: "18-05-2022", name: "Brodus", },
  { id: 3, src: face12, order: "#0013", date: "19-03-2022", name: "Chikka Alen", }
];`

export const reacttabledata4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="box-body">
<div className="table-responsive">
 className="table whitespace-nowrap table-bordered 
table-bordered-success min-w-full">
<thead>
<tr className="border-b border-success/10">
<th scope="col" className="text-start">Order</th>
<th scope="col" className="text-start">Date</th>
<th scope="col" className="text-start">Customer</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>
<tr className="border-b 
border-success/10">
<th scope="row" className="text-start">#0011</th>
<td><span className="badge bg-light text-dark">
07-01-2022</span></td>
<td><div className="flex items-center">
<span className="avatar avatar-xs me-2 online
 avatar-rounded"><Image fill src={face10}
 alt="img" /></span>Helsenky</div>
 </td>
 <td>
 <span className="badge bg-success/10 text-success">
 Delivered</span></td>
 </tr>
 <tr className="border-b border-success/10">
 <th scope="row" className="text-start">#0012</th>
 <td><span className="badge bg-light text-dark">
 18-05-2022</span></td><td>
 <div className="flex items-center">
 <span className="avatar avatar-xs me-2 online avatar-rounded">
 <Image fill src={face14} alt="img" />
 </span>Brodus</div>
 </td>
 <td><span className="badge bg-success/10
  text-success">Delivered</span>
</td>
</tr>
<tr><th scope="row" className="text-start">#0013</th>
<td><span className="badge bg-light text-dark">
19-03-2022</span>
</td>
<td><div className="flex items-center">
<span className="avatar avatar-xs me-2 online avatar-rounded">
<Image fill src={face12} alt="img" />
</span>Chikka Alen</div>
</td>
<td>
<span className="badge bg-success/10 text-success">Delivered
</span></td></tr>
</tbody>
</table>
</div>
</div>
// End Prism Code//`;
export const reusetabledata4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="table-responsive">
<Spktables tableRowclass="border-b border-success/10" tableClass="table whitespace-nowrap table-bordered table-bordered-success min-w-full" header={[{ title: 'Order' }, { title: 'Date' }, { title: 'Customer' }, { title: 'Status' }]}>
    {Tabledata5.map((idx) => (
        <tr className="border-b border-success/10" key={idx.id}>
            <th scope="row" className="text-start">
            {idx.order}
            </th>
            <td>
                <span className="badge bg-light text-dark">{idx.date}</span>
            </td>
            <td>
                <div className="flex items-center">
                    <span className="avatar avatar-xs me-2 online avatar-rounded">
                        <Image fill src={idx.src} alt="img" />
                    </span>{idx.name}
                </div>
            </td>
            <td><SpkBadge variant="success/10" customClass="text-success">Delivered</SpkBadge></td>
        </tr>
    ))}
</Spktables>
</div>
// End Prism Code//`;

export const datatable6 = `export const Tabledata6: table4[] = [
  { id: 1, src: face13, order: "#0014", date: "21-02-2022", name: "Sukuro Kim", },
  { id: 2, src: face11, order: "#0018", date: "26-03-2022", name: "Alex Carey", },
  { id: 3, src: face2, order: "#0020", date: "14-03-2022", name: "Pamila Anderson", }
];`
export const reacttabledata5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="box-body">
<div className="table-responsive">
 className="table whitespace-nowrap 
table-bordered table-bordered-warning min-w-full">
<thead><tr className="border-b border-warning/10">
<th scope="col" className="text-start">Order</th>
<th scope="col" className="text-start">Date</th>
<th scope="col" className="text-start">Customer</th>
<th scope="col" className="text-start">Action</th>
</tr></thead><tbody><tr className="border-b
 border-warning/10"><th scope="row" 
 className="text-start">#0014</th>
 <td>
 <span className="badge bg-light text-dark">
 21-02-2022</span></td>
 <td>
 <div className="flex items-center">
 <span className="avatar avatar-xs me-2 online
  avatar-rounded">
  <Image fill src={face13} alt="img" />
  </span>Sukuro Kim
  </div>
  </td>
  <td>
  <span className="badge bg-warning/10 text-warning">Accepted</span>
  </td></tr><tr className="border-b border-warning/10">
  <th scope="row" className="text-start">#0018</th>
  <td><span className="badge bg-light text-dark">26-03-2022</span>
  </td><td><div className="flex items-center">
  <span className="avatar avatar-xs me-2 online avatar-rounded">
  <Image fill src={face11} alt="img" />
  </span>Alex Carey</div></td><td>
  <span className="badge bg-warning/10 text-warning">
  Accepted</span></td>
  </tr>
  <tr>
  <th scope="row" className="text-start">#0020</th><td>
  <span className="badge bg-light text-dark">14-03-2022</span>
  </td><td><div className="flex items-center">
  <span className="avatar avatar-xs me-2 online avatar-rounded">
  <Image fill src={face2} alt="img" />
  </span>Pamila Anderson</div></td><td>
  <span className="badge bg-warning/10 text-warning">Accepted</span>
  </td>
  </tr>
  </tbody>
  </table>
  </div>
</div>
// End Prism Code//`;
export const reusetabledata5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<Spktables tableRowclass='border-b border-warning/10' tableClass="table whitespace-nowrap table-bordered table-bordered-warning min-w-full" header={[{ title: 'Order' }, { title: 'Date' }, { title: 'Customer' }, { title: 'Status' }]}>
    {Tabledata6.map((idx) => (
        <tr className="border-b border-warning/10" key={idx.id}>
            <th scope="row" className="text-start">
            {idx.order}
            </th>
            <td>
                <span className="badge bg-light text-dark">{idx.date}</span>
            </td>
            <td>
                <div className="flex items-center">
                    <span className="avatar avatar-xs me-2 online avatar-rounded">
                        <Image fill src={idx.src} alt="img" />
                    </span>{idx.name}
                </div>
            </td>
            <td><SpkBadge variant="warning/10" customClass="text-warning">Accepted</SpkBadge></td>
        </tr>
    ))}
</Spktables>
</div>
// End Prism Code//`;

export const datatable7 = `interface table5 {
    id: number
    text: string
    date: string
    name: string
}
export const Table7data: table5[] = [
    { id: 1, name: "Harshrath", date: "24 May 2022", text: "#5182-3467" },
    { id: 2, name: "Zozo Hadid", date: "02 July 2022", text: "#5182-3412" },
    { id: 3, name: "Martiana", date: "15 April 2022", text: "#5182-3423" },
    { id: 4, name: "Alex Carey", date: "17 March 2022", text: "#5182-3456" }
];`
export const reacttabledata6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap table-borderless 
min-w-full"><thead><tr><th scope="col" className="text-start">
User Name</th><th scope="col" className="text-start">
Transaction Id</th><th scope="col" className="text-start">
Created</th><th scope="col" className="text-start">
Status</th></tr></thead><tbody>
<tr>
<th scope="row" className="text-start">
Harshrath</th><td>#5182-3467</td>
<td>24 May 2022</td>
<td>
<span className="badge bg-primary text-white">
Fixed</span></td></tr>
<tr>
<th scope="row" className="text-start">
Zozo Hadid</th><td>#5182-3412</td>
<td>02 July 2022</td>
<td>
<span className="badge bg-warning  text-white">
In Progress</span>
</td>
</tr>
<tr>
<th scope="row" className="text-start">
Martiana</th>
<td>#5182-3423</td>
<td>15 April 2022</td>
<td><span className="badge bg-success  text-white">
Completed</span></td>
</tr>
<tr><th scope="row" className="text-start">
Alex Carey</th>
<td>#5182-3456</td>
<td>17 March 2022</td>
<td><span className="badge bg-danger  
text-white">Pending</span></td>
</tr>
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
  <Spktables tableClass="table whitespace-nowrap table-borderless min-w-full" header={[{ title: 'User Name' }, { title: 'Transaction Id' }, { title: 'Created' }, { title: 'Status' }]}>
      {Borderdata.map((idx) => (
          <tr  key={idx.id}>
              <th scope="row" className="text-start">{idx.name}</th>
              <td>{idx.transactionid}</td>
              <td>{idx.date}</td>
              <td><span className={&#96;badge bg-&#36;{idx.color} text-white&#96;}>{idx.status}</span></td>
          </tr>
      ))}
  </Spktables>
</div>
// End Prism Code//`;

export const datatable8 = `interface Group {
    id: number;
    product: string;
    seller: string;
    percent: string;
    sold: string;
    icon: string;
    color: string;
}
export const Groupdata: Group[] = [
    { id: 1, product: "Smart Watch", seller: "Slowtrack.inc", percent: "	24.23%", sold: "250/1786", icon: "up", color: "success" },
    { id: 2, product: "White Sneakers", seller: "American & Co.inc", percent: "12.45%", sold: "123/985", icon: "down", color: "danger" },
    { id: 3, product: "Baseball Bat", seller: "Sports Company", percent: "06.64%", sold: "124/232", icon: "up", color: "success" },
    { id: 4, product: "Black Hoodie", seller: "Renonds Fabrics", percent: "14.42%", sold: "192/2456", icon: "up", color: "success" },
]`
export const reacttabledata7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full ">
<thead>
<tr><th scope="col" className="text-start">
Product</th><th scope="col" className="text-start">
Seller</th><th scope="col" className="text-start">
Sale Percentage</th><th scope="col" className="text-start">
Qunatity Sold</th></tr>
</thead>
<tbody className="table-group-divider dark:border-defaultborder/10">
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">
Smart Watch</th><td>Slowtrack.inc</td>
<td>
<Link href="#" className="text-success">24.23%
<i className="ri-arrow-up-fill ms-1"></i></Link></td>
<td>250/1786</td></tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">White Sneakers</th>
<td>American &amp; Co.inc</td>
<td><Link href="#" className="text-danger">12.45%
<i className="ri-arrow-down-fill ms-1"></i></Link></td><
td>123/985</></tr><tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Baseball Bat</th>
<td>
Sports Company</td><td><Link href="#" className="text-success">
06.64%<iclassName="ri-arrow-up-fill ms-1"></i></Link>
</td>
<td>124/232</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Black Hoodie
</th><td>Renonds Fabrics</td><td><Link href="#" 
className="text-success">14.42%<iclassName="ri-arrow-up-fill ms-1">
</i></Link></td><td>192/2456</td></tr>
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
  <Spktables tableClass="table whitespace-nowrap min-w-full" tBodyClass="table-group-divider dark:border-defaultborder/10" header={[{ title: 'Product' }, { title: 'Seller' }, { title: 'Sale Percentage' }, { title: 'Quantity Sold' }]}>
  {Groupdata.map((idx) => (
      <tr className="border-b border-defaultborder" key={idx.id}>
      <th scope="row" className="text-start">{idx.product}</th>
      <td>{idx.seller}</td>
      <td><Link to="#" className={&#96;text-&#36;{idx.color}&#96;}>{idx.percent}<i
                className={&#96;ri-arrow-&#36;{idx.icon}-fill ms-1&#96;}></i></Link></td>
      <td>{idx.sold}</td>
  </tr>
  ))}
  </Spktables>
</div>
// End Prism Code//`;

export const datatable9 = `export const Table5data = [
    { id: 1, order: '2022R-01', date: '27-010-2022', name: 'Moracco' },
    { id: 2, order: '2022R-02', date: '28-10-2022', name: 'Thornton' },
    { id: 3, order: '2022R-03', date: '22-10-2022', name: 'Larry Bird' },
    { id: 4, order: '2022R-04', date: '29-09-2022', name: 'Erica Sean' }
];`
export const reacttabledata8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap ti-striped-table min-w-full">
<thead><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">ID</th>
<th scope="col" className="text-start">Date</th>
<th scope="col" className="text-start">Customer</th>
<th scope="col" className="text-start">Action</th>
</tr></thead><tbody>{Table5data.map((idx) => 
(<tr className="border-b border-defaultborder" 
key={idx.id}><th scope="row">{idx.order}</th>
<td>{idx.date}</td><td>{idx.name}</td><td><button 
type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem]
 ti-btn-success-full btn-wave">
 <i className="ri-download-2-line align-middle me-2 inline-block">
 </i>Download</button></td></tr>))}
 </tbody>
 </table>
</div>
// End Prism Code//`;
export const reusetabledata8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="table-responsive">
  <Spktables tableRowclass="border-b border-defaultborder" tableClass="table whitespace-nowrap ti-striped-table min-w-full" header={[{ title: 'ID' }, { title: 'Date' }, { title: 'Customer' }, { title: 'Status' }]}>
      {Table5data.map((idx) => (
          <tr className="border-b border-defaultborder " key={idx.id}>
              <th scope="row">{idx.order}</th>
              <td>{idx.date}</td>
              <td>{idx.name}</td>
              <td>
                  <SpkButton buttontype="button" variant="" customClass="ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-success-full btn-wave">
                      <i className="ri-download-2-line align-middle me-2 inline-block"></i>Download
                  </SpkButton>
              </td>
          </tr>
      ))}
  </Spktables>
</div>
// End Prism Code//`;

export const reacttabledata9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap table-striped-columns
 min-w-full"><thead><tr className="border-b border-defaultborder">
 <th scope="col" className="text-start">ID</th><th scope="col"
  className="text-start">Date</th><th scope="col" className="text-start">
  Customer</th><th scope="col" className="text-start">Action</th></tr>
  </thead><tbody>{Table5data.map((idx) =>
<tr className="border-b border-defaultborder " key={idx.id}>
th scope="row">{idx.order}</th><td>{idx.date}</td><td>{idx.name}
/td>
td><button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem]
ti-btn-danger-full btn-wave"><i className="ri-download-2-line 
align-middle me-2 inline-block"></i>Delete</button></td>
</tr>))}</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="table-responsive">
  <Spktables tableRowclass="border-b border-defaultborder" tableClass="table whitespace-nowrap table-striped-columns min-w-full" header={[{ title: 'ID' }, { title: 'Date' }, { title: 'Customer' }, { title: 'Action' }]}>
      {Table5data.map((idx) => (
          <tr className="border-b border-defaultborder " key={idx.id}>
              <th scope="row">{idx.order}</th>
              <td>{idx.date}</td>
              <td>{idx.name}</td>
              <td>
                  <SpkButton buttontype="button" variant="" customClass="ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-danger-full btn-wave">
                  <i className="ri-delete-bin-line align-middle me-2 d-inline-block"></i>Delete
                  </SpkButton>
              </td>
          </tr>
      ))}
  </Spktables>
</div>
// End Prism Code//`;

export const datatable10 = `export const Table6data = [
    { id: 1, text1: 'Mark', text2: 'Otto', text3: '@mdo' },
    { id: 2, text1: 'Jacob', text2: 'Thornton', text3: '@fat' },
    { id: 3, text1: 'Larry the Bird', text2: 'Thornton', text3: '@twitter' }
];`
export const reacttabledata10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap table-primary
 !rounded-none min-w-full">
 <thead>
 <tr className="border-b border-primary/10">
 <th scope="col" className="text-start">#</th>
 <th scope="col" className="text-start">First</th>
 <th scope="col" className="text-start">Last</th>
 <th scope="col" className="text-start">Handle</th>
 </tr></thead><tbody>{Table6data.map((idx) => 
(<tr key={idx.id}><th scope="row"
 className="text-start">{idx.id}</th>
 <td>{idx.text1}</td>
 <td>{idx.text2}</td>
 <td>{idx.text3}</td>
 </tr>))}
 </tbody>
 </table>
</div>
// End Prism Code//`;
export const reusetabledata10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
    <Spktables tableRowclass='border-b border-primary/10' tableClass="table whitespace-nowrap table-primary !rounded-none min-w-full" header={[{ title: '#' }, { title: 'First' }, { title: 'Last' }, { title: 'Handle' }]}>
        {Table6data.map((idx) => (
            <tr key={idx.id}>
                <th scope="row" className="text-start">{idx.id}</th>
                <td>{idx.text1}</td>
                <td>{idx.text2}</td>
                <td>{idx.text3}</td>
            </tr>
        ))}
    </Spktables>
</div>
// End Prism Code//`;

export const reacttabledata11 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap table-secondary
 !rounded-none min-w-full">
 <thead>
 <tr className="border-b border-secondary/10">
 <th scope="col" className="text-start">#</th>
 <th scope="col" className="text-start">First</th>
 <th scope="col" className="text-start">Last</th>
 <th scope="col" className="text-start">Handle</th>
 </tr></thead><tbody>{Table6data.map((idx) =>
(<tr key={idx.id}><th scope="row"
 className="text-start">{idx.id}</th><td>
 {idx.text1}</td><td>{idx.text2}</td><td>
 {idx.text3}</td></tr>))}</tbody>
 </table>
</div>
// End Prism Code//`;
export const reusetabledata11 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
          <Spktables tableRowclass='border-b border-secondary/10' tableClass="table whitespace-nowrap table-secondary  !rounded-none min-w-full" header={[{ title: '#' }, { title: 'First' }, { title: 'Last' }, { title: 'Handle' }]}>
              {Table6data.map((idx) => (
                  <tr key={idx.id}>
                      <th scope="row" className="text-start">{idx.id}</th>
                      <td>{idx.text1}</td>
                      <td>{idx.text2}</td>
                      <td>{idx.text3}</td>
                  </tr>
              ))}
          </Spktables>
  </div>
// End Prism Code//`;

export const reacttabledata12 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="table-responsive">
 className="table whitespace-nowrap table-warning 
!rounded-none min-w-full"><thead><tr className="border-b
 border-warning/10"><th scope="col" className="text-start">
 #</th><th scope="col" className="text-start">First</th>
 <th scope="col" className="text-start">Last</th>
 <th scope="col" className="text-start">Handle</th>
 </tr></thead><tbody>{Table6data.map((idx) => 
(<tr key={idx.id}><th scope="row" 
className="text-start">{idx.id}</th><td>{idx.text1}
</td><td>{idx.text2}</td><td>{idx.text3}</td></tr>))}
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata12 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="table-responsive">
    <Spktables tableRowclass='border-b border-warning/10' tableClass="table whitespace-nowrap table-warning  !rounded-none min-w-full" header={[{ title: '#' }, { title: 'First' }, { title: 'Last' }, { title: 'Handle' }]}>
        {Table6data.map((idx) => (
            <tr key={idx.id}>
                <th scope="row" className="text-start">{idx.id}</th>
                <td>{idx.text1}</td>
                <td>{idx.text2}</td>
                <td>{idx.text3}</td>
            </tr>
        ))}
        </Spktables>
</div>
// End Prism Code//`;

export const reacttabledata13 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap table-danger  
!rounded-none min-w-full"><thead><tr className="border-b
 border-danger/10"><th scope="col" className="text-start">#</th>
 <th scope="col" className="text-start">First</th>
 <th scope="col" className="text-start">Last</th>
 <th scope="col" className="text-start">Handle</th>
 </tr>
 </thead>
 <tbody>{Table6data.map((idx) => (<tr key={idx.id}>
 <th scope="row" className="text-start">{idx.id}</th><td>
 {idx.text1}</td><td>{idx.text2}</td><td>{idx.text3}</td>
 </tr>))}
 </tbody>
 </table>
</div>
// End Prism Code//`;
export const reusetabledata13 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
    <Spktables tableRowclass='border-b border-danger/10' tableClass="table whitespace-nowrap table-danger  !rounded-none min-w-full" header={[{headerClassname:'text-start', title: '#' }, {headerClassname:'text-start', title: 'First' }, {headerClassname:'text-start', title: 'Last' }, {headerClassname:'text-start', title: 'Handle' }]}>
      {Table6data.map((idx) => (
          <tr key={idx.id}>
              <th scope="row" className="text-start">{idx.id}</th>
              <td>{idx.text1}</td>
              <td>{idx.text2}</td>
              <td>{idx.text3}</td>
          </tr>
      ))}
      </Spktables>
</div>
// End Prism Code//`;

export const reacttabledata14 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap table-dark 
!rounded-none min-w-full">
<thead>
<tr className="border-b border-black/10 
dark:border-black/[0.025];"><th scope="col" 
className="text-start">#</th>
<th scope="col" className="text-start">First</th>
<th scope="col" className="text-start">Last</th>
<th scope="col" className="text-start">Handle</th>
</tr></thead><tbody>{Table6data.map((idx) => 
    (<tr key={idx.id}><th scope="row"
     className="text-start">{idx.id}</th><td>
     {idx.text1}</td><td>{idx.text2}</td><td>
     {idx.text3}</td></tr>))}</tbody>
     </table>
</div>
// End Prism Code//`;
export const reusetabledata14 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
      <Spktables tableRowclass='border-b border-success/10' tableClass="table whitespace-nowrap table-dark !rounded-none min-w-full" header={[{headerClassname:'text-start', title: '#' }, {headerClassname:'text-start', title: 'First' }, {headerClassname:'text-start', title: 'Last' }, {headerClassname:'text-start', title: 'Handle' }]}>
          {Table6data.map((idx) => (
              <tr key={idx.id}>
                  <th scope="row" className="text-start">{idx.id}</th>
                  <td>{idx.text1}</td>
                  <td>{idx.text2}</td>
                  <td>{idx.text3}</td>
              </tr>
          ))}
          </Spktables>
 </div>
// End Prism Code//`;

export const reacttabledata15 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap table-success 
table-striped  !rounded-none min-w-full">
<thead><tr className="border-b border-success/10">
<th scope="col" className="text-start">#</th>
<th scope="col" className="text-start">First</th>
<th scope="col" className="text-start">Last</th>
<th scope="col" className="text-start">Handle</th>
</tr></thead><tbody>{Table6data.map((idx) => 
(<tr key={idx.id}><th scope="row" 
className="text-start">{idx.id}</th><td>
{idx.text1}</td><td>{idx.text2}</td><td>
{idx.text3}</td></tr>))}</tbody></table>
</div>
// End Prism Code//`;
export const reusetabledata15 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
    <Spktables tableRowclass='border-b border-success/10' tableClass="table whitespace-nowrap table-success table-striped  !rounded-none min-w-full" header={[{headerClassname:'text-start', title: '#' }, {headerClassname:'text-start',  title: 'First' }, { headerClassname:'text-start', title: 'Last' }, {headerClassname:'text-start',  title: 'Handle' }]}>
        {Table6data.map((idx) => (
            <tr key={idx.id}>
                <th scope="row" className="text-start">{idx.id}</th>
                <td>{idx.text1}</td>
                <td>{idx.text2}</td>
                <td>{idx.text3}</td>
            </tr>
        ))}
   </Spktables>
 </div>
// End Prism Code//`;
export const datatable16 = `const avatar1 = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face2} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face8} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face2} alt="img" />
    </span>
    <Link className="avatar avatar-sm bg-primary text-white avatar-rounded" to="#">+5</Link>
</div>

const avatar2 = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face4} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face6} alt="img" />
    </span>
    <Link className="avatar avatar-sm bg-primary text-white avatar-rounded" to="#">+6</Link>
</div>

const avatar3 = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face1} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face11} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face15} alt="img" />
    </span>
    <Link className="avatar avatar-sm bg-primary text-white avatar-rounded" to="#">+2</Link>
</div>

const avatar4 = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face4} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face6} alt="img" />
    </span>
    <Link className="avatar avatar-sm bg-primary text-white avatar-rounded" to="#">+5</Link>
</div>
export const Hoverabledata = [
    { id: 1, product: "Joanna Smith", src: face10, mail: "joannasmith14@gmail.com", category: "Fashion", color: "primary", team: avatar1, status: '[52%]' },
    { id: 2, product: "Kara Kova", src: face2, mail: "milesakara@gmail.com", category: "Clothing", color: "warning", team: avatar2, status: '[40%]' },
    { id: 3, product: "Donald Trimb", src: face16, mail: "donaldo21@gmail.com", category: "Electronics", color: "dark", team: avatar3, status: '[17%]' },
    { id: 4, product: "Justin Gaethje", src: face13, mail: "justingae@gmail.com", category: "Sports", color: "danger", team: avatar4, status: '[72%]' },
]`
export const reacttabledata16 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap table-hover min-w-full 
ti-custom-table-hover"><thead>
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">Product Manager</th>
<th scope="col" className="text-start">Category</th>
<th scope="col" className="text-start">Team</th>
<th scope="col" className="text-start">Status</th>
</tr></thead><tbody><tr className="border-b border-defaultborder">
<td><div className="flex items-center">
<div className="avatar avatar-sm me-2 avatar-rounded">
<Image fill src={face10}alt="img" />
</div><div><div className="leading-none"><span>Joanna Smith</span>
</div>
<div className="leading-none">
<spanclassName="text-[0.6875rem] text-[#8c9097] 
dark:text-white/50">joannasmith14@gmail.com</span>
</div>
</div>
</div>
</td>
<td>
<span className="badge bg-primary/10 text-primary">Fashion</span>
</td><td><div className="avatar-list-stacked">
<span className="avatar avatar-sm avatar-rounded">
<Image fill src={face2} alt="img" />
</span><span className="avatar avatar-sm avatar-rounded">
<Image fill src={face8} alt="img" />
</span><span className="avatar avatar-sm avatar-rounded">
<Image fill src={face2} alt="img" />
</span><Link className="avatar avatar-sm bg-primary text-white 
avatar-rounded"href="#">+5</Link></div></td><td>
<div className="progress progress-xs">
<div className="progress-bar bg-primary w-[52%]" 
aria-valuenow="52" aria-valuemin="0"aria-valuemax="100">
</div>
</div>
</td>
</tr>
<tr className="border-b border-defaultborder">
<td><div className="flex items-center">
<div className="avatar avatar-sm me-2 avatar-rounded">
<Image fill src={face2} alt="img" />
</div><div><div className="leading-none"><span>Kara Kova</span>
</div><div className="leading-none"><spanclassName="text-[0.6875rem]
 text-[#8c9097] dark:text-white/50">milesakara@gmail.com</span>
 </div></div></div></td><td><span className="badge bg-warning/10 
 text-warning">Clothing</span></td>
 <td><div className="avatar-list-stacked"><span className="avatar 
 avatar-sm avatar-rounded">
 <Image fill src={face4} alt="img" /></span>
 <span className="avatar avatar-sm avatar-rounded">
 <Image fill src={face6} alt="img" />
 </span><Link className="avatar avatar-sm bg-primary text-white 
 avatar-rounded"href="#">+6</Link></div></td>
 <td>
 <div className="progress progress-xs">
 <div className="progress-bar bg-primary w-2/5"
  aria-valuenow="40" aria-valuemin="0"aria-valuemax="100">
  </div>
  </div>
  </td>
  </tr><tr className="border-b border-defaultborder ">
  <td><div className="flex items-center">
  <div className="avatar avatar-sm me-2 avatar-rounded">
  <Image fill src={face16} alt="img" />
  </div><div><div className="leading-none">
  <span>Donald Trimb</span></div>
  <div className="leading-none"><spanclassName="text-[0.6875rem] 
  text-[#8c9097] dark:text-white/50">donaldo21@gmail.com</span>
  </div></div></div></td><td>
  <span className="badge bg-dark/10 text-black dark:text-white">
  Electronics</span></td><td><div className="avatar-list-stacked">
  <span className="avatar avatar-sm avatar-rounded">
  <Image fill src={face1} alt="img" />
  </span><span className="avatar avatar-sm avatar-rounded">
  <Image fill src={face11} alt="img" />
  </span><span className="avatar avatar-sm avatar-rounded"><
  img src={face15} alt="img" />
  </span><Link className="avatar avatar-sm bg-primary text-white 
  avatar-rounded"href="#">+2</Link></div></td><td>
  <div className="progress progress-xs">
  <div className="progress-bar bg-primary w-[17%]" aria-valuenow="17"
   aria-valuemin="0"aria-valuemax="100"></div>
   </div>
   </td>
   </tr>
   <tr className="border-b border-defaultborder ">
   <td><div className="flex items-center">
   <div className="avatar avatar-sm me-2 avatar-rounded">
   <Image fill src={face13} alt="img" />
   </div><div><div className="leading-none">
   <span>Justin Gaethje</span></div>
   <div className="leading-none">
   <spanclassName="text-[0.6875rem] text-[#8c9097] 
   dark:text-white/50">justingae@gmail.com</span></div>
   </div>
   </div>
   </td>
   <td>
   <span className="badge bg-danger/10 text-danger">Sports</span>
   </td><td><div className="avatar-list-stacked">
   <span className="avatar avatar-sm avatar-rounded">
   <Image fill src={face4} alt="img" />
   </span><span className="avatar avatar-sm avatar-rounded">
   <Image fill src={face6} alt="img" />
   </span><Link className="avatar avatar-sm bg-primary
    text-white avatar-rounded"href="#">+5</Link>
    </div>
    </td>
    <td><div className="progress progress-xs">
    <div className="progress-bar bg-primary w-[72%]" aria-valuenow="72"
     aria-valuemin="0"aria-valuemax="100"></div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata16 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
  <Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap table-hover min-w-full ti-custom-table-hover" header={[{ title: 'Product Manager' }, { title: 'Category' }, { title: 'Team' }, { title: 'Status' }]}>
      {Hoverabledata.map((idx) => (
          <tr className="border-b border-defaultborder " key={idx.id}>
              <td>
                  <div className="flex items-center">
                      <div className="avatar avatar-sm me-2 avatar-rounded">
                          <Image fill src={idx.src} alt="img" />
                      </div>
                      <div>
                          <div className="leading-none">
                              <span>{idx.product}</span>
                          </div>
                          <div className="leading-none">
                              <span
                                  className="text-[0.6875rem] text-[#8c9097] dark:text-white/50">{idx.mail}</span>
                          </div>
                      </div>
                  </div>
              </td>
              <td><span className={&#96;badge bg-&#36;{idx.color}/10 text-primary&#96;}>Fashion</span></td>
              <td>
              {idx.team}
              </td>
              <td>
                  <div className="progress progress-xs">
                      <div className={&#96;progress-bar bg-primary w-&#36;{idx.status}&#96;} role="progressbar" aria-valuenow={52} aria-valuemin={0}
                          aria-valuemax={100}>
                      </div>
                  </div>
              </td>
          </tr>
      ))}
  </Spktables>
</div>
// End Prism Code//`;

export const datatable17 = `export const Table13data = [
    { id: 1, src:face15, name: "Mark Cruise", mail: "markcruise24@gmail.com", date: "Jul 26,2022", text1: "IN-2032", text2: "Paid", color: "success", class: "", icon: "check-fill" },
    { id: 2, src:face12, name: "Charanjeep", mail: "charanjeep@gmail.in", date: "Mar 14,2022", text1: "IN-2022", text2: "Paid", color: "success", class: "", icon: "check-fill" },
    { id: 3, src:face5, name: "Samantha Julie", mail: "julie453@gmail.com", date: "Feb 1,2022", text1: "IN-2014", text2: "Cancelled", color: "danger", class: "", icon: "close-fill" },
    { id: 4, src:face11, name: "Simon Cohen", mail: "simon@gmail.com", date: "Apr 24,2022", text1: "IN-2036", text2: "	Refunded", color: "black", class: "text-default", icon: "reply-line" }
];`
export const reacttabledata17 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap ti-striped-table
 table-hover min-w-full ti-custom-table-hover"><thead>
 <tr className="border-b border-defaultborder">
 <th scope="col" className="text-start">Invoice</th>
 <th scope="col" className="text-start">Customer</th>
 <th scope="col" className="text-start">Status</th>
 <th scope="col" className="text-start">Date</th>
 </tr>
 </thead><tbody><tr className="border-b border-defaultborder">
 <th scope="row">IN-2032</th><td><div className="flex items-center">
 <div className="avatar avatar-sm me-2 avatar-rounded">
 <Image fill src={face15} alt="img" />
 </div><div><div className="leading-none"><span>Mark Cruise</span></div>
 <div className="leading-none"><spanclassName="text-[0.6875rem] text-[#8c9097]
  dark:text-white/50">markcruise24@gmail.com</span></div></div></div></td><td>
  <span className="badge bg-success/10 text-success"><iclassName="ri-check-fill 
  align-middle me-1"></i>Paid</span></td><td>Jul 26,2022</td></tr>
  <tr className="border-b border-defaultborder ">
  <th scope="row">IN-2022</th>
  <td><div className="flex items-center">
  <div className="avatar avatar-sm me-2 avatar-rounded">
   <Image fill src={face12} alt="img" />
    </div>
    <div>
    <div className="leading-none"><span>Charanjeep</span>
    </div>
    <div className="leading-none">
    <span nclassName="text-[0.6875rem] text-[#8c9097]
     dark:text-white/50">charanjeep@gmail.in</span></div>
     </div>
     </div>
     </td>
     <td><span className="badge bg-success/10 text-success">
     <iclassName="ri-check-fill align-middle me-1"></i>Paid</span>
     </td>
     <td>Mar 14,2022</td>
     </tr>
     <tr className="border-b border-defaultborder">
     <th scope="row">IN-2014</th>
     <td>
     <div className="flex items-center">
     <div className="avatar avatar-sm me-2 avatar-rounded">
     <Image fill src={face5} alt="img" />
     </div>
     <div>
     <div className="leading-none"><span>
     Samantha Julie</span>
     </div>
     <div className="leading-none"><span className="text-[0.6875rem] 
     text-[#8c9097] dark:text-white/50">julie453@gmail.com</span></div>
     </div>
     </div>
     </td>
<td><span className="badge bg-danger/10 text-danger">
<iclassName="ri-close-fill align-middle me-1"></i>Cancelled</span>
</td><td>Feb 1,2022</td></tr><tr className="border-b border-defaultborder">
<th scope="row">IN-2036</th><td><div className="flex items-center">
<div className="avatar avatar-sm me-2 avatar-rounded">
<Image fill src={face11} alt="img" />
</div><div><div className="leading-none"><span>Simon Cohen</span>
</div><div className="leading-none"><span className="text-[0.6875rem]
 text-[#8c9097] dark:text-white/50">simon@gmail.com</span></div>
 </div>
 </div>
 </td>
 <td><span className="badge bg-light text-black dark:text-white">
 <iclassName="ri-reply-line align-middle me-1"></i>Refunded</span></td>
 <td>Apr 24,2022</td>
 </tr>
 </tbody>
 </table>
</div>
// End Prism Code//`;
export const reusetabledata17 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap ti-striped-table table-hover min-w-full ti-custom-table-hover" header={[{ title: 'Invoice' }, { title: 'Customer' }, { title: 'Status' }, { title: 'Date' }]}>
{Table13data.map((idx) => (
  <tr className="border-b border-defaultborder " key={idx.id}>
      <th scope="row">{idx.text1}</th>
      <td>
          <div className="flex items-center">
              <div className="avatar avatar-sm me-2 avatar-rounded">
                  <Image fill src={idx.src} alt="img" />
              </div>
              <div>
                  <div className="leading-none">
                      <span>{idx.name}</span>
                  </div>
                  <div className="leading-none">
                      <span
                          className="text-[0.6875rem] text-[#8c9097] dark:text-white/50">{idx.mail}</span>
                  </div>
              </div>
          </div>
      </td>
      <td><span className={&#96;badge bg-&#36;{idx.color}/10 text-&#36;{idx.color}&#96;}><i
          className={&#96;ri-&#36;{idx.icon} align-middle me-1&#96;}></i>{idx.text2}</span></td>
      <td>{idx.date}</td>
  </tr>
))}
</Spktables>
</div>
// End Prism Code//`;

export const reacttabledata18 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full">
<thead className="bg-primary/10">
<tr className="border-b border-primary/10">
<th scope="col" className="text-start">User Name</th>
<th scope="col" className="text-start">Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-primary/10">
<th scope="row" className="text-start">Harshrath</th>
<td>#5182-3467</td>
<td>24 May 2022</td>
<td>
<div className="hstack flex gap-3 text-[.9375rem]">
<Link aria-label="anchor" href="#"
className="ti-btn ti-btn-sm ti-btn-success !rounded-full">
<iclassName="ri-download-2-line"></i></Link>
<Link aria-label="anchor" href="#"
className="ti-btn ti-btn-sm ti-btn-info !rounded-full">
<i className="ri-edit-line"></i></Link><Link aria-label="anchor"
 href="#"className="ti-btn ti-btn-sm ti-btn-danger !rounded-full">
 <i className="ri-delete-bin-line"></i>
 </Link>
 </div>
 </td>
 </tr>
 <tr className="border-b border-primary/10">
 <th scope="row" className="text-start">Zozo Hadid</th>
 <td>#5182-3412</td>
 <td>02 July 2022</td>
 <td>
 <div className="hstack flex gap-3 text-[.9375rem]">
 <Link aria-label="anchor" href="#" 
 className="ti-btn ti-btn-sm ti-btn-success !rounded-full">
 <iclassName="ri-download-2-line"></i></Link>
 <Link aria-label="anchor" href="#"className="ti-btn ti-btn-sm 
 ti-btn-info !rounded-full">
 <iclassName="ri-edit-line"></i>
 </Link>
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-sm ti-btn-danger
  !rounded-full">
  <iclassName="ri-delete-bin-line"></i>
  </Link>
  </div>
  </td>
  </tr>
  <tr className="border-b border-primary/10">
  <th scope="row" className="text-start">
  Martiana</th>
  <td>#5182-3423</td>
  <td>15 April 2022</td>
  <td><div className="hstack flex gap-3 text-[.9375rem]">
  <Link aria-label="anchor" href="#"
  className="ti-btn ti-btn-sm ti-btn-success !rounded-full">
  <iclassName="ri-download-2-line"></i></Link>
  <Link aria-label="anchor" href="#" 
  className="ti-btn ti-btn-sm ti-btn-info !rounded-full">
  <iclassName="ri-edit-line"></i></Link>
  <Link aria-label="anchor" href="#"
  className="ti-btn ti-btn-sm ti-btn-danger !rounded-full">
  <iclassName="ri-delete-bin-line"></i></Link>
  </div>
  </td></tr><tr className="border-b border-primary/10">
  <th scope="row" className="text-start">Alex Carey</th>
  <td>#5182-3456</td><td>17 March 2022</td>
  <td><div className="hstack flex gap-3 text-[.9375rem]">
  <Link aria-label="anchor" href="#" 
  className="ti-btn ti-btn-sm ti-btn-success !rounded-full">
  <iclassName="ri-download-2-line"></i></Link>
  <Link aria-label="anchor" href="#" 
  className="ti-btn ti-btn-sm ti-btn-info !rounded-full">
  <iclassName="ri-edit-line"></i></Link>
  <Link aria-label="anchor" href="#" 
  className="ti-btn ti-btn-sm ti-btn-danger !rounded-full">
  <iclassName="ri-delete-bin-line"></i></Link>
  </div>
  </td>
  </tr>
  </tbody>
  </table>
</div>
// End Prism Code//`;
export const reusetabledata18 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
    <div className="table-responsive">
<Spktables tableRowclass='border-b border-primary/10' headerClass="bg-primary/10" tableClass="table whitespace-nowrap min-w-full" header={[{ headerClassname:"text-start",title: 'User Name' }, {headerClassname:"text-start", title: 'Transaction Id' }, {headerClassname:"text-start", title: 'Created' }, {headerClassname:"text-start", title: 'Status' }]}>
{Table7data.map((idx) => (
    <tr className="border-b border-primary/10" key={idx.id}>
        <th scope="row" className="text-start">{idx.name}</th>
        <td>{idx.text}</td>
        <td>{idx.date}</td>
        <td>
            <div className="hstack flex gap-3 text-[.9375rem]">
                <Link aria-label="anchor" to="#"
                    className="ti-btn ti-btn-sm ti-btn-success !rounded-full"><i
                        className="ri-download-2-line"></i></Link>
                <Link aria-label="anchor" to="#"
                    className="ti-btn ti-btn-sm ti-btn-info !rounded-full"><i
                        className="ri-edit-line"></i></Link>
                <Link aria-label="anchor" to="#"
                    className="ti-btn ti-btn-sm ti-btn-danger !rounded-full"><i
                        className="ri-delete-bin-line"></i></Link>
            </div>
        </td>
    </tr>
))}
    </Spktables>
</div>
// End Prism Code//`;

export const datatable19 = `export const  tablehead =[
    {id:1, name:'Harshrath', date:'24 May 2022', text:'	#5182-3467', btn:'Pending', color:'primary'},
    {id:2, name:'Zozo Hadid', date:'02 July 2022', text:'#5182-3412', btn:'Pending', color:'primary'},
    {id:3, name:'Martiana', date:'15 April 2022', text:'#5182-3423', btn:'Rejected', color:'danger'},
    {id:4, name:'Alex Carey', date:'17 March 2022', text:'#5182-3456', btn:'Processed', color:'success'}
];`
export const reacttabledata19 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full">
<thead className="bg-warning/10">
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">User Name</th>
<th scope="col" className="text-start">Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr></thead><tbody>{tablehead.map((idx) => 
    (<tr key={idx.id} className="border-b border-defaultborder">
    <th scope="row"  className="text-start">{idx.name}</th>
    <td>{idx.text}</td><td>{idx.date}</td>
    <td><button type="button" 
className={&#96;ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-&#36;{idx.color}&#96;}>
{idx.btn}</button></td>
</tr>))}
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata19 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap min-w-full" headerClass="bg-warning/10" header={[{ title: 'User Name' }, { title: 'Transaction Id' }, { title: 'Created' }, { title: 'Status' }]}>
  {tablehead.map((idx) => (
      <tr key={idx.id} className="border-b border-defaultborder">
          <th scope="row" className="text-start">{idx.name}</th>
          <td>{idx.text}</td>
          <td>{idx.date}</td>
          <td>
              <SpkButton buttontype="button" variant={idx.color} customClass="ti-btn !py-1 !px-2 !text-[0.75rem]">{idx.btn}</SpkButton>
          </td>
      </tr>
  ))}
  </Spktables>
</div>
// End Prism Code//`;
export const datatable20 = ` 
export const  tablehead =[
    {id:1, name:'Harshrath', date:'24 May 2022', text:'	#5182-3467', btn:'Pending', color:'primary'},
    {id:2, name:'Zozo Hadid', date:'02 July 2022', text:'#5182-3412', btn:'Pending', color:'primary'},
    {id:3, name:'Martiana', date:'15 April 2022', text:'#5182-3423', btn:'Rejected', color:'danger'},
    {id:4, name:'Alex Carey', date:'17 March 2022', text:'#5182-3456', btn:'Processed', color:'success'}
];`
export const reacttabledata20 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full">
<thead className="bg-success/10"><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">User Name</th>
<th scope="col" className="text-start">Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>
{tablehead.map((idx) => (<tr key={idx.id} 
className="border-b border-defaultborder">
<th scope="row"  className="text-start">{idx.name}</th>
<td>{idx.text}</td><td>{idx.date}</td>
<td><button type="button" 
className={&#96;ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-&#36;{idx.color}&#96;}>
{idx.btn}</button>
</td></tr>))}
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata20 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="table-responsive">
<Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap min-w-full" headerClass="bg-success/10" header={[{ title: 'User Name' }, { title: 'Transaction Id' }, { title: 'Created' }, { title: 'Status' }]}>
{tablehead.map((idx) => (
<tr key={idx.id} className="border-b border-defaultborder">
    <th scope="row" className="text-start">{idx.name}</th>
    <td>{idx.text}</td>
    <td>{idx.date}</td>
    <td>
        <SpkButton buttontype="button" variant={idx.color} customClass="ti-btn !py-1 !px-2 !text-[0.75rem]">{idx.btn}</SpkButton>
    </td>
</tr>
))}
</Spktables>
</div>
// End Prism Code//`;

export const reacttabledata21 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full">
<thead className="bg-info/10"><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">User Name</th>
<th scope="col" className="text-start">Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>{tablehead.map((idx) => 
(<tr key={idx.id} className="border-b border-defaultborder">
<th scope="row"  className="text-start">{idx.name}</th>
<td>{idx.text}</td>
<td>{idx.date}</td>
<td>
<button type="button"
className={&#96;ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-&#36;{idx.color}&#96;}>
{idx.btn}</button></td></tr>))}
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata21 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="table-responsive">
  <Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap min-w-full" headerClass="bg-info/10" header={[{ title: 'User Name' }, { title: 'Transaction Id' }, { title: 'Created' }, { title: 'Status' }]}>
      {tablehead.map((idx) => (
          <tr key={idx.id} className="border-b border-defaultborder">
              <th scope="row" className="text-start">{idx.name}</th>
              <td>{idx.text}</td>
              <td>{idx.date}</td>
              <td>
                  <SpkButton buttontype="button" variant={idx.color} customClass="ti-btn !py-1 !px-2 !text-[0.75rem]">{idx.btn}</SpkButton>
              </td>
          </tr>
      ))}
      </Spktables>
</div>
// End Prism Code//`;

export const reacttabledata22 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full">
<thead className="bg-secondary/10">
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">
User Name</th>
<th scope="col" className="text-start">
Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr></thead><tbody>{tablehead.map((idx) => 
(<tr key={idx.id} className="border-b border-defaultborder">
<th scope="row"  className="text-start">{idx.name}</th>
<td>{idx.text}</td><td>{idx.date}</td>
<td><button type="button" 
className={&#96;ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-&#36;{idx.color}&#96;}>
{idx.btn}</button></td></tr>))}
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata22 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="table-responsive ">
<Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap min-w-full" headerClass="bg-secondary/10" header={[{ title: 'User Name' }, { title: 'Transaction Id' }, { title: 'Created' }, { title: 'Status' }]}>
  {tablehead.map((idx) => (
      <tr key={idx.id} className="border-b border-defaultborder">
          <th scope="row" className="text-start">{idx.name}</th>
          <td>{idx.text}</td>
          <td>{idx.date}</td>
          <td>
              <SpkButton buttontype="button" variant={idx.color} customClass="ti-btn !py-1 !px-2 !text-[0.75rem]">{idx.btn}</SpkButton>
          </td>
      </tr>
  ))}
  </Spktables>
</div>
// End Prism Code//`;

export const reacttabledata23 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full">
<thead className="bg-danger/10"><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">User Name</th>
<th scope="col" className="text-start">Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>{tablehead.map((idx) =>
     (<tr key={idx.id} className="border-b border-defaultborder">
     <th scope="row"  className="text-start">{idx.name}</th>
     <td>{idx.text}</td><td>{idx.date}</td>
<td><button type="button" 
className={&#96;ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-&#36;{idx.color}&#96;}>
{idx.btn}</button></td>
</tr>))}
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata23 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
  <Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap min-w-full" headerClass="bg-danger/10" header={[{ title: 'User Name' }, { title: 'Transaction Id' }, { title: 'Created' }, { title: 'Status' }]}>
      {tablehead.map((idx) => (
          <tr key={idx.id} className="border-b border-defaultborder">
              <th scope="row" className="text-start">{idx.name}</th>
              <td>{idx.text}</td>
              <td>{idx.date}</td>
              <td>
                  <SpkButton buttontype="button" variant={idx.color} customClass="ti-btn !py-1 !px-2 !text-[0.75rem]">{idx.btn}</SpkButton>
              </td>
          </tr>
      ))}
      </Spktables>
</div>
// End Prism Code//`;
export const datatable24 = ` <div className="table-responsive">
        <Spktables tableRowclass='border-b border-defaultborder' footerClass="bg-primary/10"  headerClass="bg-primary/10" tableClass="table whitespace-nowrap min-w-full" header={[{title:'S.No'}, {title:'Team'}, {title:'Matches Won'}, {title:'Win Ratio'}]}>
                {Table10data.map((idx) => (
                    <tr className="border-b border-defaultborder" key={idx.id}>
                        <th scope="row">
                        {idx.text1}
                        </th>
                        <td>
                        {idx.text2}
                        </td>
                        <td>
                        {idx.text3}
                        </td>
                        <td>
                            <span className="badge bg-primary text-white">{idx.text3} </span>
                        </td>
                    </tr>
                ))}
            <tr className="border-b border-defaultborder">
                <th scope="row">
                    Total
                </th>
                <td>
                    United States
                </td>
                <td>
                    558
                </td>
                <td><SpkBadge variant="primary" customClass="text-white">56%</SpkBadge></td>
            </tr>
        </Spktables>
</div>`
export const reacttabledata24 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full">
<thead className="bg-primary/10">
<tr className="border-b border-defaultborder">
<th scope="col">S.No</th><th scope="col">Team</th>
<th scope="col">Matches Won
</th><th scope="col">Win Ratio</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-defaultborder">
<th scope="row">01</th>
<td>Manchester</td>
<td>232</td>
<td><span className="badge bg-primary text-white">
42%</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row">02</th><td>Barcelona</td>
<td>175</td>
<td><span className="badge bg-primary text-white">58%</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row">03</th><td>Portugal</td>
<td>126</td>
<td><span className="badge bg-primary text-white">32%</span>
</td></tr></tbody><tfoot className="bg-primary/10">
<tr className="border-b border-defaultborder">
<th scope="row">Total</th><td>United States</td>
<td>558</td><td><span className="badge bg-primary text-white">
56%</span></td>
</tr>
</tfoot>
</table>
</div>
// End Prism Code//`;

export const reusetabledata24 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<Spktables tableRowclass='border-b border-defaultborder' footerClass="bg-primary/10"  headerClass="bg-primary/10" tableClass="table whitespace-nowrap min-w-full" header={[{title:'S.No'}, {title:'Team'}, {title:'Matches Won'}, {title:'Win Ratio'}]}>
{Table10data.map((idx) => (
    <tr className="border-b border-defaultborder" key={idx.id}>
        <th scope="row">
        {idx.text1}
        </th>
        <td>
        {idx.text2}
        </td>
        <td>
        {idx.text3}
        </td>
        <td>
            <span className="badge bg-primary text-white">{idx.text3} </span>
        </td>
    </tr>
))}
    
    <tr className="border-b border-defaultborder">
        <th scope="row">
            Total
        </th>
        <td>
            United States
        </td>
        <td>
            558
        </td>
        <td><SpkBadge variant="primary" customClass="text-white">56%</SpkBadge></td>
    </tr>
    </Spktables>
</div>
// End Prism Code//`;

export const datatable25 = `export const Captiondata: Caption[] = [
    { id: 1, country: "United States", won: "2012", athletes: "1823" },
    { id: 2, country: "United Kingdom", won: "1012", athletes: "992" },
    { id: 3, country: "Germany", won: "914", athletes: "875" },
]`
export const reacttabledata25 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap 
min-w-full caption-bottom">
<caption>Top 3 Countries</caption>
<thead>
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">S.No</th>
<th scope="col" className="text-start">Country</th>
<th scope="col" className="text-start">Medals Won</th>
<th scope="col" className="text-start">No Of Athletes</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">01</th>
<td>United States</td>
<td>2012
<i className="ri-medal-line mx-2"></i></td>
<td>1823
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">02</th>
<td>United Kingdom</td><td>1012
<i className="ri-medal-line mx-2"></i>
</td><td>992</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">03</th>
<td>Germany</td><td>914<i className="ri-medal-line mx-2">
</i></td>
<td>875</td>
</tr>
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata25 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
      <Spktables tableRowclass='border-b border-defaultborder' headerContent={<caption>Top 3 Countries</caption>} tableClass="table whitespace-nowrap min-w-full caption-bottom" header={[{headerClassname:'text-start', title: 'S.No' }, {headerClassname:'text-start', title: 'Country' }, {headerClassname:'text-start', title: 'Medals Won' }, {headerClassname:'text-start', title: 'No Of Athletes' }]}>
        {Captiondata.map((idx) => (
            <tr className="border-b border-defaultborder"  key={idx.id}>
                <th scope="row" className="text-start">0{idx.id}</th>
                <td>{idx.country}</td>
                <td>{idx.won}<i className="ri-medal-line mx-2"></i></td>
                <td>{idx.athletes}</td>
            </tr>
        ))}
    </Spktables>
</div>
// End Prism Code//`;
export const datatable26 = ` 
 <div className="table-responsive">
      <Spktables headerContent={<caption>Top IT Companies</caption>} tableClass="table whitespace-nowrap caption-top w-full" header={[{ title: 'S.No' }, { title: 'Country' }, { title: 'Revenue' }, { title: 'Country' }]}>
              {Topcaptuiondata.map((idx) => (
                  <tr className="border-b border-defaultborder" key={idx.id}>
                      <th scope="row">{idx.id}</th>
                      <td>{idx.name}</td>
                      <td>{idx.revenue}</td>
                      <td>{idx.country}</td>
                  </tr>
              ))}
      </Spktables>
  </div>`
export const reacttabledata26 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap caption-top">
<caption>Top IT Companies</caption>
<thead>
<tr className="border-b border-defaultborder">
<th scope="col">S.No</th><th scope="col">Name</th>
<th scope="col">Revenue</th><th scope="col">Country</th>
</tr><thead><tbody><trclassName="border-b border-defaultborder">
<th scope="row">1</th><td>Microsoft</td><td>&#36;170 billion</td>
<td>United States</td></tr className="">
<tr className="border-b border-defaultborder">
<th scope="row">2</th><td>HP</td>
<td>&#36;72 billion</td><td>United States</td>
</tr><tr className="border-b border-defaultborder">
<thscope="row">3</thscope=><td>IBM</td>
<td>&#36;60 billion</td><td>United States</td>
</tr>
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata26 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<Spktables headerContent={<caption>Top IT Companies</caption>} tableClass="table whitespace-nowrap caption-top w-full" header={[{ title: 'S.No' }, { title: 'Country' }, { title: 'Revenue' }, { title: 'Country' }]}>
        {Topcaptuiondata.map((idx) => (
            <tr className="border-b border-defaultborder" key={idx.id}>
                <th scope="row">{idx.id}</th>
                <td>{idx.name}</td>
                <td>{idx.revenue}</td>
                <td>{idx.country}</td>
            </tr>
        ))}
</Spktables>
</div>
// End Prism Code//`;

export const datatable27 = `interface Active {
    id:number;
    name:string;
    create:string;
    number:string;
    status:string;
    color:string;
    class:string;
    tdclass:string;
}
export const Activedata :Active[]= [
    {id:1, name:'Mark', create:"21,Dec 2021", number:"+1234-12340", status:"Completed", color:"primary", class:"table-active", tdclass:''},
    {id:2, name:'Monika', create:"29,April 2022", number:"+1523-12459", status:"Failed", color:"warning", class:"border-b border-defaultborder", tdclass:''},
    {id:3, name:'Madina', create:"30,Nov 2022", number:"+1982-16234", status:"Successful", color:"success", class:"border-b border-defaultborder", tdclass:'table-active'},
    {id:4, name:'Bhamako', create:"18,Mar 2022", number:"+1526-10729", status:"Pending", color:"secondary", class:"border-b border-defaultborder", tdclass:''},
]`
export const reacttabledata27 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full">
<thead>
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">Name</th>
<th scope="col" className="text-start">Created On</th>
<th scope="col" className="text-start">Number</th>
<th scope="col" className="text-start">Status</th>
</tr></thead><tbody><tr className="table-active">
<th scope="row" className="text-start">Mark</th>
<td>21,Dec 2021</td><td>+1234-12340</td>
<td>
<span className="badge bg-primary text-white">
Completed</span></td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Monika</th>
<td>29,April 2022</td><td>+1523-12459</td>
<td><span className="badge bg-warning text-white">
Failed</span></td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Madina</th>
<td>30,Nov 2022</td><td className="table-active">
+1982-16234</td>
<td><span className="badge bg-success text-white">
Successful</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Bhamako</th>
<td>18,Mar 2022</td>
<td>+1526-10729</td>
<td><span className="badge bg-secondary text-white">
Pending</span></td></tr>
</tbody>
</table>
</div>
// End Prism Code//`;
export const reusetabledata27 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
  <Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap min-w-full" header={[{headerClassname:'text-start', title: 'Name' }, {headerClassname:'text-start', title: 'Created On' }, {headerClassname:'text-start', title: 'Number' }, {headerClassname:'text-start', title: 'Status' }]}>
      {Activedata.map((idx) => (
          <tr key={idx.id} className={idx.class}>
              <th scope="row" className="text-start">{idx.name}</th>
              <td>{idx.create}</td>
              <td className={idx.tdclass}>{idx.number}</td>
              <td><span className={&#96;badge bg-&#36;{idx.color} text-white&#96;}>{idx.status}</span></td>
          </tr>
      ))}
  </Spktables>
</div>
// End Prism Code//`;
export const datatable28 = `interface table7 {
    id: string
    text: string
    date: string
    name: string
    class: string
    checked: string
}
export const Table9data: table7[] = [
    { id: "1", name: "Zelensky", date: "25-Apr-2021", text: "Paid", class: "success"  ,checked: 'defaultChecked',},
    { id: "2", name: "Kim Jong", date: "29-April-2022", text: "Pending", class: "danger"  ,checked: '',},
    { id: "3", name: "Obana", date: "30-Nov-2022", text: "Paid", class: "success"  ,checked: '',},
    { id: "4", name: "Sean Paul", date: "01-Jan-2022", text: "Paid", class: "success"  ,checked: '',},
    { id: "5", name: "Karizma", date: "14-Feb-2022", text: "Pending", class: "danger"  ,checked: '',}
];`
export const reacttabledata28 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap table-sm min-w-full">
<thead><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">Invoice</th>
<th scope="col" className="text-start">Created Date</th>
<th scope="col" className="text-start">Status</th>
<th scope="col" className="text-start">Action</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">
<div className="form-check">
<input className="form-check-input" type="checkbox" value="" 
id="checkebox-sm" checked />
<label className="form-check-label"
 htmlFor="checkebox-sm">Zelensky</label>
 </div>
 </th>
 <td>25-Apr-2021</td>
 <td>
 <span className="badge bg-success/10 text-succes">
 Paid</span></td>
 <td><div className="hstack flex gap-3 
 text-[.9375rem]"><Link aria-label="anchor" href="#" 
 className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-download-2-line"></i></Link>
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon
ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i>
</Link>
</div>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">
<div className="form-check">
<input className="form-check-input" type="checkbox"
 value="" id="checkebox-sm1" />
 <label className="form-check-label" htmlFor="checkebox-sm1">
 Kim Jong</label>
 </div>
 </th>
 <td>29-April-2022</td>
 <td><span className="badge bg-danger/10 
 text-danger">Pending</span></td>
 <td><div className="hstack flex gap-3 text-[.9375rem]">
 <Link aria-label="anchor" href="#" className="ti-btn 
 ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-download-2-line"></i>
 </Link><Link aria-label="anchor" href="#" 
 className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-edit-line"></i></Link>
 </div>
 </td>
 </tr>
 <tr className="border-b border-defaultborder">
 <th scope="row" className="text-start">
 <div className="form-check">
 <input className="form-check-input" type="checkbox" 
 value="" id="checkebox-sm2" />
 <label className="form-check-label" htmlFor="checkebox-sm2">
 Obana</label></div></th><td>30-Nov-2022</td>
 <td>
 <span className="badge bg-success/10 text-success">Paid</span>
 </td><td><div className="hstack flex gap-3 text-[.9375rem]">
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-download-2-line"></i></Link><Link aria-label="anchor" href="#"
className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
<i className="ri-edit-line"></i></Link>
</div>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">
<div className="form-check">
<input className="form-check-input" type="checkbox" value="" id="checkebox-sm3" />
<label className="form-check-label" htmlFor="checkebox-sm3">Sean Paul</label>
</div>
</th>
<td>01-Jan-2022</td>
<td>
<span className="badge bg-success/10 text-success">
Paid</span></td>
<td><div className="hstack flex gap-3
 text-[.9375rem]"><Link aria-label="anchor" href="#" 
 className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-download-2-line"></i></Link>
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon
ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
</div></td></tr><tr className="border-b border-defaultborder">
<th scope="row" className="text-start">
<div className="form-check">
<input className="form-check-input" type="checkbox" value="" 
id="checkebox-sm4" /><label className="form-check-label"
 htmlFor="checkebox-sm4">Karizma</label></div></th>
 <td>14-Feb-2022</td>
 <td><span className="badge bg-danger/10 text-danger">Pending</span>
 </td>
 <td><div className="hstack flex gap-3 text-[.9375rem]">
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon 
 ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-edit-line"></i></Link>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
</div>
// End Prism Code//`;
export const reusetabledata28 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="table-responsive">
  <Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap table-sm min-w-full" header={[{headerClassname:'text-start', title: 'Invoice' }, {headerClassname:'text-start', title: 'Created Date' }, {headerClassname:'text-start', title: 'Status' }, { headerClassname:'text-start',title: 'Action' }]}>
  {Table9data.map((idx) => (
      <tr className="border-b border-defaultborder" key={idx.id}>
          <th scope="row" className="text-start">
              <div className="form-check">
              <input id={idx.id} defaultChecked={idx.checked === 'defaultChecked'}    className="form-check-input"  type="checkbox" value=""   />
                  <label className="form-check-label" htmlFor="checkebox-sm">
                  {idx.name}
                  </label>
              </div>
          </th>
          <td>{idx.date}</td>
          <td><span className={&#96;badge bg-&#36;{idx.class}/10 text-&#36;{idx.class}&#96;}>{idx.text}</span></td>
          <td>
              <div className="hstack flex gap-3 text-[.9375rem]">
                  <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                  <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
              </div>
          </td>
      </tr>
  ))}
  </Spktables>
</div>
// End Prism Code//`;
export const datatable29 = `export const  Colortables =[
    {id:1, text:'Default', color:'primary/10', quantity:'22', price:'$2,012',  class1:'',class2:'bg-primary/10 text-primary',name:'Rita Book'},
    {id:2, text:'Primary', color:'primary', quantity:'22', price:'$4,254',  class1:'table-primary',class2:'bg-primary text-white',name:'Rhoda Report'},
    {id:3, text:'Secondary', color:'secondary', quantity:'26', price:'$1,234',  class1:'table-secondary',class2:'bg-secondary text-white',name:'Rita Book'},
    {id:4, text:'Success', color:'success', quantity:'42', price:'$2,623',  class1:'table-success',class2:'bg-success text-white',name:'Anne Teak'},
    {id:5, text:'Danger', color:'danger', quantity:'52', price:'$32,132',  class1:'table-danger',class2:'bg-danger text-white',name:'Dee End'},
    {id:6, text:'Warning', color:'warning', quantity:'10', price:'$1,434',  class1:'table-warning',class2:'bg-warning text-white',name:'Lee Nonmi'},
    {id:7, text:'Info', color:'info', quantity:'63', price:'$1,854',  class1:'table-info',class2:'bg-info text-white',name:'Lynne Gwistic'},
    {id:8, text:'Light', color:'light', quantity:'05', price:'$823',  class1:'table-light',class2:'bg-light text-dark',name:'Fran Tick'},
    {id:9, text:'Dark', color:'dark', quantity:'35', price:'$1,832',  class1:'table-dark',class2:'bg-black text-white',name:'Polly Pipe'}
];`
export const reacttabledata29 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full">
<thead><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">Color</th>
<th scope="col" className="text-start">Client</th>
<th scope="col" className="text-start">State</th>
<th scope="col" className="text-start">Quantity</th>
<th scope="col" className="text-start">Total Price</th>
</tr></thead><tbody>{Colortables.map((idx) => 
    (<tr key={idx.id} className={&#96;&#36;{idx.class1} 
    border-b border-defaultborder&#96;}><th scope="row">{idx.text}</th>
    <td>{idx.name}</td><td><span bg={idx.color} 
    className={&#96;badge &#36;{idx.class2}&#96;}>Processed</span>
    </td><td>{idx.quantity}</td><td>{idx.price}</td></tr>))}
    </tbody>
    </table>
</div>
// End Prism Code//`;
export const reusetabledata29 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
      <Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap min-w-full" header={[{headerClassname:'text-start', title: 'Color' }, {headerClassname:'headerClassname', title: 'Client' }, { headerClassname:'headerClassname',title: 'State' }, {headerClassname:'headerClassname', title: 'Quantity' }, {headerClassname:'headerClassname', title: 'Total Price' }]}>
              {Colortables.map((idx) => (
                  <tr key={idx.id} className={&#96;&#36;{idx.class1} border-b border-defaultborder&#96;}>
                      <th scope="row">{idx.text}</th>
                      <td>{idx.name}</td>
                      <td><span 
                        className={&#96;badge &#36;{idx.class2}&#96;}>Processed</span></td>
                      <td>{idx.quantity}</td>
                      <td>{idx.price}</td>
                  </tr>
              ))}
      </Spktables>
  </div>
// End Prism Code//`;

export const reacttabledata30 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap table-striped table-bordered min-w-full">
<thead>
  <tr className="border-b border-defaultborder">
      <th scope="col" className="text-start">#</th>
      <th scope="col" className="text-start">First</th>
      <th scope="col" className="text-start">Last</th>
      <th scope="col" className="text-start">Handle</th>
  </tr>
 </thead>
 <tbody>
      <tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr className="border-b border-defaultborder">
      <td colSpan="4">
       className="table whitespace-nowrap mb-0 min-w-full">
      <thead>
      <tr className="border-b border-defaultborder">
      <th scope="col" className="text-start">Alphabets</th>
      <th scope="col" className="text-start">Users</th>
      <th scope="col" className="text-start">Email</th>
      </tr>
      </thead>
      <tbody>
      <tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">A</th>
      <td>Dino King</td><td>dinoking231@gmail.com</td>
      </tr><tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">B</th>
      <td>Poppins sams</td><td>pops@gmail.com</td>
      </tr>
      <tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">C</th>
      <td>Brian Shaw</td><td>swanbrian@gmail.com</td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      <tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">3</th>
      <td>Larry</td><td>the Bird</td><td>@twitter</td>
      </tr><tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">4</th><td>
      Jimmy</td><td>the Ostrich</td><td>Dummy Text</td>
      </tr><tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">5</th>
      <td>Cobra Kai</td><td>the Snake</td><td>Another Name</td>
      </tr>
 </tbody>
 </table>
</div>
// End Prism Code//`;
export const reusetabledata30 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="table-responsive">
<Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap table-striped table-bordered min-w-full" header={[{ headerClassname:'text-start', title: '#' }, {headerClassname:'text-start', title: 'First' }, {headerClassname:'text-start', title: 'Last' }, { headerClassname:'text-start',title: 'Handle' }]}>
<tr className="border-b border-defaultborder">
    <th scope="row" className="text-start">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
</tr>
<tr className="border-b border-defaultborder">
    <td colSpan={4}>
        <Spktables tableClass="table whitespace-nowrap mb-0 min-w-full" tableRowclass="border-b border-defaultborder"
        header={[{ headerClassname:'text-start', title: 'Alphabets' }, {headerClassname:'text-start', title: 'Users' }, {headerClassname:'text-start', title: 'Email' }]}>
                <tr className="border-b border-defaultborder">
                    <th scope="row" className="text-start">A</th>
                    <td>Dino King</td>
                    <td>dinoking231@gmail.com</td>
                </tr>
                <tr className="border-b border-defaultborder">
                    <th scope="row" className="text-start">B</th>
                    <td>Poppins sams</td>
                    <td>pops@gmail.com</td>
                </tr>
                <tr className="border-b border-defaultborder">
                    <th scope="row" className="text-start">C</th>
                    <td>Brian Shaw</td>
                    <td>swanbrian@gmail.com</td>
                </tr>
        </Spktables>
    </td>
</tr>
<tr className="border-b border-defaultborder">
    <th scope="row" className="text-start">3</th>
    <td>Larry</td>
    <td>the Bird</td>
    <td>@twitter</td>
</tr>
<tr className="border-b border-defaultborder">
    <th scope="row" className="text-start">4</th>
    <td>Jimmy</td>
    <td>the Ostrich</td>
    <td>Dummy Text</td>
</tr>
<tr className="border-b border-defaultborder">
    <th scope="row" className="text-start">5</th>
    <td>Cobra Kai</td>
    <td>the Snake</td>
    <td>Another Name</td>
</tr>
</Spktables>
</div>
// End Prism Code//`;

export const datatable31 = `export const Responsivedata = [
    { id: 1, src: face3, name: "Mayor Kelly", category: "Manufacturer", role: "Team Lead", color: "primary", team: Avatar, progress: 52, revenue: "$10,984.29", mail: "mayorkrlly@gmail.com" },
    { id: 2, src:face12, name: "Andrew Garfield", category: "Managing Director", role: "Director", color: "warning", team: Avatar1, progress: 91, revenue: "$1.4billion", mail: "andrewgarfield@gmail.com" },
    { id: 3, src:face14, name: "Simon Cowel", category: "Service Manager", role: "Manager", color: "success", team: Avatar2, progress: 45, revenue: "$7,123.21", mail: "simoncowel234@gmail.com" },
    { id: 4, src:face5, name: "Mirinda Hers", category: "Recruiter", role: "Employee", color: "danger", team: Avatar3, progress: 21, revenue: "$2,325.45", mail: "mirindahers@gmail.com" },
]`
export const reacttabledata31 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table whitespace-nowrap min-w-full">
<thead>
  <tr className="border-b border-defaultborder">
    <th scope="col"><input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></th>
    <th scope="col" className="text-start">Team Head</th>
    <th scope="col" className="text-start">Category</th>
    <th scope="col" className="text-start">Role</th>
    <th scope="col" className="text-start">Gmail</th>
    <th scope="col" className="text-start">Team</th>
    <th scope="col" className="text-start">Work Progress</th>
    <th scope="col" className="text-start">Revenue</th>
    <th scope="col" className="text-start">Action</th>
</tr>
</thead>
<tbody>
      <tr className="border-b border-defaultborder">
        <th scope="row">
            <input className="form-check-input" type="checkbox" id="checkboxNoLabel1" value="" aria-label="..." />
            </th>
            <td><div className="flex items-center">
            <span className="avatar avatar-xs me-2 online avatar-rounded">
            <Image fill src={face3}alt="img" /></span>
            Mayor Kelly</div></td><td>Manufacturer</td>
            <td>
            <span className="badge bg-primary/10 text-primary">Team Lead</span></td>
            <td>mayorkrlly@gmail.com</td>
            <td><div className="avatar-list-stacked">
            <span className="avatar avatar-sm avatar-rounded">
            <Image fill src={face2} alt="img" />
            </span><span className="avatar avatar-sm avatar-rounded">
            <Image fill src={face8} alt="img" />
            </span><span className="avatar avatar-sm avatar-rounded">
            <Image fill src={face2} alt="img" />
            </span>
            <Link className="avatar avatar-sm bg-primary text-white 
            avatar-rounded" href="#">+4</Link></div></td>
            <td>
            <div className="progress progress-xs">
            <div className="progress-bar bg-primary
            w-[52%]" aria-valuenow="52" aria-valuemin="0"
            aria-valuemax="100">
            </div>
            </div>
            </td>
            <td>&#36;10,984.29</td>
            <td><div className="hstack flex gap-3 text-[.9375rem]">
            <Link aria-label="anchor" href="#" className="ti-btn 
            ti-btn-icon ti-btn-sm ti-btn-success-full">
            <i className="ri-download-2-line"></i></Link>
            <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon
            ti-btn-sm ti-btn-info-full"><i className="ri-edit-line"></i></Link>
            </div>
            </td>
      </tr>
      <tr className="border-b border-defaultborder">
      <th scope="row"><input className="form-check-input"
      type="checkbox"  value="" aria-label="..." />
      </th>
      <td><div className="flex items-center">
      <span className="avatar avatar-xs me-2 online avatar-rounded">
      <Image fill src={face12} alt="img" />
      </span>Andrew Garfield</div></td><td>Managing Director</td>
      <td><span className="badge bg-warning/10 text-warning">
      Director</span></td><td>andrewgarfield@gmail.com</td>
      <td>
      <div className="avatar-list-stacked">
      <span className="avatar avatar-sm avatar-rounded">
      <Image fill src={face1} alt="img" />
      </span>
      <span className="avatar avatar-sm avatar-rounded">
      <Image fill src={face5} alt="img" />
      </span>
      <span className="avatar avatar-sm avatar-rounded">
      <Image fill src={face11} alt="img" />
      </span>
      <span className="avatar avatar-sm avatar-rounded">
      <Image fill src={face15} alt="img" />
      </span>
      <Link className="avatar avatar-sm bg-primary 
      text-white avatar-rounded" href="#">+4</Link>
      </div>
      </td>
      <td>
      <div className="progress progress-xs">
      <div className="progress-bar bg-primary w-[91%]"
      aria-valuenow="91" aria-valuemin="0" aria-valuemax="100">
      </div>
      </div>
      </td>
      <td>&#36;1.4billion</td>
      <td><div className="hstack flex gap-3 text-[.9375rem]">
      <Link aria-label="anchor" href="#" 
      className="ti-btn ti-btn-icon ti-btn-sm ti-btn-success-full">
      <i className="ri-download-2-line"></i>
      </Link>
      <Link aria-label="anchor" href="#" className="ti-btn 
      ti-btn-icon ti-btn-sm ti-btn-info-full">
      <i className="ri-edit-line"></i></Link>
      </div>
      </td>
      </tr>
      <tr className="border-b border-defaultborder">
      <th scope="row"><input className="form-check-input" 
      type="checkbox" id="checkboxNoLabel3" value="" aria-label="..." /></th>
      <td>
      <div className="flex items-center">
      <span className="avatar avatar-xs me-2 online avatar-rounded">
      <Image fill src={face14} alt="img" />
      </span>Simon Cowel</div></td><td>Service Manager</td>
      <td>
      <span className="badge bg-success/10 text-success">
      Manager</span>
      </td>
      <td>simoncowel234@gmail.com</td>
      <td><div className="avatar-list-stacked">
      <span className="avatar avatar-sm avatar-rounded">
      <Image fill src={face6} alt="img" />
      </span><span className="avatar avatar-sm avatar-rounded">
      <Image fill src={face16} alt="img" />
      </span>
      <Link className="avatar avatar-sm bg-primary text-white
      avatar-rounded" href="#">+10</Link>
      </div>
      </td>
      <td><div className="progress progress-xs">
      <div className="progress-bar bg-primary w-[45%]"
      aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
      </div></div></td><td>&#36;7,123.21</td>
      <td><div className="hstack flex gap-3 text-[.9375rem]">
      <Link aria-label="anchor" href="#" 
      className="ti-btn ti-btn-icon ti-btn-sm ti-btn-success-full">
      <i className="ri-download-2-line"></i></Link>
      <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon 
      ti-btn-sm ti-btn-info-full"><i className="ri-edit-line"></i></Link>
      </div></td></tr><tr className="border-b border-defaultborder">
      <th scope="row"><input className="form-check-input" type="checkbox"
      id="checkboxNoLabel13" value="" aria-label="..." /></th>
      <td><div className="flex items-center"><span className="avatar avatar-xs me-2 
        online avatar-rounded"><Image fill src={face5} alt="img" />
        </span>Mirinda Hers</div></td><td>Recruiter</td><td>
        <span className="badge bg-danger/10 text-danger">Employee</span></td>
        <td>mirindahers@gmail.com</td><td><div className="avatar-list-stacked">
        <span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face3}alt="img" />
        </span><span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face10}alt="img" />
        </span><span className="avatar avatar-sm avatar-rounded">
        <Image fill src={face14} alt="img" /></span>
        <Link className="avatar avatar-sm bg-primary text-white avatar-rounded"
        href="#">+6
        </Link>
        </div>
        </td>
        <td>
        <div className="progress progress-xs">
        <div className="progress-bar bg-primary w-[21%]" aria-valuenow="21" 
        aria-valuemin="0" aria-valuemax="100"></div></div></td><td>&#36;2,325.45
        </td><td><div className="hstack flex gap-3 text-[.9375rem]">
        <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon ti-btn-sm 
        ti-btn-success-full"><i className="ri-download-2-line"></i></Link>
        <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon ti-btn-sm
          ti-btn-info-full"><i className="ri-edit-line"></i>
          </Link>
          </div>
          </td>
          </tr>
    </tbody>
    </table>
</div>
// End Prism Code//`;
export const reusetabledata31 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="table-responsive">
  <Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap min-w-full" showCheckbox={true} header={[{ title: 'Team Head' }, { title: 'Category' }, { title: 'Role' }, {headerClassname:"text-start", title: 'Gmail' }, {headerClassname:"text-start", title: 'Team' }, {headerClassname:"text-start", title: 'Work Progress' }, {headerClassname:"text-start", title: 'Revenue' }, {headerClassname:"text-start", title: 'Action' }]}>
  {Responsivedata.map((idx) => (
      <tr className="border-b border-defaultborder" key={idx.id}>
          <th scope="row"><input className="form-check-input" type="checkbox" id="checkboxNoLabel1" defaultValue="" aria-label="..." /></th>
          <td>
              <div className="flex items-center">
                  <span className="avatar avatar-xs me-2 online avatar-rounded">
                      <Image fill src={idx.src} alt="img" />
                  </span>{idx.name}
              </div>
          </td>
          <td>{idx.category}</td>
          <td><span className="badge bg-primary/10 text-primary">{idx.role}</span></td>
          <td>{idx.mail}</td>
          <td>
              {idx.team}
          </td>
          <td>
              <div className="progress progress-xs">
                  <div className={&#96;progress-bar bg-primary w-[&#36;{idx.progress}%]&#96;} role="progressbar" aria-valuenow={52} aria-valuemin={0} aria-valuemax={100}>
                  </div>
              </div>
          </td>
          <td>{idx.revenue}</td>
          <td>
              <div className="hstack flex gap-3 text-[.9375rem]">
                  <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-success-full"><i className="ri-download-2-line"></i></Link>
                  <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-info-full"><i className="ri-edit-line"></i></Link>
              </div>
          </td>
      </tr>
  ))}
  </Spktables>
</div>
// End Prism Code//`;
export const datatable32 = `interface table10 {
    id: number
    text1: string
    text2: string
    text3: string
    text4: string
    class1: string
    class2: string
    code1: string
    code2: string
}

export const Table12data: table10[] = [
    { id: 1, text1: "This cell inherits", text2: " from the table", text3: "This cell inherits ", text4: "from the table", class1: "border-b border-defaultborder", class2: "", code1: "vertical-align: middle;", code2: "vertical-align: middle;" },
    { id: 2, text1: "This cell inherits", text2: "from the table row", text3: "This cell inherits ", text4: "from the table row", class1: "align-bottom border-b border-defaultborder", class2: "", code1: "vertical-align: bottom;", code2: "vertical-align: bottom;" },
    { id: 3, text1: "This cell inherits", text2: " from the table", text3: "This cell is aligned to the top.", text4: "", class1: "", class2: "border-b border-defaultborder align-top", code1: "vertical-align: middle;", code2: "" },

];`
export const reacttabledata32 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
 className="table align-middle min-w-full">
<thead>
    <tr className="border-b border-defaultborder">
    <th scope="col" className="w-[25%] text-start">Heading 1</th>
    <th scope="col" className="w-[25%] text-start">Heading 2</th>
    <th scope="col" className="w-[25%] text-start">Heading 3</th>
    <th scope="col" className="w-[25%] text-start">Heading 4</th>
    </tr>
</thead>
   <tbody>
      <tr className="border-b border-defaultborder">
      <td>This cell inherits <code>vertical-align: middle;</code> fromthetable</td>
      <td>This cell inherits <code>vertical-align: middle;</code> fromthetable</td>
      <td>This cell inherits <code>vertical-align: middle;</code> fromthetable</td>
      <td>This here is some placeholder text, intended to take upquite abit of 
      vertical space, to demonstrate how the verticalalignmentworks in the preceding
      cells.</td></tr><tr className="align-bottom border-b border-defaultborder">
      <td>This cell inherits <code>vertical-align: bottom;</code> 
      fromthetable row</td><td>This cell inherits <code>vertical-align: 
      bottom;</code> fromthetable row</td><td>This cell inherits <code>
      vertical-align: bottom;</code> fromthetable row</td><td>This here is some placeholder 
      text, intended to take upquite abit of vertical space, to demonstrate how the 
      verticalalignmentworks in the preceding cells.</td></tr><tr className="border-b
        border-defaultborder"><td>This cell inherits <code>vertical-align: middle;</code>
      fromthetable</td><td>This cell inherits <code>vertical-align: middle;</code>
      fromthetable</td><td className="align-top">This cell is aligned to the top.
      </td>
      <td>This here is some placeholder text, intended to take upquite abit of vertical space,
      to demonstrate how the verticalalignmentworks in the preceding cells.</td>
      </tr>
   </tbody>
 </table>
</div>
// End Prism Code//`;
export const reusetabledata32 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="table-responsive">
  <Spktables tableRowclass='border-b border-defaultborder' tableClass="table align-middle min-w-full" header={[{ title: 'Heading 1' }, { title: 'Heading 2' }, { title: 'Heading 3' }, { title: 'Heading 4' }]}>
      {Table12data.map((idx) => (
          <tr key={idx.id} className={idx.class1}>
              <td>{idx.text1} <code>{idx.code1}</code> {idx.text2}</td>
              <td>{idx.text1} <code>{idx.code1}</code> {idx.text2}</td>
              <td className={idx.class2}>{idx.text3} <code>{idx.code2}</code> {idx.text4}</td>
              <td>This here is some placeholder text, intended to take up
                  quite a
                  bit of vertical space, to demonstrate how the vertical
                  alignment
                  works in the preceding cells.</td>
          </tr>
      ))}
  </Spktables>
</div>
// End Prism Code//`;
