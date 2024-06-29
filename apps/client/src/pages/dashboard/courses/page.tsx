import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { t, Trans } from "@lingui/macro";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@career-ai/ui";

const courses = [
  {
    title: "Bí quyết huy động vốn thông minh từ con số 0",
    description: "Học cách huy động vốn từ những chuyên gia.",
    imageUrl:
      "https://static.unica.vn/upload/images/2019/04/bi-quyet-huy-dong-von-thong-minh-tu-con-so-0_m_1555574856.jpg",
    link: "https://unica.vn/bi-quyet-huy-dong-von-thong-minh-tu-con-so-0?aff=653424",
  },
  {
    title: "Làm chủ photoshop cùng Huy Quần Hoa",
    description: "Trở thành chuyên gia Photoshop với Huy Quần Hoa.",
    imageUrl:
      "https://static.unica.vn/upload/images/2024/02/lam-chu-photoshop-cung-huy-quan-hoa.jpg_m_1709101181.jpg",
    link: "https://unica.vn/lam-chu-photoshop-cung-huy-quan-hoa?aff=653424",
  },
  {
    title:
      "Kiểm tra, đối chiếu, nhận diện RỦI RO VỀ THUẾ thông qua tài khoản trên Báo cáo tài chính",
    description: "Khóa học giúp bạn nhận diện rủi ro thuế.",
    imageUrl: "https://static.unica.vn/upload/images/2023/03/Banner_m_1678005870.jpg",
    link: "https://unica.vn/kiem-tra-doi-chieu-nhan-dien-rui-ro-ve-thue-thong-qua-tai-khoan-tren-bao-cao-tai-chinh?aff=653424",
  },
  {
    title: "Bí quyết bán lẻ ngàn đơn trên Shopee, Zalo và Facebook",
    description: "Học cách bán lẻ hiệu quả trên các nền tảng trực tuyến.",
    imageUrl:
      "https://static.unica.vn/upload/images/2024/02/bi-quyet-ban-le-ngan-don-tren-Shopee-Zalo-va-Facebook.jpg_m_1709088470.jpg",
    link: "https://unica.vn/bi-quyet-ban-le-ngan-don-tren-shopee-zalo-va-facebook?aff=653424",
  },
  {
    title: "Tuyệt chiêu luyện REVIT ARCH",
    description: "Nâng cao kỹ năng sử dụng REVIT ARCH.",
    imageUrl:
      "https://static.unica.vn/upload/images/2024/02/tuyet-chieu-luyen-REVIT ARCH.jpg_m_1709088521.jpg",
    link: "https://unica.vn/tuyet-chieu-luyen-revit-arch?aff=653424",
  },
  {
    title: "Đầu tư giá trị đỉnh cao",
    description: "Khóa học giúp bạn đầu tư hiệu quả.",
    imageUrl:
      "https://static.unica.vn/upload/images/2019/04/dau-tu-gia-tri-dinh-cao_m_1555576369.jpg",
    link: "https://unica.vn/dau-tu-gia-tri-dinh-cao?aff=653424",
  },
  {
    title: "Kinh nghiệm kê khai và quyết toán thuế thu nhập cá nhân từ A - Z",
    description: "Hướng dẫn chi tiết về kê khai và quyết toán thuế.",
    imageUrl:
      "https://static.unica.vn/upload/images/2019/04/kinh-nghiem-ke-khai-va-quyet-toan-thu-nhap-ca-nhan-tu-a-z_m_1555577651.jpg",
    link: "https://unica.vn/kinh-nghiem-ke-khai-va-quyet-toan-thue-thu-nhap-ca-nhan?aff=653424",
  },
  {
    title: "Dựng hình Sketchup 2018 từ cơ bản đến nâng cao",
    description: "Học cách dựng hình với Sketchup 2018.",
    imageUrl:
      "https://static.unica.vn/upload/images/2019/06/dung-hinh-sketchup-2018_m_1561518852.jpg",
    link: "https://unica.vn/dung-hinh-sketchup-2018-tu-co-ban-den-nang-cao?aff=653424",
  },
  {
    title: "65 Tuyệt chiêu quảng cáo Google Ads đỉnh cao giúp bạn Tiết kiệm 50% ngân sách",
    description: "Những tuyệt chiêu quảng cáo hiệu quả trên Google Ads.",
    imageUrl:
      "https://static.unica.vn/upload/images/2019/04/65-tuyet-chieu-quang-cao-adwords-dinh-cao_m_1555567594.jpg",
    link: "https://unica.vn/65-tuyet-chieu-quang-cao-google-ads-tiet-kiem-50-ngan-sach?aff=653424",
  },
  {
    title: "TOEIC thần tốc dành cho người mất gốc",
    description: "Khóa học TOEIC cho người mới bắt đầu.",
    imageUrl:
      "https://static.unica.vn/upload/images/2019/04/toeic-than-toc-cho-nguoi-mat-goc_m_1555642013.jpg",
    link: "https://unica.vn/toeic-than-toc-danh-cho-nguoi-mat-goc?aff=653424",
  },
  {
    title: "Facebook Smart Marketing",
    description: "Học cách marketing thông minh trên Facebook.",
    imageUrl: "https://static.unica.vn/upload/images/2022/12/Thêm-tiêu đề_m_1669948336.jpg",
    link: "https://unica.vn/facebook-smart-marketing-moi-nhat?aff=653424",
  },
  {
    title: "Soạn thảo văn bản Word 365 từ cơ bản đến nâng cao",
    description: "Nâng cao kỹ năng soạn thảo văn bản với Word 365.",
    imageUrl: "https://static.unica.vn/upload/images/2019/09/thumb_m_1568254672.jpg",
    link: "https://unica.vn/soan-thao-van-ban-word-365-tu-co-ban-den-nang-cao?aff=653424",
  },
  {
    title: "Lập trình Android từ cơ bản đến thành thạo",
    description: "Trở thành chuyên gia lập trình Android.",
    imageUrl:
      "https://static.unica.vn/uploads/images/hongvt@unica.vn/lap-trinh-android-tu-co-ban-den-thanh-thao_m.png",
    link: "https://unica.vn/lap-trinh-android-tu-co-ban-den-thanh-thao?aff=653424",
  },
  {
    title: "Quản trị cuộc đời - Đường đến thành công",
    description: "Khóa học giúp bạn quản lý cuộc đời hiệu quả.",
    imageUrl:
      "https://static.unica.vn/upload/images/2019/04/quan-tri-cuoc-doi-le-tham-duong_m_1555575906.jpg",
    link: "https://unica.vn/quan-tri-cuoc-doi?aff=653424",
  },
  {
    title: "Giáo dục sớm 0-3 tuổi: Để con phát triển ngôn ngữ vượt trội",
    description: "Giúp con bạn phát triển ngôn ngữ từ sớm.",
    imageUrl:
      "https://static.unica.vn/upload/images/2019/04/giao-duc-som-0-3-tuoi_m_1555658416.jpg",
    link: "https://unica.vn/giao-duc-som-0-3-tuoi-de-con-phat-trien-ngon-ngu-vuot-troi?aff=653424",
  },
  {
    title: "Google Ads Marketing toàn tập",
    description: "Khóa học toàn diện về Google Ads.",
    imageUrl: "https://static.unica.vn/upload/images/2022/08/Thiết-kế chưa có tên_m_1660279428.jpg",
    link: "https://unica.vn/google-ads-marketing-toan-tap?aff=653424",
  },
  {
    title: "Nhập Hàng Trung Quốc Tận Gốc",
    description: "Học cách nhập hàng từ Trung Quốc.",
    imageUrl: "https://static.unica.vn/upload/images/2021/05/nhập-hàng TQ_m_1620113367.jpg",
    link: "https://unica.vn/nhap-hang-trung-quoc-tan-goc?aff=653424",
  },
  {
    title: "Pha chế cafe barista từ cơ bản đến nâng cao",
    description: "Trở thành barista chuyên nghiệp.",
    imageUrl:
      "https://static.unica.vn/upload/images/2019/06/pha-che-barista-tu-co-ban-den-nang-cao_m_1561532187.jpg",
    link: "https://unica.vn/pha-che-cafe-barista-tu-co-ban-den-nang-cao?aff=653424",
  },
  {
    title: "Phong thủy Nhà Ở Căn Bản",
    description: "Tìm hiểu phong thủy căn bản cho nhà ở.",
    imageUrl:
      "https://static.unica.vn/upload/images/2019/04/khoa-hoc-phong-thuy-ung-dung-nha-o-can-ban_m_1555656488.jpg",
    link: "https://unica.vn/phong-thuy-ung-dung-can-nha-tai-loc-gia-chu-phat-tai?aff=653424",
  },
  {
    title: "Những nguyên tắc bất biến trong quản lý đội sales",
    description: "Học cách quản lý đội sales hiệu quả.",
    imageUrl:
      "https://static.unica.vn/upload/images/2019/06/nguyen-tac-bat-bien-trong-quan-ly-doi-sale_m_1561520382.jpg",
    link: "https://unica.vn/nhung-nguyen-tac-bat-bien-trong-quan-ly-doi-sales?aff=653424",
  },
];

const DocumentationCard = () => (
  <Card className="space-y-4">
    <CardContent className="space-y-2">
      <CardTitle>{t`Don't know where to begin? Hit the docs!`}</CardTitle>
      <CardDescription className="space-y-2">
        CareerAI là tuyển chọn và giới thiệu đến các bạn những khoá học trực tuyến hữu ích nhất tại
        trang web này. Mục tiêu của chúng tôi là giúp bạn nâng cao kiến thức và kĩ năng một cách
        nhanh chóng và hiệu quả nhất. Hãy cùng chúng tôi khám phá những khoá học tốt nhất dành cho
        bạn!
      </CardDescription>
    </CardContent>
    <CardFooter className="space-x-4">Hãy cùng tham khảo các khoá học phía dưới.</CardFooter>
  </Card>
);

const CourseCardInner = ({ course }) => (
  <Card className="flex flex-col space-y-2 h-[300px] hover:shadow-lg hover:border-gray-300">
    <img
      src={course.imageUrl}
      alt={course.title}
      className="rounded-md"
      style={{ aspectRatio: "16/9" }}
    />
    <CardContent className="space-y-1">
      <CardTitle>{course.title}</CardTitle>
      <CardDescription>{course.description}</CardDescription>
    </CardContent>
  </Card>
);

const CourseCard = ({ course }) => (
  <a href={course.link} target="_blank" rel="noreferrer noopener">
    <CourseCardInner course={course} />
  </a>
);

export const CoursesPage = () => {
  return (
    <>
      <Helmet>
        <title>
          {t`Courses`} - {t`CareerAI`}
        </title>
      </Helmet>

      <div className="flex items-center justify-between pt-4 mt-16 mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold tracking-tight"
        >
          {t`Courses`}
        </motion.h1>
      </div>

      <main className="grid gap-y12 mt-6" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <DocumentationCard />
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
      </main>
    </>
  );
};
