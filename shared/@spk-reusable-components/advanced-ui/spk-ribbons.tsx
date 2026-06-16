import React, { Fragment, ReactNode } from 'react';

interface SpkRibbonsProps {
    children?: ReactNode;
    ribbonColor?: string;
    ribbonPosition?: string;
    ribbonClass?: string
}

const SpkRibbons: React.FC<SpkRibbonsProps> = ({ children, ribbonColor, ribbonPosition, ribbonClass }) => {
    return (
        <Fragment>
            <div className={`${ribbonClass} ribbon-${ribbonColor} ${ribbonPosition}`}>
                {children}
            </div>
        </Fragment>
    );
};

export default SpkRibbons;
