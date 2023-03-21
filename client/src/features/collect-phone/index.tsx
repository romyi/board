import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { telephoneState } from "@states/telephone";

export const CollectPhoneNumber = () => {
  const phone = useRef<HTMLInputElement>(null);
  const [phoneInState, postPhoneInState] = useRecoilState(telephoneState);
  useEffect(() => {
    if (phone.current !== null) phone.current.focus();
  }, []);
  const { mutate } = useMutation({
    mutationKey: ["providePhone"],
    mutationFn: (phone: String) =>
      fetch(`http://localhost:3000/api/auth/telegram?phone=${phone}`, {
        method: "post",
        mode: "no-cors",
      }),
    onSuccess: async () => postPhoneInState(phone.current?.value as String),
  });
  const onSubmitPhone = (event: React.FormEvent) => {
    event.preventDefault();
    mutate(phone.current?.value as String);
  };
  if (phoneInState) return null;
  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-min m-auto">
        <form onSubmit={onSubmitPhone}>
          <input
            ref={phone}
            className="text-[32px] max-w-[300px] tracking-[0.1em] text-center"
            pattern="+7[0-9]{10}"
            type="number"
            maxLength={12}
          />
        </form>
        <p className="text-center">
          type the phone number you use for Telegram profile and type{" "}
          <code>Enter</code>
        </p>
      </div>
    </div>
  );
};
