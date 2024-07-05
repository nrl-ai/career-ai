import { AnimatePresence, motion } from "framer-motion";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CaretUpDown, DotOutline } from "@phosphor-icons/react";
import { useState } from "react";

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

const list_level = [
    "Intern",
    "Fresher",
    "Mid-Junior", 
    "Junior",
    "Mid-Senior",
    "Senior"
];

const list_type = [
    "Technical",
    "Behavioral", 
    "Mixed",
]

const list_experience = [
    "Chưa có kinh nghiệm",
    "0-5 năm",
    "6-10 năm",
    "10+ năm",
]

type Props = {
    name: string;
    isOpen?: boolean;
};

export const InformationButton = () => {
    const [type, setType] = useState("Loại phỏng vấn");
    const [position, setPosition] = useState("Chức vụ");
    const [level, setLevel] = useState("Cấp độ");
    const [experience, setExperience] = useState("Số năm kinh nghiệm")
    const [open, setOpen] = useState(false);

    const handleKeyDown = (e: any) => {
        if (e.keyCode === 13 ) {
            setPosition(e.target.value);
            setOpen(false);
        }
    } 

    return (
        <>
            <DropdownMenu.Root open={open} onOpenChange={setOpen}>
                <DropdownMenu.Trigger asChild>
                    <button className={`outline outline-1 ${position != "Chức vụ" ? 'outline-[#6B94F9]' : 'outline-[#B3B3B3] text-[#B3B3B3]'} focus:outline-[#6B94F9] font-normal text-base rounded-lg px-2.5 py-2.5 inline-flex items-center justify-between w-[30rem]`}
                            type="button"
                    >
                        {position}
                        <CaretUpDown/>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content align="start">
                    <AnimatePresence>
                        {(
                            <motion.div
                                className="z-50 mt-5 outline outline-1 outline-[#6B94F9] bg-white rounded-lg shadow w-[30rem] absolute"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-3">
                                    <label htmlFor="input-group-search" className="sr-only">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                        </div>
                                        <input type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Nhập vị trí mong muốn" onKeyDown={handleKeyDown} />
                                    </div>
                                </div>
                                <div className="p-3 flex flex-wrap gap-x-2.5 gap-y-2.5">
                                    {list_position.map((item, index) => (
                                        <DropdownMenu.Item textValue={item}>
                                            <button className="w-fit px-5 py-2 bg-[#F4F9FF] outline outline-1 outline-[#6B94F9] rounded-md" onClick={() => {setPosition(item)}}>
                                                <span className=" text-base text-normal text-[#6B94F9]">{item}</span>
                                            </button>
                                        </DropdownMenu.Item>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className={`outline outline-1 ${level != 'Cấp độ' ? 'outline-[#6B94F9]' : 'outline-[#B3B3B3] text-[#B3B3B3]'} focus:outline-[#6B94F9] font-normal text-base rounded-lg px-2.5 py-2.5 inline-flex items-center justify-between w-[15rem]`}
                            type="button"
                    >
                        {level}
                        <CaretUpDown/>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content align="start">
                    <AnimatePresence>
                        {(
                            <motion.div
                                className="z-50 mt-5 outline outline-1 outline-[#6B94F9] bg-white rounded-lg shadow w-[15rem] absolute"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* <div className="p-3 flex flex-col gap-x-2.5 gap-y-2.5">
                                    {list_type.map((item, index) => (
                                        <div className="flex items-center">
                                            <input id={'default-radio-' + index} type="radio" value={item} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1" />
                                            <label htmlFor="default-radio-1" className="ms-2 text-base font-normal text-gray-900 dark:text-gray-300">{item}</label>
                                        </div>
                                    ))}
                                </div> */}
                                <DropdownMenu.RadioGroup value={level} onValueChange={setLevel} className="p-3 flex flex-col gap-x-2.5 gap-y-2.5">
                                    {list_level.map((item, index) => (
                                        <DropdownMenu.RadioItem value={item} className={`relative flex cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm outline-none transition-colors ease-in-out focus:bg-[#6B94F9] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50`}>
                                            <span className="absolute left-2 flex size-3.5 items-center justify-center">
                                                <DropdownMenu.ItemIndicator>
                                                    <DotOutline size={30} weight="fill" className="fill-[#6B94F9]" />
                                                </DropdownMenu.ItemIndicator>
                                            </span>
                                            {item}
                                        </DropdownMenu.RadioItem>
                                    ))}
                                </DropdownMenu.RadioGroup>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DropdownMenu.Content>
            </DropdownMenu.Root>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className={`outline outline-1 ${experience != 'Số năm kinh nghiệm' ? 'outline-[#6B94F9]' : 'outline-[#B3B3B3] text-[#B3B3B3]'}  focus:outline-[#6B94F9] font-normal text-base rounded-lg px-2.5 py-2.5 inline-flex items-center justify-between w-[15rem]`}
                            type="button"
                    >
                        {experience}
                        <CaretUpDown/>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content align="start">
                    <AnimatePresence>
                        {(
                            <motion.div
                                className="z-50 mt-5 outline outline-1 outline-[#6B94F9] bg-white rounded-lg shadow w-[15rem] absolute"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <DropdownMenu.RadioGroup value={experience} onValueChange={setExperience} className="p-3 flex flex-col gap-x-2.5 gap-y-2.5">
                                    {list_experience.map((item, index) => (
                                        <DropdownMenu.RadioItem value={item} className={`relative flex cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm outline-none transition-colors ease-in-out focus:bg-[#6B94F9] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50`}>
                                            <span className="absolute left-2 flex size-3.5 items-center justify-center">
                                                <DropdownMenu.ItemIndicator>
                                                    <DotOutline size={30} weight="fill" className="fill-[#6B94F9]" />
                                                </DropdownMenu.ItemIndicator>
                                            </span>
                                            {item}
                                        </DropdownMenu.RadioItem>
                                    ))}
                                </DropdownMenu.RadioGroup>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DropdownMenu.Content>
            </DropdownMenu.Root>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className={`outline outline-1 ${type != 'Loại phỏng vấn' ? 'outline-[#6B94F9]' : 'text-[#B3B3B3] outline-[#B3B3B3]'} focus:outline-[#6B94F9] font-normal text-base rounded-lg px-2.5 py-2.5 inline-flex items-center justify-between w-[15rem]`}
                            type="button"
                    >
                        {type}
                        <CaretUpDown/>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content align="start">
                    <AnimatePresence>
                        {(
                            <motion.div
                                className="z-50 mt-5 outline outline-1 outline-[#6B94F9] bg-white rounded-lg shadow w-[15rem] absolute"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* <div className="p-3 flex flex-col gap-x-2.5 gap-y-2.5">
                                    {list_type.map((item, index) => (
                                        <div className="flex items-center">
                                            <input id={'default-radio-' + index} type="radio" value={item} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1" />
                                            <label htmlFor="default-radio-1" className="ms-2 text-base font-normal text-gray-900 dark:text-gray-300">{item}</label>
                                        </div>
                                    ))}
                                </div> */}
                                <DropdownMenu.RadioGroup value={type} onValueChange={setType} className="p-3 flex flex-col gap-x-2.5 gap-y-2.5">
                                    {list_type.map((item, index) => (
                                        <DropdownMenu.RadioItem value={item} className={`relative flex cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm outline-none transition-colors ease-in-out focus:bg-[#6B94F9] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50`}>
                                            <span className="absolute left-2 flex size-3.5 items-center justify-center">
                                                <DropdownMenu.ItemIndicator>
                                                    <DotOutline size={30} weight="fill" className="fill-[#6B94F9]" />
                                                </DropdownMenu.ItemIndicator>
                                            </span>
                                            {item}
                                        </DropdownMenu.RadioItem>
                                    ))}
                                </DropdownMenu.RadioGroup>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </>
    );
};