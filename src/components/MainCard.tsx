import { dayName, monthName } from "../constants/constants";

interface MainCardProps {
  cityName: string;
  country: string;
  date: Date;
  temp: number;
}

export const MainCard: React.FC<MainCardProps> = ({
  cityName,
  country,
  date,
  temp,
}) => {
  const newDate = new Date(date);
  return (
    <div
      className={`mainCard md:pt-18 lg:pt-18 xl:pt-18 2xl:pt-18 text-white ${
        country
          ? "bg-[url('../assets/images/bg-today-large.svg')] bg-cover bg-no-repeat"
          : "bg-[#25253F]"
      } w-full p-6 rounded-xl`}
    >
      {country ? (
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between gap-4 mb-6">
          <div className="justify-start items-center col text-center md:text-left lg:text-left xl:text-left 2xl:text-left">
            <h5
              className="white font-bold text-lg"
              style={{ fontFamily: "dm-sans" }}
            >
              {`${cityName ?? "-"}, ${country ?? "-"}`}
            </h5>
            <p
              className="white text-sm font-light mt-2"
              style={{ fontFamily: "dm-sans" }}
            >
              {`${dayName[newDate.getDay()]}, ${
                monthName[newDate.getMonth()]
              } ${newDate.getDate()}, ${newDate.getFullYear()}`}
            </p>
          </div>
          <h1
            className="white font-bold text-6xl text-right pr-5"
            style={{ fontFamily: "bricolage-grotesque" }}
          >
            {Math.round(temp)}&deg;
          </h1>
        </div>
      ) : (
        <div className="flex justify-center gap-4 mb-6 items-center flex-col">
          <img
            src="../assets/images/icon-loading.svg"
            alt="loading"
            className="h-auto w-10"
          />
          <p>Loading</p>
        </div>
      )}
    </div>
  );
};
