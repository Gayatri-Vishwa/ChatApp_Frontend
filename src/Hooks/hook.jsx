import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const useErrors = (errors = []) => {
  // const toastId=toast.loading( "fetching Data...");
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else {
          toast.error(error?.data?.message || "Error fetching chats");
        }
      }
    });
  }, [errors]);
};


const useAsyncMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [error,setError]=useState(null);
  const [data, setData] = useState(null);
  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating Data...");
    try {
      const res = await mutate(...args);
     
      if (res?.data) {
        toast.success(res.data.message || "Updating Data Successfully", {
          id: toastId,
        });
        setData(res?.data);
      } else {
        toast.error(res?.error?.data?.message || "Error updating data");
          // throw new Error(res?.error?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };
  return [executeMutation, isLoading, data];
};


//mine
const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    if (!socket) return;

    Object.entries(handlers).forEach(([event, handler]) => {
     
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => 
        {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]);
};



export { useErrors, useAsyncMutation, useSocketEvents };
