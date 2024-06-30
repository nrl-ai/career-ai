import { t } from "@lingui/macro";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { CVSelector } from "../../../components/cv_selector";
import { Button, RichInput } from "@career-ai/ui";
import { Card, CardContent, CardTitle } from "@career-ai/ui";
import { useAnalyzeResume } from "@/client/services/resume/analyze";
import { useToast } from "@/client/hooks/use-toast";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const CVOptimizationPage = () => {
  const { toast } = useToast();
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const [jd, setJD] = useState<string | undefined>("");
  const { analyzeResume, loading, error, result } = useAnalyzeResume();

  const handleAnalyze = async () => {
    if (!selectedCV) {
      toast({
        variant: "warning",
        title: t`Please select a CV first.`,
      });
      return;
    }
    await analyzeResume({ id: selectedCV, jd: jd as string });
  };

  return (
    <>
      <Helmet>
        <title>Kiểm tra và Tối ưu CV - {t`CareerAI`}</title>
      </Helmet>

      <div className="flex items-center justify-between pt-4">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tight"
        >
          Kiểm tra và Tối ưu CV
        </motion.h1>
      </div>

      <main className="grid gap-y12" style={{ maxWidth: "1200px" }}>
        <div className="max-w-[500px] pt-4 mb-8 text-md text-gray-500">
          Công cụ Kiểm Tra CV Toàn Diện giúp bạn tăng cơ hội được mời phỏng vấn bằng cách đánh giá
          từ khóa và định dạng CV của bạn.
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <span className="font-bold">1</span>
          </div>
          <h1 className="font-bold text-xl">Chọn CV</h1>
        </div>

        <CVSelector selectedCV={selectedCV} setSelectedCV={setSelectedCV} />

        <div className="flex items-center space-x-4 mb-4 mt-8">
          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <span className="font-bold">2</span>
          </div>
          <h1 className="font-bold text-xl">Mô tả công việc (nên có)</h1>
        </div>

        <div className="space-y-4">
          <RichInput content={jd} onChange={setJD} />
          <Button onClick={handleAnalyze}>Phân tích CV</Button>
        </div>

        {loading && (
          <Card className="space-y-4 border-orange-500 border-dashed border-[1px] p-4 bg-orange-100 mt-8">
            <CardContent className="space-y-2">
              <CardTitle>Đang phân tích CV</CardTitle>
              <div>Vui lòng chờ một chút. CV của bạn đang được phân tích...</div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="space-y-4 border-red-500 border-dashed border-[1px] p-4 bg-red-100 mt-8">
            <CardContent className="space-y-2">
              <CardTitle>Lỗi khi phân tích CV: </CardTitle>
              <div>{error.message}</div>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="space-y-4 border-blue-500 border-dashed border-[1px] p-4 bg-blue-100 mt-4 cv-review-result">
            <CardContent className="space-y-2 list-disc">
              <CardTitle>KẾT QUẢ PHÂN TÍCH: </CardTitle>
              <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
};
