import { useRouter } from "next/router";
import { useEffect } from "react";

const router = useRouter();

export const isLoginConfirm = (isLoginDone) => {
  useEffect(() => {
    if (!isLoginDone) {
      router.push("/");
    }
  }, []);
};
