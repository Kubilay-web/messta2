import { UserView } from "../../../modules/user/ui/views/user-view";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;

  return (
    <div>
      <UserView userId={userId} />
    </div>
  );
};

export default Page;
