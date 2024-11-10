import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import FloatingButton from "../components/ui/Button/FloatingButton";
import Form from "../components/ui/Form/Form";
import { EditIcon } from "../components/ui/Icons";
import Modal from "../components/ui/Modal/Modal";
import { db } from "../service/db";
import { IHabbit } from "../types";

const Divider = () => (
  <div className="inline-flex items-center justify-start w-full">
    <div className="absolute px-4 text-gray-300  transform -translate-y-1 bg-white font-medium dark:bg-gray-900">
      <span>Редактировать привычки</span>
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
        <h5 className="mb-2 pl-14 text-l font-bold tracking-tight text-gray-900 dark:text-white">
          {habbit.name}
        </h5>
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

  return (
    <>
      <Divider />
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
