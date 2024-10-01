import Image from 'next/image';
import Link from 'next/link';
import SubscribeButton from '@components/buttons/SubscribeButton';

interface UserCardProps {
  id: number;
  name: string;
  avatar: string | null;
  subscribeUsers: number[]; // assuming subscribeUsers is an array of user IDs
  handleSubscribe: (userId: number) => void;
  handleUnsubscribe: (userId: number) => void;
  userAuth?: {
    valid: boolean;
  };
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  avatar,
  subscribeUsers,
  handleSubscribe,
  handleUnsubscribe,
  userAuth,
}) => {
  return (
    <div key={id} className="flex flex-col items-center content-to-animate">
      <Image
        src={avatar ? avatar : '/defaultUser.jpeg'}
        alt={`Photo of ${name}`}
        width={300}
        height={200}
        className="rounded-lg shadow-lg mb-4"
      />
      <Link href={`/gallery/${id}`} className="text-center text-lg text-black font-semibold">
        {name}
      </Link>
      {/* Subscribe button for each user */}
      <SubscribeButton
        userId={id} // Use the id from props
        isSubscribed={subscribeUsers.includes(id)} // Check if the user is subscribed
        onSubscribe={handleSubscribe}
        onUnsubscribe={handleUnsubscribe}
        isAuthenticate={userAuth?.valid}
      />
    </div>
  );
};

export default UserCard;
