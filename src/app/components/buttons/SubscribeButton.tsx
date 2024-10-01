import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";


interface SubscribeButtonProps {
    userId: string;
    isSubscribed: boolean;
    onSubscribe: (userId: string) => void; // Function to call when subscribing
    onUnsubscribe: (userId: string) => void; // Function to call when unsubscribing
    isAuthenticate:boolean
  }
const SubscribeButton: React.FC<SubscribeButtonProps> = ({ userId, isSubscribed, onSubscribe, onUnsubscribe,isAuthenticate }) => {
    const router = useRouter();

    const [subscribed,setSubscribed] = useState(isSubscribed);


    useEffect(() => {
        // Synchronize the state with the isSubscribed prop when it changes
        setSubscribed(isSubscribed);
    }, [isSubscribed]);

    const handleClick = () =>{
        if(!isAuthenticate){
            router.push('/login')
            return;
        }

        if(subscribed){
            onUnsubscribe(userId)
        }else{
            onSubscribe(userId)
        }
        setSubscribed(!subscribed)
    }

    return(
        <button onClick={handleClick}
        className={`mt-4
        px-4
        py-2
        rounded-lg
        shadow-md 
        transition 
        ${subscribed ? 'bg-red-500 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
        >
            {subscribed ? 'Unsubscribed' : 'Subscribe'}
        </button>
    )

}

export default SubscribeButton;