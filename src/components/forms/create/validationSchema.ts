import * as Yup from 'yup';

export const stepOneSchema = Yup.object().shape({});

export const stepTwoSchema = Yup.object().shape({
  isScript: Yup.boolean(),

  prompt: Yup.string().when(['isScript'], {
    is: (isScript: boolean) => {
      return isScript === false;
    },
    then: Yup.string().required('Prompt is required'),
    otherwise: Yup.string(),
  }),

  endingText: Yup.string(),

  script: Yup.string().when(['isScript'], {
    is: (isScript: boolean) => {
      return isScript === true;
    },
    then: Yup.string().required('Script is required'),
    otherwise: Yup.string(),
  }),
});

export const stepThreeSchema = Yup.object().shape({});

export const validationSchema = [
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
] as const;

export type InferredStepOneType = Yup.InferType<typeof stepOneSchema>;
export type InferredStepTwoType = Yup.InferType<typeof stepTwoSchema>;
export type InferredStepThreeType = Yup.InferType<typeof stepThreeSchema>;

export type CreateFormType = InferredStepOneType &
  InferredStepTwoType &
  InferredStepThreeType;
