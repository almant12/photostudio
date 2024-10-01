import Image from 'next/image';
import Link from 'next/link';
import SubscribeButton from '@components/buttons/SubscribeButton';
import { useState,useEffect } from 'react';
import { authUser } from "lib/authUser";

interface UserCardProps {
  id: number;
  name: string;
  avatar: string | null;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  avatar
}) => {

    const [userAuth, setUserAuth] = useState<{valid:boolean,user:any} | null>(null);
    const [subscribeUsers,setSubscribeUser] = useState<number[]>([]);

    useEffect(() => {
        const authenticateUser = async () => {
          const authResult = await authUser();
          setUserAuth(authResult);
    
          if (authResult?.valid) {
            try {
              const response = await fetch('/api/subscribe', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
              });
              if (!response.ok) {
                throw new Error("Failed to fetch subscribed users");
              }
              const data = await response.json();
              const subscribedUserIds = data.users.map((user:any)=>user.id)
              setSubscribeUser(subscribedUserIds); // Update state with fetched subscribed users
            } catch (error) {
              console.error("Error fetching subscriptions:", error);
            }
          }
        };
        authenticateUser();
      }, []);

      const handleSubscribe = async(userId:string)=>{
        try{
          const response = await fetch('api/subscribe/'+userId,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json', // Ensure the request is sent as JSON
            }
          })
          if(response.ok){
            setSubscribeUser((prev)=>[...prev,parseInt(userId)])
          }
        }catch(error){
          console.log(error)
        }
      }
    
      const handleUnsubscribe = async(userId:string)=>{
        try{
          const response = await fetch('/api/un-subscribe/'+userId,{
            method:'DELETE'
          });
          if(response.ok){
           // Remove user from the subscribed list
            setSubscribeUser((prev)=>prev.filter((id)=>id !== parseInt(userId)))
          }
        } catch (error) {
          console.error("Error unsubscribing:", error);
        }
      }

  return (
    <div key={id} className="flex flex-col items-center content-to-animate">
      <Image
        src={avatar ? avatar : '/defaultUser.jpeg'}
        alt={`Photo of ${name}`}
        width={300}
        height={200}
        className="rounded-lg shadow-lg mb-4"
      />
      <a href={`/gallery/${id}`} className="text-center text-lg text-black font-semibold">
        {name}
      </a>
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
