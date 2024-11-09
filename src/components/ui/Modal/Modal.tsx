import { FC, useState } from "react";

type Props = {
  showModal: boolean;
  setShowModal: any;
  header?: string;
  children?: string | JSX.Element | JSX.Element[] | string[];
  width?: number;
};

const Modal: FC<Props> = (props: Props) => {
  const { showModal, setShowModal, header, children, width = 0 } = props;

  const [classes, setClasses] = useState("");

  // useEffect(() => {
  //   if (showModal) {
  //     setClasses("opacity-1");
  //   }
  // }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
    // setClasses("opacity-1")
    // setTimeout(() => setShowModal(false), 300)}
  };

  return (
    <>
      {showModal ? (
        <>
          <div
            className={`fixed inset-0 z-50 overflow-y-auto transition-opacity`}
          >
            <div
              className="active:scale-105 fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={handleClose}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div
                className={`relative ${
                  width ? `max-w-[${width}px]` : "w-full max-w-lg"
                } p-3 mx-auto bg-white rounded-md shadow-lg`}
              >
                {header && (
                  <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {header}
                    </h3>
                    <button
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleClose}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                <div>{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
