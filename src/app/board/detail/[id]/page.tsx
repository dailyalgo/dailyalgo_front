import { QuestionDetailForm } from "../../_components/QuestionDetailForm";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <QuestionDetailForm id={Number(params.id)} />
    </div>
  );
};

export default Page;
