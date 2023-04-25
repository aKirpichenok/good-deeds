import { ChangeEventHandler, FC } from "react";
import { Input } from "../../ui/src/Input/Input";

import styles from "./DeedModal.module.sass";

interface DeedModalProps {
  title: string;
  setTitle: ChangeEventHandler<HTMLSelectElement>;
  description: string;
  setDescription: ChangeEventHandler<HTMLSelectElement>;
}

export const DeedModal: FC<DeedModalProps> = ({
  title,
  setTitle,
  description,
  setDescription,
}) => {
  return (
    <div className={styles["deed-modal"]}>
      <h3 className={styles["deed-modal__title"]}>Создание доброго дела</h3>
      <Input
        label="Заголовок"
        onChange={setTitle}
        placeholder="Покормить котят"
        type="text"
        value={title}
      />
      <Input
        label="Описание"
        onChange={setDescription}
        placeholder="нарезал сосиски"
        type="text"
        value={description}
      />
    </div>
  );
};
