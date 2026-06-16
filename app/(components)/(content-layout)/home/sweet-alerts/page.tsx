"use client"
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";
import Swal from 'sweetalert2';
interface SweetAlertsProps { }

const SweetAlerts: FC<SweetAlertsProps> = () => {
    function Basicsweetalert() {
        Swal.fire({
            title: 'Hello this is Basic alert message',
            allowOutsideClick: true,
            confirmButtonColor: '#3085d6'
        });
    }

    // Titlealert
    function Titlealert() {
        Swal.fire(
            'The Internet ?',
            'That thing is still around ?',
            'question'
        );
    }

    //Footer
    function Footeralert() {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    //Long window
    function Longwindow() {
        Swal.fire({
            imageUrl: 'https://placeholder.pics/svg/300x1500',
            imageHeight: 1500,
            imageAlt: 'A tall image'
        });
    }

    function datatattatata() {

        Swal.fire({
            title: "<strong>HTML <u>example</u></strong>",
            icon: "info",
            html:
                "You can use <b>bold text</b>, " +
                "<a href=\"//sweetalert2.github.io\" target=\"_blank\">links</a> " +
                "and other HTML tags",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                "<i class=\"fe fe-thumbs-up\"></i> Great!",
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText:
                "<i class=\"fe fe-thumbs-down\"></i>",
            cancelButtonAriaLabel: "Thumbs down",
        });
    }

    //multiple buttons
    function Multiplebuttons() {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success');
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info');
            }
        });
    }

    //position 
    function Positiondialog() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        });
    }

    //confirmalert
    function Confirmalert() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            }
        });
    }

    //parameter
    function Parameteralert() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'ti-btn ti-btn-success ms-2',
                cancelButton: 'ti-btn ti-btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                );
            }
        });
    }

    //image alert
    function Imagealert() {
        Swal.fire({
            title: 'Sweet!',
            text: 'Modal with a custom image.',
            imageUrl: "../../assets/images/media/media-59.jpg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        });
    }

    //backgroundimage
    function Backgroundimage() {
        Swal.fire({
            title: 'Custom width, padding, color, background.',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: `#fff url(${"../../assets/images/media/media-13.jpg"}) no-repeat center center`,

        });
    }

    function Autoclose() {
        let timerInterval: string | number | NodeJS.Timeout | undefined;

        Swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer()?.querySelector('b'); // Use optional chaining here
                if (b) {
                    timerInterval = setInterval(() => {
                        const timerLeft = Swal.getTimerLeft()?.toString() || '0'; // Use optional chaining and provide a default value
                        b.textContent = timerLeft;
                    }, 100);
                }
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer');
            }
        });
    }
    //Ajax
    function Ajaxalert() {
        Swal.fire({
            title: 'Submit your Github username',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (login: any) => {
                return fetch(`//api.github.com/users/${login}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        );
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `${result.value.login}'s avatar`,
                    imageUrl: result.value.avatar_url
                });
            }
        });
    }

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Sweet Alerts" />
            <Pageheader Heading="Sweet Alerts" breadcrumbs={['Apps']} currentpage="Sweet Alerts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Basic Alert
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Basicsweetalert} customClass="ti-btn bg-primary text-white" Id="basic-alert">Basic Alert</SpkButton>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Title With Text Under
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Titlealert} customClass="ti-btn bg-primary text-white" Id="alert-text">Title With Text</SpkButton>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                With Text,Error Icon & Footer
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Footeralert} customClass="ti-btn bg-primary text-white" Id="alert-footer">Alert Footer</SpkButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Alert With Long Window
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Longwindow} customClass="ti-btn bg-primary text-white" Id="long-window">Long Window Here</SpkButton>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Custom HTML Description
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={datatattatata} customClass="ti-btn bg-primary text-white" Id="alert-description">Custom HTML Alert</SpkButton>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Alert With Multiple Buttons
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Multiplebuttons} customClass="ti-btn bg-primary text-white" Id="three-buttons">Multiple Buttons</SpkButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Custom Positioned Dialog Alert
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Positiondialog} customClass="ti-btn bg-primary text-white" Id="alert-dialog">Alert Dialog</SpkButton>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Confirm Alert
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Confirmalert} customClass="ti-btn bg-primary text-white" Id="alert-confirm">Confirm Alert</SpkButton>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Alert With Parameters
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Parameteralert} customClass="ti-btn bg-primary text-white" Id="alert-parameter">Alert Parameters</SpkButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}

            {/* <!-- Start:: row-4 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Alert With Image
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Imagealert} customClass="ti-btn bg-primary text-white" Id="alert-image">Image Alert</SpkButton>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Alert With Image
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Backgroundimage} customClass="ti-btn bg-primary text-white" Id="alert-custom-bg">Custom Alert</SpkButton>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Auto Close Alert
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Autoclose} customClass="ti-btn bg-primary text-white" Id="alert-auto-close">Auto Close</SpkButton>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Ajax Request Alert
                            </div>
                        </div>
                        <div className="box-body text-center">
                            <SpkButton onclickfunc={Ajaxalert} customClass="ti-btn bg-primary text-white" Id="alert-ajax">Ajax Request</SpkButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-4 --> */}
        </Fragment>
    );
};

export default SweetAlerts;