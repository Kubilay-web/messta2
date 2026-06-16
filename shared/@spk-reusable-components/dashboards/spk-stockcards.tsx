
import Image from 'next/image';
import React, { Fragment } from 'react';

interface StockCardProps {
    stock?: any;
}

const SpkStockCard: React.FC<StockCardProps> = ({ stock }) => {
    return (
        <Fragment>

            <div className="box">
                <div className="box-body !p-2">
                    <div className={`flex gap-2 flex-wrap items-center justify-between bg-${stock.cardbg}  p-4 rounded`}>
                        <div className="flex flex-grow items-center">
                            <div className="me-2 leading-none">
                                <span className="avatar avatar-md">
                                    <Image fill src={stock.src} alt="" className={stock.srcclass} />
                                </span>
                            </div>
                            <div className="leading-none">
                                <span className="block mb-2 text-default font-medium">{stock.name}</span>
                                <span className={`block text-[0.75rem] text-${stock.cardbg1}`}>{stock.price}</span>
                            </div>
                        </div>
                        <div className={`text-${stock.stockclass} text-[0.75rem] text-end`}>
                            <span className="block">{stock.stockgrow}<i className="ti ti-arrow-bear-right"></i></span>
                            <span className="block">{stock.stock}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default SpkStockCard;
