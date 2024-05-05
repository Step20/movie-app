import { toggleLoading } from "@/features/loading/loadingSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ToggleLoading = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleLoading());
    return () => {
      dispatch(toggleLoading());
    };
  }, []);

  return <></>;
};

export default ToggleLoading;
