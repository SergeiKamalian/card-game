import * as Yup from "yup";

export const REGISTRATION_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(2, "minimum_2_charts")
    .max(30, "maximum_30_charts")
    .required("field_is_required"),
  password: Yup.string()
    .min(6, "minimum_6_charts")
    .max(30, "maximum_30_charts")
    .required("field_is_required"),
});

export const GAME_CREATING_SCHEMA = Yup.object().shape({
  gamersCount: Yup.number()
    .min(2, "minimum_2_gamers")
    .max(6, "maximum_6_gamers")
    .required("field_is_required"),
  coins: Yup.number()
    .min(100, "minimum_100_coins")
    .max(2000, "maximum_2000_coins")
    .required("field_is_required"),
});

export const GAME_JOINING_SCHEMA = Yup.object().shape({
  code: Yup.string()
    .min(6, "minimum_6_charts")
    .max(6, "maximum_6_charts")
    .required("field_is_required"),
});

export const PERSONAL_INFORMATION_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(2, "minimum_2_charts")
    .max(30, "maximum_30_charts")
    .required("field_is_required"),
  password: Yup.string()
    .min(6, "minimum_6_charts")
    .max(30, "maximum_30_charts")
    .required("field_is_required"),
});
