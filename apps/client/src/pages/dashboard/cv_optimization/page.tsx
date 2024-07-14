import { t } from "@lingui/macro";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useState, useRef } from "react";
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
  const resultRef = useRef<HTMLDivElement>(null);
  const [hasResult, setHasResult] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedCV) {
      toast({
        variant: "warning",
        title: t`Please select a CV first.`,
      });
      return;
    }

    // Scroll to the bottom of the page
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, i * 500);
    }

    // Analyze the resume
    await analyzeResume({ id: selectedCV, jd: jd as string });
    setHasResult(true);

    // Scroll to the result
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleSelectCV = (id: string) => {
    setSelectedCV(id);
    setHasResult(false);
  };

  return (
    <>
      <Helmet>
        <title>
          {t`Resume Checker and Optimizer`} - {t`CareerAI`}
        </title>
      </Helmet>

      <div className="flex items-center justify-between pt-4">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tight"
        >
          {t`Resume Checker and Optimizer`}
        </motion.h1>
      </div>

      <main className="grid gap-y12 mb-16" style={{ maxWidth: "1200px" }}>
        <div className="max-w-[600px] pt-4 mb-8 text-md text-gray-500">
          {t`The comprehensive resume optimizer tool helps you increase your chances of being invited to an interview by evaluating the keywords and formatting of your CV.`}
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <span className="font-bold">1</span>
          </div>
          <h1 className="font-bold text-xl">{t`Select a resume`}</h1>
        </div>

        <CVSelector selectedCV={selectedCV} setSelectedCV={handleSelectCV} />

        <div className="flex items-center space-x-4 mb-4 mt-8">
          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <span className="font-bold">2</span>
          </div>
          <h1 className="font-bold text-xl">{t`Enter a job description (optional)`}</h1>
        </div>

        <div className="space-y-4">
          <RichInput content={jd} onChange={setJD} />
          <Button onClick={handleAnalyze}>{t`Analyze Resume`}</Button>
        </div>

        {selectedCV && loading && (
          <Card className="space-y-4 border-orange-500 border-dashed border-[1px] p-4 bg-orange-100 mt-8">
            <CardContent className="space-y-2">
              <CardTitle>{t`Analyzing CV`}</CardTitle>
              <div>{t`Please wait a moment. Your CV is being analyzed...`}</div>
            </CardContent>
          </Card>
        )}

        {selectedCV && error && (
          <Card className="space-y-4 border-red-500 border-dashed border-[1px] p-4 bg-red-100 mt-8">
            <CardContent className="space-y-2">
              <div>{t`Error when analyzing CV:`}</div>
              <div>{error.message}</div>
            </CardContent>
          </Card>
        )}

        {hasResult && selectedCV && result && (
          <Card
            ref={resultRef}
            className="space-y-4 border-blue-500 border-dashed border-[1px] p-4 bg-blue-100 mt-4 cv-review-result"
          >
            <CardContent className="space-y-2 list-disc">
              <CardTitle>{t`ANALYSIS RESULT:`}</CardTitle>
              <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
};
