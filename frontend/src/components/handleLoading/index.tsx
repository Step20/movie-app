import { toggleLoading } from "@/features/loading/loadingSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "../loading";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const HandleLoading = () => {
  const dispatch = useDispatch();
  const { loading }: any = useSelector<RootState>((state) => state.loading);

  if (!loading) {
    return <></>;
  }

  return <Loading />;
};

export default HandleLoading;
