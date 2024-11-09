import { PlusIcon } from "../Icons";
import Button from "./Button";

const FloatingButton = (onClick: any) => {
  return (
    <div className="fixed bottom-0 right-0">
      <div className="absolute z-50 mb-16 bottom-0 right-4 lg:right-16">
        <Button shape="round" {...onClick}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default FloatingButton;
