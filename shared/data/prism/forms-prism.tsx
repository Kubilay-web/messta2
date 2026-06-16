export const input1 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <input className="form-control form-control-sm mb-3" type="text"
    placeholder=".form-control-sm" aria-label=".form-control-sm example"/>
<input className="form-control mb-3" type="text" placeholder="Default input"
    aria-label="default input example"/>
<input className="form-control form-control-lg" type="text" placeholder=".form-control-lg"
    aria-label=".form-control-lg example"/>
// End Prism Code//`;

export const input2 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    {/* <!-- <p className="mb-2 text-muted"></p> --> */}
    <label htmlFor="input-label" className="ti-form-label">Basic Input:</label>
    <input type="text" className="form-control" id="input"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-label" className="ti-form-label">Form Input With Label</label>
    <input type="text" className="form-control" id="input-label"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-placeholder" className="ti-form-label">Form Input With
        Placeholder</label>
    <input type="text" className="form-control" id="input-placeholder"
        placeholder="Placeholder"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-text" className="ti-form-label">Type Text</label>
    <input type="text" className="form-control" id="input-text" placeholder="Text"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-number" className="ti-form-label">Type Number</label>
    <input type="number" className="form-control" id="input-number"
        placeholder="Number"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-password" className="ti-form-label">Type Password</label>
    <input type="password" className="form-control" id="input-password"
        placeholder="Password"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-email" className="ti-form-label">Type Email</label>
    <input type="email" className="form-control" id="input-email"
        placeholder="Email@xyz.com"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-tel" className="ti-form-label">Type Tel</label>
    <input type="tel" className="form-control" id="input-tel"
        placeholder="+1100-2031-1233"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-date" className="ti-form-label">Type Date</label>
    <input type="date" className="form-control" id="input-date"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-week" className="ti-form-label">Type Week</label>
    <input type="week" className="form-control" id="input-week"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-month" className="ti-form-label">Type Month</label>
    <input type="month" className="form-control" id="input-month"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-time" className="ti-form-label">Type Time</label>
    <input type="time" className="form-control" id="input-time"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-datetime-local" className="ti-form-label">Type datetime-local</label>
    <input type="datetime-local" className="form-control" id="input-datetime-local"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-search" className="ti-form-label">Type Search</label>
    <input type="search" className="form-control" id="input-search"
        placeholder="Search"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-submit" className="ti-form-label">Type Submit</label>
    <input type="submit" className="form-control ti-btn !py-3" id="input-submit"
        value="Submit"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-reset" className="ti-form-label">Type Reset</label>
    <input type="reset" className="form-control ti-btn !py-3" id="input-reset"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-button" className="ti-form-label">Type Button</label>
    <input type="button" className="ti-btn !text-white !bg-primary !w-full"
        id="input-button" value="Button"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <div className="grid grid-cols-12 gap-6">
        <div className="xl:col-span-3 col-span-12 flex flex-col ">
            <label className="ti-form-label">Type Color</label>
            <input className="form-input-color !rounded-md" type="color"
                value="#136bd0"/>
        </div>
        <div className="xl:col-span-5 col-span-12">
            <div className="form-check">
                <p className="mb-3 px-0 text-muted">Type Checkbox</p>
                <input className="form-check-input ms-2" type="checkbox" value=""
                    defaultChecked/>
            </div>
        </div>
        <div className="xl:col-span-4 col-span-12">
            <div className="form-check">
                <p className="mb-4 px-0 text-muted">Type Radio</p>
                <input className="form-check-input ms-2" type="radio" defaultChecked/>
            </div>
        </div>
    </div>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <div>
        <label htmlFor="file-input"  className="ti-form-label">Type file</label>
        <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10
                file:border-0
            file:bg-gray-200 file:me-4
            file:py-2 file:px-4
            dark:file:bg-black/20 dark:file:text-white/50"/>
    </div>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label className="ti-form-label">Type Url</label>
    <input className="form-control" type="url" name="website"
        placeholder="http://example.com"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-disabled" className="ti-form-label">Type Disabled</label>
    <input type="text" id="input-disabled" className="form-control"
        placeholder="Disabled input" disabled/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-readonlytext" className="ti-form-label">Input Readonly Text</label>
    <input type="text" readOnly className="form-control-plaintext form-control"
        id="input-readonlytext" value="email@example.com"/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="disabled-readonlytext" className="ti-form-label">Disabled Readonly
        Input</label>
    <input className="form-control" type="text" value="Disabled readonly input"
        id="disabled-readonlytext" aria-label="Disabled input example" disabled
        readOnly/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label className="ti-form-label">Type Readonly Input</label>
    <input className="form-control" type="text" value="Readonly input here..."
        aria-label="readonly input example" readOnly/>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="text-area" className="ti-form-label">Textarea</label>
    <textarea className="form-control" id="text-area" rows={1}></textarea>
</div>
<div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label htmlFor="input-DataList" className="ti-form-label">Datalist example</label>
    <input className="form-control" type="text" list="datalistOptions"
        id="input-DataList" placeholder="Type to search..."/>
    <datalist id="datalistOptions">
        <option value="San Francisco">
        </option>
        <option value="New York">
        </option>
        <option value="Seattle">
        </option>
        <option value="Los Angeles">
        </option>
        <option value="Chicago">
        </option>
    </datalist>
</div>
</div>
// End Prism Code//`;

export const input3 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="grid grid-cols-12 gap-y-3">
<div className="xl:col-span-12 col-span-12 col-span-12">
    <label htmlFor="input-noradius" className="ti-form-label">Input With No Radius</label>
    <input type="text" className="form-control !rounded-none" id="input-noradius"
        placeholder="No Radius"/>
</div>
<div className="xl:col-span-12 col-span-12 col-span-12">
    <label htmlFor="input-rounded" className="ti-form-label">Input With Radius</label>
    <input type="text" className="form-control" id="input-rounded"
        placeholder="Default Radius"/>
</div>
<div className="xl:col-span-12 col-span-12 col-span-12">
    <label htmlFor="input-rounded-pill" className="ti-form-label">Rounded Input</label>
    <input type="text" className="form-control !rounded-full" id="input-rounded-pill"
        placeholder="Rounded"/>
</div>
</div>
// End Prism Code//`;

export const input4 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="grid grid-cols-12 gap-y-3">
<div className="xl:col-span-12 col-span-12 col-span-12">
    <label htmlFor="input-rounded1" className="ti-form-label">Default</label>
    <input type="text" className="form-control" id="input-rounded1"
        placeholder="Default"/>
</div>
<div className="xl:col-span-12 col-span-12 col-span-12">
    <label htmlFor="input-rounded2" className="ti-form-label">Dotted Input</label>
    <input type="text" className="form-control border border-defaultborder dark:border-defaultborder/10 border-dotted" id="input-rounded2"
        placeholder="Dotted"/>
</div>
<div className="xl:col-span-12 col-span-12 col-span-12">
    <label htmlFor="input-rounded3" className="ti-form-label">Dashed Input</label>
    <input type="text" className="form-control border border-defaultborder dark:border-defaultborder/10 border-dashed" id="input-rounded3"
        placeholder="Dashed"/>
</div>
</div>

// End Prism Code//`;

export const input5 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <form>
<fieldset disabled>
<legend className="text-2xl">Disabled fieldset example</legend>
<div className="mb-3">
    <label htmlFor="disabledTextInput" className="ti-form-label">Disabled
        input</label>
    <input type="text" id="disabledTextInput" className="form-control !bg-light !opacity-100"
        placeholder="Disabled input"/>
</div>
<div className="mb-3">
    <label htmlFor="disabledSelect" className="ti-form-label">Disabled select
        menu</label>
    <select id="disabledSelect" className="form-select !opacity-100">
        <option>Disabled select</option>
    </select>
</div>
<div className="mb-3">
    <div className="form-check !ps-0">
        <input className="form-check-input" type="checkbox"
            id="disabledFieldsetCheck" disabled/>
        <label className="form-check-label ps-2" htmlFor="disabledFieldsetCheck">
            Can't check this
        </label>
    </div>
</div>
<SpkButton buttontype="submit" variant="primary"
    customClass="ti-btn opacity-[0.6]">Submit</SpkButton>
</fieldset>
</form>
// End Prism Code//`

export const input6 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <form>
<div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="ti-form-label">Email
        address</label>
    <input type="email" className="form-control" id="exampleInputEmail1"
        aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll
        never share your email
        with
        anyone else.</div>
</div>
<div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="ti-form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
</div>
<div className="mb-3 form-check !ps-0">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label ps-2" htmlFor="exampleCheck1">Check
        me out</label>
</div>
<SpkButton  buttontype="submit" variant="primary" customClass="ti-btn">Submit</SpkButton>
</form>
// End Prism Code//`

export const input7 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <label htmlFor="inputPassword5" className="ti-form-label">Password</label>
<input type="password" id="inputPassword5" className="form-control"
    aria-describedby="passwordHelpBlock"/>
<div id="passwordHelpBlock" className="form-text">
    Your password must be 8-20 characters long, contain letters and
    numbers,
    and
    must not contain spaces, special characters, or emoji.
</div>
// End Prism Code//`


export const input8 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="flex flex-wrap gap-4 items-center">
    <div className="">
        <label htmlFor="inputPassword6" className="form-label">Password</label>
    </div>
    <div className="">
        <input type="password" id="inputPassword6" className="form-control"
            aria-describedby="passwordHelpInline"/>
    </div>
    <div className="">
        <span id="passwordHelpInline" className="form-text">
            Must be 8-20 characters long.
        </span>
    </div>
</div>

// End Prism Code//`


//Checks & Radios

export const radio1 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="form-check flex items-center gap-2">
    <input className="form-check-input" type="radio" name="flexRadioDefault"
        id="flexRadioDefault1"/>
    <label className="form-check-label" htmlFor="flexRadioDefault1">
        Default radio
    </label>
</div>
<div className="form-check flex items-center gap-2">
    <input className="form-check-input" type="radio" name="flexRadioDefault"
        id="flexRadioDefault2" defaultChecked/>
    <label className="form-check-label" htmlFor="flexRadioDefault2">
        Default checked radio
    </label>
</div>
// End Prism Code//`

export const radio2 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
    <div className="form-check flex items-center gap-2">
    <input className="form-check-input" type="radio" name="flexRadioDisabled"
        id="flexRadioDisabled" disabled/>
    <label className="form-check-label" htmlFor="flexRadioDisabled">
        Disabled radio
    </label>
</div>
<div className="form-check flex items-center gap-2">
    <input className="form-check-input opacity-[0.6]" type="radio" name="flexRadioDisabled"
        id="flexRadioCheckedDisabled" defaultChecked disabled/>
    <label className="form-check-label" htmlFor="flexRadioCheckedDisabled">
        Disabled checked radio
    </label>
</div>
// End Prism Code//`

export const radio3 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="form-check flex items-center gap-2">
    <input className="form-check-input" type="radio" name="Radio" id="Radio-sm"/>
    <label className="form-check-label" htmlFor="Radio-sm">
        default
    </label>
</div>  
<div className="form-check flex items-center gap-2 form-check-md">
    <input className="form-check-input" type="radio" name="Radio" id="Radio-md"/>
    <label className="form-check-label" htmlFor="Radio-md">
        Medium
    </label>
</div>
<div className="form-check flex items-center gap-2 form-check-lg">
    <input className="form-check-input" type="radio" name="Radio" id="Radio-lg" defaultChecked/>
    <label className="form-check-label" htmlFor="Radio-lg">
        Large
    </label>
</div>
// End Prism Code//`

export const radio4 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="form-check flex items-center gap-2">
    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
    <label className="form-check-label" htmlFor="flexCheckDefault">
        Default checkbox
    </label>
</div>
<div className="form-check flex items-center gap-2">
    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"
        defaultChecked/>
    <label className="form-check-label" htmlFor="flexCheckChecked">
        Checked checkbox
    </label>
</div>
// End Prism Code//`

export const radio5 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="form-check flex items-center gap-2">
    <input className="form-check-input" type="checkbox" value="" id="flexCheckDisabled"
        disabled/>
    <label className="form-check-label" htmlFor="flexCheckDisabled">
        Disabled checkbox
    </label>
</div>
<div className="form-check flex items-center gap-2">
    <input className="form-check-input opacity-[0.6]" type="checkbox" value=""
        id="flexCheckCheckedDisabled" defaultChecked disabled/>
    <label className="form-check-label" htmlFor="flexCheckCheckedDisabled">
        Disabled checked checkbox
    </label>
</div>
// End Prism Code//`

export const radio6 =`<div className="form-check form-switch">
<div className="form-check flex items-center gap-2">
    <input className="form-check-input" type="checkbox" value="" id="checkebox-sm" defaultChecked/>
    <label className="form-check-label" htmlFor="checkebox-sm">
        Default
    </label>
</div>
<div className="form-check  form-check-md flex items-center gap-2">
    <input className="form-check-input" type="checkbox" value="" id="checkebox-md" defaultChecked/>
    <label className="form-check-label" htmlFor="checkebox-md">
        Medium
    </label>
</div>
<div className="form-check form-check-lg flex items-center gap-2">
    <input className="form-check-input" type="checkbox" value="" id="checkebox-lg" defaultChecked/>
    <label className="form-check-label" htmlFor="checkebox-lg">
        Large
    </label>
</div>
// End Prism Code//`;

export const radio7 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="form-check flex items-center gap-2">
<input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
<label className="form-check-label" htmlFor="defaultCheck1">
    Default checkbox
</label>
</div>
<div className="form-check flex items-center gap-2">
<input className="form-check-input" type="checkbox" value="" id="defaultCheck2"
    disabled/>
<label className="form-check-label" htmlFor="defaultCheck2">
    Disabled checkbox
</label>
</div>
<div className="form-check flex items-center gap-2">
<input className="form-check-input" type="radio" name="exampleRadios"
    id="exampleRadios1" value="option1" defaultChecked/>
<label className="form-check-label" htmlFor="exampleRadios1">
    Default radio
</label>
</div>
<div className="form-check mb-0">
<input className="form-check-input" type="radio" name="exampleRadios"
    id="exampleRadios3" value="option3" disabled/>
<label className="form-check-label" htmlFor="exampleRadios3">
    Disabled radio
</label>
</div>
// End Prism Code//`

export const radio8 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="flex items-center">
<input type="checkbox" id="hs-basic-with-description-checked" className="ti-switch" defaultChecked/>
<label htmlFor="hs-basic-with-description-checked" className="text-sm text-gray-500 ltr:ml-3 rtl:mr-3 dark:text-white/70">Checked</label>
</div>
<div className="flex items-center">
<input type="checkbox" id="hs-basic-with-description-unchecked" className="ti-switch"/>
<label htmlFor="hs-basic-with-description-unchecked" className="text-sm text-gray-500 ltr:ml-3 rtl:mr-3 dark:text-white/70">Unchecked</label>
</div>
<div className="flex items-center">
<label className="text-sm text-gray-500 ltr:mr-3 rtl:ml-3 dark:text-white/70">On</label>
<input type="checkbox" id="hs-basic-with-description" className="ti-switch"/>
<label className="text-sm text-gray-500 ltr:ml-3 rtl:mr-3 dark:text-white/70">Off</label>
</div>
// End Prism Code//`

export const radio9 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="flex gap-4"> 
    <div className="form-check form-check-inline flex items-center">
        <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
            value="option1"/>
        <label className="form-check-label" htmlFor="inlineCheckbox1">1</label>
    </div>
    <div className="form-check form-check-inline flex items-center">
        <input className="form-check-input" type="checkbox" id="inlineCheckbox2"
            value="option2"/>
        <label className="form-check-label" htmlFor="inlineCheckbox2">2</label>
    </div>
    <div className="form-check form-check-inline flex items-center">
        <input className="form-check-input" type="checkbox" id="inlineCheckbox3"
            value="option3" disabled/>
        <label className="form-check-label" htmlFor="inlineCheckbox3">3 (disabled)</label>
    </div>
</div>
<div className="flex gap-4">
    <div className="form-check form-check-inline flex items-center">
        <input className="form-check-input" type="radio" name="inlineRadioOptions"
            id="inlineRadio1" value="option1"/>
        <label className="form-check-label" htmlFor="inlineRadio1">1</label>
    </div>
    <div className="form-check form-check-inline flex items-center">
        <input className="form-check-input" type="radio" name="inlineRadioOptions"
            id="inlineRadio2" value="option2"/>
        <label className="form-check-label" htmlFor="inlineRadio2">2</label>
    </div>
    <div className="form-check form-check-inline flex items-center">
        <input className="form-check-input" type="radio" name="inlineRadioOptions"
            id="inlineRadio3" value="option3" disabled/>
        <label className="form-check-label" htmlFor="inlineRadio3">3 (disabled)</label>
    </div>
</div>
// End Prism Code//`

export const radio10 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="form-check form-check-reverse mb-4">
<input className="form-check-input" type="checkbox" value=""
    id="reverseCheck1"/>
<label className="form-check-label" htmlFor="reverseCheck1">
    Reverse checkbox
</label>
</div>
<div className="form-check form-check-reverse mb-4">
<input className="form-check-input" type="checkbox" value=""
    id="reverseCheck2" disabled/>
<label className="form-check-label" htmlFor="reverseCheck2">
    Disabled reverse checkbox
</label>
</div>
// End Prism Code//`

export const radio11 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="flex items-center flex-wrap mb-4">
    <div className=""> <p className="text-muted m-0">Small size toggle switch <code>toggle-sm</code></p></div>
    <div className={"toggle  toggle-sm mb-0 {primary2}"} onClick={() => { primary2 == "on" ? setprimary2("off") : setprimary2("on"); }}>
        <span></span>
    </div>
</div>
<div className="flex items-center flex-wrap mb-4">
    <div className=""> <p className="text-muted m-0">Default toggle switch <code></code></p></div>
    <div className={"toggle mb-0  toggle-secondary {secondary2}"} onClick={() => { secondary2 == "on" ? setsecondary2("off") : setsecondary2("on"); }}>
        <span></span>
    </div>
</div>
<div className="flex items-center flex-wrap">
    <div className=""> <p className="text-muted m-0">Large size toggle switch <code>toggle-lg</code></p></div>
    <div className={"toggle toggle-lg mb-0  toggle-success {success2}"} onClick={() => { success2 == "on" ? setsuccess2("off") : setsuccess2("on"); }} >
        <span></span>
    </div>
</div>
// End Prism Code//`

export const radio12 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="flex items-center flex-wrap mb-4">
    <div className=""><p className="text-muted m-0">Small size toggle switch <code>toggle-sm</code></p></div>
    <div className="custom-toggle-switch toggle-sm ms-2">
        <input id="size-sm" name="toggleswitchsize" type="checkbox" defaultChecked/>
        <label htmlFor="size-sm" className="label-primary sm:flex block sm:mt-0 mt-3"></label>
    </div>
</div>
<div className="flex items-center flex-wrap mb-4">
    <div className=""><p className="text-muted m-0">Default toggle switch</p></div>
    <div className="custom-toggle-switch toggle-md ms-2">
        <input id="size-default" name="toggleswitchsize" type="checkbox" defaultChecked/>
        <label htmlFor="size-default" className="label-secondary mb-1 sm:flex block sm:mt-0 mt-3"></label>
    </div>
</div>
<div className="flex items-center flex-wrap mb-4">
    <div className=""><p className="text-muted m-0">Large size toggle switch <code>toggle-lg</code></p></div>
    <div className="custom-toggle-switch toggle-lg ms-2 mb-3">
        <input id="size-lg" name="toggleswitchsize" type="checkbox" defaultChecked/>
        <label htmlFor="size-lg" className="label-success sm:flex block sm:mt-0 mt-3"></label>
    </div>
</div>
// End Prism Code//`

export const radio13 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="form-check mb-2">
    <input className="form-check-input" type="checkbox" value="" id="primaryChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="primaryChecked">
        Primary
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-secondary" type="checkbox" value="" id="secondaryChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="secondaryChecked">
        Secondary
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-warning" type="checkbox" value="" id="warningChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="warningChecked">
        Warning
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-info" type="checkbox" value="" id="infoChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="infoChecked">
        Info
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-success" type="checkbox" value="" id="successChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="successChecked">
        Success
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-danger" type="checkbox" value="" id="dangerChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="dangerChecked">
        Danger
    </label>
</div>
<div className="form-check mb-0">
    <input className="form-check-input form-checked-dark  dark:checked:!bg-white/50" type="checkbox" value="" id="darkChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="darkChecked">
        Dark
    </label>
</div>
// End Prism Code//`

export const radio14 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
    <div className="form-check mb-2">
    <input className="form-check-input form-checked-outline" type="checkbox" value="" id="primaryoutlineChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="primaryoutlineChecked">
        Primary
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-outline form-checked-secondary" type="checkbox" value="" id="secondaryoutlineChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="secondaryoutlineChecked">
        Secondary
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-outline form-checked-warning" type="checkbox" value="" id="warningoutlineChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="warningoutlineChecked">
        Warning
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-outline form-checked-info" type="checkbox" value="" id="infooutlineChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="infooutlineChecked">
        Info
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-outline form-checked-success" type="checkbox" value="" id="successoutlineChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="successoutlineChecked">
        Success
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-outline form-checked-danger" type="checkbox" value="" id="dangeroutlineChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="dangeroutlineChecked">
        Danger
    </label>
</div>
<div className="form-check mb-0">
    <input className="form-check-input form-checked-outline form-checked-dark" type="checkbox" value="" id="darkoutlineChecked" defaultChecked/>
    <label className="form-check-label" htmlFor="darkoutlineChecked">
        Dark
    </label>
</div>
// End Prism Code//`
export const radio15 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="form-check mb-2">
    <input className="form-check-input" type="radio" name="primaryRadio" id="primaryRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="primaryRadio">
        Primary
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-secondary" type="radio" name="secondaryRadio" id="secondaryRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="secondaryRadio">
        Secondary
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-warning" type="radio" name="warningRadio" id="warningRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="warningRadio">
        Warning
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-info" type="radio" name="InfoRadio" id="InfoRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="InfoRadio">
        Info
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-success" type="radio" name="successRadio" id="successRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="successRadio">
        Success
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-danger" type="radio" name="dangerRadio" id="dangerRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="dangerRadio">
        Danger
    </label>
</div>
<div className="form-check mb-0">
    <input className="form-check-input form-checked-dark dark:checked:!bg-white/50" type="radio" name="darkRadio" id="darkRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="darkRadio">
        Dark
    </label>
</div>
// End Prism Code//`
export const radio16 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="form-check mb-2">
    <input className="form-check-input form-checked-outline" type="radio" name="primaryoutlineRadio" id="primaryoutlineRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="primaryoutlineRadio">
        Primary
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-outline form-checked-secondary" type="radio" name="secondaryoutlineRadio" id="secondaryoutlineRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="secondaryoutlineRadio">
        Secondary
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-outline form-checked-warning" type="radio" name="warningoutlineRadio" id="warningoutlineRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="warningoutlineRadio">
        Warning
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-outline form-checked-info" type="radio" name="InfooutlineRadio" id="InfooutlineRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="InfooutlineRadio">
        Info
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-outline form-checked-success" type="radio" name="successoutlineRadio" id="successoutlineRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="successoutlineRadio">
        Success
    </label>
</div>
<div className="form-check mb-2">
    <input className="form-check-input form-checked-outline form-checked-danger" type="radio" name="dangeroutlineRadio" id="dangeroutlineRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="dangeroutlineRadio">
        Danger
    </label>
</div>
<div className="form-check mb-0">
    <input className="form-check-input form-checked-outline form-checked-dark" type="radio" name="darkoutlineRadio" id="darkoutlineRadio" defaultChecked/>
    <label className="form-check-label" htmlFor="darkoutlineRadio">
        Dark
    </label>
</div>
// End Prism Code//`
export const radio17 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="form-check form-switch mb-2">
    <input type="checkbox" id="hs-xs-solid-switch1" className="ti-switch ti-switch-custom" defaultChecked/>
    <label className="form-check-label" htmlFor="hs-xs-solid-switch1">Primary</label>
</div>
<div className="form-check form-switch mb-2">
    <input type="checkbox" id="hs-xs-solid-switch2" className="ti-switch ti-switch-custom secondary" defaultChecked/>
    <label className="form-check-label" htmlFor="hs-xs-solid-switch2">Secondary</label>
</div>
<div className="form-check form-switch mb-2">
    <input type="checkbox" id="hs-xs-solid-switch3" className="ti-switch ti-switch-custom warning" defaultChecked/>
    <label className="form-check-label" htmlFor="hs-xs-solid-switch3">Warning</label>
</div>
<div className="form-check form-switch mb-2">
    <input type="checkbox" id="hs-xs-solid-switch4" className="ti-switch ti-switch-custom info" defaultChecked/>
    <label className="form-check-label" htmlFor="hs-xs-solid-switch4">Info</label>
</div>
<div className="form-check form-switch mb-2">
    <input type="checkbox" id="hs-xs-solid-switch5" className="ti-switch ti-switch-custom success" defaultChecked/>
    <label className="form-check-label" htmlFor="hs-xs-solid-switch5">Success</label>
</div>
<div className="form-check form-switch mb-2">
    <input type="checkbox" id="hs-xs-solid-switch6" className="ti-switch ti-switch-custom danger" defaultChecked/>
    <label className="form-check-label" htmlFor="hs-xs-solid-switch6">Danger</label>
</div>
<div className="form-check form-switch mb-0">
    <input type="checkbox" id="hs-xs-solid-switch7" className="ti-switch ti-switch-custom dark " defaultChecked/>
    <label className="form-check-label" htmlFor="hs-xs-solid-switch7">Dark</label>
</div>
// End Prism Code//`
export const radio18 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="grid grid-cols-12 gap-y-1">
        <div className="xl:col-span-4 col-span-12">
                <div className={"toggle  {primary1}"} onClick={() => { primary1 == "on" ? setprimary1("off") : setprimary1("on"); }}>
                    <span></span>
                </div>
        </div>
        <div className="xl:col-span-4 col-span-12">
            <div className={"toggle mb-3  toggle-secondary {secondary1}"} onClick={() => { secondary1 == "on" ? setsecondary1("off") : setsecondary1("on"); }}>
                <span></span>
            </div>
        </div>
        <div className="xl:col-span-4 col-span-12">
            <div className={"toggle mb-3  toggle-warning {warning1}"} onClick={() => { warning1 == "on" ? setwarning1("off") : setwarning1("on"); }} >
                <span></span>
            </div>
        </div>
        <div className="xl:col-span-4 col-span-12">
            <div className={"toggle mb-3  toggle-info {info1}"} onClick={() => { info1 == "on" ? setinfo1("off") : setinfo1("on"); }} >
                <span></span>
            </div>
        </div>
        <div className="xl:col-span-4 col-span-12">
            <div className={"toggle mb-3  toggle-success {success1}"} onClick={() => { success1 == "on" ? setsuccess1("off") : setsuccess1("on"); }} >
                <span></span>
            </div>
        </div>
        <div className="xl:col-span-4 col-span-12">
            <div className={"toggle mb-3  toggle-danger {danger1}"} onClick={() => { danger1 == "on" ? setdanger1("off") : setdanger1("on"); }} >
                <span></span>
            </div>
        </div>
        <div className="xl:col-span-4 col-span-12">
            <div className={"toggle mb-3  toggle-light {light1}"} onClick={() => { light1 == "on" ? setlight1("off") : setlight1("on"); }} >
                <span></span>
            </div>
        </div>
        <div className="xl:col-span-4 col-span-12">
            <div className={"toggle ms-sm-2  toggle-dark {dark1}"} onClick={() => { dark1 == "on" ? setdark1("off") : setdark1("on"); }}>
                <span></span>
            </div>
        </div>
    </div>
// End Prism Code//`
export const radio19 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
    <div className="grid grid-cols-12 gap-y-1">
<div className="xl:col-span-4 col-span-12">
<div className="custom-toggle-switch flex items-center mb-4">
    <input id="toggleswitchPrimary" name="toggleswitch001" type="checkbox" defaultChecked/>
    <label htmlFor="toggleswitchPrimary" className="label-primary"></label><span className="ms-3">Primary</span>
</div>
</div>
<div className="xl:col-span-4 col-span-12">
<div className="custom-toggle-switch flex items-center mb-4">
    <input id="toggleswitchSecondary" name="toggleswitch001" type="checkbox" defaultChecked/>
    <label htmlFor="toggleswitchSecondary" className="label-secondary"></label><span className="ms-3">Secondary</span>
</div>
</div>
<div className="xl:col-span-4 col-span-12">
<div className="custom-toggle-switch flex items-center mb-4">
    <input id="toggleswitchWarning" name="toggleswitch001" type="checkbox" defaultChecked/>
    <label htmlFor="toggleswitchWarning" className="label-warning"></label><span className="ms-3">Warning</span>
</div>
</div>
<div className="xl:col-span-4 col-span-12">
<div className="custom-toggle-switch flex items-center mb-4">
    <input id="toggleswitchInfo" name="toggleswitch001" type="checkbox" defaultChecked/>
    <label htmlFor="toggleswitchInfo" className="label-info"></label><span className="ms-3">Info</span>
</div>
</div>
<div className="xl:col-span-4 col-span-12">
<div className="custom-toggle-switch flex items-center mb-4">
    <input id="toggleswitchSuccess" name="toggleswitch001" type="checkbox" defaultChecked/>
    <label htmlFor="toggleswitchSuccess" className="label-success"></label><span className="ms-3">Success</span>
</div>
</div>
<div className="xl:col-span-4 col-span-12">
<div className="custom-toggle-switch flex items-center mb-4">
    <input id="toggleswitchDanger" name="toggleswitch001" type="checkbox" defaultChecked/>
    <label htmlFor="toggleswitchDanger" className="label-danger"></label><span className="ms-3">Danger</span>
</div>
</div>
<div className="xl:col-span-4 col-span-12">
<div className="custom-toggle-switch flex items-center mb-4">
    <input id="toggleswitchLight" name="toggleswitch001" type="checkbox" defaultChecked/>
    <label htmlFor="toggleswitchLight" className="label-light"></label><span className="ms-3">Light</span>
</div>
</div>
<div className="xl:col-span-4 col-span-12">
<div className="custom-toggle-switch flex items-center mb-4">
    <input id="toggleswitchDark" name="toggleswitch001" type="checkbox" defaultChecked/>
    <label htmlFor="toggleswitchDark" className="label-dark"></label><span className="ms-3">Dark</span>
</div>
</div>
</div>
// End Prism Code//`


//Range Sliders

export const range1 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<input type="range" className="form-range" id="customRange1"/>
// End Prism Code//`

export const range2 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <input type="range" className="form-range" id="disabledRange" disabled/>
// End Prism Code//`

export const range3 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <input type="range" className="form-range" min="0" max="5" id="customRange2"/>
// End Prism Code//`

export const range4 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <input type="range" className="form-range" min="0" max="5" step="0.5" id="customRange3"/>
// End Prism Code//`;

//Color Picker

export const color1 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <input type="color" className="form-control form-control-color !border-0"
id="exampleColorInput" defaultValue="#136ad0" title="Choose your color"/>
// End Prism Code//`

export const tailwindpicker2 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <input type="color"
className="p-1 h-10 w-10 block bg-white dark:bg-bodybg  cursor-pointer rounded-sm 
disabled:opacity-50 disabled:pointer-events-none dark:bg-bgdark dark:border-white/10"
id="hs-color-input" defaultValue="#5a66f1" title="Choose your color"/>
// End Prism Code//`
export const picker3 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="col-span-12 xl:col-span-3 md:col-span-4">
    <SpkButton variant="primary" onclickfunc={toggleVisibility} customClass='ti-btn ti-btn-primary !bg-primary !text-white !py-1 !px-2 !text-[0.75rem] !m-0 !gap-0 !font-medium'>
        <i className="ri-palette-line"></i>
    </SpkButton>
    {isVisible && (
        <ColorPicker color={color} onChange={setColor} hideInput={["hex", "hsv"]} />
    )}
</div>
<div className="col-span-12 xl:col-span-6">
    <SpkButton variant="primary" customClass='pcr-button ti-btn ti-btn-primary !bg-primary !text-white !py-1 !px-2 !text-[0.75rem] !m-0 !gap-0 !font-medium' onclickfunc={() => setShowColorPicker(showColorPicker => !showColorPicker)}>{showColorPicker ? "Close Picker" : "Pick Color"}</SpkButton>
        {showColorPicker && (<ChromePicker disableAlpha={true} color={color2} onChange={(updatedColor: { hex: any; }) => setColor2(updatedColor.hex)} onChangeComplete={handleChangeComplete} />
    )}
</div>
// End Prism Code//`

// Form-Layouts

export const layout1 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="mb-4">
    <label htmlFor="form-text" className="ti-form-label !text-[.875rem] text-black">Enter name</label>
    <input type="text" className="form-control" id="form-text" placeholder=""/>
</div>
<div className="mb-4">
    <label htmlFor="form-password" className="ti-form-label text-[.875rem] text-black">Enter
        Password</label>
    <input type="password" className="form-control" id="form-password" placeholder=""/>
</div>
<div className="form-check mb-4">
    <input className="form-check-input" type="checkbox" defaultValue="" id="invalidCheck"
        required/>
    <label className="form-check-label" htmlFor="invalidCheck">
        Accept Policy
    </label>
</div>
<SpkButton variant="primary" customClass="ti-btn" buttontype="submit">Submit</SpkButton>
// End Prism Code//`

export const layout2 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <form>
<div className="grid grid-cols-12 mb-4">
    <label htmlFor="inputEmail3"
        className="sm:col-span-2 col-span-12 col-ti-form-label">Email</label>
    <div className="sm:col-span-10 col-span-12">
        <input type="email" className="form-control" id="inputEmail3"/>
    </div>
</div>
<div className="grid grid-cols-12 mb-4">
    <label htmlFor="inputPassword3"
        className="sm:col-span-2 col-span-12 col-ti-form-label">Password</label>
    <div className="sm:col-span-10 col-span-12">
        <input type="password" className="form-control" id="inputPassword3"/>
    </div>
</div>
<div className="grid grid-cols-12 mb-4">
    <div className=" sm:col-span-2 col-span-12 col-ti-form-label pt-0">Qualified</div>
    <div className="sm:col-span-10 col-span-12 ">
        <div className="form-check">
            <input className="form-check-input" type="radio"
                name="gridRadios" id="gridRadios1" defaultValue="option1"
                defaultChecked/>
            <label className="form-check-label" htmlFor="gridRadios1">
                Prelims
            </label>
        </div>
        <div className="form-check disabled">
            <input className="form-check-input" type="radio"
                name="gridRadios" id="gridRadios2" defaultValue="option3"
                disabled/>
            <label className="form-check-label" htmlFor="gridRadios2">
                Mains
            </label>
        </div>
        <div className="form-check">
            <input className="form-check-input" type="checkbox"
                id="gridCheck1"/>
            <label className="form-check-label" htmlFor="gridCheck1">
                Certified
            </label>
        </div>
    </div>
</div>
<SpkButton buttontype="submit" variant="primary" customClass="ti-btn">Sign in</SpkButton>
</form>
// End Prism Code//`

export const layout3 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="mb-4">
<label htmlFor="form-text1" className="ti-form-label text-[.875rem] text-black">Enter name</label>
<div className="input-group">
    <div className="input-group-text"><i className="ri-user-line"></i></div>
    <input type="text" className="form-control" id="form-text1" placeholder=""/>
</div>
</div>
<div className="mb-4">
<label htmlFor="form-password1" className="ti-form-label text-[.875rem] text-black">Enter
    Password</label>
<div className="input-group">
    <div className="input-group-text"><i className="ri-lock-line"></i></div>
    <input type="password" className="form-control" id="form-password1" placeholder=""/>
</div>
</div>
<div className="form-check mb-4">
<input className="form-check-input" type="checkbox" defaultValue="" id="invalidCheck1"
    required/>
<label className="form-check-label" htmlFor="invalidCheck1">
    Accept Policy
</label>
</div>
<SpkButton variant="primary" customClass="ti-btn !mb-0 mt-4" buttontype="submit">Submit</SpkButton>
// End Prism Code//`

export const layout4 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <form>
<div className="grid grid-cols-12 mb-4">
    <label htmlFor="inputEmail1"
        className="sm:col-span-2 col-span-12 col-ti-form-label">Email</label>
    <div className="sm:col-span-10 col-span-12">
        <div className="input-group">
            <input type="email" className="form-control !border-s" id="inputEmail1"/>
            <div className="input-group-text">
                <i className="ri-mail-line"></i>
            </div>
        </div>
    </div>
</div>
<div className="grid grid-cols-12 mb-4">
    <label htmlFor="inputPassword1"
        className="sm:col-span-2 col-span-12 col-ti-form-label">Password</label>
    <div className="sm:col-span-10 col-span-12">
        <div className="input-group">
            <input type="password" className="form-control !border-s" id="inputPassword1"/>
            <div className="input-group-text">
                <i className="ri-lock-line"></i>
            </div>
        </div>
    </div>
</div>
<div className="grid grid-cols-12 mb-4">
    <div className="col-ti-form-label sm:col-span-2 col-span-12 pt-0">Qualified</div>
    <div className="sm:col-span-10 col-span-12">
        <div className="form-check">
            <input className="form-check-input" type="radio"
                name="gridRadios" id="gridRadios4" defaultValue="option1"
                defaultChecked/>
            <label className="form-check-label" htmlFor="gridRadios4">
                Prelims
            </label>
        </div>
        <div className="form-check disabled">
            <input className="form-check-input" type="radio"
                name="gridRadios" id="gridRadios3" defaultValue="option3"
                disabled/>
            <label className="form-check-label" htmlFor="gridRadios3">
                Mains
            </label>
        </div>
        <div className="form-check">
            <input className="form-check-input" type="checkbox"
                id="gridCheck2"/>
            <label className="form-check-label" htmlFor="gridCheck2">
                Certified
            </label>
        </div>
    </div>
</div>
<SpkButton buttontype="submit" variant="primary" customClass="ti-btn">Sign in</SpkButton>
</form>
// End Prism Code//`

export const layout5 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <form className="sm:grid grid-cols-4 gap-4 items-center">
<div className="mb-4 sm:mb-0 input-group">
    <div className="input-group-text">@</div>
    <input type="text" className="form-control"
        id="inlineFormInputGroupUsername" placeholder="Username"/>
</div>
<select className="mb-4 sm:mb-0 form-select" id="inlineFormSelectPref">
    <option selected>Choose...</option>
    <option defaultValue="1">One</option>
    <option defaultValue="2">Two</option>
    <option defaultValue="3">Three</option>
</select>
<div className=" form-check !my-auto">
    <input className="form-check-input" type="checkbox"
        id="inlineFormCheck"/>
    <label className="form-check-label" htmlFor="inlineFormCheck">
        Remember me
    </label>
</div>
<SpkButton buttontype="submit" variant="primary" customClass="ti-btn !mb-0 mt-4">Submit</SpkButton>
</form>
// End Prism Code//`

export const layout6 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="grid grid-cols-12 gap-4">
<div className="sm:col-span-7 col-span-12">
    <input type="text" className="form-control" placeholder="City"
        aria-label="City"/>
</div>
<div className="sm:col-span-3 col-span-12">
    <input type="text" className="form-control" placeholder="State"
        aria-label="State"/>
</div>
<div className="sm:col-span-2 col-span-12">
    <input type="text" className="form-control" placeholder="Zip"
        aria-label="Zip"/>
</div>
</div>
// End Prism Code//`

export const layout7 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="mb-4">
<label htmlFor="formGroupExampleInput" className="form-label">Example label</label>
<input type="text" className="form-control" id="formGroupExampleInput"
    placeholder="Example input placeholder">
</div>
<div className="mb-1">
<label htmlFor="formGroupExampleInput2" className="form-label">Another label</label>
<input type="text" className="form-control" id="formGroupExampleInput2"
    placeholder="Another input placeholder">
</div>
// End Prism Code//`

export const layout8 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="grid grid-cols-12 mb-4">
<label htmlFor="colFormLabelSm"
    className="sm:col-span-2 col-span-12 col-ti-form-label col-ti-form-label-sm">Email</label>
<div className="sm:col-span-10 col-span-12">
    <input type="email" className="form-control form-control-sm"
        id="colFormLabelSm" placeholder="col-ti-form-label-sm"/>
</div>
</div>
<div className="grid grid-cols-12 mb-4">
<label htmlFor="colFormLabel" className="sm:col-span-2 col-span-12 col-ti-form-label">Email</label>
<div className="sm:col-span-10 col-span-12">
    <input type="email" className="form-control" id="colFormLabel"
        placeholder="col-ti-form-label"/>
</div>
</div>
<div className="grid grid-cols-12">
<label htmlFor="colFormLabelLg"
    className="sm:col-span-2 col-span-12 col-ti-form-label col-ti-form-label-lg text-[1.25rem]">Email</label>
<div className="sm:col-span-10 col-span-12">
    <input type="email" className="form-control form-control-lg"
        id="colFormLabelLg" placeholder="col-ti-form-label-lg"/>
</div>
</div>
// End Prism Code//`

export const layout9 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
    <form className="sm:grid grid-cols-12 block gap-y-2 gap-x-4 items-center mb-4">
<div className="col-span-12 mb-4 sm:mb-0">
    <label className="hidden" htmlFor="autoSizingInput">Name</label>
    <input type="text" className="form-control" id="autoSizingInput"
        placeholder="Jane Doe"/>
</div>
<div className="col-span-12 mb-4 sm:mb-0">
    <label className="hidden"
        htmlFor="autoSizingInputGroup">Username</label>
    <div className="input-group">
        <div className="input-group-text">@</div>
        <input type="text" className="form-control"
            id="autoSizingInputGroup" placeholder="Username"/>
    </div>
</div>
<div className="col-span-12 mb-4 sm:mb-0">
    <label className="hidden"
        htmlFor="autoSizingSelect">Preference</label>
    <select className="form-select" id="autoSizingSelect">
        <option selected>Choose...</option>
        <option defaultValue="1">One</option>
        <option defaultValue="2">Two</option>
        <option defaultValue="3">Three</option>
    </select>
</div>
<div className="col-span-12">
    <div className="form-check">
        <input className="form-check-input" type="checkbox"
            id="autoSizingCheck"/>
        <label className="form-check-label" htmlFor="autoSizingCheck">
            Remember me
        </label>
    </div>
</div>
<div className="col-span-12">
    <SpkButton buttontype="submit" variant="primary" customClass="ti-btn !mb-0 mt-4">Submit</SpkButton>
</div>
</form>
<span className="font-semibold text-[#8c9097] dark:text-white/50">You can then remix that once again with size-specific column
classes.</span>
<form className="grid grid-cols-12  gap-x-4 gap-y-2 items-center mt-2">
<div className="sm:col-span-3 col-span-12">
    <label className="hidden"
        htmlFor="specificSizeInputName">Name</label>
    <input type="text" className="form-control" id="specificSizeInputName"
        placeholder="Jane Doe"/>
</div>
<div className="sm:col-span-3 col-span-12">
    <label className="hidden"
        htmlFor="specificSizeInputGroupUsername">Username</label>
    <div className="input-group">
        <div className="input-group-text">@</div>
        <input type="text" className="form-control"
            id="specificSizeInputGroupUsername" placeholder="Username"/>
    </div>
</div>
<div className="sm:col-span-3 col-span-12">
    <label className="hidden"
        htmlFor="specificSizeSelect">Preference</label>
    <select className="form-select !py-[0.23rem]" id="specificSizeSelect">
        <option selected>Choose...</option>
        <option defaultValue="1">One</option>
        <option defaultValue="2">Two</option>
        <option defaultValue="3">Three</option>
    </select>
</div>
<div className="sm:col-span-3 col-span-12">
    <div className="form-check !my-auto">
        <input className="form-check-input" type="checkbox"
            id="autoSizingCheck2"/>
        <label className="form-check-label" htmlFor="autoSizingCheck2">
            Remember me
        </label>
    </div>
</div>
<div className="sm:col-span-3 col-span-12">
    <SpkButton buttontype="submit" variant="primary" customClass="ti-btn">Submit</SpkButton>
</div>
</form>
// End Prism Code//`

export const layout10 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="grid grid-cols-12 sm:gap-x-6 sm:gap-y-4">
<div className="md:col-span-6 col-span-12 mb-4">
    <label className="ti-form-label">First Name</label>
    <input type="text" className="form-control" placeholder="First name"
        aria-label="First name"/>
</div>
<div className="md:col-span-6 col-span-12 mb-4">
    <label className="ti-form-label">Last Name</label>
    <input type="text" className="form-control" placeholder="Last name"
        aria-label="Last name"/>
</div>
<div className="md:col-span-6 col-span-12 mb-4 sm:mb-0">
    <label className="ti-form-label">Address</label>
    <div className="grid grid-cols-12 sm:gap-x-4">
        <div className="xl:col-span-12 col-span-12 mb-4">
            <input type="text" className="form-control" placeholder="Street"
            aria-label="Street"/>
        </div>
        <div className="xl:col-span-12 col-span-12 mb-4">
            <input type="text" className="form-control" placeholder="Landmark"
            aria-label="Landmark"/>
        </div>
        <div className="xxl:col-span-6 xl:col-span-12 col-span-12 mb-4">
            <input type="text" className="form-control" placeholder="City"
            aria-label="City"/>
        </div>
        <div className="xxl:col-span-6 xl:col-span-12 col-span-12 mb-4">
            <select id="inputState1" className="form-select !py-[0.23rem]">
                <option selected>State</option>
                <option>...</option>
            </select>
        </div>
        <div className="xxl:col-span-6 xl:col-span-12 col-span-12 xxl:mb-0 mb-4">
            <input type="text" className="form-control" placeholder="Postal/Zip code"
            aria-label="Postal/Zip code"/>
        </div>
        <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
            <select id="inputCountry" className="form-select !py-[0.23rem]">
                <option selected>Country</option>
                <option>...</option>
            </select>
        </div>
    </div>
</div>
<div className="md:col-span-6  col-span-12">
    <div className="grid grid-cols-12">
        <div className="xl:col-span-12 col-span-12 mb-4">
            <label className="ti-form-label">Email</label>
            <input type="email" className="form-control" placeholder="Email"
            aria-label="email"/>
        </div>
        <div className="xl:col-span-12 col-span-12 mb-4">
            <label className="ti-form-label">D.O.B</label>
            <input type="date" className="form-control"
            aria-label="dateofbirth"/>
        </div>
        <div className="xl:col-span-12 col-span-12 mb-4">
            <div className="grid grid-cols-12 gap-3">
                <label className="ti-form-label mb-1 xl:col-span-12 col-span-12">Maritial Status</label>
                <div className="xl:col-span-6 col-span-12">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" defaultValue="" id="status-married" name="status-married"/>
                        <label className="form-check-label" htmlFor="status-married">
                            Married
                        </label>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" defaultValue="" id="status-unmarried" name="status-married" defaultChecked/>
                        <label className="form-check-label" htmlFor="status-unmarried">
                            Single
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div className="xl:col-span-12 col-span-12">

        </div>
    </div>
</div>
<div className="md:col-span-6 col-span-12 mb-4 sm:mb-0">
    <label className="ti-form-label">Contact Number</label>
    <input type="number" className="form-control" placeholder="Phone number"
        aria-label="Phone number"/>
</div>
<div className="md:col-span-6 col-span-12 mb-4 sm:mb-0">
    <label className="ti-form-label">Alternative Contact</label>
    <input type="number" className="form-control" placeholder="Phone number"
        aria-label="Phone number"/>
</div>
<div className="md:col-span-12 col-span-12 mb-4 sm:mb-0">
    <div className="form-check mb-4">
        <input className="form-check-input" type="checkbox" id="gridCheck"/>
        <label className="form-check-label" htmlFor="gridCheck">
            Check me out
        </label>
    </div>
</div>
<div className="md:col-span-12 col-span-12">
    <SpkButton variant="primary" buttontype="submit" customClass="ti-btn !mb-0">Sign in</SpkButton>
</div>
</div>
// End Prism Code//`

export const layout11 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <form className="grid grid-cols-12 gap-4 mt-0">
<div className="md:col-span-6 col-span-12">
    <label className="ti-form-label">First Name</label>
    <input type="text" className="form-control" placeholder="First name"
        aria-label="First name"/>
</div>
<div className="md:col-span-6 col-span-12">
    <label className="ti-form-label">Last Name</label>
    <input type="text" className="form-control" placeholder="Last name"
        aria-label="Last name"/>
</div>
<div className="md:col-span-6 col-span-12">
    <label htmlFor="inputEmail4" className="ti-form-label">Email</label>
    <input type="email" className="form-control" id="inputEmail4"/>
</div>
<div className="md:col-span-6 col-span-12">
    <label htmlFor="inputPassword4" className="ti-form-label">Password</label>
    <input type="password" className="form-control" id="inputPassword4"/>
</div>
<div className="col-span-12">
    <label htmlFor="inputAddress" className="ti-form-label">Address</label>
    <input type="text" className="form-control" id="inputAddress"
        placeholder="1234 Main St"/>
</div>
<div className="col-span-12">
    <label htmlFor="inputAddress2" className="ti-form-label">Address 2</label>
    <input type="text" className="form-control" id="inputAddress2"
        placeholder="Apartment, studio, or floor"/>
</div>
<div className="md:col-span-6 col-span-12">
    <label htmlFor="inputCity" className="ti-form-label">City</label>
    <input type="text" className="form-control" id="inputCity"/>
</div>
<div className="md:col-span-4 col-span-12">
    <label htmlFor="inputState" className="ti-form-label">State</label>
    <select id="inputState" className="form-select !py-[0.23rem]">
        <option selected>Choose...</option>
        <option>...</option>
    </select>
</div>
<div className="md:col-span-2 col-span-12">
    <label htmlFor="inputZip" className="ti-form-label">Zip</label>
    <input type="text" className="form-control" id="inputZip"/>
</div>
<div className="col-span-12 ">
    <div className="form-check">
        <input className="form-check-input" type="checkbox" id="gridCheck3"/>
        <label className="form-check-label" htmlFor="gridCheck3">
            Check me out
        </label>
    </div>
</div>
<div className="col-span-12">
    <SpkButton buttontype="submit" variant="primary" customClass="ti-btn">Sign in</SpkButton>
</div>
</form>
// End Prism Code//`




//
export const switch1 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <input type="checkbox" id="hs-basic-usage" className="ti-switch"/>
  <label htmlFor="hs-basic-usage" className="sr-only">Toggle switch</label>
// End Prism Code//`

export const switch2 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-tooltip flex items-center">
<input type="checkbox" id="hs-tooltip-example" className="hs-tooltip-toggle ti-switch shrink-0"/>
<label htmlFor="hs-tooltip-example" className="text-sm text-gray-500 ms-3 dark:text-white/70">Allow push
    notifications</label>
<div
    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-sm shadow-sm dark:bg-slate-700"
    role="tooltip">
    Enable push notifications
</div>
</div>
// End Prism Code//`

export const switch3 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="space-y-4">
<div className="flex items-center">
    <input type="checkbox" id="hs-basic-with-description-unchecked" className="ti-switch"/>
    <label htmlFor="hs-basic-with-description-unchecked"
    className="text-sm text-gray-500 ms-3 dark:text-white/70">Unchecked</label>
</div>

<div className="flex items-center">
    <input type="checkbox" id="hs-basic-with-description-checked" className="ti-switch" defaultChecked/>
    <label htmlFor="hs-basic-with-description-checked"
    className="text-sm text-gray-500 ms-3 dark:text-white/70">Checked</label>
</div>

<div className="flex items-center">
    <label className="text-sm text-gray-500 me-3 dark:text-white/70">On</label>
    <input type="checkbox" id="hs-basic-with-description" className="ti-switch"/>
    <label className="text-sm text-gray-500 ms-3 dark:text-white/70">Off</label>
</div>
</div>
// End Prism Code//`


export const switch4 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="space-y-4">
<div className="flex items-center opacity-70">
<input type="checkbox" id="hs-basic-disabled-with-description-unchecked"
className="ti-switch shrink-0 pointer-events-none" disabled/>
<label htmlFor="hs-basic-disabled-with-description-unchecked"
className="text-sm text-gray-500 ms-3 dark:text-white/70">Unchecked</label>
</div>

<div className="flex items-center opacity-70">
<input type="checkbox" id="hs-basic-disabled-with-description-checked"
className="ti-switch shrink-0 pointer-events-none" defaultChecked disabled/>
<label htmlFor="hs-basic-disabled-with-description-checked"
className="text-sm text-gray-500 ms-3 dark:text-white/70">Checked</label>
</div>

<div className="flex items-center opacity-70">
<label className="text-sm text-gray-500 me-3 dark:text-white/70">On</label>
<input type="checkbox" id="hs-basic-disabled-with-description"
className="ti-switch shrink-0 pointer-events-none" disabled/>
<label className="text-sm text-gray-500 ms-3 dark:text-white/70">Off</label>
</div>
</div>
// End Prism Code//`

export const switch5 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="space-x-4 rtl:space-x-reverse">
<div className="relative inline-block">
    <input type="checkbox" id="hs-xs-solid-switch"
    className="ti-switch shrink-0 !w-[35px] !h-[21px] before:size-4"/>
    <label htmlFor="hs-xs-solid-switch" className="sr-only">Extra small</label>
</div>

<div className="relative inline-block">
    <input type="checkbox" id="hs-small-solid-switch"
    className="ti-switch shrink-0 !w-11 !h-6 before:size-5"/>
    <label htmlFor="hs-small-solid-switch" className="sr-only">Small</label>
</div>


<div className="relative inline-block">
    <input type="checkbox" id="hs-medium-solid-switch" className="ti-switch shrink-0"/>
    <label htmlFor="hs-medium-solid-switch" className="sr-only">Medium</label>
</div>

<div className="relative inline-block">
    <input type="checkbox" id="hs-large-solid-switch"
    className="ti-switch shrink-0 !w-[4.25rem] !h-9 before:w-8 before:h-8"/>
    <label htmlFor="hs-large-solid-switch" className="sr-only">Large</label>
</div>
</div>
// End Prism Code//`

export const switch6 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="space-x-4 rtl:space-x-reverse">
{/* <!-- Switch/Toggle --> */}
<div className="relative inline-block">
    <input type="checkbox" id="hs-small-solid-switch-with-icons" className="peer relative shrink-0 w-11 h-6 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-primary checked:border-primary focus:checked:border-primary dark:bg-bodybg dark:border-white/10 dark:checked:bg-primary dark:checked:border-primary dark:focus:ring-offset-gray-600

    before:inline-block before:size-5 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full rtl:checked:before:-translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-black/20 dark:checked:before:bg-white"/>
    <label htmlFor="hs-small-solid-switch-with-icons" className="sr-only">switch</label>
    <span className="peer-checked:text-white text-gray-500 dark:text-white/70 size-5 absolute top-[3px] start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </span>
    <span className="peer-checked:text-primary text-gray-500 dark:text-white/70 size-5 absolute top-[3px] end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </span>
</div>
{/* <!-- End Switch/Toggle --> */}

{/* <!-- Switch/Toggle --> */}
<div className="relative inline-block">
    <input type="checkbox" id="hs-default-solid-switch-with-icons" className="peer relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-primary checked:border-primary focus:checked:border-primary dark:bg-bodybg dark:border-white/10 dark:checked:bg-primary dark:checked:border-primary dark:focus:ring-offset-gray-600

    before:inline-block before:size-6 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full rtl:checked:before:-translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-black/20 dark:checked:before:bg-white"/>
    <label htmlFor="hs-default-solid-switch-with-icons" className="sr-only">switch</label>
    <span className="peer-checked:text-white text-gray-500 dark:text-white/70 size-6 absolute top-0.5 start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </span>
    <span className="peer-checked:text-primary text-gray-500 dark:text-white/70 size-6 absolute top-0.5 end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </span>
</div>
{/* <!-- End Switch/Toggle --> */}

{/* <!-- Switch/Toggle --> */}
<div className="relative inline-block">
    <input type="checkbox" id="hs-large-solid-switch-with-icons" className="peer relative shrink-0 w-[4.25rem] h-9 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-primary checked:border-primary focus:checked:border-primary dark:bg-bodybg dark:border-white/10 dark:checked:bg-primary dark:checked:border-primary dark:focus:ring-offset-gray-600

    before:inline-block before:w-8 before:h-8 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full rtl:checked:before:-translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-black/20 dark:checked:before:bg-white"/>
    <label htmlFor="hs-large-solid-switch-with-icons" className="sr-only">switch</label>
    <span className="peer-checked:text-white text-gray-500 dark:text-white/70 size-8 absolute top-0.5 start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </span>
    <span className="peer-checked:text-primary text-gray-500 dark:text-white/70 size-8 absolute top-0.5 end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </span>
</div>
{/* <!-- End Switch/Toggle --> */}
</div>
// End Prism Code//`

export const switch7 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
     <div className="space-x-4 rtl:space-x-reverse">
<div className="relative inline-block">
    <input type="checkbox" id="hs-xs-soft-switch"
    className="ti-switch checked:!bg-primary/10 checked:!text-primary/10 checked:!border-primary/20 focus:checked:!border-primary/10 checked:before:!bg-primary dark:checked:before:bg-primary shrink-0 !w-[35px] !h-[21px] before:size-4"/>
    <label htmlFor="hs-xs-soft-switch" className="sr-only">Extra small</label>
</div>

<div className="relative inline-block">
    <input type="checkbox" id="hs-small-soft-switch"
    className="ti-switch checked:!bg-primary/10 checked:!text-primary/10 checked:!border-primary/20 focus:checked:!border-primary/10 checked:before:!bg-primary dark:checked:before:bg-primary shrink-0 !w-11 !h-6 before:size-5"/>
    <label htmlFor="hs-small-soft-switch" className="sr-only">Small</label>
</div>


<div className="relative inline-block">
    <input type="checkbox" id="hs-medium-soft-switch"
    className="ti-switch checked:!bg-primary/10 checked:!text-primary/10 checked:!border-primary/20 focus:checked:!border-primary/10 checked:before:!bg-primary dark:checked:before:bg-primary shrink-0"/>
    <label htmlFor="hs-medium-soft-switch" className="sr-only">Medium</label>
</div>

<div className="relative inline-block">
    <input type="checkbox" id="hs-large-soft-switch"
    className="ti-switch checked:!bg-primary/10 checked:!text-primary/10 checked:!border-primary/20 focus:checked:!border-primary/10 checked:before:!bg-primary dark:checked:before:bg-primary shrink-0 !w-[4.25rem] !h-9 before:w-8 before:h-8"/>
    <label htmlFor="hs-large-soft-switch" className="sr-only">Large</label>
</div>
</div>
// End Prism Code//`

export const switch8 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="space-x-4 rtl:space-x-reverse">
{/* <!-- Switch/Toggle --> */}
<div className="relative inline-block">
    <input type="checkbox" id="hs-small-switch-soft-with-icons" className="peer relative shrink-0 w-11 h-6 p-px bg-gray-100 border border-gray-200 text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-primary/30 checked:border-primary/50 checked:hover:!bg-primary/10 checked:hover:!text-primary/10 checked:hover:!border-primary/30 checked:focus:!border-primary/30 checked:focus:!bg-primary/10 checked:focus:!text-primary/10 focus:checked:border-primary/50 dark:bg-bodybg dark:border-white/10 dark:checked:bg-primary/30 dark:checked:border-primary dark:focus:ring-offset-gray-600
    before:inline-block before:size-5 before:bg-white checked:before:bg-primary before:translate-x-0 checked:before:translate-x-full rtl:checked:before:-translate-x-full before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-black/20 dark:checked:before:bg-primary"/>
    <label htmlFor="hs-small-switch-soft-with-icons" className="sr-only">switch</label>
    <span className="peer-checked:text-primary text-gray-500 dark:text-white/70 size-5 absolute top-[3px] start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </span>
    <span className="peer-checked:text-white  size-5 absolute top-[3px] end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </span>
</div>
{/* <!-- End Switch/Toggle --> */}

{/* <!-- Switch/Toggle --> */}
<div className="relative inline-block">
    <input type="checkbox" id="hs-default-switch-soft-with-icons" className="peer relative w-[3.25rem] h-7 p-px bg-gray-100 border border-gray-200 text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-primary/30 checked:border-primary/50 checked:hover:!bg-primary/10 checked:hover:!text-primary/10 checked:hover:!border-primary/30 checked:focus:!border-primary/30 checked:focus:!bg-primary/10 checked:focus:!text-primary/10  focus:checked:border-primary/50 dark:bg-bodybg dark:border-white/10 dark:checked:bg-primary/30 dark:checked:border-primary dark:focus:ring-offset-gray-600
    before:inline-block before:size-6 before:bg-white checked:before:bg-primary before:translate-x-0 checked:before:translate-x-full rtl:checked:before:-translate-x-full before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-black/20 dark:checked:before:bg-primary"/>
    <label htmlFor="hs-default-switch-soft-with-icons" className="sr-only">switch</label>
    <span className="peer-checked:text-primary text-gray-500 dark:text-white/70 size-6 absolute top-0.5 start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </span>
    <span className="peer-checked:text-white size-6 absolute top-0.5 end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </span>
</div>
{/* <!-- End Switch/Toggle --> */}

{/* <!-- Switch/Toggle --> */}
<div className="relative inline-block">
    <input type="checkbox" id="hs-large-switch-soft-with-icons" className="peer relative shrink-0 w-[4.25rem] h-9 p-px bg-gray-100 border border-gray-200 text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-primary/30 checked:hover:!bg-primary/10 checked:hover:!text-primary/10 checked:hover:!border-primary/30 checked:focus:!border-primary/30 checked:focus:!bg-primary/10 checked:focus:!text-primary/10  checked:border-primary/50 focus:checked:border-primary/50 dark:bg-bodybg dark:border-white/10 dark:checked:bg-primary/30 dark:checked:border-primary dark:focus:ring-offset-gray-600

    before:inline-block before:w-8 before:h-8 before:bg-white checked:before:bg-primary before:translate-x-0 checked:before:translate-x-full rtl:checked:before:-translate-x-full before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-black/20 dark:checked:before:bg-primary"/>
    <label htmlFor="hs-large-switch-soft-with-icons" className="sr-only">switch</label>
    <span className="peer-checked:text-primary text-gray-500 dark:text-white/70 size-8 absolute top-0.5 start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </span>
    <span className="peer-checked:text-white size-8 absolute top-0.5 end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </span>
</div>
{/* <!-- End Switch/Toggle --> */}
</div>
// End Prism Code//`

export const switch9 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="space-y-4">
<div className="flex items-center">
    <input type="checkbox" id="hs-valid-toggle-switch" className="ti-switch shrink-0 checked:bg-none checked:bg-blue-600 checked:hover:bg-blue-600 checked:focus:bg-blue-600 focus:border-green-600 focus:ring-green-600 dark:checked:bg-blue-600

                checked:before:bg-green-200 dark:checked:before:bg-green-200" defaultChecked/>
    <label htmlFor="hs-valid-toggle-switch" className="text-sm text-gray-500 ms-3 dark:text-white/70">Valid
    toggle switch</label>
</div>

<div className="flex items-center">
    <input type="checkbox" id="hs-invalid-toggle-switch" className="ti-switch shrink-0 checked:bg-none checked:bg-red-600 checked:hover:bg-red-600 checked:focus:bg-red-600 focus:border-red-600 focus:ring-red-600 dark:checked:bg-red-600

                checked:before:bg-red-200 dark:checked:before:bg-red-200" defaultChecked/>
    <label htmlFor="hs-invalid-toggle-switch" className="text-sm text-gray-500 ms-3 dark:text-white/70">Invalid
    toggle switch</label>
</div>
</div>
// End Prism Code//`

export const switch10 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="space-y-4">
<div className="flex items-center">
    <input type="checkbox" id="hs-xs-switch"
    className="ti-switch shrink-0 !w-[35px] !h-[21px] before:size-4"/>
    <label htmlFor="hs-xs-switch" className="text-sm text-gray-500 ms-3 dark:text-white/70">Extra small</label>
</div>

<div className="flex items-center">
    <input type="checkbox" id="hs-small-switch" className="ti-switch shrink-0 !w-11 !h-6 before:size-5"/>
    <label htmlFor="hs-small-switch" className="text-sm text-gray-500 ms-3 dark:text-white/70">Small</label>
</div>

<div className="flex items-center">
    <input type="checkbox" id="hs-medium-switch" className="ti-switch shrink-0"/>
    <label htmlFor="hs-medium-switch" className="text-sm text-gray-500 ms-3 dark:text-white/70">Medium</label>
</div>

<div className="flex items-center">
    <input type="checkbox" id="hs-large-switch"
    className="ti-switch shrink-0 !w-[4.25rem] !h-9 before:w-8 before:h-8"/>
    <label htmlFor="hs-large-switch" className="text-sm text-gray-500 ms-3 dark:text-white/70">Large</label>
</div>
</div>
// End Prism Code//`


//InputNumber


export const inputnumber1 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
    {/* <!-- Input Number --> */}
    <div className="py-2 px-3 bg-light rounded-sm dark:bg-bodybg border border-defaultborder dark:border-defaultborder/10" data-hs-input-number>
        <div className="w-full flex justify-between items-center gap-x-5">
            <div className="grow">
                <input
                    className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
                    type="text" defaultValue="1" data-hs-input-number-input/>
            </div>
            <div className="flex justify-end items-center gap-x-1.5">
                <SpkButton buttontype="button"
                    customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-inputborder bg-white dark:bg-bodybg text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
                    Decremenet={true}>
                    <i className="ri-subtract-line"></i>
                </SpkButton>
                <SpkButton buttontype="button"
                    customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-inputborder bg-white dark:bg-bodybg text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
                    Increment={true}>
                    <i className="ri-add-line"></i>
                </SpkButton>
            </div>
        </div>
    </div>
    {/* <!-- End Input Number --> */}
// End Prism Code//`


export const inputnumber2 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   {/* <!-- Input Number --> */}
    <div className="py-2 px-3 bg-light rounded-sm dark:bg-bodybg border border-defaultborder dark:border-defaultborder/10" data-hs-input-number>
        <div className="w-full flex justify-between items-center gap-x-5">
            <div className="grow">
                <span className="block text-xs text-gray-500 dark:text-white/70">
                    Select quantity
                </span>
                <input
                    className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
                    type="text" defaultValue="1" data-hs-input-number-input/>
            </div>
            <div className="flex justify-end items-center gap-x-1.5">
                <SpkButton buttontype="button"
                    customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-inputborder bg-white dark:bg-bodybg text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none  dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
                    Decremenet={true}>
                    <i className="ri-subtract-line"></i>
                </SpkButton>
                <SpkButton buttontype="button"
                    customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-inputborder bg-white dark:bg-bodybg text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none  dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
                    Increment={true}>
                    <i className="ri-add-line"></i>
                </SpkButton>
            </div>
        </div>
    </div>
    {/* <!-- End Input Number --> */}
// End Prism Code//`

export const inputnumber3 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  {/* <!-- Input Number --> */}
<div className="bg-white border border-inputborder rounded-sm dark:bg-bodybg dark:border-white/10"
    data-hs-input-number>
    <div className="w-full flex justify-between items-center gap-x-1 overflow-hidden">
        <div className="grow py-2 px-3">
            <span className="block text-xs text-gray-500 dark:text-white/70">
                Select quantity
            </span>
            <input
                className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
                type="text" defaultValue="1" data-hs-input-number-input/>
        </div>
        <div
            className="flex flex-col -gap-y-px divide-y divide-gray-200 border-s border-inputborder dark:divide-white/10 dark:border-white/10">
            <SpkButton buttontype="button"
                customClass="size-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium .rounded-se-sm bg-gray-50 text-gray-800 hover:bg-light disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:text-white dark:hover:bg-bgdark/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
                Decremenet={true}>
                <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14" />
                </svg>
            </SpkButton>
            <SpkButton buttontype="button"
                customClass="size-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-sm bg-gray-50 text-gray-800 hover:bg-light disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:text-white dark:hover:bg-bgdark/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
                Increment={true}>
                <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                </svg>
            </SpkButton>
        </div>
    </div>
</div>
{/* <!-- End Input Number --> */}
// End Prism Code//`


export const inputnumber4 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  {/* <!-- Input Number --> */}
<div className="bg-white border border-inputborder rounded-sm dark:bg-bodybg dark:border-white/10"
    data-hs-input-number>
    <div className="w-full flex justify-between items-center gap-x-1 overflow-hidden">
        <div className="grow py-2 px-3">
            <input
                className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
                type="text" defaultValue="1" data-hs-input-number-input/>
        </div>
        <div
            className="flex items-center -gap-y-px divide-x divide-gray-200 border-s border-inputborder dark:divide-white/10 dark:border-white/10">
            <SpkButton buttontype="button"
                customClass="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-sm bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:text-white dark:hover:bg-bgdark/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
                Decremenet={true}>
                <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14" />
                </svg>
            </SpkButton>
            <SpkButton buttontype="button"
                customClass="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-sm bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:text-white dark:hover:bg-bgdark/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
                Increment={true}>
                <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                </svg>
            </SpkButton>
        </div>
    </div>
</div>
{/* <!-- End Input Number --> */}
// End Prism Code//`

export const inputnumber5 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 {/* <!-- Input Number --> */}
<div className="py-2 px-3 inline-block bg-white border border-inputborder rounded-sm dark:bg-bodybg dark:border-white/10"
    data-hs-input-number>
    <div className="flex items-center gap-x-1.5">
        <SpkButton buttontype="button"
            customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-inputborder bg-white dark:bg-bodybg text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none  dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
            Decremenet={true}>
            <i className="ri-subtract-line"></i>
        </SpkButton>
        <input
            className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
            type="text" defaultValue="0" data-hs-input-number-input/>
        <SpkButton buttontype="button"
            customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-inputborder bg-white dark:bg-bodybg text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
            Increment={true}>
            <i className="ri-add-line"></i>
        </SpkButton>
    </div>
</div>
{/* <!-- End Input Number --> */}
// End Prism Code//`


export const inputnumber6 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   {/* <!-- Input Number --> */}
<div className="py-2 px-3 bg-white border border-inputborder rounded-sm dark:bg-bodybg dark:border-white/10"
data-hs-input-number>
<div className="w-full flex justify-between items-center gap-x-3">
    <div>
        <span className="block font-medium text-sm text-gray-800 dark:text-white">
            Additional seats
        </span>
        <span className="block text-xs text-gray-500 dark:text-white/70">
            $39 monthly
        </span>
    </div>
    <div className="flex items-center gap-x-1.5">
        <SpkButton buttontype="button"
            customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-inputborder bg-white dark:bg-bodybg text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
            Decremenet={true}>
            <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12h14" />
            </svg>
        </SpkButton>
        <input
            className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
            type="text" defaultValue="0" data-hs-input-number-input/>
        <SpkButton buttontype="button"
            customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-inputborder bg-white dark:bg-bodybg text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
            Increment={true}>
            <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
            </svg>
        </SpkButton>
    </div>
</div>
</div>
{/* <!-- End Input Number --> */}
// End Prism Code//`

export const inputnumber7 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  {/* <!-- Input Number --> */}
<div className="py-2 px-3 bg-white border border-inputborder rounded-sm dark:bg-bodybg dark:border-white/10"
data-hs-input-number>
<div className="w-full flex justify-between items-center gap-x-3">
    <input
        className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
        type="text" defaultValue="10" data-hs-input-number-input disabled/>
    <div className="flex justify-end items-center gap-x-1.5">
        <SpkButton buttontype="button"
            customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-inputborder bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
            Decremenet={true}>
            <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12h14" />
            </svg>
        </SpkButton>
        <SpkButton buttontype="button"
            customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-inputborder bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
            Increment={true}>
            <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
            </svg>
        </SpkButton>
    </div>
</div>
</div>
{/* <!-- End Input Number --> */}
// End Prism Code//`


export const inputnumber8 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  {/* <!-- Input Number --> */}
<div className="py-2 px-3 bg-white border border-inputborder rounded-sm dark:bg-bodybg dark:border-white/10"
data-hs-input-number>
<div className="w-full flex justify-between items-center gap-x-3">
    <input
        className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
        type="text" defaultValue="10" data-hs-input-number-input disabled/>
    <div className="flex justify-end items-center gap-x-1.5">
        <SpkButton buttontype="button"
            customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-inputborder bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
            Decremenet={true} disabled>
            <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12h14" />
            </svg>
        </SpkButton>
        <SpkButton buttontype="button"
            customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-inputborder bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
            Increment={true}>
            <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
            </svg>
        </SpkButton>
    </div>
</div>
</div>
{/* <!-- End Input Number --> */}
// End Prism Code//`

export const inputnumber9 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
    div className="py-2 px-3 bg-white border border-danger rounded-sm dark:bg-bodybg"
data-hs-input-number>
<div className="w-full flex justify-between items-center gap-x-3">
<div className="relative w-full">
    <input id="hs-validation-name-error"
        className="w-full p-0 pe-7 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
        type="text" defaultValue="10" data-hs-input-number-input
        aria-describedby="hs-validation-name-error-helper"/>
    <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none">
        <svg className="flex-shrink-0 size-4 text-danger"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
    </div>
</div>
<div className="flex justify-end items-center gap-x-1.5">
    <SpkButton buttontype="button"
        customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-inputborder bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
        Decremenet={true}>
        <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M5 12h14" />
        </svg>
    </SpkButton>
    <SpkButton buttontype="button"
        customClass="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-inputborder bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:hover:bg-bgdark/80 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
        Increment={true}>
        <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    </SpkButton>
</div>
</div>
</div>
// End Prism Code//`

//Form Passwords

export const password1 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="flex">
    <div className="flex-1">
        <input type="password" id="hs-strong-password-base"
            className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-sm text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-white/10"
            placeholder="Enter password"/>
        <div data-hs-strong-password='{
        "target": "#hs-strong-password-base",
        "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-success h-2 flex-auto rounded-full bg-primary/70 opacity-50 mx-1"
        }' className="flex mt-3 -mx-1"></div>
    </div>
</div>
// End Prism Code//`

export const password2 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
     <div className="flex">
<div className="relative flex-1">
    <input type="password"
        id="hs-strong-password-api-with-indicator-and-hint-in-popover"
        className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-white/10"
        placeholder="Enter password"/>
    <div id="hs-strong-password-api"
        className="hidden absolute z-10 w-full bg-white shadow-md rounded-sm p-4 dark:bg-bodybg dark:border dark:border-white/10 dark:divide-white/10">
        <div id="hs-strong-password-api-in-popover" data-hs-strong-password='{
            "target": "#hs-strong-password-api-with-indicator-and-hint-in-popover",
            "hints": "#hs-strong-password-api",
            "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-success h-2 flex-auto rounded-full bg-primary/70 opacity-50 mx-1",
            "mode": "popover",
            "checksExclude": ["lowercase", "min-length"],
            "specialCharactersSet": "&!@"
        }' className="flex mt-2 -mx-1">
        </div>
        <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
            Your password must contain:
        </h4>
        <ul className="space-y-1 text-sm text-gray-500 dark:text-white/70">
            <li data-hs-strong-password-hints-rule-text="uppercase"
                className="hs-strong-password-active:text-success flex items-center gap-x-2">
                <span className="hidden" data-check>
                    <svg className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </span>
                <span data-uncheck>
                    <svg className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </span>
                Should contain uppercase.
            </li>
            <li data-hs-strong-password-hints-rule-text="numbers"
                className="hs-strong-password-active:text-success flex items-center gap-x-2">
                <span className="hidden" data-check>
                    <svg className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </span>
                <span data-uncheck>
                    <svg className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </span>
                Should contain numbers.
            </li>
            <li data-hs-strong-password-hints-rule-text="special-characters"
                className="hs-strong-password-active:text-success flex items-center gap-x-2">
                <span className="hidden" data-check>
                    <svg className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </span>
                <span data-uncheck>
                    <svg className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </span>
                Should contain special characters (available chars: &!@).
            </li>
        </ul>
    </div>
</div>
</div>
// End Prism Code//`

 export const password3 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="flex-1">
    <input type="password" id="hs-strong-password-with-minLength"
        className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-white/10"
        placeholder="Enter password"/>
    <div id="hs-strong-password-minLength" data-hs-strong-password='{
        "target": "#hs-strong-password-with-minLength",
        "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-success h-2 flex-auto rounded-full bg-primary/70 opacity-50 mx-1",
        "minLength": "8"
        }' className="flex mt-3 -mx-1">
    </div>
</div>
// End Prism Code//`

 export const password4 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
    <div className="flex">
<div className="relative flex-1">
<input type="password"
    id="hs-strong-password-with-indicator-and-hint-in-popover"
    className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-white/10"
    placeholder="Enter password"/>
<div id="hs-strong-password-popover"
    className="hidden absolute z-10 w-full bg-white shadow-md rounded-sm p-4 dark:bg-bodybg dark:border dark:border-white/10 dark:divide-white/10">
    <div id="hs-strong-password-in-popover" data-hs-strong-password='{
    "target": "#hs-strong-password-with-indicator-and-hint-in-popover",
    "hints": "#hs-strong-password-popover",
    "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-success h-2 flex-auto rounded-full bg-primary/70 opacity-50 mx-1",
    "mode": "popover"
}' className="flex mt-2 -mx-1">
    </div>

    <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
        Your password must contain:
    </h4>

    <ul className="space-y-1 text-sm text-gray-500 dark:text-white/70">
        <li data-hs-strong-password-hints-rule-text="min-length"
            className="hs-strong-password-active:text-success flex items-center gap-x-2">
            <span className="hidden" data-check>
                <svg className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </span>
            <span data-uncheck>
                <svg className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
            </span>
            Minimum number of characters is 6.
        </li>
        <li data-hs-strong-password-hints-rule-text="lowercase"
            className="hs-strong-password-active:text-success flex items-center gap-x-2">
            <span className="hidden" data-check>
                <svg className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </span>
            <span data-uncheck>
                <svg className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
            </span>
            Should contain lowercase.
        </li>
        <li data-hs-strong-password-hints-rule-text="uppercase"
            className="hs-strong-password-active:text-success flex items-center gap-x-2">
            <span className="hidden" data-check>
                <svg className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </span>
            <span data-uncheck>
                <svg className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
            </span>
            Should contain uppercase.
        </li>
        <li data-hs-strong-password-hints-rule-text="numbers"
            className="hs-strong-password-active:text-success flex items-center gap-x-2">
            <span className="hidden" data-check>
                <svg className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </span>
            <span data-uncheck>
                <svg className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
            </span>
            Should contain numbers.
        </li>
        <li data-hs-strong-password-hints-rule-text="special-characters"
            className="hs-strong-password-active:text-success flex items-center gap-x-2">
            <span className="hidden" data-check>
                <svg className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </span>
            <span data-uncheck>
                <svg className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
            </span>
            Should contain special characters.
        </li>
    </ul>
</div>
</div>
</div>
// End Prism Code//`


 export const password5 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   {/* <!-- Strong Password --> */}
<div className="flex mb-2">
<div className="flex-1">
    <input type="password" id="hs-strong-password-with-indicator-and-hint"
        className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-white/10"
        placeholder="Enter password"/>
    <div id="hs-strong-password" data-hs-strong-password='{
        "target": "#hs-strong-password-with-indicator-and-hint",
        "hints": "#hs-strong-password-hints",
        "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-success h-2 flex-auto rounded-full bg-primary/70 opacity-50 mx-1"
    }' className="flex mt-3 -mx-1"></div>
</div>
</div>
<div id="hs-strong-password-hints" className="">
<div>
    <span className="text-sm text-gray-800 dark:text-gray-200">Level:</span>
    <span
        data-hs-strong-password-hints-weakness-text='["Empty", "Weak", "Medium", "Strong", "Very Strong", "Super Strong"]'
        className="text-sm font-semibold text-gray-800 dark:text-gray-200"></span>
</div>

<h4 className="my-2 text-sm font-semibold text-gray-800 dark:text-white">
    Your password must contain:
</h4>

<ul className="space-y-1 text-sm text-gray-500 dark:text-white/70">
    <li data-hs-strong-password-hints-rule-text="min-length"
        className="hs-strong-password-active:text-success flex items-center gap-x-2">
        <span className="hidden" data-check>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </span>
        <span data-uncheck>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </span>
        Minimum number of characters is 6.
    </li>
    <li data-hs-strong-password-hints-rule-text="lowercase"
        className="hs-strong-password-active:text-success flex items-center gap-x-2">
        <span className="hidden" data-check>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </span>
        <span data-uncheck>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </span>
        Should contain lowercase.
    </li>
    <li data-hs-strong-password-hints-rule-text="uppercase"
        className="hs-strong-password-active:text-success flex items-center gap-x-2">
        <span className="hidden" data-check>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </span>
        <span data-uncheck>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </span>
        Should contain uppercase.
    </li>
    <li data-hs-strong-password-hints-rule-text="numbers"
        className="hs-strong-password-active:text-success flex items-center gap-x-2">
        <span className="hidden" data-check>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </span>
        <span data-uncheck>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </span>
        Should contain numbers.
    </li>
    <li data-hs-strong-password-hints-rule-text="special-characters"
        className="hs-strong-password-active:text-success flex items-center gap-x-2">
        <span className="hidden" data-check>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </span>
        <span data-uncheck>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </span>
        Should contain special characters.
    </li>
</ul>
</div>
{/* <!-- End Strong Password --> */}
// End Prism Code//`

export const password6 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  {/* <!-- Form Group --> */}
<label className="block text-sm mb-2 dark:text-white">Password</label>
<div className="relative">
    <input id="hs-toggle-password" type="password"
        className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-sm text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:ring-primary"
        placeholder="Enter password" defaultValue="12345qwerty"/>
    <SpkButton buttontype="button" Togglepassword='{
    "target": "#hs-toggle-password"
    }'
        customClass="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-transparent">
        <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-white" width="24"
            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path className="hs-password-active:hidden"
                d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path className="hs-password-active:hidden"
                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path className="hs-password-active:hidden"
                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
            <path className="hidden hs-password-active:block"
                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3" />
        </svg>
    </SpkButton>
</div>
{/* <!-- End Form Group --> */}
// End Prism Code//`


export const password7 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
    <div className="mb-5">
        <label htmlFor="hs-toggle-password-with-checkbox" className="block text-sm mb-2 dark:text-white">Current password</label>
        <input id="hs-toggle-password-with-checkbox" type="text" className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder
            rounded-sm text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg2
            dark:border-white/10 dark:text-white/70 dark:focus:ring-primary" placeholder="Enter current password" defaultValue="12345qwerty"/>
        {/* <!-- Checkbox --> */}
        <div className="flex mt-4">
            <input data-hs-toggle-password="{
                &quot;target&quot;: &quot;#hs-toggle-password-with-checkbox&quot;
            }" id="hs-toggle-password-checkbox" type="checkbox" className="form-check-input mt-0.5 pointer-events-none active"/>
            <label htmlFor="hs-toggle-password-checkbox" className="text-sm text-gray-500 ms-2 dark:text-white/70">Show password</label>
        </div>
        {/* <!-- End Checkbox --> */}
    </div>
// End Prism Code//`

export const password8 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
    <div className="space-y-5" data-hs-toggle-password-group>
{/* <!-- Form Group --> */}
<label htmlFor="hs-toggle-password-multi-toggle-np"
className="block text-sm mb-2 dark:text-white">New password</label>
<div className="relative">
<input id="hs-toggle-password-multi-toggle-np" type="password"
    className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-sm text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:ring-primary"
    placeholder="Enter new password"/>
<SpkButton buttontype="button" Togglepassword='{
    "target": ["#hs-toggle-password-multi-toggle", "#hs-toggle-password-multi-toggle-np"]
}'
customClass="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-transparent">
    <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-white" width="24"
        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="hs-password-active:hidden"
            d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path className="hs-password-active:hidden"
            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path className="hs-password-active:hidden"
            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
        <path className="hidden hs-password-active:block"
            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3" />
    </svg>
</SpkButton>
</div>
{/* <!-- End Form Group --> */}

{/* <!-- Form Group --> */}
<label htmlFor="hs-toggle-password-multi-toggle"
className="block text-sm mb-2 dark:text-white">Current password</label>
<div className="relative">
<input id="hs-toggle-password-multi-toggle" type="password"
    className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-sm text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:ring-primary"
    placeholder="Enter current password" defaultValue="12345qwerty"/>
<SpkButton buttontype="button" Togglepassword='{
    "target": ["#hs-toggle-password-multi-toggle", "#hs-toggle-password-multi-toggle-np"]
}'
    customClass="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-transparent">
    <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-white" width="24"
        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="hs-password-active:hidden"
            d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path className="hs-password-active:hidden"
            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path className="hs-password-active:hidden"
            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
        <path className="hidden hs-password-active:block"
            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3" />
    </svg>
</SpkButton>
</div>
{/* <!-- End Form Group --> */}
</div>
// End Prism Code//`

export const password9 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    data-hs-pin-input-item autoFocus/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    data-hs-pin-input-item/>
</div>
// End Prism Code//`


export const password10 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
</div>
// End Prism Code//`

export const password11 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center bg-gray-100 border-transparent rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg2 dark:border-transparent dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center bg-gray-100 border-transparent rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg2 dark:border-transparent dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center bg-gray-100 border-transparent rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg2 dark:border-transparent dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center bg-gray-100 border-transparent rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg2 dark:border-transparent dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
</div>
// End Prism Code//`

export const password12 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
    <input type="text"
        className="dark:placeholder:text-white/50 block w-[38px] text-center bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-primary focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-white/10 dark:text-white dark:focus:ring-primary dark:focus:border-b-primary"
        placeholder="⚬" data-hs-pin-input-item/>
    <input type="text"
        className="dark:placeholder:text-white/50 block w-[38px] text-center bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-primary focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-white/10 dark:text-white dark:focus:ring-primary dark:focus:border-b-primary"
        placeholder="⚬" data-hs-pin-input-item/>
    <input type="text"
        className="dark:placeholder:text-white/50 block w-[38px] text-center bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-primary focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-white/10 dark:text-white dark:focus:ring-primary dark:focus:border-b-primary"
        placeholder="⚬" data-hs-pin-input-item/>
    <input type="text"
        className="dark:placeholder:text-white/50 block w-[38px] text-center bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-primary focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-white/10 dark:text-white dark:focus:ring-primary dark:focus:border-b-primary"
        placeholder="⚬" data-hs-pin-input-item/>
</div>
// End Prism Code//`

export const password13 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
        <input type="text"
            className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:scale-110 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
            placeholder="⚬" data-hs-pin-input-item/>
        <input type="text"
            className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:scale-110 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
            placeholder="⚬" data-hs-pin-input-item/>
        <input type="text"
            className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:scale-110 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
            placeholder="⚬" data-hs-pin-input-item/>
        <input type="text"
            className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:scale-110 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
            placeholder="⚬" data-hs-pin-input-item/>
    </div>
// End Prism Code//`

export const password14 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input='{"availableCharsRE": "^[0-9]+$"}'>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
</div>
// End Prism Code//`

export const password15 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input='{"availableCharsRE": "^[0-3]+$"}'>
    <input type="text"
        className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
        placeholder="⚬" data-hs-pin-input-item/>
    <input type="text"
        className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
        placeholder="⚬" data-hs-pin-input-item/>
    <input type="text"
        className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
        placeholder="⚬" data-hs-pin-input-item/>
    <input type="text"
        className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
        placeholder="⚬" data-hs-pin-input-item/>
</div>
// End Prism Code//`

export const password16 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input='{"availableCharsRE": "^[0-3]+$"}'>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
</div>
// End Prism Code//`

export const password17 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
<input
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    type="tel" placeholder="⚬" data-hs-pin-input-item/>
<input
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    type="tel" placeholder="⚬" data-hs-pin-input-item/>
<input
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    type="tel" placeholder="⚬" data-hs-pin-input-item/>
<input
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    type="tel" placeholder="⚬" data-hs-pin-input-item/>
</div>
// End Prism Code//`

export const password18 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item disabled/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item disabled/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item disabled/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item disabled/>
</div>
// End Prism Code//`

export const password19 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
</div>
<div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
</div>
<div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
<input type="text"
    className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
    placeholder="⚬" data-hs-pin-input-item/>
</div>
// End Prism Code//`

export const password20 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
    <input type="text" className="dark:placeholder:text-white/50 block size-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
    <input type="text" className="dark:placeholder:text-white/50 block size-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
    <input type="text" className="dark:placeholder:text-white/50 block size-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
    <input type="text" className="dark:placeholder:text-white/50 block size-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
</div>

<div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
    <input type="text" className="dark:placeholder:text-white/50 block size-[46px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
    <input type="text" className="dark:placeholder:text-white/50 block size-[46px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
    <input type="text" className="dark:placeholder:text-white/50 block size-[46px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
    <input type="text" className="dark:placeholder:text-white/50 block size-[46px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
</div>

<div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
    <input type="text" className="dark:placeholder:text-white/50 block sm:size-[62px] size-[50px] text-center border-inputborder rounded-md text-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
    <input type="text" className="dark:placeholder:text-white/50 block sm:size-[62px] size-[50px] text-center border-inputborder rounded-md text-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
    <input type="text" className="dark:placeholder:text-white/50 block sm:size-[62px] size-[50px] text-center border-inputborder rounded-md text-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
    <input type="text" className="dark:placeholder:text-white/50 block sm:size-[62px] size-[50px] text-center border-inputborder rounded-md text-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item/>
</div>
// End Prism Code//`

//Form Counter

export const counter1 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   {/* <!-- Toggle --> */}
<div className="flex justify-end mb-3">
    <div id="toggle-count" className="p-0.5 inline-block bg-gray-100 rounded-sm dark:bg-bodybg2">
    <label htmlFor="toggle-count-monthly" className="relative inline-block py-2 px-3">
        <span className="inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer dark:text-gray-200">
        Monthly
        </span>
        <input id="toggle-count-monthly" name="toggle-count" type="radio" className="absolute top-0 end-0 size-full border-transparent !border-0 !bg-transparent dark:bg-bodybg bg-none text-transparent rounded-sm cursor-pointer before:absolute before:inset-0 before:size-full before:rounded-sm focus:ring-offset-0 checked:before:bg-white checked:before:shadow-sm checked:bg-none focus:ring-transparent dark:checked:before:bg-bodybg dark:focus:ring-offset-transparent"/>
    </label>
    <label htmlFor="toggle-count-annual" className="relative inline-block py-2 px-3 dark:bg-bodybg2">
        <span className="inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer dark:text-gray-200">
        Annual
        </span>
        <input id="toggle-count-annual" name="toggle-count" type="radio" className="absolute top-0 end-0 size-full border-transparent !border-0 !bg-transparent bg-none text-transparent rounded-sm cursor-pointer before:absolute before:inset-0 before:size-full before:rounded-sm focus:ring-offset-0 checked:before:bg-white checked:before:shadow-sm checked:bg-none focus:ring-transparent dark:checked:before:bg-bodybg dark:focus:ring-offset-transparent" defaultChecked/>
    </label>
    </div>
</div>
{/* <!-- End Toggle --> */}

{/* <!-- Card Grid --> */}
<div className="grid sm:grid-cols-3 lg:items-center border border-inputborder rounded-sm dark:border-white/10">
    {/* <!-- Card --> */}
    <div className="flex flex-col p-4">
    <h4 className="text-gray-800 mb-1 dark:text-white">Startup</h4>
    <div className="flex gap-x-1">
        <span className="text-xl font-normal text-gray-800 dark:text-white">$</span>
        <p data-hs-toggle-count='{
            "target": "#toggle-count",
            "min": 19,
            "max": 29
        }' className="text-gray-800 font-semibold text-3xl dark:text-white">
        19
        </p>
    </div>
    </div>
    {/* <!-- End Card --> */}

    {/* <!-- Card --> */}
    <div className="flex flex-col p-4">
    <div className="flex justify-between">
        <h4 className="text-gray-800 mb-1 dark:text-gray-200">Team</h4>
    </div>
    <div className="flex gap-x-1">
        <span className="text-xl font-normal text-gray-800 dark:text-gray-200">$</span>
        <p data-hs-toggle-count='{
            "target": "#toggle-count",
            "min": 89,
            "max": 99
        }' className="text-gray-800 font-semibold text-3xl dark:text-gray-200">
        89
        </p>
    </div>
    </div>
    {/* <!-- End Card --> */}

    {/* <!-- Card --> */}
    <div className="flex flex-col p-4">
    <h4 className="text-gray-800 mb-1 dark:text-gray-200">Enterprise</h4>
    <div className="flex gap-x-1">
        <span className="text-xl font-normal text-gray-800 dark:text-gray-200">$</span>
        <p data-hs-toggle-count='{
            "target": "#toggle-count",
            "min": 129,
            "max": 149
        }' className="text-gray-800 font-semibold text-3xl dark:text-gray-200">
        129
        </p>
    </div>
    </div>
    {/* <!-- End Card --> */}
</div>
{/* <!-- End Card Grid --> */}
// End Prism Code//`
export const counter2 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  {/* <!-- Toggle --> */}
<div className="flex justify-center mb-4">
    <div>
        <label htmlFor="toggle-count-switch" className="inline-block p-2">
            <span className="inline-block text-sm text-gray-800 cursor-pointer dark:text-white">
                Monthly
            </span>
        </label>
        <input id="toggle-count-switch" name="toggle-count-switch" type="checkbox" className="ti-switch"/>
        <label htmlFor="toggle-count-switch" className="inline-block p-2">
            <span className="inline-block text-sm text-gray-800 cursor-pointer dark:text-white">
                Annual
            </span>
        </label>
    </div>
</div>
{/* <!-- End Toggle --> */}

{/* <!-- Grid --> */}
<div className="grid sm:grid-cols-3 lg:items-center border border-inputborder rounded-sm dark:border-white/10">
    {/* <!-- Card --> */}
    <div className="flex flex-col p-4">
        <h4 className="text-gray-800 mb-1 dark:text-white">Startup</h4>
        <div className="flex gap-x-1">
        <span className="text-xl font-normal text-gray-800 dark:text-white">$</span>
        <p data-hs-toggle-count='{
            "target": "#toggle-count-switch",
            "min": 19,
            "max": 29
            }' className="text-gray-800 font-semibold text-3xl dark:text-white">
            19
        </p>
        </div>
    </div>
    {/* <!-- End Card --> */}

    {/* <!-- Card --> */}
    <div className="flex flex-col p-4">
        <div className="flex justify-between">
        <h4 className="text-gray-800 mb-1 dark:text-white">Team</h4>
        </div>
        <div className="flex gap-x-1">
        <span className="text-xl font-normal text-gray-800 dark:text-white">$</span>
        <p data-hs-toggle-count='{
            "target": "#toggle-count-switch",
            "min": 89,
            "max": 99
            }' className="text-gray-800 font-semibold text-3xl dark:text-white">
            89
        </p>
        </div>
    </div>
    {/* <!-- End Card --> */}

    {/* <!-- Card --> */}
    <div className="flex flex-col p-4">
        <h4 className="text-gray-800 mb-1 dark:text-white">Enterprise</h4>
        <div className="flex gap-x-1">
        <span className="text-xl font-normal text-gray-800 dark:text-white">$</span>
        <p data-hs-toggle-count='{
            "target": "#toggle-count-switch",
            "min": 129,
            "max": 149
            }' className="text-gray-800 font-semibold text-3xl dark:text-white">
            129
        </p>
        </div>
    </div>
    {/* <!-- End Card --> */}
</div>
{/* <!-- End Grid --> */}
// End Prism Code//`

export const counter3 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div id="hs-wrapper-for-copy" className="space-y-3">
<input id="hs-content-for-copy" type="text" className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-sm text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:ring-primary" placeholder="Enter Name"/>
</div>

<p className="mt-3 text-end">
<SpkButton buttontype="button" Copymarkup='{
    "targetSelector": "#hs-content-for-copy",
    "wrapperSelector": "#hs-wrapper-for-copy",
    "limit": 10
}' Id="hs-copy-content" customClass="py-1.5 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-full border border-dashed border-inputborder bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-bgdark dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary">
<svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
Add Name
</SpkButton>
</p>
// End Prism Code//`
export const counter4 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div id="hs-wrapper-select-for-copy" className="space-y-3">
{/* <!-- Select --> */}
<div id="hs-content-select-for-copy" className="relative">
<select data-hs-select='{
"placeholder": "Select option...",
"toggleTag": "<button type=\"button\"></button>",
"toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
"dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
"optionClasses": "cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:!bg-light dark:text-gray-200 dark:focus:bg-bodybg",
"optionTemplate": "<div class=\"flex justify-between w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-4 text-primary\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div>"
}'>
<option defaultValue="">Select Option ...</option>
<option>Name</option>
<option>Email address</option>
<option>Description</option>
<option>User ID</option>
</select>

<div className="absolute top-1/2 end-3 -translate-y-1/2">
<svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
</div>
</div>
{/* <!-- End Select --> */}
</div>
<p className="mt-3 text-end">
<SpkButton type="button" Copymarkup='{
    "targetSelector": "#hs-content-select-for-copy",
    "wrapperSelector": "#hs-wrapper-select-for-copy",
    "limit": 3
}' Id="hs-copy-select-content" customClass="py-1.5 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-full border border-dashed border-inputborder bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-bgdark dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary">
<svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
Add Option
</SpkButton>
</p>
// End Prism Code//`

// Form Advanvced select



export const advanvcedselect1 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="relative">
<select data-hs-select='{
    "placeholder": "Select option...",
    "toggleTag": "<button type=\"button\"></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
    "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-light rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
    "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
}' className="hidden">
    <option defaultValue="">Choose</option>
    <option>Name</option>
    <option>Email address</option>
    <option>Description</option>
    <option>User ID</option>
</select>
<div className="absolute top-1/2 end-3 -translate-y-1/2">
    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
    </svg>
</div>
</div>
// End Prism Code//`

export const advanvcedselect2 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="relative">
<select data-hs-select='{
    "placeholder": "<span class=\"inline-flex items-center\"><svg class=\"flex-shrink-0 size-3.5 me-2\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"/></svg> Filter</span>",
    "toggleTag": "<button type=\"button\"></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
    "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
    "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
}' className="hidden">
    <option defaultValue="">Choose</option>
    <option>Name</option>
    <option>Email address</option>
    <option>Description</option>
    <option>User ID</option>
</select>
<div className="absolute top-1/2 end-3 -translate-y-1/2">
    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
    </svg>
</div>
</div>
// End Prism Code//`


export const advanvcedselect3 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="relative">
<select multiple data-hs-select='{
    "placeholder": "Select multiple options...",
    "toggleTag": "<button type=\"button\"></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
    "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
    "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
}' className="hidden">
    <option defaultValue="">Choose</option>
    <option>Name</option>
    <option>Email address</option>
    <option>Description</option>
    <option>User ID</option>
</select>

<div className="absolute top-1/2 end-3 -translate-y-1/2">
    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
    </svg>
</div>
</div>
// End Prism Code//`


export const advanvcedselect4 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
       <div className="relative">
<select multiple data-hs-select='{
    "placeholder": "Select multiple options...",
    "toggleTag": "<button type=\"button\"></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
    "toggleCountText": "selected",
    "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
    "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
}' className="hidden">
    <option defaultValue="">Choose</option>
    <option>Name</option>
    <option>Email address</option>
    <option>Description</option>
    <option>User ID</option>
</select>

<div className="absolute top-1/2 end-3 -translate-y-1/2">
    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
    </svg>
</div>
</div>
// End Prism Code//`


export const advanvcedselect5 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="relative">
<select data-hs-select='{
    "hasSearch": true,
    "searchPlaceholder": "Search...",
    "searchClasses": "block w-full text-sm border-inputborder rounded-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary py-2 px-3 dark:placeholder:text-white/50",
    "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-bodybg",
    "placeholder": "Select country...",
    "toggleTag": "<button type=\"button\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-gray-200\" data-title></span></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
    "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
    "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"text-gray-800 dark:text-gray-200\" data-title></div></div></div>"
}' className="hidden">
    <option defaultValue="">Choose</option>
    <option defaultValue="Us"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../assets/images/flags/us_flag.jpg\" alt=\"USA\" />"}'>
        USA
    </option>
    <option defaultValue="ar"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../assets/images/flags/argentina_flag.jpg\" alt=\"Argentina\" />"}'>
        Argentina
    </option>
    <option defaultValue="ca"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../assets/images/flags/canada_flag.jpg\" alt=\"Canada\" />"}'>
        Canada
    </option>
    <option defaultValue="fr"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../assets/images/flags/french_flag.jpg\" alt=\"India\" />"}'>
    French
    </option>
    <option defaultValue="gr"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../assets/images/flags/germany_flag.jpg\" alt=\"Germany\" />"}'>
        Germany
    </option>
    <option defaultValue="it"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../assets/images/flags/italy_flag.jpg\" alt=\"Italy\" />"}'>
        Italy
    </option>
</select>
<div className="absolute top-1/2 end-3 -translate-y-1/2">
    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
    </svg>
</div>
</div>
// End Prism Code//`

export const advanvcedselect6 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <select multiple data-hs-select='{
"placeholder": "Select option...",
"dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-defaultborder dark:border-defaultborder/10 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-bodybg",
"optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 dark:bg-bodybg dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
"mode": "tags",
"wrapperClasses": "relative ps-0.5 pe-9 min-h-[46px] !bg-white dark:!bg-bodybg flex items-center flex-wrap text-nowrap w-full border border-defaultborder dark:border-defaultborder/10 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-bodybg dark:border-defaultborder/10dark:text-neutral-400",
"tagsItemTemplate": "<div class=\"flex flex-nowrap items-center relative z-10 bg-white border border-defaultborder dark:border-defaultborder/10 rounded-full p-1 m-1 dark:bg-bodybg dark:border-defaultborder/10\"><div class=\"size-6 me-1\" data-icon></div><div class=\"whitespace-nowrap text-gray-800 dark:text-neutral-200 \" data-title></div><div class=\"inline-flex shrink-0 justify-center items-center size-5 ms-2 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm dark:bg-neutral-700/50 dark:hover:bg-neutral-700 dark:text-neutral-400 cursor-pointer\" data-remove><svg class=\"shrink-0 size-3\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg></div></div>",
"tagsInputClasses": "py-3 w-full border-0 px-2 order-1 text-sm bg-white dark:bg-bodybg",
"optionTemplate": "<div class=\"flex items-center\"><div class=\"size-8 me-2\" data-icon></div><div><div class=\"text-sm font-semibold text-gray-800 dark:text-neutral-200 \" data-title></div><div class=\"text-xs text-gray-500 dark:text-neutral-500 \" data-description></div></div><div class=\"ms-auto\"><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-4 text-blue-600\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div></div>",
"extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
}' className="hidden">
<option defaultValue="">Choose</option>
<option selected defaultValue="1" data-hs-select-option='{
    "description": "chris",
    "icon": "<img class=\"inline-block rounded-full\" src=\"https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
    }'>Christina</option>
<option defaultValue="2" data-hs-select-option='{
    "description": "david",
    "icon": "<img class=\"inline-block rounded-full\" src=\"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
    }'>David</option>
<option defaultValue="3" disabled data-hs-select-option='{
    "description": "alex27",
    "icon": "<img class=\"inline-block rounded-full\" src=\"https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
    }'>Alex</option>
<option defaultValue="4" data-hs-select-option='{
    "description": "samia_samia",
    "icon": "<img class=\"inline-block rounded-full\" src=\"https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
    }'>Samia</option>
</select>
// End Prism Code//`
export const advanvcedselect7 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="relative">
<select data-hs-select='{
    "placeholder": "Select option...",
    "toggleTag": "<button type=\"button\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-gray-200\" data-title></span></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex items-center text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
    "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
    "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"font-semibold text-gray-800 dark:text-gray-200\" data-title></div></div><div class=\"mt-1.5 text-sm text-gray-500 dark:text-white/70\" data-description></div></div>"
}' className="hidden">
    <option defaultValue="">Choose</option>
    <option defaultValue="1" selected data-hs-select-option='{
    "description": "Visible to anyone who van view your content.",
    "icon": "<svg class=\"flex-shrink-0 size-4 text-gray-800 dark:text-gray-200\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\" class=\"lucide lucide-globe-2\"><path d=\"M21.54 15H17a2 2 0 0 0-2 2v4.54\"/><path d=\"M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17\"/><path d=\"M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05\"/><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>"
    }'>Anyone</option>

    <option defaultValue="2" data-hs-select-option='{
    "description": "Only visible to you.",
    "icon": "<svg class=\"flex-shrink-0 size-4 text-gray-800 dark:text-gray-200\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\" class=\"lucide lucide-lock\"><rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></svg>"
    }'>Only you</option>
</select>

<div className="absolute top-1/2 end-3 -translate-y-1/2">
    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
    </svg>
</div>
</div>
// End Prism Code//`
export const advanvcedselect8 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
    <div className="relative">
<select data-hs-select='{
    "placeholder": "Select assignee",
    "toggleTag": "<button type=\"button\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-gray-200\" data-title></span></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none items-center hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
    "dropdownClasses": "mt-2 max-h-72 p-1 space-y-0.5 z-20 w-full bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
    "optionClasses": "py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
    "optionTemplate": "<div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div><div class=\"hs-selected:font-semibold text-sm text-gray-800 dark:text-gray-200\" data-title></div></div><div class=\"ms-auto\"><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-4 text-primary\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div></div>"
}' className="hidden">
    <option defaultValue="">Choose</option>
    <option selected defaultValue="1"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../../../assets/images/faces/10.jpg\" alt=\"James Collins\" />"}'>
        James Collins
    </option>

    <option defaultValue="2"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../../../assets/images/faces/1.jpg\" alt=\"Amanda Harvey\" />"}'>
        Amanda Harvey
    </option>

    <option defaultValue="3"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../../../assets/images/faces/11.jpg\" alt=\"Costa Quinn\" />"}'>
        Costa Quinn
    </option>
</select>

<div className="absolute top-1/2 end-3 -translate-y-1/2">
    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
    </svg>
</div>
</div>
// End Prism Code//`
export const advanvcedselect9 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div className="space-y-3">
    {/* <!-- Select --> */}
    <div className="relative">
        <select data-hs-select='{
            "placeholder": "Select option...",
            "toggleTag": "<button type=\"button\"></button>",
            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 px-3 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
            "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
            "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
        }' className="hidden">
            <option defaultValue="">Choose</option>
            <option>Name</option>
            <option>Email address</option>
            <option>Description</option>
            <option>User ID</option>
        </select>
        <div className="absolute top-1/2 end-3 -translate-y-1/2">
            <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="m7 15 5 5 5-5" />
                <path d="m7 9 5-5 5 5" />
            </svg>
        </div>
    </div>
    {/* <!-- End Select --> */}

    {/* <!-- Select --> */}
    <div className="relative">
        <select data-hs-select='{
            "placeholder": "Select option...",
            "toggleTag": "<button type=\"button\"></button>",
            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
            "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
            "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
            }' className="hidden">
            <option defaultValue="">Choose</option>
            <option>Name</option>
            <option>Email address</option>
            <option>Description</option>
            <option>User ID</option>
        </select>
        <div className="absolute top-1/2 end-3 -translate-y-1/2">
            <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="m7 15 5 5 5-5" />
                <path d="m7 9 5-5 5 5" />
            </svg>
        </div>
    </div>
    {/* <!-- End Select --> */}

    {/* <!-- Select --> */}
    <div className="relative">
        <select data-hs-select='{
            "placeholder": "Select option...",
            "toggleTag": "<button type=\"button\"></button>",
            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative sm:p-5 p-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
            "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
            "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
            }' className="hidden">
            <option defaultValue="">Choose</option>
            <option>Name</option>
            <option>Email address</option>
            <option>Description</option>
            <option>User ID</option>
        </select>
        <div className="absolute top-1/2 end-3 -translate-y-1/2">
            <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="m7 15 5 5 5-5" />
                <path d="m7 9 5-5 5 5" />
            </svg>
        </div>
    </div>
    {/* <!-- End Select --> */}
</div>
// End Prism Code//`
export const advanvcedselect10 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="relative">
<select data-hs-select='{
    "placeholder": "Select option...",
    "toggleTag": "<button type=\"button\"></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
    "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
    "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
}' className="hidden" disabled>
    <option defaultValue="">Choose</option>
    <option>Name</option>
    <option>Email address</option>
    <option>Description</option>
    <option>User ID</option>
</select>

<div className="absolute top-1/2 end-3 -translate-y-1/2">
    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
    </svg>
</div>
</div>
// End Prism Code//`
export const advanvcedselect11 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
   <div>
    {/* <!-- Select --> */}
    <div className="relative">
        <select data-hs-select='{
        "placeholder": "Select option...",
        "toggleTag": "<button type=\"button\"></button>",
        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-danger rounded-sm text-start text-sm focus:border-danger focus:ring-danger before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
        "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
        }' className="hidden">
            <option defaultValue="">Choose</option>
            <option>Name</option>
            <option>Email address</option>
            <option>Description</option>
            <option>User ID</option>
        </select>

        <div className="absolute top-1/2 end-8 -translate-y-1/2">
            <svg className="flex-shrink-0 size-4 text-danger"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
        </div>

        <div className="absolute top-1/2 end-3 -translate-y-1/2">
            <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="m7 15 5 5 5-5" />
                <path d="m7 9 5-5 5 5" />
            </svg>
        </div>
    </div>
    {/* <!-- End Select --> */}
    <p className="text-xs text-danger mt-2">Please select a valid state.</p>
</div>

<div>
    {/* <!-- Select --> */}
    <div className="relative">
        <select data-hs-select='{
        "placeholder": "Select option...",
        "toggleTag": "<button type=\"button\"></button>",
        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-success rounded-sm text-start text-sm focus:border-success focus:ring-success before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
        "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
        }' className="hidden">
            <option defaultValue="">Choose</option>
            <option>Name</option>
            <option>Email address</option>
            <option>Description</option>
            <option>User ID</option>
        </select>

        <div className="absolute inset-y-0 end-8 flex items-center pointer-events-none">
            <svg className="flex-shrink-0 size-4 text-success"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </div>

        <div className="absolute top-1/2 end-3 -translate-y-1/2">
            <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="m7 15 5 5 5-5" />
                <path d="m7 9 5-5 5 5" />
            </svg>
        </div>
    </div>
    {/* <!-- End Select --> */}
    <p className="text-xs text-success mt-2">Looks good!</p>
</div>
// End Prism Code//`
export const advanvcedselect12 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="max-w-sm">
{/* <!-- Select --> */}
<select id="hs-select-with-dynamic-options" data-hs-select='{
    "placeholder": "Select assignee",
    "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-neutral-200 \" data-title></span></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600",
    "dropdownClasses": "mt-2 max-h-72 p-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
    "optionClasses": "py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
    "optionTemplate": "<div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div><div class=\"hs-selected:font-semibold text-sm text-gray-800 dark:text-neutral-200 \" data-title></div></div><div class=\"ms-auto\"><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-4 text-blue-600\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div></div>",
    "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
}' className="hidden">
    <option defaultValue="">Choose</option>
    <option defaultValue="1" data-hs-select-option='{
    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80\" alt=\"James Collins\" />"}'>
    James Collins
    </option>
    <option defaultValue="2" data-hs-select-option='{
    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80\" alt=\"Amanda Harvey\" />"}'>
    Amanda Harvey
    </option>
    <option defaultValue="3" data-hs-select-option='{
    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80\" alt=\"Costa Quinn\" />"}'>
    Costa Quinn
    </option>
</select>
{/* <!-- End Select --> */}
</div>

<div className="flex flex-wrap gap-2">
<SpkButton buttontype="button" Id="add-option" customClass="py-1 px-2 inline-flex my-2 bg-primary/10 text-primary items-center gap-x-1 text-sm rounded-md border border-transparent  disabled:opacity-50 disabled:pointer-events-none">
    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="M12 5v14"></path>
    </svg>
    Add one option
</SpkButton>
<SpkButton buttontype="button" Id="add-options" customClass="py-1 px-2 my-2 bg-primary/10 text-primary inline-flex items-center gap-x-1 text-sm rounded-md border border-transparent disabled:opacity-50 disabled:pointer-events-none">
    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="M12 5v14"></path>
    </svg>
    Add three options
</SpkButton>
</div>

<div className="flex flex-wrap gap-2">
<SpkButton Id="remove-option" customClass="py-2 px-2 inline-flex items-center gap-x-1 text-sm rounded-md border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-800">
    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
    </svg>
    Remove value 4
</SpkButton>
<SpkButton buttontype="button" Id="remove-options" className="py-2 px-2 inline-flex items-center gap-x-1 text-sm rounded-md border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-800">
    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
    </svg>
    Remove values 5, 6, 7
</SpkButton>
</div>
// End Prism Code//`
export const advanvcedselect13 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="space-y-3">
<div id="validation-target" className="mb-4">
    {/* <!-- Select --> */}
    <div className="relative">
        <select data-hs-select='{
        "placeholder": "Select option...",
        "toggleTag": "<button type=\"button\"></button>",
        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border hs-error:border-danger hs-success:border-success rounded-sm text-start text-sm hs-error:focus:border-danger hs-success:focus:border-success hs-error:focus:ring-danger hs-success:focus:ring-success before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:border-white/10 dark:focus:ring-primary",
        "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
        }' className="hidden">
            <option defaultValue="">Choose</option>
            <option>Name</option>
            <option>Email address</option>
            <option>Description</option>
            <option>User ID</option>
        </select>
        <div className="hidden hs-error:block absolute top-1/2 end-8 -translate-y-1/2">
            <svg className="flex-shrink-0 size-4 text-danger"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
        </div>
        <div
            className="hidden hs-success:flex absolute inset-y-0 end-8 items-center pointer-events-none">
            <svg className="flex-shrink-0 size-4 text-success"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </div>
        <div className="absolute top-1/2 end-3 -translate-y-1/2">
            <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m7 15 5 5 5-5" />
                <path d="m7 9 5-5 5 5" />
            </svg>
        </div>
    </div>
    {/* <!-- End Select --> */}
    <p className="hidden hs-error:block text-sm text-danger mt-2">Please select a valid
        state.</p>
    <p className="hidden hs-success:flex text-sm text-success mt-2">Looks good!</p>
</div>
<div className="flex flex-wrap gap-2">
    <SpkButton buttontype="button" Id="trigger-success"
        customClass="py-1 px-2 text-sm font-medium rounded-md border border-success/30 bg-success/10 dark:bg-success/25 text-success dark:text-success hover:bg-success/20 dark:hover:bg-success/50">
        Success
    </SpkButton>
    <SpkButton buttontype="button" Id="trigger-error"
        customClass="py-1 px-2 text-sm font-medium rounded-md border border-danger/30 bg-danger/10 dark:bg-danger/25 text-danger dark:text-danger hover:bg-danger/20 dark:hover:bg-danger/50">
        Error
    </SpkButton>
    <SpkButton buttontype="button" Id="trigger-clear"
        customClass="py-1 px-2 text-sm font-medium rounded-md border dark:border-white/10 bg-gray-100 dark:bg-gray-800/25 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-bodybg/50">
        Clear
    </SpkButton>
</div>
</div>
// End Prism Code//`

export const advanvcedselect14 =`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="max-w-sm space-y-3">
{/* <!-- Select --> */}
<div className="relative">
<select id="hs-select-temporary" data-hs-select='{
    "placeholder": "Select assignee",
    "toggleTag": "<button type=\"button\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-gray-200\" data-title></span></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
    "dropdownClasses": "mt-2 max-h-72 p-1 space-y-0.5 z-20 w-full bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
    "optionClasses": "py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
    "optionTemplate": "<div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div><div class=\"hs-selected:font-semibold text-sm text-gray-800 dark:text-gray-200\" data-title></div></div><div class=\"ms-auto\"><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-4 text-primary\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div></div>"
    }' className="hidden">
    <option defaultValue="">Choose</option>
    <option defaultValue="1"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../assets/images/faces/1.jpg\" alt=\"James Collins\" />"}'>
        James Collins
    </option>
    <option defaultValue="2"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../assets/images/faces/2.jpg\" alt=\"Amanda Harvey\" />"}'>
        Amanda Harvey
    </option>
    <option defaultValue="3"
        data-hs-select-option='{
    "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../assets/images/faces/10.jpg\" alt=\"Costa Quinn\" />"}'>
        Costa Quinn
    </option>
</select>
<div id="hs-select-temporary-toggle-icon"
    className="absolute top-1/2 end-3 -translate-y-1/2">
    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
    </svg>
</div>
</div>
{/* <!-- End Select --> */}
<div className="flex flex-wrap gap-2">
<SpkButton buttontype="button" Id="destroy"
    customClass="py-1 px-2 text-sm font-medium rounded-md border border-danger/30 bg-danger/10 dark:bg-danger/25 text-danger dark:text-danger hover:bg-danger/20 dark:hover:bg-danger/50">
    Destroy Select
</SpkButton>
<SpkButton buttontype="button" Id="reinit"
    customClass="py-1 px-2 text-sm font-medium rounded-md border dark:border-white/10 bg-gray-100 dark:bg-gray-800/25 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-bodybg/50">
    Reinitialize Select
</SpkButton>
</div>
</div>
// End Prism Code//`

