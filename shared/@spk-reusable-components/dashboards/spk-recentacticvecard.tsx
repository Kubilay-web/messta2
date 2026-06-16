const SpkActivityCard = ({ activityCard, showTime = false, Listclass, Salesdashboard }: any) => {
  return (
    <li className={Listclass}>
      <div>
        <h6 className="mb-1 text-[0.8125rem] font-medium">
          {activityCard?.activityUser}
          {showTime && (
            <span className={"text-[0.6875rem] text-textmuted dark:text-textmuted/50 float-end"}>
              {activityCard?.activityTime}
            </span>
          )}
        </h6>
        <span
          className="block text-[0.8125rem] text-textmuted dark:text-textmuted/50  font-normal"
          dangerouslySetInnerHTML={{ __html: activityCard?.activityDesc }}
        />
      </div>
    </li>
  );
};

export default SpkActivityCard;
