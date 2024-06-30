
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Form,
  RichInput
} from "@career-ai/ui";

const schema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  level: z.string().min(1, "Level is required"),
  experience: z.number().min(1, "Experience is required"),
});

const JobDescriptionForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
  });
  const [content, setContent] = useState("");

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <RichInput content={content} onChange={setContent} />
        <Button type="submit">
          {t`Phân tích CV`}
        </Button>
      </form>
    </Form>
  );
};

export default JobDescriptionForm;
