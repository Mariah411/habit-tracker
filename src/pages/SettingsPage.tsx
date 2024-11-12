import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import Theme from "../components/Theme";
import FloatingButton from "../components/ui/Button/FloatingButton";
import Form from "../components/ui/Form/Form";
import { EditIcon } from "../components/ui/Icons";
import Modal from "../components/ui/Modal/Modal";
import { db } from "../service/db";
import { IHabbit } from "../types";

const days = [
  { idx: "1", name: "ПН" },
  { idx: "2", name: "ВТ" },
  { idx: "3", name: "СР" },
  { idx: "4", name: "ЧТ" },
  { idx: "5", name: "ПТ" },
  { idx: "6", name: "СБ" },
  { idx: "0", name: "ВС" },
];

const Divider = (props: { text: string }) => (
  <div className="inline-flex items-center justify-start w-full">
    <div className="absolute px-4 text-gray-300  transform -translate-y-1 bg-white font-medium dark:bg-gray-900">
      <span>{props.text}</span>
    </div>
    <hr className="w-full h-1 my-5 bg-gray-200 border-0 rounded dark:bg-gray-700" />
  </div>
);

const HabbitCard = (props: {
  habbit: IHabbit;
  setEditableHabbit: any;
  handleOpenForm: any;
}) => {
  const { habbit, setEditableHabbit, handleOpenForm } = props;

  return (
    <div className=" max-w-full p-6 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between relative">
      <div>
        <a
          className="bg-primary active:scale-105  absolute top-0 bottom-0 left-0 w-14 rounded-l-lg flex justify-center items-center hover:bg-primary-light text-white"
          onClick={() => {
            setEditableHabbit(habbit);
            handleOpenForm();
          }}
        >
          <EditIcon />
        </a>
        {/* <div className="mb-2 w-full pl-14 flex items-center justify-between"> */}
        <h5 className=" pl-14 text-l font-bold tracking-tight text-gray-900 dark:text-white">
          {habbit.name}
        </h5>
        <div className="absolute top-0 bottom-0 right-0 h-full flex items-center pr-3">
          <div className="flex justify-start mt-2 my-2">
            {days.map(({ idx }) => (
              <span
                className={`day ${habbit.days[+idx] ? "active" : "disabled"}`}
              >
                {/* {name} */}
              </span>
            ))}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const habbits_arr = useLiveQuery(() => db.habbits.toArray());

  const [formMode, setFormMode] = useState<"edit" | "add" | "">("");

  const [editableHabbit, setEditableHabbit] = useState<IHabbit>({} as IHabbit);

  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  const openEditForm = () => {
    setFormMode("edit");
    handleOpen();
  };

  const openAddForm = () => {
    setFormMode("add");
    handleOpen();
  };

  useEffect(() => {
    console.log(habbits_arr);
  }, [habbits_arr]);

  if (!habbits_arr) return null;

  // const toogleTheme = () => {
  //   setTheme(theme === "light" ? "dark" : "light");
  // };

  return (
    <>
      <div className="py-3">
        <Divider text="Общие настройки" />
        <div className="flex width-1/2   between items-center">
          <span className=" text-black dark:text-white  px-4">
            Тема приложения
          </span>
          <Theme.ThemeToggler />
        </div>
      </div>
      {/* <Button onClick={toogleTheme}>Переключить тему</Button> */}
      <Divider text="Редактирование привычек" />
      <div className="pb-16">
        {habbits_arr.length === 0 ? (
          <div className="p-2 text-center text-gray-300 font-semibold">
            Добавьте привычки....
          </div>
        ) : (
          habbits_arr.map((habbit) => {
            return (
              <HabbitCard
                key={habbit.id}
                habbit={habbit}
                setEditableHabbit={setEditableHabbit}
                handleOpenForm={openEditForm}
              />
            );
          })
        )}
      </div>

      <FloatingButton onClick={openAddForm} />

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        header={
          formMode === "edit"
            ? "Редактирование привычки"
            : "Добавление привычки"
        }
      >
        <>
          {formMode === "edit" && (
            <Form
              handleClose={handleClose}
              mode={formMode}
              habbit={editableHabbit}
            />
          )}

          {formMode === "add" && (
            <Form handleClose={handleClose} mode={formMode} />
          )}
        </>
      </Modal>
    </>
  );
};

export default SettingsPage;
