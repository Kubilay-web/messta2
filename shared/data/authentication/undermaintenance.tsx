
import Countdown from "react-countdown";

const AfterComplete = () => <span>You are good to go!</span>;

// Renderer callback with condition
const rendering = ({ days, hours, minutes, seconds, completed }:any) => {
	if (completed) {
		// Render a complete state
		return <AfterComplete />;
	} else {
		// Render a countdown
		return (
			<div className="flex gap-4 flex-wrap mt-4 mb-0 xxl:gap-y-0 gap-y-4 justify-center">
				<div>
                    <div className="">
                        <p className="mb-1 text-[0.75rem] text-white">DAYS</p>
                        <h3 className="avatar block bg-white/[0.15] text-white avatar-xxl mb-0 mt-2 backdrop-blur">{days}</h3>              
                    </div>
                </div>
				<div>
                    <div className="">
                        <p className="mb-1 text-[0.75rem] text-white">HOURS</p>
                        <h3 className="avatar block bg-white/[0.15] text-white avatar-xxl mb-0 mt-2 backdrop-blur">{hours}</h3>
                    </div>
                </div>
				<div>
                    <div className="">
                        <p className="mb-1 text-[0.75rem] text-white">MINUTES</p>
                        <h3 className="avatar block bg-white/[0.15] text-white avatar-xxl mb-0 mt-2 backdrop-blur">{minutes}</h3>
                    </div>
                </div>
				<div>
                    <div className="">
                        <p className="mb-1 text-[0.75rem] text-white">SECONDS</p>
                        <h3 className="avatar block bg-white/[0.15] text-white avatar-xxl mb-0 mt-2 backdrop-blur">{seconds}</h3>
                    </div>
                </div>
			</div>
		);
	}
};

export function DayCounter() {
	return (<Countdown date={Date.now() + 15599999990} renderer={rendering} />);
}
