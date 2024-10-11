const DayButton = () => {
  return (
    <>
      <div className="hidden p-1 day-btn rounded-md lg:inline-block mx-1 day day-btn-active">
        7 окт., пн
      </div>
      <div className="lg:hidden day-btn  text-white rounded-full w-12 h-12 flex flex-col justify-center items-center ">
        <span>7</span>
        <span>пн</span>
      </div>
    </>
  );
};

export default DayButton;
