const list_position = [
    "Software Engineer",
    "Data Scientist",
    "AI Engineer",
    "Product Manager",
    "Marketing Manager",
    "Sales Executive",
    "Business Analyst",
    "Frontend Engineer",
    "Financial Analyst",
    "Graphic Designer",
    "Content Writer",
    "UX/UI Designer",
    "Data Analyst",
    "DevOps Engineer",
    "Backend Engineer",
    "Consultant",
    "Digital Marketing Specialist"
];

type Props = {
    name: string;
    isOpen?: boolean;
};

const ListPositionItem = ({name, isOpen} : Props) => {
    return (
        <div className="w-fit bg-[#F4F9FF] outline outline-1 outline-[#6B94F9] rounded-md">
            <span className="px-5 py-2.5 text-base text-normal text-[#6B94F9]">{name}</span>
        </div>
    )
};

export const InformationButton = () => {
    const handleOnClick = (e: any) => {
        const dropdownId = e.target.dataset.dropdownToggle;
        const element = document.getElementById(dropdownId);
        if (element?.classList.contains('hidden')) {
            element?.classList.replace('hidden', 'absolute');
        } else {
            element?.classList.replace('absolute', 'hidden');
        }
    };

    return (
        <>
            <button id="dropdownSearchButton_1" data-dropdown-toggle="dropdownSearch_1" data-dropdown-placement="bottom" className="text-[#B3B3B3] outline outline-1 outline-[#B3B3B3] focus:outline-[#6B94F9] font-normal text-base rounded-lg px-2.5 py-2.5 inline-flex items-center justify-between w-[400px]" type="button" onClick={handleOnClick}>
                Chọn chức vụ
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            <div id="dropdownSearch_1" className="z-50 hidden mt-16 outline outline-1 outline-[#6B94F9] bg-white rounded-lg shadow w-[400px]">
                <div className="p-3">
                    <label htmlFor="input-group-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        </div>
                        <input type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập vị trí mong muốn" />
                    </div>
                </div>
                <div className="p-3 flex flex-wrap gap-x-2.5 gap-y-2.5">
                    {list_position.map((item, index) => (
                        <ListPositionItem
                            name={item}
                        />
                    ))}
                </div>
            </div>

            <button id="dropdownSearchButton_2" data-dropdown-toggle="dropdownSearch_2" data-dropdown-placement="bottom" className="text-[#B3B3B3] outline outline-1 outline-[#B3B3B3] focus:outline-[#6B94F9] font-normal text-base rounded-lg px-2.5 py-2.5 inline-flex items-center justify-between w-[300px]" type="button" onClick={handleOnClick}>
                Chọn cấp độ
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            <button id="dropdownSearchButton_3" data-dropdown-toggle="dropdownSearch_3" data-dropdown-placement="bottom" className="text-[#B3B3B3] outline outline-1 outline-[#B3B3B3] focus:outline-[#6B94F9] font-normal text-base rounded-lg px-2.5 py-2.5 inline-flex items-center justify-between w-[300px]" type="button" onClick={handleOnClick}>
                Số năm kinh nghiệm
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
        </>
    );
};