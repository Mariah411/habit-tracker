import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  AddHabbit,
  DeleteHabbit,
  EditHabbit,
} from "../../../service/HabbitService";
import { IHabbit } from "../../../types";
import Button from "../Button/Button";

type FormFields = {
  name: string;
  days: boolean[];
};

const days = [
  { idx: "1", name: "ПН" },
  { idx: "2", name: "ВТ" },
  { idx: "3", name: "СР" },
  { idx: "4", name: "ЧТ" },
  { idx: "5", name: "ПТ" },
  { idx: "6", name: "СБ" },
  { idx: "0", name: "ВС" },
];

type Props = {
  handleClose: any;
  habbit?: IHabbit;
  mode: "add" | "edit";
};

const defaultData: IHabbit = {
  id: 0,
  name: "",
  days: [true, true, true, true, true, true, true],
};

const Form: FC<Props> = (props: Props) => {
  const { handleClose, habbit = defaultData, mode } = props;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    getValues,
    formState: { errors, touchedFields },
  } = useForm<FormFields>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    data.name = data.name.trim();
    // else {
    switch (mode) {
      case "add":
        await add(data);
        break;

      case "edit":
        await edit(data);
        break;

      default:
        break;
    }
    // }
  };

  // console.log(touchedFields);

  useEffect(() => {
    reset({ name: habbit.name, days: habbit.days });
  }, []);

  const validateCheckBox = () => {
    const isValide = getValues("days").reduce((a, b) => a || b);
    console.log(isValide);
    if (!isValide) {
      setError("days", {
        type: "manual",
        message: "Выберите хотя бы один день",
      });
    } else {
      clearErrors("days");
    }
    return isValide;
  };

  const add = async (data: FormFields) => {
    try {
      await AddHabbit(data.name, data.days);
      handleClose();
      reset();
      toast.success("Привычка успешно добавлена!");
    } catch (error) {
      toast.error("Произошла ошибка, повторите попытку");
    }
  };

  const edit = async (data: FormFields) => {
    try {
      await EditHabbit(habbit.id, data.name, data.days);
      handleClose();
      reset();
      toast.success("Изменения сохранены");
    } catch (error) {
      toast.error("Произошла ошибка, повторите попытку");
    }
  };

  const deleteHabbit = async (e) => {
    e.preventDefault();
    try {
      await DeleteHabbit(habbit.id);
      toast.success("Привычка удалена!");
      handleClose();
      reset();
    } catch (error) {
      toast.error("Произошла ошибка, повторите попытку");
    }
  };

  const resetFields = async (e) => {
    e.preventDefault();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <input
          className={`input ${errors.name && "error"}`}
          type="text"
          placeholder="Название"
          {...register("name", {
            required: "Это поле обязательно для заполнения",
            setValueAs: (value: string) => value.trim(),
            // validate: (value) => {
            //   return !!value.trim();
            // },
          })}
        />

        {errors.name && <p className="error-text">{errors.name.message} </p>}
        {/* {errors.name && (
          <p className="error-text">Это поле обязательно для заполнения </p>
        )} */}
      </div>
      <div className="mb-2">
        <label htmlFor="days" className="m-2 text-gray-500 text-sm ">
          Дни недели
        </label>
        <ul className="flex justify-start mt-2 my-2">
          {days.map(({ idx, name }) => (
            <li key={idx}>
              <input
                type="checkbox"
                id={idx}
                // value={idx}
                className="hidden peer "
                // defaultChecked
                {...register(`days.${+idx}`, { validate: validateCheckBox })}
              />
              <label
                htmlFor={idx}
                className={`inline-flex mx-1 items-center btn contained ${
                  errors.days ? "danger" : "secondary"
                }  peer-checked:bg-primary peer-checked:text-white hover:peer-checked:bg-primary-light`}
              >
                {name}
              </label>
            </li>
          ))}
        </ul>

        {errors.days && <p className="error-text">{errors.days.message}</p>}

        {/* 
        <p className="error-text">Выберите хотя бы один день</p> */}
      </div>

      {mode === "add" && (
        <>
          <input
            type="submit"
            className="btn contained primary mr-2"
            value="Добавить"
          />

          <Button color="secondary" onClick={resetFields}>
            Сбросить
          </Button>
        </>
      )}

      {mode === "edit" && (
        <>
          <input
            type="submit"
            className="btn contained primary mr-2"
            value="Сохранить"
          />
          <Button color="danger" onClick={deleteHabbit}>
            Удалить
          </Button>
        </>
      )}
    </form>
  );
};

export default Form;
