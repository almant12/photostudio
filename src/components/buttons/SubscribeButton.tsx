import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/alert";


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
    const [showAlert,setShowAlert] = useState(false);
    const [alertMessage,setAlertMessage] = useState('');


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
            setAlertMessage("You have unsubscribed.");
        }else{
            onSubscribe(userId)
            setAlertMessage("Thank you for subscribing!");
        }
        setSubscribed(!subscribed)
        setShowAlert(true);
    }

    return (
        <div>
          {showAlert && (
            <Alert
              className="mb-4"
              // Add any custom styles or types you need for the alert
            >
              {alertMessage}
            </Alert>
          )}
          <button
            onClick={handleClick}
            className={`mt-4
            px-4
            py-2
            rounded-lg
            shadow-md 
            transition 
            ${subscribed ? 'bg-red-500 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
          >
            {subscribed ? "Unsubscribed" : "Subscribe"}
          </button>
        </div>
      );

}

export default SubscribeButton;