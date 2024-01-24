import React, { useEffect, useState } from "react";
import { Group, TextInput, useMantineColorScheme } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
// import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { PasswordStrength } from "./PasswordStrength";
import { BiImage } from "react-icons/bi";
import { Button } from "@mantine/core";
import clsx from "clsx";
import { uploadFile } from "../utils";
import { useSignup } from "../hooks/auth-hook";

const SignUpForm = ({ toast, isSignin, setIsSignin, toggle, setFormClose }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";

  const { mutate } = useSignup(toast, toggle);
  const [strength, setStrength] = useState(0);
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");
  // const [passValue, setPassValue] = useInputState("");
  const [passValue, setPassValue] = useInputState("asd");

  // const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    validate: {
      firstName: (value) =>
        value.length < 3 ? "First name is too short" : null,
      lastName: (value) => (value.length < 2 ? "Last name is too short" : null),
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    if (!isSignin && strength < 90) return;
    console.log(passValue)

    setFormClose(true);
    // const res = mutate({
    mutate({
      ...values,
      password: passValue,
      image: fileURL,
      accountType: "Writer",
    });
    setFormClose(false);
    // navigate("/otp-verification");
  };

  useEffect(() => {
    file && uploadFile(setFileURL, file);
  }, [file]);

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-3"
    >
      <div className="w-full flex flex-col gap-2">
        <TextInput
          className="w-full"
          withAsterisk
          label="First Name"
          placeholder="First Name"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          className="w-full"
          withAsterisk
          label="Last Name"
          placeholder="Last Name"
          {...form.getInputProps("lastName")}
        />

        <TextInput
          className="w-full"
          withAsterisk
          label="Email Address"
          placeholder="yourName@email.com"
          {...form.getInputProps("email")}
        />

        <PasswordStrength
          value={passValue}
          setValue={setPassValue}
          setStrength={setStrength}
          isSignin={false}
          // isSignin={isSignin}

        />

        <Group className="w-full flex justify-between " mt="md">
          <div className="flex flex-col items-center justify-between">
            <label
              htmlFor="imgUpload"
              className={clsx(
                "flex items-center gap-1 text-base cursor-pointer",
                theme ? "text-gray-500" : "text-gray-700"
              )}
            >
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="imgUpload"
                data-max-size="5120"
                accept=".jpg, .png, .jpeg"
              />
              <BiImage />
              <span>Picture</span>
            </label>
          </div>

          <Button
            type="submit"
            className={clsx(theme ? "bg-blue-600" : "bg-black")}
          >
            Submit
          </Button>
        </Group>

        <p className="text-sm">
          {isSignin ? "Don't have an account ?" : "Already has an account?"}
          <span
            className="underline text-blue-600 ml-1 cursor-pointer"
            onClick={() => setIsSignin((prev) => !prev)}
          >
            {isSignin ? "Sign Up" : "Sign in"}
          </span>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
