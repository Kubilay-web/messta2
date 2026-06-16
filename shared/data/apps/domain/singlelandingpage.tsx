
import Countdown from "react-countdown";

const AfterComplete = () => <span>You are good to go!</span>;

// Renderer callback with condition
const rendering = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
        // Render a complete state
        return <AfterComplete />;
    } else {
        // Render a countdown
        return (
            <div className="flex mb-5 gap-2 sm:justify-between justify-center flex-wrap" id="timer">
                <div className="box !text-dark items-center justify-between mb-0">
                    <div className="flex-grow text-center box-body !py-[2rem] !px-[2.5rem]">
                        <h6 className="mb-1 leading-none text-[0.638rem] text-textmuted font-medium">DAYS</h6>
                        <h4 className="mb-0 leading-none mt-2 block text-dark">{days}</h4>
                    </div>
                </div>
                <div className="box !text-dark items-center justify-between mb-0">
                    <div className="flex-grow text-center box-body !py-[2rem] !px-[2.5rem]">
                        <h6 className="mb-1 leading-none text-[0.638rem] text-textmuted font-medium">HOURS</h6>
                        <h4 className="mb-0 leading-none mt-2 block text-dark">{hours}</h4>
                    </div>
                </div>
                <div className="box !text-dark items-center justify-between mb-0">
                    <div className="flex-grow text-center box-body !py-[2rem] !px-[2.5rem]">
                        <h6 className="mb-1 leading-none text-[0.638rem] text-textmuted font-medium">MINUTES</h6>
                        <h4 className="mb-0 leading-none mt-2 block text-dark">{minutes}</h4>
                    </div>
                </div>
                <div className="box !text-dark items-center justify-between mb-0">
                    <div className="flex-grow text-center box-body !py-[2rem] !px-[2.5rem]">
                        <h6 className="mb-1 leading-none text-[0.638rem] text-textmuted font-medium">SECONDS</h6>
                        <h4 className="mb-0 leading-none mt-2 block text-dark">{seconds}</h4>
                    </div>
                </div>
            </div>
        );
    }
};

export function SinglepageTimer() {
    return (<Countdown date={Date.now() + 13876899990} renderer={rendering} />);
}

export const Offerdata = [
    { value: 'USD', label: 'USD' },
    { value: 'AED', label: 'AED' },
    { value: 'AUD', label: 'AUD' },
    { value: 'ARS', label: 'ARS' },
    { value: 'AZN', label: 'AZN' },
    { value: 'BZN', label: 'BZN' },
    { value: 'BRL', label: 'BRL' },
]


