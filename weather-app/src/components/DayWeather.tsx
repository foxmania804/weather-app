interface DayWeatherProps {
  propName: string;
  data: number;
  unit?: string;
}

export const DayWeather: React.FC<DayWeatherProps> = ({
  propName,
  data,
  unit,
}) => {
  return (
    <div className="w-full p-4 rounded-lg bg-[#25253e] border border-[#2b2b48]">
      <div className="justify-start items-center col text-left">
        <h5
          className="text-[#c1c0ce] text-sm"
          style={{ fontFamily: "dm-sans" }}
        >
          {propName}
        </h5>
        <p
          className="text-[#e7e9ec] text-3xl mt-4"
          style={{ fontFamily: "bricolage-grotesque" }}
        >
          {data !== null && data !== undefined
            ? `${Math.round(data)}${unit}`
            : "-"}
        </p>
      </div>
    </div>
  );
};
