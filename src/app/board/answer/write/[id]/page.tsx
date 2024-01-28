import { AnswerForm } from "src/app/board/_components/AnswerForm";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <AnswerForm questionId={Number(params.id)} />
    </div>
  );
};

export default page;
