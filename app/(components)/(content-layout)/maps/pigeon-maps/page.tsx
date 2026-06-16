"use client"
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment, useState } from "react";
import { Map, Marker, Overlay, Draggable, ZoomControl, GeoJson, GeoJsonFeature, GeoJsonLoader } from 'pigeon-maps'

import Image from "next/image";

interface VectorMapsProps { }

interface GeoJsonFeature {
    geometry: {
        type: string;
    };
}
const VectorMaps: FC<VectorMapsProps> = () => {
    const [center, setCenter] = useState<[number, number]>([50.879, 4.6997])
    const [zoom, setZoom] = useState(11)

    //Marker 
    const [hue, setHue] = useState(0)
    const color = `hsl(${hue % 360}deg 39% 70%)`

    //Draggable
    const [anchor, setAnchor] = useState<[number, number]>([50.879, 4.6997]);

    ///
    const geoJsonSample = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: { type: "Point", coordinates: [2.0, 48.5] },
                properties: { prop0: "value0" },
            },
        ],
    };
    /////
    const geoJsonLink = "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/4_niedrig.geo.json"
    //json feature
    const geoJsonFeatureSample = {
        type: "Feature",
        geometry: { type: "Point", coordinates: [2.0, 48.5] },
        properties: { prop0: "value0" },
    };
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Pigeon Maps" />
            <Pageheader Heading="Pigeon Maps" breadcrumbs={['Maps']} currentpage="Pigeon Maps" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic  Map</div>
                        </div>
                        <div className="box-body">
                            <div id="vector-map">
                                <Map
                                    height={300}
                                    center={center}
                                    zoom={zoom}
                                    onBoundsChanged={({ center, zoom }) => {
                                        setCenter(center)
                                        setZoom(zoom)
                                    }}

                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Map With Markers</div>
                        </div>
                        <div className="box-body">
                            <div id="marker-map">
                                <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
                                    <Marker
                                        width={50}
                                        anchor={[50.879, 4.6997]}
                                        color={color}
                                        onClick={() => setHue(hue + 20)}
                                    />
                                    <Marker
                                        width={50}
                                        anchor={[50.879, 4.6997]}
                                        color={color}
                                        onClick={() => setHue(hue + 20)}
                                    >
                                        
                                    </Marker>
                                </Map>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Map With Image Markers</div>
                        </div>
                        <div className="box-body">
                            <div id="marker-image-map">
                                <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
                                    <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
                                        <Image  width={100} height={95} src='../../assets/images/brand-logos/desktop-logo.png' style={{ width: "auto", height: "auto" }} alt='' />
                                    </Overlay>
                                </Map>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Map With Image Draggable Overlay</div>
                        </div>
                        <div className="box-body">
                            <div id="lines-map">
                                <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
                                    <Draggable offset={[60, 87]} anchor={anchor} onDragEnd={setAnchor}>
                                        <Image width={100} height={95} src="../../assets/images/brand-logos/desktop-logo.png" style={{ width: "auto", height: "auto" }}  alt="Pigeon!" />
                                    </Draggable>
                                </Map>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Zoom Control</div>
                        </div>
                        <div className="box-body">
                            <div id="us-map">
                                <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
                                    <ZoomControl />
                                </Map>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default VectorMaps;