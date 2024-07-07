import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";
import { CiPlay1 } from "react-icons/ci";

export const HomePage = () => {
  const { i18n } = useLingui();

  return (
    <main className="relative isolate bg-background">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />

        <title>
          {t`Homepage`} - {t`CareerAI`}
        </title>

        <meta
          name="description"
          content="Elevate Your Job Hunt with AI-Powered CVs, Interviews, and Job Matches!."
        />
      </Helmet>
      <section
        id="home"
        className="relative overflow-hidden pt-40 pb-96 bg-gradient-to-r from-blue-100 to-blue-50 bg-opacity-50"
      >
        <div className="container relative">
          <div className="text-center">
            <div className="flex justify-center mt-6">
              <div className="max-w-2xl">
                <h1 className="text-5xl/tight text-gray-800 font-bold mb-10">
                  Enhance Your Career with AI-Powered Solutions
                </h1>
                <p className="text-base text-gray-700 lg:max-w-md mx-auto">
                  Take your career to the next level with our comprehensive suite of AI-driven tools
                  including CV reviews, virtual interviews, skill courses, and career planning.
                </p>
              </div>
            </div>
            <div>
              <a
                href="/dashboard"
                className="w-[16rem] relative flex items-center justify-center rounded-full text-base font-medium py-3.5 px-6 mt-10 mx-auto bg-blue-500 text-white"
              >
                <CiPlay1 className="h-6 w-6 me-2" />
                Build Your Resume Now
              </a>
            </div>
          </div>
        </div>
        <div className="shape absolute sm:-bottom-px -bottom-[1px] start-0 end-0 overflow-hidden text-white">
          <svg
            className="w-full h-auto scale-[2.0] origin-top"
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor" />
          </svg>
        </div>
      </section>
      <div className="pb-24">
        <div className="max-w-3xl mx-auto -mt-80 relative px-6 z-10">
          <div className="hidden lg:block">
            <div className="h-24 w-24 absolute -top-10 -end-5 -z-[1] bg-[url('/other/dot.svg')]" />
            <div className="h-24 w-24 absolute -bottom-10 -start-5 -z-[1] bg-[url('/other/dot2.svg')]" />
          </div>
          <img src="/screenshots/careerai.png" className="rounded-2xl w-full h-full shadow-lg" />
        </div>
      </div>
      <section id="service" className="py-24">
        <div className="container">
          <div className="flex items-center justify-center mb-14">
            <div className="max-w-2xl text-center">
              <h5 className="capitalize text-lg text-gray-800 font-medium mb-2">
                Career <span className="font-semibold text-blue-500">Services</span>
              </h5>
              <h2 className="text-3xl/snug font-bold capitalize text-gray-800 mb-1">
                Choose the Right Tool for Your Career Journey
              </h2>
              <p className="text-base text-gray-600">
                Empower your career with our comprehensive suite of services tailored to your needs.
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            <div className="bg-white p-6">
              <span
                className="inline-flex relative z-0 bg-blue-50 h-14 w-14 mb-6"
                style={{ borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%" }}
              >
                <div className="absolute -z-20 top-5 left-5 right-0 bottom-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1={12} y1="22.08" x2={12} y2={12} />
                  </svg>
                </div>
              </span>
              <h5 className="text-xl font-medium mt-5 text-gray-800">CV Review</h5>
              <p className="text-base text-slate-600 mt-4">
                Get expert feedback on your CV to make it stand out to employers.
              </p>
            </div>
            <div className="bg-white p-6">
              <span
                className="inline-flex relative z-0 bg-red-50 h-14 w-14 mb-6"
                style={{ borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%" }}
              >
                <div className="absolute -z-20 top-5 left-5 right-0 bottom-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx={12} cy={12} r={4} />
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                  </svg>
                </div>
              </span>
              <h5 className="text-xl font-medium mt-5 text-gray-800">Virtual Interviews</h5>
              <p className="text-base text-slate-600 mt-4">
                Practice your interview skills with our AI-powered virtual interview sessions.
              </p>
            </div>
            <div className="bg-white p-6">
              <span
                className="inline-flex relative z-0 bg-emerald-50 h-14 w-14 mb-6"
                style={{ borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%" }}
              >
                <div className="absolute -z-20 top-5 left-5 right-0 bottom-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-emerald-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>
                  </svg>
                </div>
              </span>
              <h5 className="text-xl font-medium mt-5 text-gray-800">Skill Courses</h5>
              <p className="text-base text-slate-600 mt-4">
                Enhance your skills with our wide range of courses tailored to your career needs.
              </p>
            </div>
            <div className="bg-white p-6">
              <span
                className="inline-flex relative z-0 bg-sky-50 h-14 w-14 mb-6"
                style={{ borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%" }}
              >
                <div className="absolute -z-20 top-5 left-5 right-0 bottom-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x={3} y={3} width={7} height={7} />
                    <rect x={14} y={3} width={7} height={7} />
                    <rect x={14} y={14} width={7} height={7} />
                    <rect x={3} y={14} width={7} height={7} />
                  </svg>
                </div>
              </span>
              <h5 className="text-xl font-medium mt-5 text-gray-800">Career Planning</h5>
              <p className="text-base text-slate-600 mt-4">
                Plan your career with our expert advice and AI-driven tools.
              </p>
            </div>
            <div className="bg-white p-6">
              <span
                className="inline-flex relative z-0 bg-amber-50 h-14 w-14 mb-6"
                style={{ borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%" }}
              >
                <div className="absolute -z-20 top-5 left-5 right-0 bottom-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-amber-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x={2} y={3} width={20} height={14} rx={2} ry={2} />
                    <line x1={8} y1={21} x2={16} y2={21} />
                    <line x1={12} y1={17} x2={12} y2={21} />
                  </svg>
                </div>
              </span>
              <h5 className="text-xl font-medium mt-5 text-gray-800">Job Postings</h5>
              <p className="text-base text-slate-600 mt-4">
                Access thousands of job postings and find your perfect match.
              </p>
            </div>
            <div className="bg-white p-6">
              <span
                className="inline-flex relative z-0 bg-violet-50 h-14 w-14 mb-6"
                style={{ borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%" }}
              >
                <div className="absolute -z-20 top-5 left-5 right-0 bottom-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-violet-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx={12} cy={12} r={10} />
                    <circle cx={12} cy={12} r={4} />
                    <line x1="21.17" y1={8} x2={12} y2={8} />
                    <line x1="3.95" y1="6.06" x2="8.54" y2={14} />
                    <line x1="10.88" y1="21.94" x2="15.46" y2={14} />
                  </svg>
                </div>
              </span>
              <h5 className="text-xl font-medium mt-5 text-gray-800">Networking Opportunities</h5>
              <p className="text-base text-slate-600 mt-4">
                Connect with professionals and expand your network.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="bg-slate-50 bg-cover bg-left bg-no-repeat bg-[url(/backgrounds/hero-3-bg.png)]"
      >
        <div className="py-24">
          <div className="container">
            <div className="flex items-center justify-center mb-14">
              <div className="max-w-2xl text-center">
                <h5 className="capitalize text-lg text-gray-800 font-medium mb-2">
                  Our <span className="font-semibold text-blue-500">Features</span>
                </h5>
                <h2 className="text-3xl/snug font-bold text-gray-800 mb-1">
                  Powerful Tools for Career Advancement
                </h2>
                <p className="text-base text-gray-600">
                  Explore our feature-rich platform designed to help you succeed in your career.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-14 items-center">
              <div>
                <img
                  src="/screenshots/careerai.png"
                  className="max-w-full max-h-full rounded-md"
                  alt="CareerAI Features"
                />
              </div>
              <div className="my-auto md:mx-auto">
                <h2 className="lg:text-3xl text-2xl text-gray-800 font-semibold mb-2">
                  Comprehensive Career Tools
                </h2>
                <p className="text-base text-gray-600">
                  Leverage our advanced tools to enhance your career prospects.
                </p>
                <div className="mt-10 flex flex-col gap-y-4">
                  <div className="flex items-center gap-5">
                    <div>
                      <span
                        className="inline-flex relative z-0 bg-blue-500/10 h-8 w-8"
                        style={{ borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%" }}
                      >
                        <div className="absolute -z-20 top-4 left-4 right-0 bottom-0">
                          <svg
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                              <rect id="bound" x={0} y={0} width={24} height={24} />
                              <path
                                d="M7,14 C7,16.7614237 9.23857625,19 12,19 C14.7614237,19 17,16.7614237 17,14 C17,12.3742163 15.3702913,9.86852817 12,6.69922982 C8.62970872,9.86852817 7,12.3742163 7,14 Z M12,21 C8.13400675,21 5,17.8659932 5,14 C5,11.4226712 7.33333333,8.08933783 12,4 C16.6666667,8.08933783 19,11.4226712 19,14 C19,17.8659932 15.8659932,21 12,21 Z"
                                id="Oval-2"
                                fill="currentColor"
                              />
                              <path
                                d="M12,4 C16.6666667,8.08933783 19,11.4226712 19,14 C19,17.8659932 15.8659932,21 12,21 L12,4 Z"
                                id="Combined-Shape"
                                fill="currentColor"
                              />
                            </g>
                          </svg>
                        </div>
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-600">CV Review with AI Tools</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div>
                      <span
                        className="inline-flex relative z-0 bg-blue-500/10 h-8 w-8"
                        style={{ borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%" }}
                      >
                        <div className="absolute -z-20 top-4 left-4 right-0 bottom-0">
                          <svg
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                              <rect id="bound" x={0} y={0} width={24} height={24} />
                              <polygon
                                id="Path-48"
                                fill="currentColor"
                                opacity="0.3"
                                points="5 3 19 3 23 8 1 8"
                              />
                              <polygon
                                id="Path-48-Copy"
                                fill="currentColor"
                                points="23 8 12 20 1 8"
                              ></polygon>
                            </g>
                          </svg>
                        </div>
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-600">
                        Mock Interview with AI and Get Feedbacks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div>
                      <span
                        className="inline-flex relative z-0 bg-blue-500/10 h-8 w-8"
                        style={{ borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%" }}
                      >
                        <div className="absolute -z-20 top-4 left-4 right-0 bottom-0">
                          <svg
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                              <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                              <path
                                d="M4.85714286,1 L11.7364114,1 C12.0910962,1 12.4343066,1.12568431 12.7051108,1.35473959 L17.4686994,5.3839416 C17.8056532,5.66894833 18,6.08787823 18,6.52920201 L18,19.0833333 C18,20.8738751 17.9795521,21 16.1428571,21 L4.85714286,21 C3.02044787,21 3,20.8738751 3,19.0833333 L3,2.91666667 C3,1.12612489 3.02044787,1 4.85714286,1 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z"
                                id="Combined-Shape-Copy"
                                fill="currentColor"
                                opacity="0.3"
                              />
                              <path
                                d="M6.85714286,3 L14.7364114,3 C15.0910962,3 15.4343066,3.12568431 15.7051108,3.35473959 L20.4686994,7.3839416 C20.8056532,7.66894833 21,8.08787823 21,8.52920201 L21,21.0833333 C21,22.8738751 20.9795521,23 19.1428571,23 L6.85714286,23 C5.02044787,23 5,22.8738751 5,21.0833333 L5,4.91666667 C5,3.12612489 5.02044787,3 6.85714286,3 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z"
                                id="Combined-Shape"
                                fill="currentColor"
                              />
                            </g>
                          </svg>
                        </div>
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-600">Job Application Planning</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div>
                      <span
                        className="inline-flex relative z-0 bg-blue-500/10 h-8 w-8"
                        style={{ borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%" }}
                      >
                        <div className="absolute -z-20 top-4 left-4 right-0 bottom-0">
                          <svg
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g
                              id="Stockholm-icons-/-Layout-/-Layout-top-panel-2"
                              stroke="none"
                              strokeWidth={1}
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect id="bound" x={0} y={0} width={24} height={24} />
                              <path
                                d="M3,4 L20,4 C20.5522847,4 21,4.44771525 21,5 L21,7 C21,7.55228475 20.5522847,8 20,8 L3,8 C2.44771525,8 2,7.55228475 2,7 L2,5 C2,4.44771525 2.44771525,4 3,4 Z M10,10 L20,10 C20.5522847,10 21,10.4477153 21,11 L21,19 C21,19.5522847 20.5522847,20 20,20 L10,20 C9.44771525,20 9,19.5522847 9,19 L9,11 C9,10.4477153 9.44771525,10 10,10 Z"
                                id="Combined-Shape"
                                fill="currentColor"
                              />
                              <rect
                                id="Rectangle-7-Copy-2"
                                fill="currentColor"
                                opacity="0.3"
                                x={2}
                                y={10}
                                width={5}
                                height={10}
                                rx={1}
                              />
                            </g>
                          </svg>
                        </div>
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-600">Career Planning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
