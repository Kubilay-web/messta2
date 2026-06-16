"use client"
// import SpkLeaflet from "@/shared/@spk-reusable-components/spk-packages/spk-leaflet";
const SpkLeaflet = dynamic(() => import('@/shared/@spk-reusable-components/spk-packages/spk-leaflet'), {
    ssr: false, // Disable SSR for this component
});
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import dynamic from "next/dynamic";
import React, { FC, Fragment } from "react";

interface LeafletMapsProps { }

const LeafletMaps: FC<LeafletMapsProps> = () => {
    const position: any = [51.505, -0.09];
    const redOptions: any = { color: "red" };
    const center: any = [51.51, -0.12];
    const fillBlueOptions = { fillColor: "blue" };
    const blackOptions = { color: "black" };
    const limeOptions = { color: "lime" };
    const purpleOptions = { color: "purple" };



    const polyline: any = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.51, -0.12],
    ];
    const multiPolyline: any = [
        [
            [51.5, -0.1],
            [51.5, -0.12],
            [51.52, -0.12],
        ],
        [
            [51.5, -0.05],
            [51.5, -0.06],
            [51.52, -0.06],
        ],
    ];

    const polygon: any = [
        [51.515, -0.09],
        [51.52, -0.1],
        [51.52, -0.12],
    ];

    const multiPolygon: any = [
        [
            [51.51, -0.12],
            [51.51, -0.13],
            [51.53, -0.13],
        ],
        [
            [51.51, -0.05],
            [51.51, -0.07],
            [51.53, -0.07],
        ],
    ];

    const rectangle: any = [
        [51.49, -0.08],
        [51.5, -0.06],
    ];
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Leaflet Maps" />
            <Pageheader Heading="Leaflet Maps" breadcrumbs={['Maps']} currentpage="Leaflet Maps" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Leaflet Map</div>
                        </div>
                        <div className="box-body">
                            <div id="map">
                                <SpkLeaflet
                                    position={position}
                                    Zoom={13}
                                    scrollWheel={true}
                                    Customclass="mapleaflet ht-300"
                                    Id="leaflet1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Map With Markers,circles and Polygons</div>
                        </div>
                        <div className="box-body">
                            <div id="map1">
                                <SpkLeaflet
                                    position={center}
                                    Zoom={13}
                                    scrollWheel={true}
                                    Customclass="ht-200 sm:ht-300 md:ht-400 popup-map"
                                    Id="leaflet3"
                                    CirclepathOptions={fillBlueOptions}
                                    Circlepostion={center}
                                    MarkerpathOptions={redOptions}
                                    PolylinepathOptions={limeOptions}
                                    Polyllinepositions={polyline}
                                    PolygonpathOptions={purpleOptions}
                                    Polygonposition={polygon}
                                    ReactanglepathOptions={blackOptions}
                                    Bounds={rectangle}
                                    MUltipolygonposition={multiPolygon}
                                    Multipolyineposition={multiPolyline}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Map With Popup</div>
                        </div>
                        <div className="box-body">
                            <div id="map-popup">
                                <SpkLeaflet
                                    position={center}
                                    Zoom={13}
                                    scrollWheel={true}
                                    Customclass="ht-300 circle-map"
                                    Id="leaflet2"
                                    MarkerpathOptions={redOptions}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Map With Custom Icon</div>
                        </div>
                        <div className="box-body">
                            <div id="interactive-map">
                                <SpkLeaflet
                                    position={position}
                                    Zoom={13}
                                    scrollWheel={true}
                                    Customclass="mapleaflet ht-300"
                                    Id="leaflet1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default LeafletMaps;