interface ErrorProps {
  errorMessage: string;
  retry: boolean;
  setRetry: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ErrorMessage: React.FC<ErrorProps> = ({
  errorMessage,
  retry,
  setRetry,
}) => {
  const handleOnRetryClick = () => {
    setRetry(!retry);
  };
  return (
    <div className="grid justify-items-center col flex-col">
      <img
        src="../assets/images/icon-error.svg"
        alt="Error"
        className="h-auto w-7 mt-10 mb-5"
      />
      <h1
        style={{ fontFamily: "dm-sans" }}
        className="text-[#fdfdfc] text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold"
      >
        Something went wrong
      </h1>
      <p
        style={{ fontFamily: "dm-sans" }}
        className="text-[#a7a6c1] w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 mt-5 text-center"
      >
        {errorMessage}
      </p>
      <button
        onClick={handleOnRetryClick}
        style={{ fontFamily: "dm-sans" }}
        className="flex flex-row text-[#a7a6c1] text-sm bg-[#25253F] rounded-md gap-2 px-3 py-2 mt-5"
      >
        <img
          src="../assets/images/icon-retry.svg"
          alt="Retry"
          className="h-auto w-3"
        />
        Retry
      </button>
    </div>
  );
};
