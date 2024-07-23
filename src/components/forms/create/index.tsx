import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { RainbowBorderButton } from "@/components/buttons/RainbowBorderButton";

import {
  CreateFormType,
  stepOneSchema,
  stepTwoSchema,
  validationSchema,
} from "./validationSchema";
import StyledInput, { StyledTextAreaTailwind } from "../input";
import Image from "next/image";
import { TemplateCard } from "./templateCard";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { TemplateStep } from "./templateStep";
import { CreateScript } from "./createScript";
import { AddAudio } from "./addAudio";
import { useUser } from "@/contexts";
import { UserService } from "@/domain/services/userService";
import { addNewVideo } from "@/lib/supabase/newVideo";
import {
  AI_VOICE_DETAILS,
  AI_VOICE_SELECT_OPTIONS,
} from "@/constant/createVideo/voices";
import axios from "axios";

const CreateForm: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  const [step, setStep] = useState(0);

  const methods = useForm<CreateFormType>({
    resolver: yupResolver(validationSchema[step]) as any,
  });

  const { register, handleSubmit } = methods;

  const [selectedVoice, setSelectedVoice] = useState(
    AI_VOICE_SELECT_OPTIONS[0]
  );
  const [isSubtitles, setIsSubtitles] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleNext = async (data: CreateFormType) => {
    try {
      setLoading(true);
      await validationSchema[step].validate(data);

      setStep((prevStep) => prevStep + 1);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      key: 0,
      value: <TemplateStep loading={loading} setStep={setStep} />,
      label: "Choose a template",
    },
    {
      key: 1,
      value: <CreateScript loading={loading} />,
      label: "Create your script",
    },
    {
      key: 2,
      value: (
        <AddAudio
          setSelectedVoice={setSelectedVoice}
          isSubtitles={isSubtitles}
          setIsSubtitles={setIsSubtitles}
          selectedVoice={selectedVoice}
          loading={loading}
        />
      ),
      label: "Other features",
    },
  ];

  const handleSubmitAsync = async (data: CreateFormType) => {
    if (step !== steps.length - 1) {
      await handleNext(data);
      return;
    }
    setLoading(true);

    try {
      if (!user?.id) {
        throw new Error("User not found");
      }

      if (UserService.hasUserReachedTokenLimit(user)) {
        toast.error(
          `You have reached your monthly token limit of ${UserService.getUserTokenLimit(
            user
          )}. Please upgrade your plan`
        );
        router.push("/pricing");
        setLoading(false);
        return;
      }

      const videoResponse = await axios.post("/api/createVideo", {
        prompt: data.prompt,
        negative_prompt: "", // You can customize this as needed
        scheduler: "UniPCMultistepScheduler", // Example scheduler
        seconds: 5, // Example duration
      });

      console.log("Video creation response:", videoResponse.data);

      // Wait for the video URL to be generated

      // Now add the new video with the generated URL
      const video_id = await addNewVideo({
        userID: user.id,
        prompt: data.prompt,
        voiceID: AI_VOICE_DETAILS[selectedVoice.value].elevenLabsId,
        endingText: data.endingText,
        isScript: data.isScript,
        script: data.script,
        videoUrl: videoResponse?.data?.videoUrl,
      });

      // await axios.post("/api/queueOrder", {
      //   video_id,
      // });

      if (video_id) {
        toast.success("Video created!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      toast.error("Please contact team@shorts.lol");
    } finally {
      setLoading(false);
    }
  };


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSubmitAsync)}>
        <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="mb-4 flex w-full items-center  justify-between">
            <BiArrowBack
              className="h-6 w-6 cursor-pointer text-gray-600 hover:text-black"
              onClick={() => {
                if (step > 0) {
                  setStep(step - 1);
                } else {
                  router.push("/dashboard");
                }
              }}
            />
            <h2>{steps[step].label} ⚡️</h2>
            <div />
          </div>
          <div>{steps[step].value}</div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateForm;
