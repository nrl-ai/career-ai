import { useNavigate } from "react-router-dom";

export const InterviewRoomPage = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/dashboard/interviewInformation");
  };

  return (
    <>
      <div className="h-screen p-9">
        <div className="flex flex-col flex-grow overflow-auto min-h-full lg:px-8 xl:pb-[50px]">
          <div className="flex items-center gap-x-5">
            <button onClick={handleOnClick}>
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 3L6 11L14 19"
                  stroke="black"
                  stroke-width="3.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <span className="text-2xl font-bold">Phòng phỏng vấn</span>
          </div>
        </div>
      </div>
    </>
  );
};
