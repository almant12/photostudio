import { useState } from "react";


interface SubscribeButtonProps {
    userId: string;
    isSubscribed: boolean;
    onSubscribe: (userId: string) => void; // Function to call when subscribing
    onUnsubscribe: (userId: string) => void; // Function to call when unsubscribing
  }
const SubscribeButton: React.FC<SubscribeButtonProps> = ({ userId, isSubscribed, onSubscribe, onUnsubscribe }) => {

    const [subscribed,setSubscribed] = useState(isSubscribed);

    const handleClick = () =>{
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
        ${subscribed ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
        >
            {subscribed ? 'Unsubscribed' : 'Subscribed'}
        </button>
    )

}

export default SubscribeButton;