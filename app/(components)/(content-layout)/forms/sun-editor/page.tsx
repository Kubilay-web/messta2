"use client"
import SunEditorComponent from "@/shared/@spk-reusable-components/spk-packages/editor-component";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface SunEditorProps { }

const SunEditor: FC<SunEditorProps> = () => {
    const defaultContent = `
    <h4><b class="ql-size-large">Basic Suneditor</b> is a free, open source <a href="https://github.com/mkhstar/suneditor-react" target="_blank">Sun Editor</a> built for the modern web. With its <a href="https://suneditorjs.com/docs/modules/" target="_blank">modular architecture</a> and expressive API, it is completely customizable to fit any need.</h4>
    <p><br/></p>
    <ol>
      <li class="ql-size-normal">Write text, select, and edit with multiple options.</li>
      <li>This is suneditor snow editor.</li>
      <li>Easy to customize and flexible.</li>
    </ol>
    <p><br/></p>
    <h4>Suneditor officially supports a standard toolbar theme <a href="https://github.com/mkhstar/suneditor-react" target="_blank">"Snow"</a> and a floating tooltip theme <a href="https://github.com/mkhstar/suneditor-react" target="_blank">"Bubble"</a></h4>
  `;
  
      const defaultContent1 = ` <h4><b class="ql-size-large">suneditor</b> is a free, open source <a href="https://github.com/mkhstar/suneditor-react" target="_blank">Sun Editor </a> built for the modern web. With its <a href="https://suneditorjs.com/docs/modules/" target="_blank">modular architecture</a> and expressive API, it is completely customizable to fit any need.</h4>
    <p><br/></p>
    <ol>
        <li class="ql-size-normal">Write text select and edit with multiple options.</li>
        <li class="">This is suneditor bubble editor.</li>
        <li class="">Easy to customize and flexible.</li>
    </ol>
    <p><br/></p>
    <h4>Sun Editor officially supports a standard toolbar theme <a href="https://github.com/mkhstar/suneditor-react" target="_blank">"Snow"</a> and a floating tooltip theme <a href="https://github.com/mkhstar/suneditor-react" target="_blank">"Bubble"</a></h4>`


    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Sun Editor" />
            <Pageheader Heading="Sun Editor" breadcrumbs={['Forms']} currentpage="Sun Editor" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gp-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Basic Sun Editor
                            </div>
                        </div>
                        <div className="box-body">
                            <SunEditorComponent defaulContent={defaultContent} height={'300px'} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gp-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Sun Editor With Value
                            </div>
                        </div>
                        <div className="box-body">
                            <SunEditorComponent defaulContent={defaultContent1}
                                height={'300px'}
                                setoptions={{
                                    buttonList: [
                                        ["undo", "redo"],
                                        ["font", "fontSize"],
                                        [
                                            "bold",
                                            "underline",
                                            "italic",
                                            "strike",
                                            "subscript",
                                            "superscript"
                                        ],
                                        ["fontColor", "hiliteColor"],
                                        ["align", "list", "lineHeight"],
                                        ["outdent", "indent"],
                                        ["table", "link", "image", "video"],
                                        ["preview", "print"],
                                        ["removeFormat"]
                                    ],
                                    defaultTag: "div",
                                    minHeight: "300px",
                                    showPathLabel: false,
                                    font: ["Arial", "Comic Sans MS", "Courier New", "Impact"],
                                    defaultStyle: 'font-family: Arial; font-size: 16px;',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}
        </Fragment>
    );
};

export default SunEditor;