import AllGroupDetails from './components/page'

import { getGroupById } from '../../../../../helpers/data'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ groupId: "string" }>;
}): Promise<Metadata> => {
  const groupId = (await params).groupId;

  const group = await getGroupById(groupId);
  return { title: group?.id ?? "Group Details" };
};

const GroupDetails = async ({
  params,
}: {
  params: Promise<{ groupId: "string" }>;
}) => {
  const groupId = (await params).groupId;
  const group = await getGroupById(groupId);
  if (!group) notFound();
  
  return (
    <div className="w-full md:w-2/3 lg:w-2/3 flex flex-col gap-4 mx-auto">
      <AllGroupDetails />
    </div>
  );
};

export default GroupDetails